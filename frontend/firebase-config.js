// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGXA6Ay3SLsZL7-cEZcAX6f1rFugxyKkw",
  authDomain: "shorten-83298.firebaseapp.com",
  projectId: "shorten-83298",
  storageBucket: "shorten-83298.firebasestorage.app",
  messagingSenderId: "537461356827",
  appId: "1:537461356827:web:ffdd15345e15cf8b8fbbbe",
  measurementId: "G-VQZTVL8M85",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
