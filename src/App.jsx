// src/App.jsx

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // 👈 ensure this is set up
import LoginPage from "./pages/LoginPage";
import Quiz from "./pages/Quiz";
import Start from "./pages/Start";
import Result from "./pages/Result";
import { QuizProvider } from "./context/QuizContext";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (checkingAuth) return <div>Checking auth...</div>;

  if (!user) {
    console.warn("🔒 User not authenticated. Redirecting to login.");
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <QuizProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/start" element={<Start />} />
          <Route path="/result" element={<Result />} />
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </QuizProvider>
  );
}

export default App;





