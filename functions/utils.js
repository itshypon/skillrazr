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

const getMonthName = (index) => {
  return [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][index];
};

module.exports = {
  getScore,
  getMonthName,
};
