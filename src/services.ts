import type { Chapter } from "../src/types/types";

export const getQuizScrore = async (quizId: string, quizSubmission: any) => {
  return await fetch(
    `https://asia-south1-genlent-8aab7.cloudfunctions.net/skillRazr/getQuizScore`,
    {
      headers: {
        "X-Firebase-AppCheck": `appCheckTokenResponse.token`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ quizId, quizSubmission }),
    }
  ).then((resp) => resp.json());
};

export const getQuiz = async (quizId: string) => {
  return await fetch(
    `https://asia-south1-genlent-8aab7.cloudfunctions.net/skillRazr/getQuiz`,
    {
      headers: {
        "X-Firebase-AppCheck": `appCheckTokenResponse.token`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ quizId }),
    }
  ).then((resp) => resp.json());
};

export const getQuizes = async () => {
  return await fetch(
    `https://asia-south1-genlent-8aab7.cloudfunctions.net/skillRazr/getAllQuizes`,
    {
      headers: {
        "X-Firebase-AppCheck": `appCheckTokenResponse.token`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({}),
    }
  ).then((resp) => resp.json());
};

export const getCompletionText = async (
  query: string,
  prompt = "",
  apiKey = ""
) => {
  return await fetch(
    `https://asia-south1-genlent-8aab7.cloudfunctions.net/skillRazr/getCompletionText`,
    {
      headers: {
        "X-Firebase-AppCheck": `appCheckTokenResponse.token`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ query, prompt, apiKey }),
    }
  ).then((resp) => resp.json());
};

export const getScore = (answerObj: any, submissionObj: any) => {
  const totalQuestions = Object.keys(answerObj).length;

  let correctAnswers = 0;
  Object.keys(answerObj).forEach((questionId) => {
    if (answerObj[questionId] === submissionObj[questionId]) {
      correctAnswers++;
    }
  });

  return (correctAnswers / totalQuestions) * 100;
};

export const shuffleArray = (
  array: Array<number> | Array<string>
): Array<number> | Array<string> => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const renderMathExpression = (input: string, id: string) => {
  setTimeout(() => {
    let output: any = document.getElementById(id);
    output.innerHTML = "";

    MathJax.texReset();
    let options = MathJax.getMetricsFor(output);
    options.display = true;
    MathJax.tex2chtmlPromise(input, options)
      .then(function (node: any) {
        output.appendChild(node);
        MathJax.startup.document.clear();
        MathJax.startup.document.updateDocument();
      })
      .catch(function (err: any) {
        output
          .appendChild(document.createElement("pre"))
          .appendChild(document.createTextNode(err.message));
      });
  }, 200);
};

export const getQuizFromString = (quizString: string) => {
  const questionAnswers = quizString.slice(1).split("\n\n");

  const questions = [] as any;
  questionAnswers.forEach((qAStr, index) => {
    const arr = qAStr.split("\n");
    const [question, ...optionWithAnswer] = arr;

    questions.push({
      id: (index + 1).toString(),
      options: optionWithAnswer,
      title: question,
    });
  });

  // return questions;

  return {
    questions,
    title: "",
    id: "",
    description: "",
    answers: {},
  };
};

export const getQuizQuestionsFromString = (quizString: string) => {
  const questionAndAnswers = quizString.slice(1).split("\n  \n");

  const questions = [] as any;
  const answers: any = {};
  questionAndAnswers.forEach((qAStr, index) => {
    const arr = qAStr.split("\n");
    const [question, ...optionWithAnswer] = arr;
    const options = optionWithAnswer.slice(0, -1);
    const answer = optionWithAnswer[optionWithAnswer.length - 1];

    const id = (index + 1).toString();
    answers[id] = answer.replace("answer: ", "");
    questions.push({
      id,
      options,
      title: question,
    });
  });

  return { questions, answers };
};

export const storyGenerator = async (storyPrompt: string, apiKey = "") => {
  // in local dev environment start the function emulator and point the API url to the emulator
  const baseUrl = process.env.REACT_APP_ENV
    ? "https://asia-south1-genlent-8aab7.cloudfunctions.net/skillRazr"
    : "http://127.0.0.1:5001/genlent-8aab7/asia-south1/skillRazr";

  return await fetch(`${baseUrl}/generateStory`, {
    headers: {
      "X-Firebase-AppCheck": `appCheckTokenResponse.token`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ storyPrompt, apiKey }),
  }).then((resp) => resp.json());
};

export const getInternPerformanceData = async (accessToken: string) => {
  const baseUrl = process.env.REACT_APP_ENV
    ? "https://asia-south1-genlent-8aab7.cloudfunctions.net/skillRazrIntern-api/getInternPerfomanceData"
    : "http://127.0.0.1:5001/genlent-8aab7/asia-south1/skillRazrIntern-api/getInternPerfomanceData";

  return await fetch(baseUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      accessToken,
    }),
  }).then((resp) => resp.json());
};

export const getAllInterns = async () => {
  const baseUrl = process.env.REACT_APP_ENV
    ? "https://asia-south1-genlent-8aab7.cloudfunctions.net/skillRazrIntern-api/getAllInterns"
    : "http://127.0.0.1:5001/genlent-8aab7/asia-south1/skillRazrIntern-api/getAllInterns";

  return await fetch(baseUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({}),
  }).then((resp) => resp.json());
};

export const updateToggle = async (
  accessToken: string,
  toggleValue: boolean
) => {
  const baseUrl = process.env.REACT_APP_ENV
    ? "https://asia-south1-genlent-8aab7.cloudfunctions.net/skillRazrIntern-api/updateToggle"
    : "http://127.0.0.1:5001/genlent-8aab7/asia-south1/skillRazrIntern-api/updateToggle";

  return await fetch(baseUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      accessToken,
      toggleValue,
    }),
  }).then((resp) => resp.json());
};

export const getIntern = async (email: string) => {
  const baseUrl = process.env.REACT_APP_ENV
    ? "https://asia-south1-genlent-8aab7.cloudfunctions.net/skillRazrIntern-api/getIntern"
    : "http://localhost:5001/genlent-8aab7/asia-south1/skillRazrIntern-api/getIntern";

  return await fetch(baseUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
    }),
  }).then((resp) => resp.json());
};

export const saveCourse = async (payload: {
  title: string;
  description: string;
  chapters: Chapter[];
  userToken: string;
}) => {
  const baseUrl = process.env.REACT_APP_ENV
    ? "https://asia-south1-genlent-8aab7.cloudfunctions.net/skillRazr/saveCourse"
    : "http://localhost:5001/genlent-8aab7/asia-south1/skillRazr/saveCourse";

  return await fetch(baseUrl, {
    headers: {
      "Content-Type": "application/json",
      "X-Firebase-AppCheck": `appCheckTokenResponse.token`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  }).then((resp) => resp.json());
};

export const getCourses = async (payload: { userToken: string }) => {
  const baseUrl = process.env.REACT_APP_ENV
    ? "https://asia-south1-genlent-8aab7.cloudfunctions.net/skillRazr/getAllCourses"
    : "http://localhost:5001/genlent-8aab7/asia-south1/skillRazr/getAllCourses";

  return await fetch(baseUrl, {
    headers: {
      "Content-Type": "application/json",
      "X-Firebase-AppCheck": `appCheckTokenResponse.token`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  }).then((resp) => resp.json());
};
