// Import the functions you need from the SDKs you need
import { auth, db } from './Test css/firebaseconfig.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Inputs
const submit = document.getElementById("LogInBtn");
const form = document.getElementById("form");
const errorMessage = document.getElementById("error-message");

// Add event listener to the submit button
submit.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    
    const passwordValue = document.getElementById("password-input").value;
    const usernameValue = document.getElementById("username-input").value;

    // Clear any previous error message
    

    // Use Firebase Authentication to create a new user
    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: emailValue,
                username: usernameValue,
            };
            const docRef = doc(db, "users", user.uid);
            
            setDoc(docRef, userData)
                .then(() => {
                    console.log("User data saved to Firestore:", userData);
                    alert("User registered successfully!");
                    window.location.href = "./login.html";
                })
                .catch((error) => {
                    console.error("Error saving user data to Firestore:", error.message);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/email-already-in-use") {
                errorMessage.style.display = "block";
                errorMessage.textContent = "Error: Email already in use";
            } else if (errorCode === "auth/invalid-email") {
                errorMessage.style.display = "block";
                errorMessage.textContent = "Error: Invalid email address";
            } else if (errorCode === "auth/weak-password") {
                errorMessage.style.display = "block";
                errorMessage.textContent = "Error: Weak password";
            } else if (errorCode === "auth/operation-not-allowed") {
                errorMessage.style.display = "block";
                errorMessage.textContent = "Error: " + error.message;
            } else {
                window.location.href = "message.html";
            }
        });

        // Add this code to the existing register.js file, after the existing code

    // Login functionality
    const form = document.getElementById("form");
    const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const usernameValue = document.getElementById("username-input").value;
        const passwordValue = document.getElementById("password-input").value;
        
        // Simple validation (replace with actual authentication logic if needed)
        try {
            // Add actual Firebase login
            const userCredential = await.signInWithEmailAndPassword(auth, username, password);
            console.log("User logged in:", userCredential.user);
            window.location.href = "message.html";
        } catch (error) {
            errorMessage.textContent = `Login failed: ${error.message}`;
            errorMessage.style.display = "block";
        }
    });
});
