import React, { useState } from 'react';
import './FeedbackPage.css';

function FeedbackPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedbackType, setFeedbackType] = useState('General Feedback');
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [emojiRating, setEmojiRating] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message && emojiRating) {
      setSubmitted(true);
      setTimeout(() => {
        setName('');
        setEmail('');
        setFeedbackType('General Feedback');
        setMessage('');
        setSuggestions('');
        setEmojiRating('');
        setSubmitted(false);
        setStep(1);
      }, 5000);
    } else {
      alert('Please complete all required fields!');
    }
  };

  return (
    <section className="feedback-page">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(step / 3) * 100}%` }}></div>
      </div>

      <div className="header-container">
        <h1 className="feedback-header animate-header">Help Us Improve</h1>
        <p className="feedback-description">
          Your feedback matters! Share your thoughts and help us make our app better.
        </p>
      </div>

      {!submitted ? (
        <div className="form-container">
          {step === 1 && (
            <div className="step">
              <h2>Step 1: Your Details</h2>
              <label htmlFor="name">Name (Optional):</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
              />

              <label htmlFor="email">Email (Optional):</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
              />

              <button onClick={handleNext} className="next-btn">
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="step">
              <h2>Step 2: Feedback Type</h2>
              <label htmlFor="feedback-type">Type of Feedback:</label>
              <select
                id="feedback-type"
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
              >
                <option value="General Feedback">General Feedback</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Other">Other</option>
              </select>

              <button onClick={handleBack} className="back-btn">
                Back
              </button>
              <button onClick={handleNext} className="next-btn">
                Next
              </button>
            </div>
          )}

          {step === 3 && (
            <form className="feedback-form" onSubmit={handleSubmit}>
              <h2>Step 3: Share Your Thoughts</h2>
              <label htmlFor="message">Your Feedback:</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your experience..."
                rows="5"
                required
              ></textarea>

              <label htmlFor="suggestions">How Can We Improve? (Optional):</label>
              <textarea
                id="suggestions"
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                placeholder="Your Suggestions..."
                rows="4"
              ></textarea>

              <label>Rate Your Experience:</label>
              <div className="emoji-rating">
                {['😠', '😐', '😊', '😁'].map((emoji, index) => (
                  <span
                    key={index}
                    className={`emoji ${emojiRating === emoji ? 'selected' : ''}`}
                    onClick={() => setEmojiRating(emoji)}
                  >
                    {emoji}
                  </span>
                ))}
              </div>

              <button onClick={handleBack} className="back-btn">
                Back
              </button>
              <button type="submit" className="submit-btn">
                Submit Feedback
              </button>
            </form>
          )}
        </div>
      ) : (
        <div className="thank-you-message">
          <h2>Thank You!</h2>
          <p>
            Your feedback has been submitted successfully. You rated your experience as{' '}
            <strong>{emojiRating}</strong>. We appreciate your help!
          </p>
          <button
            className="home-btn"
            onClick={() => setStep(1)}
          >
            Share More Feedback
          </button>
        </div>
      )}

      <div className="testimonials-section">
        <h2>What Others Are Saying</h2>
        <p>"This app is amazing! The team really listens to feedback." - Alex</p>
        <p>"I suggested a feature, and it was implemented in the next update!" - Priya</p>
        <p>"Great experience overall. The app keeps getting better." - Sam</p>
      </div>
    </section>
  );
}

export default FeedbackPage;



