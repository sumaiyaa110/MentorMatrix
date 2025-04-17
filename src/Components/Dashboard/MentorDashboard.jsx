import React, { useState, useEffect } from "react";
import "./MentorDashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaBell, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const chartData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Sessions Conducted",
      data: [4, 8, 5, 10, 7, 12],
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
      borderWidth: 2,
      tension: 0.4,
    },
    {
      label: "Feedback Score",
      data: [4.5, 4.7, 4.6, 4.8, 4.9, 5],
      backgroundColor: "rgba(255,159,64,0.2)",
      borderColor: "rgba(255,159,64,1)",
      borderWidth: 2,
      tension: 0.4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
  },
};

const MentorDashboard = () => {
  const [mentorName, setMentorName] = useState("Mentor");
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails && userDetails.role === "mentor") {
      setMentorName(`${userDetails.firstName} ${userDetails.lastName}`);
    } else {
      navigate("/login");
    }

    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    }, 1000);

    // Simulated API call for notifications
    const fetchNotifications = () => {
      const dummyNotifications = [
        "New feedback received on your recent session",
        "Mentee Adiba has updated her project report",
        "System maintenance scheduled for this weekend",
      ];
      setNotifications(dummyNotifications);
    };

    fetchNotifications();

    return () => clearInterval(interval);
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

  return (
    <div className="dashboard-container">
      <div className="topbar">
        <div className="welcome-message">
          Welcome, {mentorName}! <span className="date-time">{currentDateTime}</span>
        </div>
        <div className="topbar-right">
          <button className="notification-button" onClick={toggleNotifications}>
            <FaBell size={30} />
            {notifications.length > 0 && <span className="notification-badge">{notifications.length}</span>}
          </button>
          <div className="spacer"></div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {showNotifications && (
        <div className="notifications-popup">
          <div className="notifications-header">
            <h3>Notifications</h3>
            <button className="close-button" onClick={closeNotifications}>
              <FaTimes size={16} />
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

      <div className="dashboard-content">
        <aside className="sidebar">
          <h3>Quick Links</h3>
          <ul>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/Profile">Mentor Profile</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/SessionScheduler">Schedule Sessions</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/SessionHistory">Session History</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/FeedbackReview">Feedback Overview</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/AssignProjects">Assign Projects</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/ManageQuizzes">Manage Quizzes</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/UploadMaterial">Upload Materials</Link>
            </motion.li>
          </ul>
        </aside>

        <main className="main-section">
          <h2>Mentor Dashboard</h2>

          <div className="analytics-section">
            <h3>Analytics</h3>
            <div style={{ height: "250px", width: "100%" }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </main>
      </div>

      <footer className="dashboard-footer">
        © 2024 Mentor-Mentee Scheduling System. All rights reserved.
      </footer>
    </div>
  );
};

export default MentorDashboard;
