import React, { useState } from 'react';
import axios from 'axios';
import './MentorRegistrationForm.css'; // Import the CSS file for styling

const MentorRegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [expertise, setExpertise] = useState('');
  const [githubId, setGithubId] = useState(''); // State for GitHub ID
  const [linkedinId, setLinkedinId] = useState(''); // State for LinkedIn ID
  const [responseMessage, setResponseMessage] = useState(''); // To show success or error messages
  const [isLoading, setIsLoading] = useState(false); // To track the form submission state

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the mentor object
    const mentorData = {
      name,
      email,
      expertise,
      githubId,
      linkedinId,
    };

    try {
      setIsLoading(true); // Set loading state to true
      setResponseMessage(''); // Reset any previous response message

      // Send the data to the backend
      const response = await axios.post('http://localhost:8080/api/mentor/register', mentorData, {
        headers: { 'Content-Type': 'application/json' },
      });

      // Handle success
      setResponseMessage('Mentor registered successfully!');
      console.log('Response:', response.data);

      // Clear form fields
      setName('');
      setEmail('');
      setExpertise('');
      setGithubId('');
      setLinkedinId('');
    } catch (error) {
      // Handle errors
      console.error('Error registering mentor:', error.response?.data || error.message);
      const errorMessage = error.response?.data || 'Failed to register mentor. Please try again.';
      setResponseMessage(errorMessage);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <form className="mentor-registration-form" onSubmit={handleSubmit}>
      <h2>Mentor Registration</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="expertise">Expertise</label>
        <input
          type="text"
          id="expertise"
          value={expertise}
          onChange={(e) => setExpertise(e.target.value)}
          placeholder="Enter your area of expertise (e.g., AI, Web Development)"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="githubId">GitHub ID (URL)</label>
        <input
          type="url"
          id="githubId"
          value={githubId}
          onChange={(e) => setGithubId(e.target.value)}
          placeholder="https://github.com/your-profile"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="linkedinId">LinkedIn ID (URL)</label>
        <input
          type="url"
          id="linkedinId"
          value={linkedinId}
          onChange={(e) => setLinkedinId(e.target.value)}
          placeholder="https://linkedin.com/in/your-profile"
          required
        />
      </div>
      <button type="submit" className="submit-btn" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </form>
  );
};

export default MentorRegistrationForm;



