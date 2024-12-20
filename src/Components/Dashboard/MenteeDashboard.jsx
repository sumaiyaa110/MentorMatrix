import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBell,
  FaCalendarAlt,
  FaComments,
  FaBookOpen,
  FaChalkboardTeacher,
  FaTrophy,
  FaTasks,
  FaUserAlt,
} from "react-icons/fa";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "./Dashboard.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const MenteeDashboard = () => {
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [menteeName, setMenteeName] = useState("Mentee");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your next session is scheduled for 20th Jan 2025.", isRead: false },
    { id: 2, message: "New course added: Advanced AI Techniques.", isRead: false },
  ]);
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
      setMenteeName(`${userDetails.firstName} ${userDetails.lastName}`);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    navigate("/login");
  };

  const motivationalQuotes = [
    "Keep learning, keep growing!",
    "Success is a journey, not a destination.",
    "Every expert was once a beginner.",
    "The best way to predict the future is to create it.",
  ];
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );
  };

  const mentors = [
    { name: "Tahmima Haque", expertise: "Machine Learning", rating: 4.9, email: "sumaya@example.com" },
    { name: "Sidratul Muntaha", expertise: "Web Development", rating: 4.8, email: "sidratul@example.com" },
    { name: "Abid Alauddin Chowdhury", expertise: "Cybersecurity", rating: 4.7, email: "abid@example.com" },
  ];

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
      {/* Topbar */}
      <div className="topbar">
        <div className="topbar-left">
          <FaUserAlt size={30} style={{ marginRight: "10px", color: "#2c3e50" }} />
        </div>
        <div className="welcome-message">
          Welcome, {menteeName}! <span className="date-time">{currentDateTime}</span>
        </div>
        <div className="motivational-quote">{randomQuote}</div>
        <div className="topbar-right">
          {/* Notifications */}
          <div className="notifications">
            <FaBell
              size={24}
              style={{
                cursor: "pointer",
                color: unreadCount > 0 ? "#f39c12" : "#2c3e50",
              }}
              onClick={() => setShowNotifications((prev) => !prev)}
            />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            {showNotifications && (
              <div className="notifications-dropdown">
                <h4>Notifications</h4>
                <ul>
                  {notifications.map((notification) => (
                    <li key={notification.id} className={notification.isRead ? "read" : "unread"}>
                      {notification.message}
                    </li>
                  ))}
                </ul>
                <button className="mark-all-btn" onClick={handleMarkAllRead}>
                  Mark All as Read
                </button>
              </div>
            )}
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/upcomingSession">
                <FaCalendarAlt /> Upcoming Sessions
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
                <FaComments /> Activity Feed
              </Link>
            </li>
            <li>
              <Link to="/announcements">
                <FaBell /> Announcements
              </Link>
            </li>
            <li>
              <Link to="/StudyMaterials">
                <FaBookOpen /> Study Materials
              </Link>
            </li>
            <li>
              <Link to="/ManageQuizzes">
                <FaTasks /> Quizzes
              </Link>
            </li>
            <li>
              <Link to="/Certificates">
                <FaTrophy /> Certificates
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Section */}
        <main className="main-section">
          <h2>Mentee Dashboard</h2>

          {/* Performance Metrics */}
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

          {/* Mentor List */}
          <div className="card mentor-list-card">
            <h3>
              <FaChalkboardTeacher size={30} color="#34495e" /> Mentor List
            </h3>
            <table className="mentor-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Expertise</th>
                  <th>Feedback Rating</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {mentors.map((mentor, index) => (
                  <tr key={index}>
                    <td>{mentor.name}</td>
                    <td>{mentor.expertise}</td>
                    <td>{mentor.rating}/5</td>
                    <td>
                      <button
                        className="contact-button"
                        onClick={() => window.open(`mailto:${mentor.email}`)}
                      >
                        Contact
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <footer className="dashboard-footer">© 2024 Mentor-Mentee Scheduling System. All rights reserved.</footer>
    </div>
  );
};

export default MenteeDashboard;
                                                     
