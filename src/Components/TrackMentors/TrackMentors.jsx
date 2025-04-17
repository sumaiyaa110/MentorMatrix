import React, { useState } from 'react';
import './TrackMentors.css';

const TrackMentors = () => {
  const [mentors, setMentors] = useState([
    { id: 1, name: 'Prof. Mohammad Tariq', expertise: 'Software Engineering', status: 'Active', sessions: 30, rating: 4.5, feedback: ['Great mentor!', 'Very knowledgeable.'], negativeFeedback: false },
    { id: 2, name: 'Prof. Mahmudur Rahman', expertise: 'Data Science', status: 'Active', sessions: 25, rating: 4.7, feedback: ['Helpful and kind.', 'Explains concepts clearly.'], negativeFeedback: false },
    { id: 3, name: 'Prof. Shakil Ahmed', expertise: 'Artificial Intelligence', status: 'Inactive', sessions: 15, rating: 3.5, feedback: ['Needs improvement in engagement.'], negativeFeedback: true },
    { id: 4, name: 'Dr. Nurul Islam', expertise: 'Networking', status: 'Active', sessions: 10, rating: 4.6, feedback: ['Excellent mentor.'], negativeFeedback: false },
    { id: 5, name: 'Dr. Farhana Akter', expertise: 'Cyber Security', status: 'Active', sessions: 50, rating: 4.8, feedback: ['Outstanding knowledge and guidance!'], negativeFeedback: false },
    { id: 6, name: 'Prof. Anwar Hossain', expertise: 'Machine Learning', status: 'Inactive', sessions: 12, rating: 2.5, feedback: ['Poor explanation of topics.'], negativeFeedback: true },
    { id: 7, name: 'Dr. Rezwanul Haque', expertise: 'Cloud Computing', status: 'Active', sessions: 35, rating: 4.4, feedback: ['Resourceful and clear in teaching.'], negativeFeedback: false },
    { id: 8, name: 'Prof. Fariha Nahar', expertise: 'Database Management', status: 'Active', sessions: 28, rating: 4.7, feedback: ['Highly recommend!', 'Makes learning easy.'], negativeFeedback: false },
    { id: 9, name: 'Dr. Suman Das', expertise: 'Mobile Development', status: 'On Leave', sessions: 8, rating: 4.1, feedback: ['Good mentor but hard to reach sometimes.'], negativeFeedback: true },
    { id: 10, name: 'Prof. Jamil Ahmed', expertise: 'Web Development', status: 'Active', sessions: 40, rating: 4.9, feedback: ['Exceptional teaching skills!', 'Very engaging.'], negativeFeedback: false },
    { id: 11, name: 'Dr. Ayesha Siddiqua', expertise: 'Robotics', status: 'Active', sessions: 45, rating: 4.6, feedback: ['Innovative and inspiring.'], negativeFeedback: false },
    { id: 12, name: 'Prof. Zakir Hossain', expertise: 'Ethical Hacking', status: 'Active', sessions: 20, rating: 4.5, feedback: ['Great insights and practical knowledge.'], negativeFeedback: false },
    { id: 13, name: 'Dr. Tahmina Karim', expertise: 'Blockchain', status: 'Inactive', sessions: 18, rating: 2.5, feedback: ['Very knowledgeable.', 'Needs better engagement.'], negativeFeedback: true },
    { id: 14, name: 'Dr. Rafiq Ahmed', expertise: 'IoT', status: 'On Leave', sessions: 22, rating: 3.1, feedback: ['Helpful but sometimes hard to follow.'], negativeFeedback: true },
    { id: 15, name: 'Prof. Salma Khatun', expertise: 'Big Data Analytics', status: 'Active', sessions: 27, rating: 4.6, feedback: ['Outstanding teaching approach.'], negativeFeedback: false },
    { id: 16, name: 'Dr. Kamrul Hasan', expertise: 'Embedded Systems', status: 'Active', sessions: 19, rating: 4.2, feedback: ['Clear explanations, very patient.'], negativeFeedback: false },
    { id: 17, name: 'Prof. Laila Yasmin', expertise: 'Quantum Computing', status: 'Inactive', sessions: 14, rating: 3.2, feedback: ['Good understanding of topics but less interactive.'], negativeFeedback: true },
    { id: 18, name: 'Dr. Asif Mahmud', expertise: 'Augmented Reality', status: 'Active', sessions: 31, rating: 4.8, feedback: ['Amazing mentor!', 'Very passionate.'], negativeFeedback: false },
    { id: 19, name: 'Dr. Sabrina Rahman', expertise: 'Natural Language Processing', status: 'Active', sessions: 29, rating: 4.7, feedback: ['Great explanations and examples.'], negativeFeedback: false },
    { id: 20, name: 'Prof. Arman Chowdhury', expertise: 'Game Development', status: 'Active', sessions: 33, rating: 4.6, feedback: ['Makes learning fun and engaging.'], negativeFeedback: false },
   ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortCriteria, setSortCriteria] = useState('None');
  const [showFeedback, setShowFeedback] = useState(null);

  const removeMentor = (id) => {
    setMentors(mentors.filter((mentor) => mentor.id !== id));
  };

  const filteredMentors = mentors
    .filter((mentor) => {
      const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            mentor.expertise.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || mentor.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortCriteria === 'Sessions') return b.sessions - a.sessions;
      return 0;
    });

  return (
    <div className="track-mentors">
      <h3>Track Mentors</h3>

      {/* Search, Filter, and Sort */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or expertise"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)} 
          className="status-filter"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="On Leave">On Leave</option>
        </select>
        <select 
          value={sortCriteria} 
          onChange={(e) => setSortCriteria(e.target.value)} 
          className="status-filter"
        >
          <option value="None">No Sorting</option>
          <option value="Sessions">Sort by Sessions</option>
        </select>
      </div>

      {/* Mentor List */}
      <ul>
        {filteredMentors.map((mentor) => (
          <li key={mentor.id} className={mentor.rating > 4.7 ? 'exceptional-mentor' : ''}>
            <span className="symbol">👨‍🏫</span>
            <p><span>Name:</span> {mentor.name}</p>
            <p><span>Expertise:</span> {mentor.expertise}</p>
            <p><span>Status:</span> {mentor.status}</p>
            <p><span>Sessions Conducted:</span> {mentor.sessions}</p>
            <p><span>Rating:</span> {mentor.rating}</p>
            {mentor.rating > 4.7 && <p className="badge">🌟 Exceptional Mentor</p>}
            <button onClick={() => setShowFeedback(mentor.id)} className="action-btn">
              View Feedback
            </button>
            {(mentor.status === 'Inactive' || mentor.rating < 3 || mentor.negativeFeedback) && (
              <button onClick={() => removeMentor(mentor.id)} className="action-btn remove-btn">
                Remove Mentor
              </button>
            )}
            {showFeedback === mentor.id && (
              <div className="feedback-popup">
                <h4>Feedback for {mentor.name}</h4>
                <ul>
                  {mentor.feedback.map((feedback, index) => (
                    <li key={index}>{feedback}</li>
                  ))}
                </ul>
                <button onClick={() => setShowFeedback(null)} className="close-btn">
                  Close
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackMentors;


