const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");
const { daysInMonth, getFreeSlots } = require("./utils");

const calendarApiCredentials = require("./.google_calendar_cred.json");

const app = express();

const whitelist = [
  "https://skillrazr.com",
  "https://skillrazr.web.app",
  "http://localhost:3000",
  "http://localhost:3001",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: false,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => res.status(200).send("hi calendar events!"));

async function loadSavedCredentialsIfExist() {
  try {
    return google.auth.fromJSON(calendarApiCredentials);
  } catch (err) {
    return null;
  }
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }

  return client;
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents(auth, eventMonth) {
  const calendar = google.calendar({ version: "v3", auth });
  const currentMonthDate = new Date();
  const eventMonthDate = new Date(eventMonth);

  const lastDayInCurrentMonth = new Date(
    currentMonthDate.getFullYear(),
    currentMonthDate.getMonth() + 1,
    0
  );

  const lastDayInEventMonth = new Date(
    eventMonthDate.getFullYear(),
    eventMonthDate.getMonth() + 1,
    0
  );

  const isCurrentMonth = eventMonthDate.getTime() < Date.now();

  const res = await calendar.events.list({
    calendarId: "tukuna.patro@gmail.com",
    timeMin: isCurrentMonth
      ? new Date().toISOString()
      : eventMonthDate.toISOString(), // currentTime if in this month else 1st day of event month
    timeMax: isCurrentMonth
      ? lastDayInCurrentMonth.toISOString()
      : lastDayInEventMonth.toISOString(),
    maxResults: 100,
    singleEvents: true,
    orderBy: "startTime",
  });

  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log("No upcoming events found.");
    return [];
  }
  return events;
}

async function createEvent(auth, payload) {
  const {
    userEmail,
    eventStartTime,
    eventEndTime,
    eventSummary = "Interview & Discussions",
    eventLocation = `Google Meet (instructions in description)`,
    eventDescription,
  } = payload;
  const calendar = google.calendar({ version: "v3", auth });

  const event = {
    summary: eventSummary,
    location: eventLocation,
    description:
      eventDescription ||
      `Event name - Interview \n\n Coding (problem solving) and discussions \n\n Note:- Make sure you've access to a laptop/desktop \n\n Please join by clicking the Google Meet link. \n\n  https://meet.google.com/neh-hsot-vxy \n\n You can join this meeting from your computer, tablet, or smartphone.`,
    start: {
      dateTime: eventStartTime,
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: eventEndTime,
      timeZone: "Asia/Kolkata",
    },
    attendees: [{ email: "tukuna.patro@gmail.com" }, { email: userEmail }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 30 },
        { method: "popup", minutes: 10 },
      ],
    },
  };

  const resp = await calendar.events.insert({
    auth,
    calendarId: "tukuna.patro@gmail.com",
    resource: event,
  });

  return resp;
}

app.post("/getAllFreeSlots", async (req, res) => {
  const { eventMonth = new Date().toISOString() } = req.body;

  // 1. Get All slots where the organiser is available -- firebase (day wise availability Mon - Sun some fixed times )
  // 2. Get all date overrides (specific days when orgainser is not available) - firebase
  // 3. remove the dateoverrides
  // 4. Get all the scheduled events from Google calendar
  // 5. Remove ovalapping slots and return free slots

  try {
    authorize()
      .then(async (auth) => {
        try {
          new Date(eventMonth).toISOString();
        } catch (e) {
          return res.status(200).json({
            status: -1,
            error: "invalid eventMonth payload, it should be a ISO date string",
          });
        }

        const scheduledEvents = await listEvents(auth, eventMonth);

        const currentMonth = new Date(eventMonth);
        const currentDayIndex = currentMonth.getDate();
        const currentMonthIndex = currentMonth.getMonth();

        const totalDaysInMonth = daysInMonth(
          currentMonth.getFullYear(),
          currentMonthIndex
        );

        const days = [];
        let organiserAvailability = [];
        let dayOverrides = [];

        try {
          const db = admin.firestore();
          const ref = db.collection("calendar").doc("tukuna.patro@gmail.com");
          const doc = await ref.get();

          if (doc.exists) {
            const docData = doc.data();
            organiserAvailability = docData.availability;
            dayOverrides = docData.organiserOverides;
          }
        } catch (e) {
          console.log("Firebase db connection error to calendar collection", e);
        }

        for (
          let dayIndex = currentDayIndex;
          dayIndex <= totalDaysInMonth;
          dayIndex++
        ) {
          const freeSlots = getFreeSlots(
            scheduledEvents,
            currentMonth,
            dayIndex,
            organiserAvailability,
            dayOverrides
          );

          days.push({
            date: new Date(
              currentMonth.getFullYear(),
              currentMonthIndex,
              dayIndex
            ).toDateString(),
            availableSlots: freeSlots,
          });
        }

        return res.status(200).json({ status: 1, data: days });
      })
      .catch(console.error);
  } catch (error) {
    return res.status(500).json({ status: -1, error });
  }
});

app.post("/createEvent", async (req, res) => {
  const { userEmail, eventStartTime, eventEndTime } = req.body;
  try {
    authorize()
      .then(async (auth) => {
        const event = await createEvent(auth, {
          userEmail,
          eventStartTime,
          eventEndTime,
        });
        return res.status(200).json({ status: 1, data: event });
      })
      .catch(console.error);
  } catch (error) {
    return res.status(500).json({ status: -1, error });
  }
});

exports.api = functions.region("asia-south1").https.onRequest(app);
