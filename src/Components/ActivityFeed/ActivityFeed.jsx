import React from 'react';
import './ActivityFeed.css';

const activities = [
  { id: 1, type: 'message', content: 'You received a new message from Jane Smith.' },
  { id: 2, type: 'session', content: 'Upcoming session on "Career Growth" with John Smith.' },
  { id: 3, type: 'notification', content: 'Your profile has been updated successfully.' },
  // Add more activities as needed
];

const ActivityFeed = () => {
  return (
    <div className="activity-feed">
      <h2>Recent Activities</h2>
      <ul>
        {activities.map(activity => (
          <li key={activity.id} className={`activity-item ${activity.type}`}>
            <span className="activity-icon">{/* Optionally include an icon based on activity.type */}</span>
            <span className="activity-content">{activity.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
