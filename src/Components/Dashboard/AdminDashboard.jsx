import React, { useState } from 'react';
import './AdminDashboard.css';
import {
  FaUsers,
  FaChalkboardTeacher,
  FaTrashAlt,
  FaCalendarAlt,
  FaFileAlt,
  FaBell,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Sample Data
const analyticsData = [
  { name: 'Mentors', value: 45, color: '#2c3e50' },
  { name: 'Mentees', value: 120, color: '#34495e' },
  { name: 'Sessions', value: 30, color: '#16a085' },
  { name: 'Active Users', value: 80, color: '#1abc9c' },
  { name: 'Completed Sessions', value: 25, color: '#e74c3c' },
];

const feedbackData = [
  { month: 'Jan', positive: 15, negative: 5 },
  { month: 'Feb', positive: 20, negative: 10 },
  { month: 'Mar', positive: 30, negative: 20 },
  { month: 'Apr', positive: 25, negative: 15 },
  { month: 'May', positive: 35, negative: 10 },
  { month: 'Jun', positive: 40, negative: 20 },
  { month: 'Jul', positive: 50, negative: 20 },
];

const sessionGrowthData = [
  { month: 'Jan', sessions: 10, cancelled: 2, avgDuration: 60 },
  { month: 'Feb', sessions: 20, cancelled: 3, avgDuration: 55 },
  { month: 'Mar', sessions: 25, cancelled: 5, avgDuration: 50 },
  { month: 'Apr', sessions: 30, cancelled: 4, avgDuration: 70 },
  { month: 'May', sessions: 35, cancelled: 3, avgDuration: 65 },
  { month: 'Jun', sessions: 40, cancelled: 6, avgDuration: 80 },
  { month: 'Jul', sessions: 50, cancelled: 5, avgDuration: 75 },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [chartType, setChartType] = useState('line');
  const [isFeatureVisible, setIsFeatureVisible] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New user signed up', priority: 'high', isRead: false, action: null },
    { id: 2, message: 'Session cancelled', priority: 'critical', isRead: false, action: null },
    { id: 3, message: 'Mentor added a new session', priority: 'normal', isRead: false, action: null },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  };

  const handleFeatureClick = (feature) => {
    setIsFeatureVisible(isFeatureVisible === feature ? null : feature);
  };

  const handleBellClick = () => {
    navigate('/Notifications'); // Navigate to the "View Notifications" page
  };

  const handleNotificationAction = (id, actionType) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, action: actionType } : notification
      )
    );
  };

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  const sortedNotifications = [...notifications].sort((a, b) => {
    const priorityOrder = { critical: 1, high: 2, normal: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="dashboard-container">
      {/* Topbar */}
      <div className="topbar">
        <div className="welcome-message">Welcome, Admin!</div>
        <div className="topbar-right">
          <div className="topbar-bell" onClick={handleBellClick}>
            <FaBell size={30} color="#fff" />
            {unreadNotificationsCount > 0 && (
              <span className="notification-count">{unreadNotificationsCount}</span>
            )}
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Admin Actions</h3>
          <ul>
            <li>
              <Link to="/TrackMentor" onClick={() => handleFeatureClick('TrackMentor')}>
                <FaUsers /> Track Mentors
              </Link>
              {isFeatureVisible === 'TrackMentor' && (
                <div className="feature-details">Manage mentors' data and track their progress.</div>
              )}
            </li>
            <li>
              <Link to="/TrackMentees" onClick={() => handleFeatureClick('TrackMentees')}>
                <FaChalkboardTeacher /> Track Mentees
              </Link>
              {isFeatureVisible === 'TrackMentees' && (
                <div className="feature-details">Monitor mentees' activities and progress in sessions.</div>
              )}
            </li>
            <li>
              <Link to="/ManageSessions" onClick={() => handleFeatureClick('ManageSessions')}>
                <FaCalendarAlt /> Manage Sessions
              </Link>
              {isFeatureVisible === 'ManageSessions' && (
                <div className="feature-details">Schedule and manage training sessions.</div>
              )}
            </li>
            <li>
              <Link to="/DeleteUser" onClick={() => handleFeatureClick('DeleteUser')}>
                <FaTrashAlt /> Delete User
              </Link>
              {isFeatureVisible === 'DeleteUser' && (
                <div className="feature-details">Remove users from the platform.</div>
              )}
            </li>
            <li>
              <Link to="/ScheduleNotification" onClick={() => handleFeatureClick('ScheduleNotification')}>
                <FaCalendarAlt /> Schedule Notification
              </Link>
              {isFeatureVisible === 'ScheduleNotification' && (
                <div className="feature-details">Plan and send scheduled notifications.</div>
              )}
            </li>
            <li>
              <Link to="/NotificationTemplates" onClick={() => handleFeatureClick('NotificationTemplates')}>
                <FaFileAlt /> Notification Templates
              </Link>
              {isFeatureVisible === 'NotificationTemplates' && (
                <div className="feature-details">Choose from predefined notification templates.</div>
              )}
            </li>
          </ul>
        </aside>

            <main className="main-section">
      <h2>Admin Dashboard</h2>
      <div className="analytics-container">
        {/* Overall System Analytics */}
        <div className="analytics-card">
          <h3>Overall System Analytics</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={analyticsData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {analyticsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* User Feedback Over Time */}
        <div className="analytics-card">
          <h3>User Feedback Over Time</h3>
          <BarChart width={600} height={300} data={feedbackData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="positive" fill="#2ecc71" />
            <Bar dataKey="negative" fill="#e74c3c" />
          </BarChart>
        </div>

        {/* Monthly Session Growth */}
        <div className="analytics-card">
          <h3>Monthly Session Growth</h3>
          <div>
            <button onClick={() => setChartType('line')} className="toggle-btn">
              Line Chart
            </button>
            <button onClick={() => setChartType('bar')} className="toggle-btn">
              Bar Chart
            </button>
            <button onClick={() => setChartType('area')} className="toggle-btn">
              Area Chart
            </button>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            {chartType === 'line' && (
              <LineChart data={sessionGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sessions" stroke="#8884d8" />
                <Line type="monotone" dataKey="cancelled" stroke="#e74c3c" />
              </LineChart>
            )}
            {chartType === 'bar' && (
              <BarChart data={sessionGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sessions" fill="#8884d8" />
                <Bar dataKey="cancelled" fill="#e74c3c" />
              </BarChart>
            )}
            {chartType === 'area' && (
              <AreaChart data={sessionGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="sessions" fill="#8884d8" />
                <Area type="monotone" dataKey="cancelled" fill="#e74c3c" />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </main>

      </div>

      {/* Notifications Modal */}
      {showNotifications && (
        <div className="notifications-modal">
          <h3>Notifications</h3>
          <ul>
            {sortedNotifications.map((notification) => (
              <li key={notification.id} className={`notification-item ${notification.priority}`}>
                <span>{notification.message}</span>
                <div className="notification-actions">
                  {notification.priority === 'critical' && <span className="badge critical">Critical</span>}
                  {notification.priority === 'high' && <span className="badge high">High</span>}
                  {notification.priority === 'normal' && <span className="badge normal">Normal</span>}
                  <button className="approve" onClick={() => handleNotificationAction(notification.id, 'approve')}>
                    Approve
                  </button>
                  <button className="reject" onClick={() => handleNotificationAction(notification.id, 'reject')}>
                    Reject
                  </button>
                  <button className="mark-read" onClick={() => markAsRead(notification.id)}>
                    Mark as Read
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button className="close-button" onClick={() => setShowNotifications(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
