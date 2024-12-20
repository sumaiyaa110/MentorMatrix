import React, { useState } from "react";
import './Signup.css';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('mentee');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [about, setAbout] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewPicture, setPreviewPicture] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewPicture(reader.result);
      reader.readAsDataURL(file);
      setProfilePicture(file);
    }
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setRole('mentee');
    setGender('');
    setPassword('');
    setConfirmPassword('');
    setAbout('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setAgreedToTerms(false);
    setProfilePicture(null);
    setPreviewPicture(null);
    setPasswordError('');
    setPasswordStrength('');
  };

  const validatePasswordStrength = (password) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&#]/.test(password);

    if (minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar) {
      setPasswordStrength('Strong');
    } else if (minLength && (hasUppercase || hasLowercase) && hasNumber) {
      setPasswordStrength('Medium');
    } else {
      setPasswordStrength('Weak');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePasswordStrength(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(false);
    setErrorMessage('');

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (passwordStrength === 'Weak') {
      setPasswordError('Password is too weak');
      return;
    }

    setPasswordError('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          role: role,
          gender: gender,
          about: about,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Sign up successful:', data);
        setFormSubmitted(true);
        resetForm();
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText);
        console.error('Sign up failed:', errorText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          placeholder="Enter your first name"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          placeholder="Enter your last name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="mentee">Mentee</option>
          <option value="mentor">Mentor</option>
        </select>

        <label>Gender</label>
        <div className="gender-options">
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              required
              onChange={(e) => setGender(e.target.value)}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              required
              onChange={(e) => setGender(e.target.value)}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="others"
              required
              onChange={(e) => setGender(e.target.value)}
            />
            Others
          </label>
        </div>

        <label htmlFor="password">Password</label>
        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {passwordStrength && (
          <p className={`password-strength ${passwordStrength.toLowerCase()}`}>
            Strength: {passwordStrength}
          </p>
        )}

        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="password-field">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            placeholder="Re-enter your password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {passwordError && <p className="error-message">{passwordError}</p>}

        <label htmlFor="about">Description</label>
        <textarea
          id="about"
          placeholder="Write a brief description about yourself"
          required
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        ></textarea>

        <div className="profile-picture">
          <label htmlFor="profilePicture">Upload Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
          {previewPicture && (
            <div className="preview-container">
              <img
                src={previewPicture}
                alt="Profile Preview"
                className="profile-preview"
              />
            </div>
          )}
        </div>

        <div>
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            required
          />
          <label htmlFor="terms">
            I agree to the <a href="/terms" className="link">Terms of Service</a> and <a href="/privacy" className="link">Privacy Policy</a>.
          </label>
        </div>

        <button type="submit" disabled={!agreedToTerms}>
          Sign Up
        </button>

        {formSubmitted && (
          <p className="confirmation-message">Sign up successful!</p>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Signup;







