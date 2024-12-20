import React from "react";
import "./TopMentorsTrendingSession.css";

const TopMentorsTrendingSession = () => {
  const tradingSessions = [
    {
      id: 1,
      topic: "Robotics Science and Systems",
      logo: "🤖",
      time: "10:00 AM - 11:00 AM",
      tag: "Beginner",
    },
    {
      id: 2,
      topic: "Quantum Computing",
      logo: "⚛️",
      time: "12:00 PM - 1:30 PM",
      tag: "Intermediate",
    },
    {
      id: 3,
      topic: "Blockchain Technology",
      logo: "⛓️",
      time: "3:00 PM - 4:30 PM",
      tag: "Advanced",
    },
  ];

  const topMentors = [
    {
      id: 1,
      name: "Prof. Mahmudur Rahman",
      expertise: "AI & Robotics",
      symbol: "👨‍🏫",
      experience: "15+ years",
      link: "https://example.com/mahmudur-rahman",
    },
    {
      id: 2,
      name: "Dr. Shahanaz Rahman",
      expertise: "Quantum Computing",
      symbol: "👩‍🔬",
      experience: "10+ years",
      link: "https://example.com/shahanaz-rahman",
    },
    {
      id: 3,
      name: "Dr. Faria Islam",
      expertise: "Blockchain Technology",
      symbol: "👩‍💻",
      experience: "12+ years",
      link: "https://example.com/faria-islam",
    },
  ];

  return (
    <div className="top-mentors-trending-session">
      {/* Trading Sessions Section */}
      <div className="trading-sessions unique-section">
        <h3>🌟 Upcoming Trending Sessions 🌟</h3>
        <div className="session-cards">
          {tradingSessions.map((session) => (
            <div key={session.id} className="session-card">
              <div className="card-logo">{session.logo}</div>
              <h4>{session.topic}</h4>
              <p>{session.time}</p>
              <span className={`session-tag ${session.tag.toLowerCase()}`}>{session.tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Mentors Section */}
      <div className="top-mentors unique-section">
        <h3>🏅 Top Mentors 🏅</h3>
        <div className="mentor-cards">
          {topMentors.map((mentor) => (
            <div key={mentor.id} className="mentor-card">
              <div className="card-symbol">{mentor.symbol}</div>
              <h4>{mentor.name}</h4>
              <p>{mentor.expertise}</p>
              <p className="mentor-experience">🕒 {mentor.experience}</p>
              <a
                href={mentor.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mentor-link"
              >
                View Profile
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopMentorsTrendingSession;


