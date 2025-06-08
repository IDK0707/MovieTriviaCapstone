import React, { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';
import Timer from './Timer';

function Quiz() {
  const { score, setScore, questions, setQuestions } = useContext(QuizContext);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://the-trivia-api.com/api/questions?limit=5')
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(q => {
          const allOptions = [...q.incorrectAnswers];
          const correct = q.correctAnswer;
          allOptions.splice(Math.floor(Math.random() * (allOptions.length + 1)), 0, correct);
          return {
            question: q.question,
            options: allOptions.map(opt => ({
              text: opt,
              isCorrect: opt === correct
            }))
          };
        });
        setQuestions(formatted);
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  // Handler for timer completion
  const handleTimeUp = () => {
    navigate('/result');
  };

  // Handler for Back button
  const handleBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelectedOption(null);
    }
  };

  // Handler for selecting an option
  const handleSelectOption = (idx) => {
    setSelectedOption(idx);
  };

  // Handler for Next button
  const handleNext = () => {
    if (selectedOption !== null && questions[current].options[selectedOption].isCorrect) {
      setScore(score + 1);
    }
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
      setSelectedOption(null);
    } else {
      navigate('/result');
    }
  };

  if (loading) return <p>Loading questions...</p>;

  return (
    <>
      <Timer initialTime={300} onComplete={handleTimeUp} />
      <div className="center-screen">
        <div className="quiz">
          <div className="question-box">
            {questions[current].question}
          </div>
          <div className="options">
            {questions[current].options.map((opt, idx) => (
              <button
                key={idx}
                className={selectedOption === idx ? "option-selected" : ""}
                onClick={() => handleSelectOption(idx)}
                disabled={selectedOption !== null}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Back Button fixed at bottom left */}
      <button
        className="back-btn-fixed"
        onClick={handleBack}
        disabled={current === 0}
      >
        &#8592; Back
      </button>
      {/* Next Button fixed at bottom right */}
      <button
        className="next-btn-fixed"
        onClick={handleNext}
        disabled={selectedOption === null}
      >
        {current === questions.length - 1 ? 'Finish' : 'Next'} &#8594;
      </button>
    </>
  );
}

export default Quiz;






