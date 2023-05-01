const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const getScore = (answerObj, submissionObj) => {
  const totalQuestions = Object.keys(answerObj).length;

  let correctAnswers = 0;
  Object.keys(answerObj).forEach((questionId) => {
    if (answerObj[questionId] === submissionObj[questionId]) {
      correctAnswers++;
    }
  });

  return (correctAnswers / totalQuestions) * 100;
};

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: functions.config().skillrazrdb.project_id,
    privateKey: functions
      .config()
      .skillrazrdb.private_key.replace(/\\n/g, "\n"),
    clientEmail: functions.config().skillrazrdb.client_email,
  }),
});

const db = admin.firestore();
const app = express();

const whitelist = ["https://skillrazr.com", "https://skillrazr.web.app"];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

const appCheckVerification = async (req, res, next) => {
  const appCheckToken = req.header("X-Firebase-AppCheck");

  if (!appCheckToken) {
    // res.status(401);
    res.status(200).json({ status: 0 });
    return next("successfull");
  }

  try {
    // await firebaseAdmin.appCheck().verifyToken(appCheckToken);
    if (appCheckToken === `appCheckTokenResponse.token`) return next();
  } catch (err) {
    res.status(401);
    return next("Unauthorized");
  }
};

app.get("/", (req, res) => res.status(200).send("hi!"));
app.get("/test", (req, res) => res.status(200).send("hi test!"));

app.post("/getAllQuizes", [appCheckVerification], async (req, res) => {
  try {
    const quizes = [];
    const quizRef = db.collection("quiz");
    const snapshot = await quizRef.get();

    snapshot.forEach((doc) => {
      const { answers, ...rest } = doc.data();
      quizes.push(rest);
    });

    return res.status(200).json({ status: 1, data: quizes });
  } catch (error) {
    return res.status(200).json({ status: -1, error });
  }
});

app.post("/getQuiz", [appCheckVerification], async (req, res) => {
  const { quizId } = req.body;
  try {
    const ref = db.collection("quiz").doc(quizId);

    const doc = await ref.get();
    if (!doc.exists) {
      return res.status(200).json({ status: 0 });
    }
    const { answers, ...rest } = doc.data();
    return res.status(200).json({ status: 1, data: rest });
  } catch (error) {
    return res.status(200).json({ status: -1, error });
  }
});

app.post("/getQuizScore", [appCheckVerification], async (req, res) => {
  const { quizId, quizSubmission } = req.body;
  try {
    const ref = db.collection("quiz").doc(quizId);

    const doc = await ref.get();
    if (!doc.exists) {
      return res
        .status(200)
        .json({ status: 0, message: "No quiz with given id found!" });
    }
    const { answers, ...rest } = doc.data();
    const score = getScore(answers, quizSubmission);
    return res.status(200).json({ status: 1, data: { score } });
  } catch (error) {
    return res.status(200).json({ status: -1, error });
  }
});

function generatePrompt(query, prompt) {
  const cssPrompt = `
  Which of the followings is the default value of CSS position property?
  static
  relative
  absolute
  fixed
  answer: static
  `;

  const jsPrompt = `
  Which of the following expression evaluates to true?
  undefinded === null 
  '3' === 3 
  3 + f == NaN
  0.1 + 0.2 == 0.3
  answer: 3 + f == NaN
  `;

  return `${query} ${prompt ? jsPrompt : cssPrompt}`;
}

app.post("/getCompletionText", [appCheckVerification], async (req, res) => {
  const { query, prompt = "", apiKey } = req.body;
  try {
    const configuration = new Configuration({
      apiKey: apiKey || "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",
    });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      temperature: 0.7,
      max_tokens: 2000,
      prompt: generatePrompt(query, prompt),
    });

    const result = completion.data.choices[0].text;

    if (!result) {
      return res.status(200).json({
        status: 0,
        message: "No completion data found using chat openai api!",
      });
    }

    return res.status(200).json({ status: 1, data: result });
  } catch (error) {
    return res.status(200).json({ status: -1, error });
  }
});

exports.skillRazr = functions.region("asia-south1").https.onRequest(app);
exports.skillRazrIntern = require("./intern");
