// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAY2IBRqimrEed70hMjSIwDavSSXqXVk7A",
  authDomain: "chaching-mvp.firebaseapp.com",
  projectId: "chaching-mvp",
  storageBucket: "chaching-mvp.firebasestorage.app",
  messagingSenderId: "468576142482",
  appId: "1:468576142482:web:8fb1a410ae3199fa14924b",
  measurementId: "G-LF9L62EHFR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;