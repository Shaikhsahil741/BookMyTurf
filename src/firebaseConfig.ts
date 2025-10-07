// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOZezjqhAuBtQE8GuDxA1WLJU77g4XF20",
  authDomain: "bookmyturf-44e4a.firebaseapp.com",
  databaseURL: "https://bookmyturf-44e4a-default-rtdb.firebaseio.com",
  projectId: "bookmyturf-44e4a",
  storageBucket: "bookmyturf-44e4a.firebasestorage.app",
  messagingSenderId: "818172945733",
  appId: "1:818172945733:web:d656443272277c22820a2c",
  measurementId: "G-86W0F2CKD6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export const analytics = getAnalytics(app); // Export it for use in other files

export { db };
