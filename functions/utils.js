export const getScore = (answerObj, submissionObj) => {
    const totalQuestions = Object.keys(answerObj).length;

    let correctAnswers = 0;
    Object.keys(answerObj).forEach((questionId) => {
        if (answerObj[questionId] === submissionObj[questionId]) {
            correctAnswers++;
        }
    });

    return (correctAnswers / totalQuestions) * 100;
};