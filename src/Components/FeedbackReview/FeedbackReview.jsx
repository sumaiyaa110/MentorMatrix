import React, { useState, useEffect } from 'react';
import './FeedbackReview.css';
import { FaStar } from 'react-icons/fa';

const FeedbackReview = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/feedback');
        if (!response.ok) {
          throw new Error('Failed to fetch feedback data');
        }
        const data = await response.json();
        setFeedbacks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const filteredFeedbacks = feedbacks
    .filter(
      (feedback) =>
        feedback.mentor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feedback.session.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'newest') return new Date(b.date) - new Date(a.date);
      if (sortOption === 'oldest') return new Date(a.date) - new Date(b.date);
      if (sortOption === 'highest') return b.rating - a.rating;
      if (sortOption === 'lowest') return a.rating - b.rating;
      return 0;
    });

  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);
  const displayedFeedbacks = filteredFeedbacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) {
    return <div className="feedback-review-container">Loading feedbacks...</div>;
  }

  if (error) {
    return <div className="feedback-review-container">Error: {error}</div>;
  }

  return (
    <div className="feedback-review-container">
      <h2 className="feedback-heading">Feedback Reviews</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by mentor or session..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="sort-options">
        <label>Sort by:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
        </select>
      </div>
      {displayedFeedbacks.length === 0 ? (
        <p className="no-feedback">No feedbacks match your criteria.</p>
      ) : (
        <div className="feedback-list">
          {displayedFeedbacks.map(({ id, mentor, session, rating, comment, date }) => (
            <div key={id} className="feedback-card">
              <div className="feedback-header">
                <h3 className="mentee-name">{mentor}</h3>
                <div className="rating">
                  {[...Array(rating)].map((_, index) => (
                    <FaStar key={index} color="#f39c12" />
                  ))}
                </div>
              </div>
              <p className="session-name">Session: {session || 'N/A'}</p>
              <p className="feedback-comment">{`"${comment}"`}</p>
              <p className="feedback-date">
                {new Date(date || Date.now()).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FeedbackReview;

