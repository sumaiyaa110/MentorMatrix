import React, { useState } from 'react';
import './ManageSessions.css';

const ManageSessions = () => {
  const [sessions, setSessions] = useState([
    { id: 1, topic: 'Web Development', mentor: '', approved: true },
    { id: 2, topic: 'Machine Learning', mentor: '', approved: true },
    { id: 3, topic: 'Data Analysis', mentor: '', approved: true },
    { id: 4, topic: 'Artificial Intelligence', mentor: '', approved: true },
    { id: 5, topic: 'Cybersecurity', mentor: '', approved: true },
    { id: 6, topic: 'Mobile App Development', mentor: '', approved: true },
    { id: 7, topic: 'Blockchain Technology', mentor: '', approved: true },
    { id: 8, topic: 'UI/UX Design', mentor: '', approved: true },
    { id: 9, topic: 'Cloud Computing', mentor: '', approved: true },
    { id: 10, topic: 'Internet of Things', mentor: '', approved: true },
    { id: 11, topic: 'Software Testing', mentor: '', approved: true },
    { id: 12, topic: 'Big Data', mentor: '', approved: true },
    { id: 13, topic: 'Game Development', mentor: '', approved: true },
    { id: 14, topic: 'Database Management', mentor: '', approved: true },
    { id: 15, topic: 'Networking', mentor: '', approved: true }
  ]);

  const [newSession, setNewSession] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Array of mentor names (Bangladesh names)
  const mentorNames = [
    "Arif Rahman", "Fatima Begum", "Shahinur Islam", "Rina Akter", "Mizanur Rahman",
    "Nadira Sultana", "Sohail Ahmed", "Mahmudul Hasan", "Nusrat Jahan", "Khaled Mahmud"
  ];

  // Function to get a random mentor name
  const getRandomMentorName = () => {
    const randomIndex = Math.floor(Math.random() * mentorNames.length);
    return mentorNames[randomIndex];
  };

  // Add a new session by the admin
  const handleAddSession = () => {
    if (newSession) {
      const newSessionObj = {
        id: sessions.length + 1,
        topic: newSession,
        mentor: '',
        approved: true,
      };
      setSessions([...sessions, newSessionObj]);

      // Notify all mentors that a new session has been created
      setNotifications([
        ...notifications,
        `Admin created a new session: "${newSession}". Notifications sent to all mentors.`
      ]);
      setNewSession('');
      setShowAddForm(false);
    }
  };

  // Mentor selects a session as the learner
  const handleMentorSelectSession = (id, mentorName) => {
    const updatedSessions = sessions.map((session) =>
      session.id === id ? { ...session, mentor: mentorName } : session
    );
    setSessions(updatedSessions);

    // Notify all mentors that the session has been booked by the selected mentor
    const selectedSession = updatedSessions.find((session) => session.id === id);
    setNotifications([
      ...notifications,
      `${mentorName} has booked the session: "${selectedSession.topic}". Notifications sent to all other mentors.`
    ]);
  };

  // Search filter for session list
  const filteredSessions = sessions.filter(
    (session) =>
      session.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.mentor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="manage-sessions">
      <h3>Manage Sessions</h3>

      {/* Add Session Form */}
      {showAddForm ? (
        <div className="add-session-form">
          <input
            type="text"
            placeholder="Enter session topic"
            value={newSession}
            onChange={(e) => setNewSession(e.target.value)}
          />
          <button onClick={handleAddSession} className="action-btn">
            Create Session
          </button>
        </div>
      ) : (
        <button className="action-btn" onClick={() => setShowAddForm(true)}>
          Add New Session
        </button>
      )}

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by topic or mentor name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Notifications Section */}
      <div className="notifications">
        <h4>Notifications</h4>
        <ul>
          {notifications.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </div>

      {/* List of Sessions */}
      <div className="sessions-list">
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session) => (
            <div key={session.id} className="session-card">
              <h4>
                {session.topic}{' '}
                {session.mentor ? (
                  <span className="approved-symbol">✔️</span>
                ) : (
                  <span className="pending-symbol">⏳</span>
                )}
              </h4>
              <p>
                <strong>Mentor:</strong> {session.mentor || 'Not assigned yet'}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                {session.mentor ? (
                  <span style={{ color: 'green' }}>Booked</span>
                ) : (
                  <span style={{ color: 'red' }}>Available</span>
                )}
              </p>
              {!session.mentor && (
                <button
                  className="action-btn"
                  onClick={() => handleMentorSelectSession(session.id, getRandomMentorName())}
                >
                  Claim as {getRandomMentorName()}
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No sessions match your search.</p>
        )}
      </div>
    </div>
  );
};

export default ManageSessions;
