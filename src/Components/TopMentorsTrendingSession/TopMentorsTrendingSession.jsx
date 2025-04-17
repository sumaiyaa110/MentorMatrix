import React from "react";
import "./TopMentorsTrendingSession.css";
import mentor1 from '../../assets/mentor1.jpeg'; // Update the path to the mentor's image
import mentor2 from '../../assets/mentor2.jpeg'; // Update the path to the mentor's image
import mentor5 from '../../assets/mentor5.jpeg';
import mentor3 from '../../assets/mentor3.jpeg';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

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
      experience: "7+ years",
      link: "https://example.com/mahmudur-rahman",
      image: mentor1,
      github: "https://github.com/mahmudur-rahman",
      linkedin: "https://linkedin.com/in/mahmudur-rahman"
    },
    {
      id: 2,
      name: "Dr. Shahanaz Rahman",
      expertise: "Quantum Computing",
      symbol: "👩‍🔬",
      experience: "6+ years",
      link: "https://example.com/shahanaz-rahman",
      image: mentor2,
      github: "https://github.com/shahanaz-rahman",
      linkedin: "https://linkedin.com/in/shahanaz-rahman"
    },
    {
      id: 3,
      name: "Dr. Faria Islam",
      expertise: "Blockchain Technology",
      symbol: "👩‍💻",
      experience: "5+ years",
      link: "https://example.com/faria-islam",
      image: mentor5,
      github: "https://github.com/faria-islam",
      linkedin: "https://linkedin.com/in/faria-islam"
    },
    {
      id: 4,
      name: "Muhammed Muhsin",
      expertise: "Product Manager",
      symbol: "👩‍💻",
      experience: "4+ years",
      link: "https://example.com/muhhammed-muhsin",
      image: mentor3,
      github: "https://github.com/muhammed-muhsin",
      linkedin: "https://linkedin.com/in/muhammed-muhsin"
    }
  ];

  return (
    <div className="top-mentors-trending-session">
      {/* Trading Sessions Section */}
      <div className="trending-sessions unique-section">
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
              <img src={mentor.image} alt={`${mentor.name} Profile`} className="mentor-image" />
              <h4>{mentor.name}</h4>
              <p>{mentor.expertise}</p>
              <p className="mentor-experience">🕒 {mentor.experience}</p>
              <div className="mentor-links">
                <a href={mentor.github} target="_blank" rel="noopener noreferrer" className="mentor-link">
                  <FaGithub size={24} color="#333" />
                </a>
                <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer" className="mentor-link">
                  <FaLinkedin size={24} color="#0077b5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopMentorsTrendingSession;


