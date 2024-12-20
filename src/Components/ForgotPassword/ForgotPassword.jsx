import React, { useState } from "react";
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setMessage(`Password reset link sent.`);
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form className="forgot-password-form" onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Enter your registered email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Reset Link</button>
        {message && <p className="confirmation-message">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
