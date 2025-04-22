// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/apphttps://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdP9V9PGB-40dDinsCM-UJPJ3cg0FznZY",
  authDomain: "gymmetry.firebaseapp.com",
  projectId: "gymmetry",
  storageBucket: "gymmetry.firebasestorage.app",
  messagingSenderId: "61726249311",
  appId: "1:61726249311:web:0740aa3853357571fb66ea",
  measurementId: "G-859RMBPWR7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default firebaseConfig;
export { app, analytics };

const signUp=document.getElementById()