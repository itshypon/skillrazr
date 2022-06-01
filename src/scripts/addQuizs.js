const admin = require('firebase-admin');
const serviceAccount = require('../../../../Downloads/genlent-8aab7-firebase-adminsdk-tfyyv-28a722171e.json');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


const insertToQuizDb = async (quiz) => {
    await db
        .collection('quiz')
        .doc('mathtest1')
        .set({
            ...quiz
        });


    console.log('*** All records uploaded! ***',);
};

const quiz = {
    "_id": "6295de3788bf864dab39f2d0",
    "questions": [
        {
            "options": [
                "3375",
                "5",
                "45",
                "1"
            ],
            "title": "\\sqrt[3]{x} = 15  ",
            "description": "Cube root ",
            "id": "1",
            "type": "math"
        },
        {
            "options": [
                "5",
                "25",
                "1",
                "10"
            ],
            "title": "\\sqrt[2]{x} = 5 ",
            "description": "find the value of x",
            "id": "2",
            "type": "math"
        },
        {
            "options": [
                "4",
                "2",
                "8",
                "256"
            ],
            "title": "\\sqrt[2]{x} = 16",
            "description": "then find the value of x",
            "id": "3",
            "type": "math"
        },
        {
            "options": [
                "1",
                "2",
                "3",
                "5"
            ],
            "title": "x^{2} + y ^ 2 + 2xy = 25 => x+y = ?",
            "description": "Which one of the following is the correct value?",
            "id": "4",
            "type": "math"
        },
        {
            "options": [
                "5",
                "-5",
                "1",
                "5,-5"
            ],
            "title": "x^{2} + x ^ 2  = 50 => x = ?",
            "description": "Find the value of x",
            "id": "5",
            "type": "math"
        }
    ],
    "title": "Math test",
    "description": "Some algebra",
    "createdAt": 1653988522148,
    "status": "unpublished",
    "createdBy": "tukuna patro",
    "organisation": "smera",
    "id": "6295de3788bf864dab39f2d0",
    "updatedAt": 1653991255499,
    "updatedBy": null
};
insertToQuizDb(quiz);
