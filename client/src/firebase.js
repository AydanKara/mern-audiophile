// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-audiophile.firebaseapp.com",
  projectId: "mern-audiophile",
  storageBucket: "mern-audiophile.appspot.com",
  messagingSenderId: "145866504212",
  appId: "1:145866504212:web:4554972ca15aedc4144f01",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
