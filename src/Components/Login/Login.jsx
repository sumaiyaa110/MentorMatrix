import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("mentee");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(false);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email,
          password: password,
          role: role,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);

        // Save user details to localStorage
        localStorage.setItem("userDetails", JSON.stringify({
          userId: data.id,  // Save user_id here
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: data.role,
          gender: data.gender,
          about: data.about,
        }));

        // Redirect based on role
        if (role === 'admin') navigate('/dashboard/admin');
        else if (role === 'mentor') navigate('/dashboard/mentor');
        else navigate('/dashboard/mentee');
        setFormSubmitted(true);
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText);
        console.error('Login failed:', errorText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="show-password-btn"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="remember-me">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>
        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="mentee">Mentee</option>
          <option value="mentor">Mentor</option>
          <option value="admin">Admin</option>
        </select>
        <Link to="/forgot-password" className="forgot-password-link">
          Forgot Password?
        </Link>
        <button type="submit" className="login-btn">Login</button>
        {formSubmitted && <p className="confirmation-message">Login successful! Redirecting...</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className="register-link">
          Don't have an account? <Link to="/signup">Register First</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
