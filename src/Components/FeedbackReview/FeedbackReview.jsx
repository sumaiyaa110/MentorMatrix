import React, { useState, useEffect } from 'react';
import './FeedbackReview.css';
import { FaStar } from 'react-icons/fa';

const FeedbackReview = () => {
  const [feedbacks, setFeedbacks] = useState([]); // Holds feedback data
  const [loading, setLoading] = useState(true); // Indicates loading state
  const [error, setError] = useState(null); // Tracks any errors

  // Fetch feedback from backend
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/feedback'); // API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch feedback data');
        }
        const data = await response.json();
        setFeedbacks(data); // Update state with fetched data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchFeedbacks();
  }, []);

  // Render loading state
  if (loading) {
    return <div className="feedback-review-container">Loading feedbacks...</div>;
  }

  // Render error state
  if (error) {
    return <div className="feedback-review-container">Error: {error}</div>;
  }

  // Render feedback list
  return (
    <div className="feedback-review-container">
      <h2 className="feedback-heading">Feedback Reviews</h2>
      {feedbacks.length === 0 ? (
        <p>No feedbacks available.</p>
      ) : (
        <div className="feedback-list">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="feedback-card">
              <div className="feedback-header">
                <h3 className="mentee-name">{feedback.mentor}</h3>
                <div className="rating">
                  {[...Array(feedback.rating)].map((_, i) => (
                    <FaStar key={i} color="#f39c12" />
                  ))}
                </div>
              </div>
              <p className="feedback-comment">"{feedback.comment}"</p>
              <p className="feedback-date">
                {new Date(feedback.date || Date.now()).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackReview;
