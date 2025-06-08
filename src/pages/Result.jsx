import React, { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import './Result.css';

function Result() {
  const { score, questions, setScore } = useContext(QuizContext);
  const [bestScore, setBestScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the best score from localStorage or default to 0
    const storedBest = parseInt(localStorage.getItem('bestScore') || '0', 10);

    // If current score is better, update localStorage
    if (score > storedBest) {
      localStorage.setItem('bestScore', score);
      setBestScore(score);
    } else {
      setBestScore(storedBest);
    }
  }, [score]);

  const restart = () => {
    setScore(0);
    navigate('/');
  };

  return (
    <div className="result-center-container">
      <div className="result">
        <h2>Quiz Finished!</h2>
        <p>Your Score: {score} / {questions.length}</p>
        <p className="best-score">Best Score: {bestScore} / {questions.length}</p>
        <button onClick={restart}>Play Again</button>
      </div>
    </div>
  );
}

export default Result;

