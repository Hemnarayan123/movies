// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArY_sbVvqvRk7FaKovFjAQ4KrOkyMUJbo",
  authDomain: "flimverse.firebaseapp.com",
  projectId: "flimverse",
  storageBucket: "flimverse.appspot.com",
  messagingSenderId: "897254798855",
  appId: "1:897254798855:web:774f736ac5a5d0e4581ca2",
  measurementId: "G-VWG93FBKYW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export const db = getFirestore(app);
export const movieRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews")

export default app;