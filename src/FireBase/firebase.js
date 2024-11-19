// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVRr7eq9YOUghAGDgUwV57GtaWyNff388",
  authDomain: "fir-1-3f6df.firebaseapp.com",
  databaseURL: "https://fir-1-3f6df-default-rtdb.firebaseio.com",
  projectId: "fir-1-3f6df",
  storageBucket: "fir-1-3f6df.appspot.com",
  messagingSenderId: "1094341646587",
  appId: "1:1094341646587:web:16087628144d605634785e",
  measurementId: "G-Y0N32H33Y3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const database = getFirestore(app);
