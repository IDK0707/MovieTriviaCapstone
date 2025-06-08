import React, { useEffect, useRef, useState } from 'react';

const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const Timer = ({ initialTime = 300, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          onComplete && onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [onComplete]);

  // Color logic
  let color = '#20c933'; // green
  if (timeLeft < 60) color = '#e53935'; // red
  else if (timeLeft < 240) color = '#ffb300'; // yellow

  return (
    <div
      className="timer"
      style={{
        color,
        position: 'fixed',
        top: 32,
        right: 40,
        fontWeight: 'bold',
        fontSize: '2rem',
        background: 'rgba(0,0,0,0.7)',
        padding: '12px 28px',
        borderRadius: '12px',
        zIndex: 1000,
        boxShadow: `0 0 16px ${color}66`
      }}
    >
      {formatTime(timeLeft)}
    </div>
  );
};

export default Timer;
