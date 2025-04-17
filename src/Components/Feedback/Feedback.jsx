import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Feedback.css';
import { FaStar } from 'react-icons/fa';
import feedbackImage from '../../assets/customer-rating.png'; // Update the path to your PNG image

const Feedback = () => {
  const [mentor, setMentor] = useState('');
  const [session, setSession] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

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
        setShowPopup(true);

        // Hide the popup and redirect after a delay
        setTimeout(() => {
          setShowPopup(false);
          navigate('/dashboard/mentee'); // Replace with the actual path to the mentee's dashboard
        }, 3000); // 3-second delay
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
      {showPopup && (
        <div className="popup-notification">
          <p>Feedback submitted successfully!</p>
        </div>
      )}
    </div>
  );
};

export default Feedback;
