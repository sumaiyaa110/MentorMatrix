import React from "react";
import "./AnnouncementAndNotification.css";

const AnnouncementAndNotification = () => {
  return (
    <div className="announcement-notification">
      <h2>Announcements and Notifications</h2>
      <ul className="notification-list">
        <li>New mentorship session added on AI & ML.</li>
        <li>Upcoming networking event on November 15th.</li>
        <li>System maintenance scheduled for Saturday.</li>
      </ul>
    </div>
  );
};

export default AnnouncementAndNotification;
