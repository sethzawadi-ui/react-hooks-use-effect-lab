import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeLeft, setTimeLeft] = useState(10);
  const [timeoutId, setTimeoutId] = useState(null);

  // countdown effect
  useEffect(() => {
    if (timeLeft > 0) {
      const id = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      setTimeoutId(id);
    } else {
      // When timer hits 0, call onAnswered(false)
      onAnswered(false);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeLeft]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  return (
    <div className="question">
      <h2>{question.prompt}</h2>
      <p>{timeLeft} seconds remaining</p>
      <ul>
        {question.answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
    </div>
  );
}

export default Question;
