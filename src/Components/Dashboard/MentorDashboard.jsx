import React, { useState, useEffect } from "react";
import "./MentorDashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaUserAlt, FaCalendarAlt, FaTasks, FaCommentDots, FaBookOpen } from "react-icons/fa";
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
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails && userDetails.role === "mentor") {
      setMentorName(`${userDetails.firstName} ${userDetails.lastName}`);
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }

    // Update date and time every second
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Topbar */}
      <div className="topbar">
        <div className="topbar-left">
          <FaUserAlt size={30} style={{ marginRight: "10px", color: "#2c3e50" }} />
        </div>
        <div className="welcome-message">
          Welcome, {mentorName}! <span className="date-time">{currentDateTime}</span>
        </div>
        <div className="topbar-right">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="dashboard-content">
        {/* Sidebar */}
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
            <Link to="/AssignProjects">Assign Projects </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/ManageQuizzes">Manage Quizzes</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/UploadMaterial">Upload Materials</Link>
            </motion.li>
          </ul>
        </aside>

        {/* Main Section */}
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

      {/* Footer */}
      <footer className="dashboard-footer">
        © 2024 Mentor-Mentee Scheduling System. All rights reserved.
      </footer>
    </div>
  );
};

export default MentorDashboard;
