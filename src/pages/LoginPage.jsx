// src/pages/LoginPage.jsx

import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("✅ User signed up:", userCredential.user);
        alert("Signup successful!");
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("✅ User logged in:", userCredential.user);
        alert("Login successful!");
        navigate("/start"); // ✅ Move to Start only after login
      }
    } catch (err) {
      console.error("❌ Auth error:", err.message);
      setError("Authentication failed. Please check credentials or try again.");
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setError("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>

        {error && <p className="login-note" style={{ color: "red" }}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="login-form-buttons">
          <button type="submit" className="login-button">
            {isSignup ? "Sign Up" : "Login"}
          </button>
          <button type="button" className="signup-button" onClick={toggleMode}>
            {isSignup ? "Switch to Login" : "Switch to Sign Up"}
          </button>
        </div>

        <p className="login-note">
          {isSignup
            ? "Already have an account? Switch to login."
            : "Don't have an account? Switch to sign up."}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
















