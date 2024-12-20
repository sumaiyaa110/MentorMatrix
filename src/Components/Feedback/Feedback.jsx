import React, { useState } from 'react';
import './Feedback.css';
import { FaStar } from 'react-icons/fa';
import feedbackImage from '../../assets/customer-rating.png'; // Update the path to your PNG image

const Feedback = () => {
  const [mentor, setMentor] = useState('');
  const [session, setSession] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedback = { mentor, session, rating, comment };

    try {
      const response = await fetch('http://localhost:8080/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
      });

      if (response.ok) {
        console.log('Feedback Submitted:', feedback);
        setMentor('');
        setSession('');
        setRating(0);
        setComment('');
        setSubmitted(true);
      } else {
        console.error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="feedback-container">
      <h2>Give Feedback</h2>
      <div className="feedback-content">
        <img src={feedbackImage} alt="Feedback" className="feedback-image" />
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="mentor">Mentor</label>
            <input
              type="text"
              id="mentor"
              value={mentor}
              onChange={(e) => setMentor(e.target.value)}
              placeholder="Enter mentor's name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="session">Session</label>
            <input
              type="text"
              id="session"
              value={session}
              onChange={(e) => setSession(e.target.value)}
              placeholder="Enter session topic"
              required
            />
          </div>
          <div className="form-group rating-group">
            <label>Rating</label>
            <div className="rating-stars">
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <FaStar
                    key={index}
                    size={30}
                    color={index <= rating ? '#ffc107' : '#e4e5e9'}
                    onClick={() => setRating(index)}
                    className="star"
                  />
                );
              })}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your feedback"
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Submit Feedback
          </button>
        </form>
      </div>
      {submitted && <p className="success-message">Feedback submitted successfully!</p>}
    </div>
  );
};

export default Feedback;
