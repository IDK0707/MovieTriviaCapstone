// src/context/QuizContext.jsx
import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);

  return (
    <QuizContext.Provider value={{ score, setScore, questions, setQuestions }}>
      {children}
    </QuizContext.Provider>
  );
};
