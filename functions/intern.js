const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const env = require("./.env.json");
const { getMonthName } = require("./utils");

const app = express();
app.use(cors());
app.get("/", (req, res) => res.status(200).send("hi intern!"));

app.post("/addIntern", async (req, res) => {
  const { name, email, mobileNo, joinDate, github, linkedin, notes } = req.body;

  if (req.header("skillrazr-sub-app") !== env.INTERN_API_HEADER_KEY_VALUE) {
    return res.status(401).json({ status: 0, error: "you are not authorised" });
  }

  try {
    const db = admin.firestore();
    const ref = db.collection("interns").doc(email);
    const doc = await ref.get();

    if (doc.exists) {
      return res
        .status(200)
        .json({ status: 0, message: "Can't add, intern exists already!" });
    }

    const dateObj = new Date(joinDate);

    // 3 months internship, Jan-Mar, Apr-Jun, July-Sep, Oct-Dec
    const month1Year = `${getMonthName(
      dateObj.getMonth()
    )}_${dateObj.getFullYear()}`;
    const month2Year = `${getMonthName(
      dateObj.getMonth() + 1
    )}_${dateObj.getFullYear()}`;
    const month3Year = `${getMonthName(
      dateObj.getMonth() + 2
    )}_${dateObj.getFullYear()}`;

    const result = db
      .collection("interns")
      .doc(email)
      .set({
        name,
        email,
        notes,
        joinDate,
        github,
        linkedin,
        mobileNo,
        performanceData: {
          [month1Year]: {},
          [month2Year]: {},
          [month3Year]: {},
        },
      });

    return res.status(200).json({ status: 1, data: result });
  } catch (error) {
    return res.status(409).json({ status: -1, error });
  }
});

app.post("/getAllInterns", async (req, res) => {
  try {
    const db = admin.firestore();

    const interns = [];
    const internsRef = db.collection("interns");
    const snapshot = await internsRef.get();

    snapshot.forEach((doc) => {
      const { performanceData, ...rest } = doc.data();

      interns.push({ ...rest });
    });

    return res.status(200).json({ status: 1, data: interns });
  } catch (error) {
    return res.status(500).json({ status: -1, error });
  }
});

app.post("/updateInternsAttendance", async (req, res) => {
  if (req.header("skillrazr-sub-app") !== env.INTERN_API_HEADER_KEY_VALUE) {
    return res.status(401).json({ status: 0, error: "you are not authorised" });
  }

  try {
    const { date, docIds } = req.body;
    const db = admin.firestore();

    const dateObj = new Date(date);
    // ToDo - add validation to allow updates only from a date from the internship duration

    const monthYear = `${getMonthName(
      dateObj.getMonth()
    )}_${dateObj.getFullYear()}`;

    const updateBatch = db.batch();

    for (let docId of docIds) {
      let docRef = db.collection("interns").doc(docId);
      const doc = await docRef.get();
      const performanceData = doc.data().performanceData;

      if (!performanceData[monthYear]) {
        performanceData[monthYear] = {};
      }

      const absentArray = performanceData[monthYear].absentDays || [];
      performanceData[monthYear].absentDays = [...absentArray, date];
      updateBatch.update(docRef, { performanceData });
    }

    const result = await updateBatch.commit();
    res.status(200).json({ status: 1, data: result });
  } catch (error) {
    console.log("error", error);
    res.status(409).json({ status: -1, error });
  }
});

app.post("/updateInternNotes", async (req, res) => {
  if (req.header("skillrazr-sub-app") !== env.INTERN_API_HEADER_KEY_VALUE) {
    return res.status(401).json({ status: 0, error: "you are not authorised" });
  }

  const db = admin.firestore();
  const { date, note, docId } = req.body;

  try {
    const dateObj = new Date(date);

    const monthYear = `${getMonthName(
      dateObj.getMonth()
    )}_${dateObj.getFullYear()}`;

    const internRef = db.collection("interns").doc(docId);
    const internDoc = await internRef.get();
    const performanceData = internDoc.data().performanceData;

    if (!performanceData[monthYear]) {
      performanceData[monthYear] = {};
    }
    const notes = performanceData[monthYear].notes || [];
    notes.push({ ...note, date });

    performanceData[monthYear].notes = notes;

    await internRef.update({ performanceData });
    res.status(200).json({ status: 1, data: performanceData });
  } catch (error) {
    return res.status(500).json({ status: -1, error });
  }
});

app.post("/getInternPerfomanceData", async (req, res) => {
  const { userToken } = req.body;

  const db = admin.firestore();

  try {
    const data = await admin.auth().verifyIdToken(userToken);
    const email = data.email;
    const internsRef = db.collection("interns").doc(email);
    const doc = await internsRef.get();

    if (doc.exists) {
      return res.status(200).json({ status: 1, data: doc.data() });
    } else {
      return res
        .status(200)
        .json({ status: 0, message: "no such user exists!" });
    }
  } catch (error) {
    return res.status(200).json({ status: -1, error });
  }
});

exports.api = functions.region("asia-south1").https.onRequest(app);
