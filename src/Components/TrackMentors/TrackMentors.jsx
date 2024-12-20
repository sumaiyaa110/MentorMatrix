import React, { useState } from 'react';
import './TrackMentors.css';

const TrackMentors = () => {
  const [mentors, setMentors] = useState([
    { id: 1, name: 'Prof. Mohammad Tariq', expertise: 'Software Engineering', status: 'Active', sessions: 30, rating: 4.5 },
    { id: 2, name: 'Prof. Mahmudur Rahman', expertise: 'Data Science', status: 'Active', sessions: 25, rating: 4.7 },
    { id: 3, name: 'Prof. Shakil Ahmed', expertise: 'Artificial Intelligence', status: 'Inactive', sessions: 15, rating: 4.2 },
    { id: 4, name: 'Dr. Nurul Islam', expertise: 'Networking', status: 'Active', sessions: 10, rating: 4.6 },
    { id: 5, name: 'Dr. Farhana Akter', expertise: 'Cyber Security', status: 'Active', sessions: 50, rating: 4.8 },
    { id: 6, name: 'Prof. Anwar Hossain', expertise: 'Machine Learning', status: 'Inactive', sessions: 12, rating: 4.3 },
    { id: 7, name: 'Dr. Rezwanul Haque', expertise: 'Cloud Computing', status: 'Active', sessions: 35, rating: 4.4 },
    { id: 8, name: 'Prof. Fariha Nahar', expertise: 'Database Management', status: 'Active', sessions: 28, rating: 4.7 },
    { id: 9, name: 'Dr. Suman Das', expertise: 'Mobile Development', status: 'On Leave', sessions: 8, rating: 4.1 },
    { id: 10, name: 'Prof. Jamil Ahmed', expertise: 'Web Development', status: 'Active', sessions: 40, rating: 4.9 },
    { id: 11, name: 'Dr. Ayesha Siddiqua', expertise: 'Robotics', status: 'Active', sessions: 45, rating: 4.6 },
    { id: 12, name: 'Prof. Zakir Hossain', expertise: 'Ethical Hacking', status: 'Active', sessions: 20, rating: 4.5 },
    { id: 13, name: 'Dr. Tahmina Karim', expertise: 'Blockchain', status: 'Inactive', sessions: 18, rating: 4.4 },
    { id: 14, name: 'Dr. Rafiq Ahmed', expertise: 'IoT', status: 'On Leave', sessions: 22, rating: 4.3 },
    { id: 15, name: 'Prof. Salma Khatun', expertise: 'Big Data Analytics', status: 'Active', sessions: 27, rating: 4.6 },
    { id: 16, name: 'Dr. Kamrul Hasan', expertise: 'Embedded Systems', status: 'Active', sessions: 19, rating: 4.2 },
    { id: 17, name: 'Prof. Laila Yasmin', expertise: 'Quantum Computing', status: 'Inactive', sessions: 14, rating: 4.1 },
    { id: 18, name: 'Dr. Asif Mahmud', expertise: 'Augmented Reality', status: 'Active', sessions: 31, rating: 4.8 },
    { id: 19, name: 'Dr. Sabrina Rahman', expertise: 'Natural Language Processing', status: 'Active', sessions: 29, rating: 4.7 },
    { id: 20, name: 'Prof. Arman Chowdhury', expertise: 'Game Development', status: 'Active', sessions: 33, rating: 4.6 },
  ]);
  

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const removeMentor = (id) => {
    setMentors(mentors.filter((mentor) => mentor.id !== id));
  };

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          mentor.expertise.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || mentor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="track-mentors">
      <h3>Track Mentors</h3>

      {/* Search and Filter */}
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
      </div>

      {/* Mentor List */}
      <ul>
        {filteredMentors.map((mentor) => (
          <li key={mentor.id}>
            <span className="symbol">👨‍🏫</span>
            <p><span>Name:</span> {mentor.name}</p>
            <p><span>Expertise:</span> {mentor.expertise}</p>
            <p><span>Status:</span> {mentor.status}</p>
            <p><span>Sessions Conducted:</span> {mentor.sessions}</p>
            <p><span>Rating:</span> {mentor.rating}</p>
            <button onClick={() => removeMentor(mentor.id)} className="action-btn">
              Remove Mentor
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackMentors;


