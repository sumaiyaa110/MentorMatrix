import React from 'react';
import './MentorProfile.css';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const MentorProfile = () => {
  return (
    <div className="mentor-profile-container">
      <div className="mentor-profile">
        <img
          src="https://via.placeholder.com/150"
          alt="Mentor Profile"
        />
        <h2>Alexander Lee</h2>
        <p>Expertise: Data Science</p>
        <p>Email: alexander.lee@example.com</p>
        <div className="icon-container">
          <a href="https://www.linkedin.com/in/alexanderlee/" target="_blank" rel="noopener noreferrer"><FaLinkedin size={30} /></a>
          <a href="https://github.com/alexanderlee" target="_blank" rel="noopener noreferrer"><FaGithub size={30} /></a>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
