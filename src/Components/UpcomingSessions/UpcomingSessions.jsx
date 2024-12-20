import React from 'react';
import './UpcomingSessions.css';
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
  // Add more sessions as needed
];

const UpcomingSessions = () => {
  return (
    <div className="upcoming-sessions">
      <h1>Upcoming Mentorship Sessions</h1>
      <ul>
        {sessions.map((session, index) => (
          <li key={index} className="session-card">
            <div>
              <p><strong>Date:</strong> {session.date}</p>
              <p><strong>Time:</strong> {session.time}</p>
              <p><strong>Topic:</strong> {session.topic}</p>
              <p><strong>Mentor:</strong> {session.mentor}</p>
            </div>
            <img src={session.mentorPhoto} alt={`Mentor ${session.mentor}`} className="mentor-photo" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingSessions;
