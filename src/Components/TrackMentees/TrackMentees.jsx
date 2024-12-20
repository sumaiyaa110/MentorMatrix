import React, { useState } from 'react';
import './TrackMentees.css';
import { FaExclamationCircle, FaTrashAlt, FaCheck, FaUndo, FaCommentDots } from 'react-icons/fa';

const TrackMentees = () => {
  const [mentees, setMentees] = useState([
    {
      id: 1,
      name: 'Rahim',
      course: 'JavaScript Basics',
      progress: 70,
      violation: true,
      warnings: 1,
      feedback: [
        { from: 'Mentor', message: 'Plagiarism detected in assignment.' },
        { from: 'Mentee', message: 'Observed misbehavior during group project.' },
      ],
      verified: false,
    },
    {
      id: 2,
      name: 'Karim',
      course: 'Advanced Python',
      progress: 50,
      violation: true,
      warnings: 2,
      feedback: [{ from: 'Mentor', message: 'Repeated late submissions.' }],
      verified: true,
    },
    {
      id: 3,
      name: 'Sumaiya',
      course: 'React Essentials',
      progress: 85,
      violation: false,
      warnings: 0,
      feedback: [],
      verified: false,
    },
    {
      id: 4,
      name: 'Ayesha',
      course: 'Machine Learning Basics',
      progress: 90,
      violation: false,
      warnings: 0,
      feedback: [],
      verified: false,
    },
    {
      id: 5,
      name: 'Hasan',
      course: 'Data Structures',
      progress: 40,
      violation: true,
      warnings: 3,
      feedback: [
        { from: 'Mentor', message: 'Failed to participate in group activities.' },
      ],
      verified: true,
    },
    {
      id: 6,
      name: 'Shahana',
      course: 'Web Development',
      progress: 60,
      violation: false,
      warnings: 0,
      feedback: [],
      verified: false,
    },
    {
      id: 7,
      name: 'Imran',
      course: 'Cloud Computing',
      progress: 45,
      violation: true,
      warnings: 2,
      feedback: [
        { from: 'Mentor', message: 'Did not complete multiple assignments.' },
      ],
      verified: true,
    },
    {
      id: 8,
      name: 'Farah',
      course: 'Database Management',
      progress: 75,
      violation: true,
      warnings: 1,
      feedback: [
        { from: 'Mentee', message: 'Rude behavior in team projects.' },
      ],
      verified: false,
    },
    {
      id: 9,
      name: 'Tariq',
      course: 'Cybersecurity Essentials',
      progress: 65,
      violation: false,
      warnings: 0,
      feedback: [],
      verified: false,
    },
    {
      id: 10,
      name: 'Nafisa',
      course: 'Artificial Intelligence',
      progress: 80,
      violation: true,
      warnings: 2,
      feedback: [
        { from: 'Mentor', message: 'Consistently late to sessions.' },
        { from: 'Mentee', message: 'Interrupts during discussions.' },
      ],
      verified: true,
    },
    {
      id: 11,
      name: 'Samiul',
      course: 'Mobile App Development',
      progress: 55,
      violation: false,
      warnings: 0,
      feedback: [],
      verified: false,
    },
    {
      id: 12,
      name: 'Rina',
      course: 'Flutter Basics',
      progress: 70,
      violation: true,
      warnings: 1,
      feedback: [
        { from: 'Mentor', message: 'Missed deadlines for multiple projects.' },
      ],
      verified: false,
    },
    {
      id: 13,
      name: 'Mariam',
      course: 'Software Engineering',
      progress: 50,
      violation: true,
      warnings: 3,
      feedback: [
        { from: 'Mentor', message: 'Failed to adhere to project guidelines.' },
      ],
      verified: true,
    },
    {
      id: 14,
      name: 'Jahid',
      course: 'Big Data Analytics',
      progress: 35,
      violation: true,
      warnings: 3,
      feedback: [
        { from: 'Mentor', message: 'Cheating during online tests.' },
      ],
      verified: true,
    },
    {
      id: 15,
      name: 'Sadia',
      course: 'Frontend Design',
      progress: 95,
      violation: false,
      warnings: 0,
      feedback: [],
      verified: false,
    },
  ]);
  
  const [selectedMentee, setSelectedMentee] = useState(null);

  const warnMentee = (id) => {
    setMentees(
      mentees.map((mentee) =>
        mentee.id === id
          ? { ...mentee, warnings: mentee.warnings + 1 }
          : mentee
      )
    );
  };

  const verifyViolation = (id) => {
    setMentees(
      mentees.map((mentee) =>
        mentee.id === id ? { ...mentee, verified: true } : mentee
      )
    );
  };

  const recoverMentee = (id) => {
    setMentees(
      mentees.map((mentee) =>
        mentee.id === id ? { ...mentee, warnings: 0, violation: false } : mentee
      )
    );
  };

  const removeMentee = (id) => {
    setMentees(mentees.filter((mentee) => mentee.id !== id));
  };

  const openFeedbackModal = (mentee) => {
    setSelectedMentee(mentee);
  };

  const closeFeedbackModal = () => {
    setSelectedMentee(null);
  };

  return (
    <div className="track-mentees">
      <h3>Track Mentees</h3>
      <ul>
        {mentees.map((mentee) => (
          <li key={mentee.id} className="mentee-item">
            <p>
              <strong>Name:</strong> {mentee.name}
            </p>
            <p>
              <strong>Course:</strong> {mentee.course}
            </p>
            <p>
              <strong>Progress:</strong> {mentee.progress}%
            </p>
            <p>
              <strong>Warnings:</strong> {mentee.warnings}
            </p>
            {mentee.violation && (
              <p>
                <strong>Violation:</strong> {mentee.verified ? 'Verified' : 'Pending'}
              </p>
            )}
            <div className="actions">
              {mentee.violation && (
                <>
                  <button
                    onClick={() => openFeedbackModal(mentee)}
                    className="feedback-btn"
                  >
                    <FaCommentDots /> View Feedback
                  </button>
                  {!mentee.verified && (
                    <button
                      onClick={() => verifyViolation(mentee.id)}
                      className="verify-btn"
                    >
                      <FaCheck /> Verify
                    </button>
                  )}
                </>
              )}
              <button onClick={() => warnMentee(mentee.id)} className="warn-btn">
                <FaExclamationCircle /> Warn
              </button>
              {mentee.warnings >= 3 && (
                <button
                  onClick={() => removeMentee(mentee.id)}
                  className="remove-btn"
                >
                  <FaTrashAlt /> Remove
                </button>
              )}
              {mentee.warnings > 0 && (
                <button
                  onClick={() => recoverMentee(mentee.id)}
                  className="recover-btn"
                >
                  <FaUndo /> Recover
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {selectedMentee && (
        <div className="feedback-modal">
          <div className="modal-content">
            <h4>Violation Feedback - {selectedMentee.name}</h4>
            <ul>
              {selectedMentee.feedback.map((fb, index) => (
                <li key={index}>
                  <strong>{fb.from}:</strong> {fb.message}
                </li>
              ))}
            </ul>
            <button onClick={closeFeedbackModal} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackMentees;
