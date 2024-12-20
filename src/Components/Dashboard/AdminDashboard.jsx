import React, { useState } from 'react';
import './AdminDashboard.css'; // Import the CSS file for consistent styling
import { 
  FaUsers, 
  FaChalkboardTeacher, 
  FaTrashAlt, 
  FaCalendarAlt, 
  FaChartPie, 
  FaFileAlt, 
  FaInfoCircle, 
  FaUserAlt // Importing user icon for profile
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
  Cell
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
  const [isFeatureVisible, setIsFeatureVisible] = useState(null); // To toggle feature details

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/'); // Redirect to homepage
  };

  const handleFeatureClick = (feature) => {
    setIsFeatureVisible(isFeatureVisible === feature ? null : feature);
  };

  return (
    <div className="dashboard-container">
      <div className="topbar">

        
        
        <div className="topbar-left">
          {/* Profile icon with cartoon face */}
          <FaUserAlt size={30} style={{ marginRight: '10px', color: '#2c3e50' }} />
        </div>
        <div className="welcome-message">Welcome, Admin!</div>
        <div className="topbar-right">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="sidebar">
      
          <h3>Admin Actions</h3>
          <ul>
            <li>
              <Link to="/TrackMentor" onClick={() => handleFeatureClick('TrackMentor')}>
                <FaUsers /> Track Mentors
              </Link>
              {isFeatureVisible === 'TrackMentor' && <div className="feature-details">Manage mentors' data and track their progress.</div>}
            </li>
            <li>
              <Link to="/TrackMentees" onClick={() => handleFeatureClick('TrackMentees')}>
                <FaChalkboardTeacher /> Track Mentees
              </Link>
              {isFeatureVisible === 'TrackMentees' && <div className="feature-details">Monitor mentees' activities and progress in sessions.</div>}
            </li>
            <li>
              <Link to="/ManageSessions" onClick={() => handleFeatureClick('ManageSessions')}>
                <FaCalendarAlt /> Manage Sessions
              </Link>
              {isFeatureVisible === 'ManageSessions' && <div className="feature-details">Schedule and manage training sessions.</div>}
            </li>
            <li>
              <Link to="/DeleteUser" onClick={() => handleFeatureClick('DeleteUser')}>
                <FaTrashAlt /> Delete User
              </Link>
              {isFeatureVisible === 'DeleteUser' && <div className="feature-details">Remove users from the platform.</div>}
            </li>
            <li>
  <Link to="/Notifications" onClick={() => handleFeatureClick('Notifications')}>
    <FaFileAlt /> View Notifications
  </Link>
  {isFeatureVisible === 'Notifications' && (
    <div className="feature-details">See the latest notifications for users and admins.</div>
  )}
</li>

          </ul>
        </aside>

        {/* Main Section */}
        <main className="main-section">
          <h2>Admin Dashboard</h2>

          {/* System Analytics */}
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
                fill="#8884d8" 
                label
              >
                {
                  analyticsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))
                }
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          {/* Feedback Statistics */}
          <div className="analytics-card">
            <h3>User Feedback Over Time</h3>
            <BarChart width={600} height={300} data={feedbackData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={({ payload }) => {
                if (payload && payload.length) {
                  const { positive, negative, month } = payload[0].payload;
                  return (
                    <div className="custom-tooltip">
                      <p>{`Month: ${month}`}</p>
                      <p>{`Positive Feedback: ${positive}`}</p>
                      <p>{`Negative Feedback: ${negative}`}</p>
                    </div>
                  );
                }
                return null;
              }} />
              <Legend />
              <Bar dataKey="positive" fill="#2ecc71" name="Positive Feedback" />
              <Bar dataKey="negative" fill="#e74c3c" name="Negative Feedback" />
            </BarChart>
          </div>

          {/* Monthly Session Growth Section */}
          <div className="analytics-card">
            <h3>Monthly Session Growth</h3>

            {/* Chart Type Toggle Buttons */}
            <div style={{ marginBottom: '20px' }}>
              <button onClick={() => handleChartTypeChange('line')} className="toggle-btn">
                Line Chart
              </button>
              <button onClick={() => handleChartTypeChange('bar')} className="toggle-btn">
                Bar Chart
              </button>
              <button onClick={() => handleChartTypeChange('area')} className="toggle-btn">
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
                  <Line type="monotone" dataKey="sessions" stroke="#8884d8" name="Sessions" />
                  <Line type="monotone" dataKey="cancelled" stroke="#e74c3c" name="Cancelled Sessions" />
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
                  <Area type="monotone" dataKey="sessions" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="cancelled" stroke="#e74c3c" fill="#e74c3c" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;                                                                                           
