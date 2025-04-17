import React, { useState } from 'react';
import styles from './UpcomingSessions.module.css';
import MentorProfile from "../../assets/mentorProfile.jpg";
import MentorProfile1 from "../../assets/mentorProfile1.jpg";

const sessions = [
  {
    date: '2025-02-01',
    time: '10:00 AM',
    topic: 'Career Growth',
    mentor: 'Abid Alauddin Chowdhury',
    mentorPhoto: MentorProfile,
  },
  {
    date: '2025-01-02',
    time: '02:00 PM',
    topic: 'Software Development',
    mentor: 'Sidratul Muntaha',
    mentorPhoto: MentorProfile1,
  },
  // Add more sessions here...
];

const UpcomingSessions = () => {
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredSessions = sessions
    .filter(session =>
      session.mentor.toLowerCase().includes(filter.toLowerCase()) ||
      session.date.includes(filter)
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.date) - new Date(b.date);
      }
      return new Date(b.date) - new Date(a.date);
    });

  return (
    <div className={styles.upcomingSessions}>
      <h1 className={styles.heading}>Upcoming Mentorship Sessions</h1>

      {/* Filters */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search by mentor or date..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className={styles.filterInput}
        />
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className={styles.sortButton}
        >
          Sort by Date ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
      </div>

      {/* Session List */}
      {filteredSessions.length > 0 ? (
        <ul className={styles.sessionList}>
          {filteredSessions.map((session, index) => (
            <li key={index} className={styles.sessionCard}>
              <div className={styles.sessionDetails}>
                <p><strong>Date:</strong> {session.date}</p>
                <p><strong>Time:</strong> {session.time}</p>
                <p><strong>Topic:</strong> {session.topic}</p>
                <p><strong>Mentor:</strong> {session.mentor}</p>
              </div>
              <img
                src={session.mentorPhoto}
                alt={`Mentor ${session.mentor}`}
                className={styles.mentorPhoto}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noSessions}>No sessions found for the selected filter.</p>
      )}
    </div>
  );
};

export default UpcomingSessions;
