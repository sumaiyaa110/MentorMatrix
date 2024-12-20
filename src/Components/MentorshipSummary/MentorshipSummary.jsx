import React from 'react';
import './MentorshipSummary.css';

const stats = {
  completed: 20,
  ongoing: 5,
  upcoming: 10,
};

const MentorshipSummary = () => {
  return (
    <div className="mentorship-summary">
      <h1>Mentorship Summary</h1>
      <div className="stats-container">
        <div className="stat-card">
          <h3>Completed Sessions</h3>
          <p>{stats.completed}</p>
        </div>
        <div className="stat-card">
          <h3>Ongoing Sessions</h3>
          <p>{stats.ongoing}</p>
        </div>
        <div className="stat-card">
          <h3>Upcoming Sessions</h3>
          <p>{stats.upcoming}</p>
        </div>
      </div>
    </div>
  );
};

export default MentorshipSummary;
