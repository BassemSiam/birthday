// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBssWQeqGu_K4K68Ms4zecZcgPjavBrEF8",
  authDomain: "birthday-7c582.firebaseapp.com",
  projectId: "birthday-7c582",
  storageBucket: "birthday-7c582.firebasestorage.app",
  messagingSenderId: "700601947228",
  appId: "1:700601947228:web:5cc5f17959e4a0e03f4299",
  measurementId: "G-LEW54F6DQK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

logEvent(analytics, 'test_event', {
    message: 'Hello from analytics'
});
export default analytics;