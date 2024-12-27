// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDesLUu_IC80jq553GBYF-e1R4Wvf2ShwQ",
  authDomain: "react-practice-mern.firebaseapp.com",
  projectId: "react-practice-mern",
  storageBucket: "react-practice-mern.firebasestorage.app",
  messagingSenderId: "671333093417",
  appId: "1:671333093417:web:32563000b3e40fc2d1cc38",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
