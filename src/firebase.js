// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Optional: import analytics if you use it
import { getAnalytics } from "firebase/analytics";

// ✅ Your Firebase config (already correct)
const firebaseConfig = {
  apiKey: "AIzaSyD8meEg6zSVt_e8PSaNQ4RVURkaM1BJLwU",
  authDomain: "triviaapp-170d3.firebaseapp.com",
  projectId: "triviaapp-170d3",
  storageBucket: "triviaapp-170d3.firebasestorage.app",
  messagingSenderId: "1033591928972",
  appId: "1:1033591928972:web:9150f52cc8d6131e17a3a9",
  measurementId: "G-T2EDPJXGKZ"
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth
export const auth = getAuth(app);

// (Optional) Initialize Analytics
getAnalytics(app);
