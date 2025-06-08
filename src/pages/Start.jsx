import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Start.css';

function Start() {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="bg-movie">
      <div className="center">
      <img 
          src="src/assets/ChatGPT Image Jun 6, 2025, 08_21_07 PM.png" 
          alt="CineQuiz Logo" 
          className="logo"
        />
      <h1 className="glowing-text">Welcome to CineQuiz</h1>

        <button onClick={startQuiz}>Start Quiz</button>
      </div>
    </div>
  );
}

export default Start;

