// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuQVq0-us5WEbrNuSlPMOK6nc7KWrpyXc",
  authDomain: "skillrazr.com",
  projectId: "genlent-8aab7",
  storageBucket: "genlent-8aab7.appspot.com",
  messagingSenderId: "295947849840",
  appId: "1:295947849840:web:3994b32b40e3e34cc164b5",
  measurementId: "G-MV8WZQ4TC6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = process.env.REACT_APP_ENV ? getAnalytics(app) : {};
console.log("env", process.env.REACT_APP_ENV);

// Initialize Firebase
const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);

// Create a GoogleAuthProvider instance
const provider = new GoogleAuthProvider();

export { db, auth, provider };
export default analytics;
