import React, { useState } from 'react';
import './SessionHistory.css';
import { FaDownload, FaSearch, FaSort, FaEye } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Updated sessions where each mentor teaches only one topic
const sessions = [
  { id: 1, topic: 'AI Fundamentals', date: '2024-11-15', menteesCount: 5, mentor: 'Dr. Shakib Hasan' },
  { id: 2, topic: 'Machine Learning Basics', date: '2024-11-10', menteesCount: 3, mentor: 'Dr. Rashed Khan' },
  { id: 3, topic: 'Data Science Introduction', date: '2024-11-08', menteesCount: 4, mentor: 'Prof. Ayesha Karim' },
  { id: 4, topic: 'Python for Beginners', date: '2024-11-05', menteesCount: 6, mentor: 'Prof. Mohammad Tariq' },
  { id: 5, topic: 'Deep Learning Essentials', date: '2024-11-03', menteesCount: 2, mentor: 'Dr. Farhan Rahman' },
  { id: 6, topic: 'SQL Database Design', date: '2024-11-02', menteesCount: 7, mentor: 'Dr. Sultana Shafi' },
  { id: 7, topic: 'Web Development Basics', date: '2024-11-01', menteesCount: 8, mentor: 'Prof. Mahmudur Rahman' },
  { id: 8, topic: 'ReactJS for Beginners', date: '2024-10-30', menteesCount: 3, mentor: 'Prof. Nasima Akter' },
  { id: 9, topic: 'Introduction to Java', date: '2024-10-28', menteesCount: 4, mentor: 'Dr. Tanvir Alam' },
  { id: 10, topic: 'Cybersecurity Overview', date: '2024-10-25', menteesCount: 5, mentor: 'Dr. Jamilur Rahman' },
  { id: 11, topic: 'Machine Learning Project', date: '2024-10-22', menteesCount: 2, mentor: 'Prof. Shirin Begum' },
  { id: 12, topic: 'Advanced Python Programming', date: '2024-10-20', menteesCount: 6, mentor: 'Dr. Tarek Shams' },
  { id: 13, topic: 'HTML and CSS', date: '2024-10-18', menteesCount: 7, mentor: 'Prof. Kamal Uddin' },
  { id: 14, topic: 'Big Data Analytics', date: '2024-10-15', menteesCount: 3, mentor: 'Dr. Rezwan Ahmed' },
  { id: 15, topic: 'Blockchain Basics', date: '2024-10-12', menteesCount: 4, mentor: 'Prof. Zubair Hossain' },
  { id: 16, topic: 'AWS Cloud Computing', date: '2024-10-10', menteesCount: 5, mentor: 'Dr. Shahanaz Rahman' },
  { id: 17, topic: 'IoT Fundamentals', date: '2024-10-08', menteesCount: 6, mentor: 'Prof. Nasir Uddin' },
  { id: 18, topic: 'Project Management Tools', date: '2024-10-05', menteesCount: 2, mentor: 'Dr. Razaul Karim' },
  { id: 19, topic: 'Mobile App Development', date: '2024-10-03', menteesCount: 4, mentor: 'Prof. Shahed Alam' },
  { id: 20, topic: 'Data Visualization', date: '2024-10-01', menteesCount: 7, mentor: 'Dr. Faria Islam' },
];

const SessionHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mentorFilter, setMentorFilter] = useState('');
  const [topicFilter, setTopicFilter] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionsPerPage] = useState(5); // Sessions per page
  const [viewedSession, setViewedSession] = useState(null); // Modal session details

  // Get unique mentors and topics for dropdown filters
  const mentors = Array.from(new Set(sessions.map((session) => session.mentor)));
  const topics = Array.from(new Set(sessions.map((session) => session.topic)));

  // Filter sessions based on search query, mentor, and topic
  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.mentor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMentor = mentorFilter ? session.mentor === mentorFilter : true;
    const matchesTopic = topicFilter ? session.topic === topicFilter : true;
    return matchesSearch && matchesMentor && matchesTopic;
  });

  // Sort sessions by field
  const sortedSessions = [...filteredSessions].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField].toString().toLowerCase();
    const bValue = b[sortField].toString().toLowerCase();
    if (sortOrder === 'asc') return aValue > bValue ? 1 : -1;
    return aValue < bValue ? 1 : -1;
  });

  // Pagination
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = sortedSessions.slice(indexOfFirstSession, indexOfLastSession);

  const totalPages = Math.ceil(filteredSessions.length / sessionsPerPage);

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Session History', 14, 20);
    doc.autoTable({
      startY: 30,
      head: [['Date', 'Topic', 'Mentor', 'No. of Mentees']],
      body: sortedSessions.map((session) => [
        session.date,
        session.topic,
        session.mentor,
        session.menteesCount,
      ]),
    });
    doc.save('Session_History.pdf');
  };

  // Export as CSV
  const exportCSV = () => {
    const csvContent = [
      ['Date', 'Topic', 'Mentor', 'No. of Mentees'],
      ...sortedSessions.map((session) => [
        session.date,
        session.topic,
        session.mentor,
        session.menteesCount,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Session_History.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="session-history-container">
      <header>Session History</header>

      {/* Filters */}
      <div className="filters">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by topic or mentor"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button>
            <FaSearch />
          </button>
        </div>
        <div className="dropdown-filters">
          <select value={mentorFilter} onChange={(e) => setMentorFilter(e.target.value)}>
            <option value="">All Mentors</option>
            {mentors.map((mentor) => (
              <option key={mentor} value={mentor}>
                {mentor}
              </option>
            ))}
          </select>
          <select value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)}>
            <option value="">All Topics</option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('date')}>
              Date <FaSort />
            </th>
            <th onClick={() => handleSort('topic')}>
              Topic <FaSort />
            </th>
            <th onClick={() => handleSort('mentor')}>
              Mentor <FaSort />
            </th>
            <th>No. of Mentees</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {currentSessions.map((session) => (
            <tr key={session.id}>
              <td>{session.date}</td>
              <td>{session.topic}</td>
              <td>{session.mentor}</td>
              <td>{session.menteesCount}</td>
              <td>
                <button
                  className="view-details-btn"
                  onClick={() => setViewedSession(session)}
                >
                  <FaEye /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={i + 1 === currentPage ? 'active-page' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Export Buttons */}
      <div className="export-buttons">
        <button className="download-btn" onClick={exportPDF}>
          <FaDownload /> Export as PDF
        </button>
        <button className="download-btn" onClick={exportCSV}>
          <FaDownload /> Export as CSV
        </button>
      </div>

      {/* Modal */}
      {viewedSession && (
        <div className="modal">
          <div className="modal-content">
            <h2>{viewedSession.topic}</h2>
            <p>
              <strong>Date:</strong> {viewedSession.date}
            </p>
            <p>
              <strong>Mentor:</strong> {viewedSession.mentor}
            </p>
            <p>
              <strong>Number of Mentees:</strong> {viewedSession.menteesCount}
            </p>
            <button
              className="close-modal-btn"
              onClick={() => setViewedSession(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionHistory;


