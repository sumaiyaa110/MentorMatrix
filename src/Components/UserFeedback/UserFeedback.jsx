import React, { useState } from 'react';
import './UserFeedback.css'; // Ensure proper styling

const UserFeedback = () => {
  const [feedback, setFeedback] = useState([
    { id: 1, user: 'John Doe', feedback: 'Great mentor!' },
    { id: 2, user: 'Jane Smith', feedback: 'Needs to improve communication.' },
    // Add more feedbacks here
  ]);

  const handleFeedback = (id) => {
    // Handle feedback removal or moderation
    setFeedback(feedback.filter((item) => item.id !== id));
  };

  return (
    <div className="user-feedback">
      <h3>User Feedback</h3>
      <ul>
        {feedback.map((item) => (
          <li key={item.id}>
            <p>{item.user}</p>
            <p>{item.feedback}</p>
            <button onClick={() => handleFeedback(item.id)} className="action-btn">
              Remove Feedback
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserFeedback;
