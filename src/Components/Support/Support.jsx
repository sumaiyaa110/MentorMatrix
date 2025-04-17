import React, { useState } from 'react';
import './Support.css';

const Support = () => {
  const [ticket, setTicket] = useState('');
  const [tickets, setTickets] = useState([]);

  const submitTicket = () => {
    if (ticket.trim()) {
      setTickets([...tickets, ticket]);
      setTicket('');
      alert('Your Query has been submitted! Our team will contact you shortly.');
    } else {
      alert('Please describe your issue before submitting.');
    }
  };

  return (
    <div className="support-container">
      {/* Welcome Section */}
      <section className="welcome-section">
        <h1 className="support-title">Welcome to MentorMatrix Support</h1>
        <p className="support-description">
          Here to assist you with everything MentorMatrix! Whether you're a mentor, mentee, or visitor, you'll find answers and resources to navigate our platform effectively.
        </p>
      </section>

      {/* Quick Access Section */}
      <section className="quick-access">
        <h2 className="section-title">Quick Access</h2>
        <div className="quick-links">
          <a href="/blog-insights" className="quick-link">Blog Insights</a>
          <a href="/case-studies" className="quick-link">Case Studies</a>
          <a href="/networking-events" className="quick-link">Networking Events</a>
          <a href="/faqs" className="quick-link">FAQs</a>
          <a href="/contact-us" className="quick-link">Help Center</a>
        </div>
      </section>

      {/* System Status */}
      <section className="status-section">
        <h2 className="section-title">System Status</h2>
        <div className="status-indicator operational">All Systems Operational</div>
        <p className="status-update">Last updated: {new Date().toLocaleString()}</p>
      </section>

      {/* Resources for Visitors */}
      <section className="visitor-resources">
        <h2 className="section-title">For Visitors</h2>
        <ul className="resource-list">
          <li>
            <strong>Learn About Us:</strong> Discover how MentorMetrix empowers growth through mentorship. 
            <a href="/about-us" className="resource-link"> Read more</a>.
          </li>
          <li>
            <strong>Explore Networking Events:</strong> Participate in our regular events and expand your network.
            <a href="/networking-events" className="resource-link"> Learn more</a>.
          </li>
          <li>
            <strong>Get Started:</strong> New to MentorMetrix? <a href="/signup" className="resource-link">Sign up today</a> and become part of our community.
          </li>
        </ul>
      </section>

      {/* Resources for Users */}
      <section className="user-resources">
        <h2 className="section-title">For Registered Users</h2>
        <ul className="resource-list">
          <li>
            <strong>Manage Sessions:</strong> View and update your scheduled sessions in your dashboard.
            <a href="/login" className="resource-link"> Go to Dashboard</a>.
          </li>
          <li>
            <strong>Update Profile:</strong> Keep your profile up-to-date to get the most out of MentorMetrix.
            <a href="/login" className="resource-link"> Edit Profile</a>.
          </li>
          <li>
            <strong>Access Learning Materials:</strong> Revisit session notes, recordings, and additional resources.
            <a href="/login" className="resource-link"> View Materials</a>.
          </li>
        </ul>
      </section>

      {/* Submit a Ticket */}
      <section className="ticket-section">
        <h2 className="section-title">Need Help? Submit a Query</h2>
        <textarea
          value={ticket}
          onChange={(e) => setTicket(e.target.value)}
          placeholder="Describe your issue or question here..."
          className="ticket-input"
        ></textarea>
        <button onClick={submitTicket} className="ticket-button">
          Submit Query
        </button>
      </section>

      {/* Additional Support Features */}
      <section className="additional-features">
        <h2 className="section-title">Additional Support Features</h2>
        <div className="feature-card">
          <h3 className="feature-title">Knowledge Base</h3>
          <p className="feature-description">
            Browse our searchable knowledge base to find detailed guides and FAQs.
          </p>
          <a href="/blog-insights" className="feature-link">Explore Knowledge Base</a>
        </div>

        <div className="feature-card">
          <h3 className="feature-title">Community Forum</h3>
          <p className="feature-description">
            Join discussions, ask questions, and connect with fellow users in our vibrant community forum.
          </p>
          <a href="/networking-events" className="feature-link">Visit Forum</a>
        </div>

        <div className="feature-card">
          <h3 className="feature-title">Mentor Support Line</h3>
          <p className="feature-description">
            Contact our dedicated mentor support team for personalized guidance.
          </p>
          <a href="/messages" className="feature-link">Contact Support</a>
        </div>
      </section>

      {/* Recent Tickets */}
      {tickets.length > 0 && (
        <section className="recent-tickets">
          <h2 className="section-title">Recent Tickets</h2>
          <ul>
            {tickets.map((item, index) => (
              <li key={index} className="ticket-item">
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Support;
