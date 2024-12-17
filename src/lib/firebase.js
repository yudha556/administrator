// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkxZP63ocznoTniA1wsXzidaGcBqd8RWE",
  authDomain: "admin-da119.firebaseapp.com",
  projectId: "admin-da119",
  storageBucket: "admin-da119.firebasestorage.app",
  messagingSenderId: "735781806409",
  appId: "1:735781806409:web:d1eb500a528cf540b13a98",
  measurementId: "G-7323QNC19X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };