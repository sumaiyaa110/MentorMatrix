import React from "react";
import { FaTrophy } from "react-icons/fa"; // Ensure to import the icon
import "./PerformanceMetrics.css";

const performanceData = [
  {
    session: 'Cybersecurity Basics',
    quizzes: [
      { quizTitle: 'Intro to Cybersecurity', date: '2024-10-15', score: 85 },
      { quizTitle: 'Advanced Threats', date: '2024-10-17', score: 90 }
    ]
  },
  {
    session: 'Web Development Essentials',
    quizzes: [
      { quizTitle: 'HTML & CSS Basics', date: '2024-10-20', score: 80 },
      { quizTitle: 'JavaScript Basics', date: '2024-10-22', score: 92 }
    ]
  },
  {
    session: 'Cloud Computing Fundamentals',
    quizzes: [
      { quizTitle: 'Cloud Deployment', date: '2024-10-25', score: 88 },
      { quizTitle: 'Cloud Security', date: '2024-10-28', score: 91 }
    ]
  }
];

const PerformanceMetrics = () => {
  return (
    <div className="performance-metrics">
      <h2>Performance Summary</h2>

      {/* Metric Summary */}
      <div className="metrics-container">
        <div className="metric-item">
          <h3>Sessions Completed</h3>
          <p>10</p>
        </div>
        <div className="metric-item">
          <h3>Average Rating</h3>
          <p>4.8</p>
        </div>
        <div className="metric-item">
          <h3>Feedback Received</h3>
          <p>20</p>
        </div>
      </div>

      {/* Header Section with Logo */}
      <header className="performance-header">
        <h1>Performance Metrics</h1>
      </header>

      {/* Quiz Participation and Performance */}
      <div className="performance-content">
        <h3>Your Quiz Participation & Performance</h3>

        <div className="performance-details">
          {performanceData.map((data, index) => (
            <div key={index} className="session-performance">
              <h4>{data.session}</h4>
              <ul>
                {data.quizzes.map((quiz, quizIndex) => (
                  <li key={quizIndex} className="quiz-item">
                    <strong>{quiz.quizTitle}</strong> (Date: {quiz.date}) - Score: {quiz.score}%
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section with a motivational message */}
      <footer className="performance-footer">
        <p>Keep up the great work, and continue striving for excellence!</p>
        <FaTrophy size={40} color="#f39c12" />
      </footer>
    </div>
  );
};

export default PerformanceMetrics;
