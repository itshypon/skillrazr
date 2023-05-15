const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const env = require("./.env.json");

const app = express();
app.use(cors());
app.get("/", (req, res) => res.status(200).send("hi intern!"));

app.post("/addIntern", async (req, res) => {
  const { name, email, mobileNo, joinDate, github, notes } = req.body;

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

    const result = db.collection("interns").doc(email).set({
      name,
      email,
      notes,
      joinDate,
      github,
      mobileNo,
    });

    return res.status(200).json({ status: 1, data: result });
  } catch (error) {
    return res.status(409).json({ status: -1, error });
  }
});

app.post("/getAllInterns", async (req, res) => {
  if (req.header("skillrazr-sub-app") !== env.INTERN_API_HEADER_KEY_VALUE) {
    return res.status(401).json({ status: 0, error: "you are not authorised" });
  }

  try {
    const db = admin.firestore();

    const interns = [];
    const internsRef = db.collection("interns");
    const snapshot = await internsRef.get();

    snapshot.forEach((doc) => {
      interns.push(doc.data());
    });

    return res.status(200).json({ status: 1, data: interns });
  } catch (error) {
    return res.status(500).json({ status: -1, error });
  }
});

app.post("/updateInternAttendance", async (req, res) => {
  console.log("api start", env.INTERN_API_HEADER_KEY_VALUE);

  if (req.header("skillrazr-sub-app") !== env.INTERN_API_HEADER_KEY_VALUE) {
    return res.status(401).json({ status: 0, error: "you are not authorised" });
  }

  try {
    const { checkBoxValues } = JSON.parse(req.body);
    const db = admin.firestore();

    const now = Date.now();
    const internsRef = db.collection("interns");
    const internsQuery = await internsRef.get();
    const updateBatch = db.batch();

    internsQuery.docs.forEach((doc, index) => {
      const isChecked = checkBoxValues[index]
      const absentArray = doc.data().absent || [];
      if (!isChecked) {
        absentArray.push(now)
      }
      updateBatch.update(doc.ref, { absent: absentArray });
    });
    const result = await updateBatch.commit();
    res.status(200).json({ status: 1, data: result });
  } catch (error) {
    res.status(409).json({ status: 0, error });
  }
});

app.post("/saveNote", async (req, res) => {
  if (req.header("skillrazr-sub-app") !== env.INTERN_API_HEADER_KEY_VALUE) {
    return res.status(401).json({ status: 0, error: "you are not authorised" });
  }

  const db = admin.firestore();
  const { type, notes, email } = req.body;

  try {
    const internRef = db.collection("interns").doc(email);
    const internDoc = await internRef.get()
    const notesArray = internDoc.data().notes || []
    const updateNotes = {
      type: type,
      text: notes,
    }
    notesArray.push(updateNotes)
    await internRef.update({ notes: notesArray})
  } catch (error) {
    return res.status(500).json({ status: -1, error });
  }
});

app.post("/getNotes", async (req, res) => {
  if (req.header("skillrazr-sub-app") !== env.INTERN_API_HEADER_KEY_VALUE) {
    return res.status(401).json({ status: 0, error: "you are not authorised" });
  }

  const db = admin.firestore();
  const { id } = req.body

  try {
      const internRef = db.collection("interns").doc(id)
      const internDoc = await internRef.get()
      const recentNotesArray = internDoc.data().notes
      res.status(200).json({ status: 1, data: recentNotesArray });
    }
    catch (error) {
    return res.status(500).json({ status: -1, error });
  }
});

app.post("/removeIntern", async (req, res) => {
  if (req.header("skillrazr-sub-app") !== env.INTERN_API_HEADER_KEY_VALUE) {
    return res.status(401).json({ status: 0, error: "you are not authorised" });
  }

  const db = admin.firestore();
  const { id } = req.body;

  try {
      const internDocRef = db.collection("interns").doc(id)
      deleteDoc(internDocRef)
      res.status(200).json({ status: 1 });
    }
    catch (error) {
    return res.status(404).json({ status: -1, error });
  }
});

exports.api = functions.region("asia-south1").https.onRequest(app);
