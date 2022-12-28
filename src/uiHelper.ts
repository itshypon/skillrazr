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

  console.log("all qas", questionAnswers);

  const questions = [] as any;
  questionAnswers.forEach((qAStr, index) => {
    const arr = qAStr.split("\n");
    console.log("arr", arr);
    const [question, ...optionWithAnswer] = arr;
    console.log("question", question);
    console.log("options", optionWithAnswer.slice(0, -1));
    // console.log("answer", optionWithAnswer[optionWithAnswer.length - 1]);
    // const answer = optionWithAnswer[optionWithAnswer.length - 1];

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
