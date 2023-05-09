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
    return res.status(200).json({ status: -1, error });
  }
});

app.post("/getAllInterns", async (req, res) => {
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
    return res.status(200).json({ status: -1, error });
  }
});

app.post("/updateInternAttendance", async (req, res) => {
  console.log("api start", env.INTERN_API_HEADER_KEY_VALUE);

  if (req.header("skillrazr-sub-app") !== env.INTERN_API_HEADER_KEY_VALUE) {
    return res.status(401).json({ status: 0, error: "you are not authorised" });
  }

  try {
    const { users } = JSON.parse(req.body);
    const db = admin.firestore();

    const updateBatch = db.batch();

    console.log("api body", users, req.body);

    users.forEach((docId) => {
      const docRef = db.collection("interns").doc(docId);
      console.log("docRef", docRef);
      updateBatch.update(docRef, { absent: true });
    });

    const result = await updateBatch.commit();
    console.log("result from batch", result);
    res.status(200).json({ status: 1, data: result });
  } catch (error) {
    res.status(200).json({ status: 0, error });
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
