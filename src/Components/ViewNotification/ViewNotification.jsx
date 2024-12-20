// ViewNotification.jsx
import React, { useState } from 'react';
import './ViewNotification.css';
import { FaBell, FaCheckCircle, FaTrashAlt } from 'react-icons/fa';

const ViewNotification = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Mentor Registration', details: 'Dr. Farhana Akter has registered.', time: '10 mins ago', status: 'Unread' },
    { id: 2, title: 'Session Feedback Received', details: 'Feedback received for Prof. Tariq.', time: '1 hour ago', status: 'Unread' },
    { id: 3, title: 'System Update', details: 'Version 2.1 update applied.', time: 'Yesterday', status: 'Read' },
    { id: 4, title: 'New Mentee Joined', details: 'Mentee Ayesha Siddiqua has joined.', time: '2 days ago', status: 'Unread' },
    { id: 5, title: 'Maintenance Scheduled', details: 'Scheduled downtime on 15th Dec.', time: '3 days ago', status: 'Read' },
  ]);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, status: 'Read' } : notification
      )
    );
  };

  const clearNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <div className="view-notification">
      <h3><FaBell className="icon" /> Notifications</h3>
      <ul className="notification-list">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className={`notification-item ${notification.status === 'Unread' ? 'unread' : 'read'}`}
          >
            <div className="notification-header">
              <h4>{notification.title}</h4>
              <span>{notification.time}</span>
            </div>
            <p>{notification.details}</p>
            <div className="notification-actions">
              {notification.status === 'Unread' && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="mark-read-btn"
                >
                  <FaCheckCircle /> Mark as Read
                </button>
              )}
              <button
                onClick={() => clearNotification(notification.id)}
                className="clear-btn"
              >
                <FaTrashAlt /> Clear
              </button>
            </div>
          </li>
        ))}
      </ul>
      {notifications.length === 0 && <p className="no-notifications">No notifications to display.</p>}
    </div>
  );
};

export default ViewNotification;