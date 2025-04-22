const form = document.getElementById('form')
const firstname_input = document.getElementById('firstname-input')
const username_input = document.getElementById('username-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')
const error_message = document.getElementById('error-message')

form.addEventListener('submit', (e) => {
  let errors = []

  if(firstname_input){
    // If we have a firstname input then we are in the signup
    errors = getSignupFormErrors(firstname_input.value, username_input.value, password_input.value, repeat_password_input.value)
  }
  else{
    // If we don't have a firstname input then we are in the login
    errors = getLoginFormErrors(username_input.value, password_input.value)
  }

  if(errors.length > 0){
    // If there are any errors
    e.preventDefault()
    error_message.innerText  = errors.join(". ")
  }
})

function getSignupFormErrors(firstname, email, password, repeatPassword){
  let errors = []

  if(firstname === '' || firstname == null){
    errors.push('Firstname is required')
    firstname_input.parentElement.classList.add('incorrect')
  }
  if(email === '' || email == null){
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if(password === '' || password == null){
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }
  if(password.length < 8){
    errors.push('Password must have at least 8 characters')
    password_input.parentElement.classList.add('incorrect')
  }
  if(password !== repeatPassword){
    errors.push('Password does not match repeated password')
    password_input.parentElement.classList.add('incorrect')
    repeat_password_input.parentElement.classList.add('incorrect')
  }


  return errors;
}

function getLoginFormErrors(username, password){
  let errors = []

  if(username === '' || email == null){
    errors.push('Username is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if(password === '' || password == null){
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }

  return errors;
}

const allInputs = [firstname_input, username_input, password_input, repeat_password_input].filter(input => input != null)

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if(input.parentElement.classList.contains('incorrect')){
      input.parentElement.classList.remove('incorrect')
      error_message.innerText = ''
    }
  })
})

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"
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


const signUp=document.getElementById('LogInBtn');
signUp.addEventListener('click', (event) => {
  preventDefault()
  const username = document.getElementById('username-input').value;
  const password = document.getElementById('password-input').value;

  const auth = getAuth();
  const db=getFirestore();

  createUserWithEmailAndPassword(auth, username, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user
    const userdata={
      username: username,
      password: password
      
    }
    const docRef = doc(db, "users", user.uid);
    setDoc(docRef, userdata) 
    .then(() => {
      window.location.href = "index.html";

    })

    .catch((error) => {
      console.error("Error writing document: ", error);
    });

    
  })
})