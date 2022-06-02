export const getQuizScrore = async (quizId: string, quizSubmission: any) => {
    return await fetch(
        `https://asia-south1-genlent-8aab7.cloudfunctions.net/skillRazr/getQuizScore`,
        {
            headers: {
                'X-Firebase-AppCheck': `appCheckTokenResponse.token`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ quizId, quizSubmission })
        }
    ).then((resp) => resp.json());
}

export const getQuiz = async (quizId: string) => {
    return await fetch(
        `https://asia-south1-genlent-8aab7.cloudfunctions.net/skillRazr/getQuiz`,
        {
            headers: {
                'X-Firebase-AppCheck': `appCheckTokenResponse.token`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ quizId })
        }
    ).then((resp) => resp.json());
}

export const getQuizes = async () => {
    return await fetch(
        `https://asia-south1-genlent-8aab7.cloudfunctions.net/skillRazr/getAllQuizes`,
        {
            headers: {
                'X-Firebase-AppCheck': `appCheckTokenResponse.token`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({})
        }
    ).then((resp) => resp.json());
}
