import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBell,
  FaUserAlt,
  FaCalendarAlt,
  FaComments,
  FaBookOpen,
  FaTasks,
  FaTrophy,
} from "react-icons/fa";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from "chart.js";
import "./Dashboard.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const MenteeDashboard = () => {
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [profileData, setProfileData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails) {
      setProfileData(userDetails);
    } else {
      navigate("/login");
    }

    // Simulated notifications fetch
    const fetchNotifications = () => {
      const dummyNotifications = [
        "Your next session is scheduled for 20th Jan 2025.",
        "New session added: Introduction to Digital Art.",
        "Project deadline extended to 25th Jan 2025.",
      ];
      setNotifications(dummyNotifications);
    };
    fetchNotifications();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    navigate("/login");
  };

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  const closeNotifications = () => {
    setShowNotifications(false);
  };

  const performanceData = {
    labels: ["Sessions Completed", "Quizzes Attempted", "Certificates Earned"],
    datasets: [
      {
        label: "Performance Overview",
        data: [10, 6, 3],
        backgroundColor: ["#4a90e2", "#1abc9c", "#f39c12"],
        borderRadius: 5,
      },
    ],
  };

  const quizData = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ["#2ecc71", "#e74c3c"],
      },
    ],
  };

  return (
    <div className="mentee-dashboard">
      <div className="topbar">
        <div className="welcome-message">
          Welcome, {profileData.firstName} {profileData.lastName}! <span className="date-time">{currentDateTime}</span>
        </div>
        <div className="topbar-right">
          <button className="notification-button" onClick={toggleNotifications}>
            <FaBell size={30} />
            {notifications.length > 0 && <span className="notification-badge">{notifications.length}</span>}
          </button>
          {showNotifications && (
            <div className="notifications-popup">
              <div className="notifications-header">
                <h3>Notifications</h3>
                <button className="close-button" onClick={closeNotifications}>
                  ×
                </button>
              </div>
              <ul className="notifications-list">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                  ))
                ) : (
                  <li>No new notifications</li>
                )}
              </ul>
            </div>
          )}
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <aside className="sidebar">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/menteeProfile">
                <FaUserAlt /> Mentee Profile
              </Link>
            </li>
            <li>
              <Link to="/enrolled">
                <FaCalendarAlt /> Enrolled Sessions
              </Link>
            </li>
            <li>
              <Link to="/AvailSessions">
                <FaCalendarAlt /> Available Sessions
              </Link>
            </li>
            <li>
              <Link to="/PerformanceMetrics">
                <FaTasks /> Performance Metrics
              </Link>
            </li>
            <li>
              <Link to="/Feedback">
                <FaComments /> Give Feedback
              </Link>
            </li>
            <li>
              <Link to="/FeedbackReview">
                <FaComments /> Feedback Overview
              </Link>
            </li>
            <li>
              <Link to="/StudyMaterials">
                <FaBookOpen /> Study Materials
              </Link>
            </li>
            <li>
              <Link to="/QuizComponent">
                <FaTasks /> Quizzes
              </Link>
            </li>
            <li>
              <Link to="/Certificates">
                <FaTrophy /> Certificates
              </Link>
            </li>
            <li>
              <Link to="/ActivityLog">
                  <FaBookOpen /> Activity Log
              </Link>
            </li>
          </ul>
        </aside>

        <main className="main-section">
          <h2>Mentee Dashboard</h2>
          <div className="performance-metrics-horizontal">
            <div className="chart-container-horizontal">
              <h3>Performance Metrics</h3>
              <Bar data={performanceData} options={{ plugins: { legend: { display: false } } }} />
            </div>
            <div className="chart-container-horizontal">
              <h4>Quiz Accuracy</h4>
              <Doughnut data={quizData} options={{ plugins: { legend: { position: "bottom" } } }} />
            </div>
          </div>
        </main>
      </div>
      <footer className="dashboard-footer">© 2024 Mentor-Mentee Scheduling System. All rights reserved.</footer>
    </div>
  );
};

export default MenteeDashboard;
