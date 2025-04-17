import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AvailableMentors.css";
import johnimage from "../../assets/mentor1.jpeg";
import leeimage from "../../assets/mentor3.jpeg";
import anisulimage from "../../assets/mentee2.jpeg";
import nafisaimage from "../../assets/mentee3.jpeg";
import tasfiaimage from "../../assets/mentor5.jpeg";
import tahmimaimage from "../../assets/mentor2.jpeg";
import rakibimage from "../../assets/mentor 3.jpg";
import ayeshaimage from "../../assets/mentor 6.jpg";
import nusratimage from "../../assets/mentor 5.jpg";
import shamimimage from "../../assets/mentor 4.jpg";

const AvailableMentors = () => {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterExpertise, setFilterExpertise] = useState("");
  const [chatMentor, setChatMentor] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [ratings, setRatings] = useState({});

  // Mock data for conducted sessions and ratings
  const mockData = {
    "John Doe": {
      conductedSessions: ["React Basics", "Advanced JavaScript"],
      rating: 4.5,
    },
    "Alexander Lee": {
      conductedSessions: ["Python for Data Science", "Machine Learning 101"],
      rating: 4.2,
    },
    "Anisul Islam": {
      conductedSessions: ["Data Structures Overview", "Algorithms Basics"],
      rating: 4.4,
    },
    "Nafisa Nawar": {
      conductedSessions: ["Semiconductor Basics", "Device Fabrication"],
      rating: 4.6,
    },
    "Tasfia Khanom": {
      conductedSessions: ["Intro to Figma", "Design Systems"],
      rating: 4.7,
    },
    "Tahmima Haque": {
      conductedSessions: ["Database Essentials", "Advanced SQL"],
      rating: 4.3,
    },
    "Rakib Hasan": {
      conductedSessions: ["Full-Stack Development", "Modern Web Frameworks"],
      rating: 4.8,
    },
    "Nusrat Jahan": {
      conductedSessions: ["AI for Beginners", "Deep Learning Fundamentals"],
      rating: 4.9,
    },
    "Shamim Reza": {
      conductedSessions: ["Machine Learning 101", "Advanced AI Models"],
      rating: 4.5,
    },
    "Ayesha Akter": {
      conductedSessions: ["Mobile App Basics", "Flutter Overview"],
      rating: 4.4,
    },
  };

  const mockImages = {
    "John Doe": johnimage,
    "Alexander Lee": leeimage,
    "Anisul Islam": anisulimage,
    "Nafisa Nawar": nafisaimage,
    "Tasfia Khanom": tasfiaimage,
    "Tahmima Haque": tahmimaimage,
    "Rakib Hasan": rakibimage,
    "Nusrat Jahan":nusratimage,
    "Shamim Reza":shamimimage,
    "Ayesha Akter":ayeshaimage
  };

  // Fetch mentors from the backend and enrich data
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/mentor");
        const enrichedData = response.data.map((mentor) => ({
          ...mentor,
          profileImage: mockImages[mentor.name] || "",
          conductedSessions: mockData[mentor.name]?.conductedSessions || [],
          rating: mockData[mentor.name]?.rating || 4.0, // Default rating
        }));
        setMentors(enrichedData);
        setFilteredMentors(enrichedData);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, []);

  // Filter mentors based on search term and expertise
  useEffect(() => {
    const results = mentors.filter(
      (mentor) =>
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterExpertise === "" || mentor.expertise === filterExpertise)
    );
    setFilteredMentors(results);
  }, [searchTerm, filterExpertise, mentors]);

  const handleSendMessage = () => {
    alert(`Message sent to ${chatMentor.name}: "${newMessage}"`);
    setNewMessage("");
    setChatMentor(null);
  };

  const handleRateMentor = (mentor, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [mentor.name]: rating,
    }));
    alert(`You rated ${mentor.name} ${rating} stars!`);
  };

  return (
    <div className="available-mentors-container">
      <h1>Available Mentors</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterExpertise}
          onChange={(e) => setFilterExpertise(e.target.value)}
        >
          <option value="">All Expertise</option>
          {[...new Set(mentors.map((mentor) => mentor.expertise))].map(
            (expertise, index) => (
              <option key={index} value={expertise}>
                {expertise}
              </option>
            )
          )}
        </select>
      </div>
      <div className="mentors-list">
        {filteredMentors.map((mentor) => (
          <div className="mentor-card" key={mentor.id}>
            {mentor.profileImage && (
              <img
                src={mentor.profileImage}
                alt={`${mentor.name}'s profile`}
                className="profile-picture"
              />
            )}
            <h2>{mentor.name}</h2>
            <p>
              <strong>Expertise:</strong> {mentor.expertise}
            </p>
            <p>
              <strong>Email:</strong> {mentor.email}
            </p>
            <p>
              <strong>Sessions Conducted:</strong> {mentor.conductedSessions.length}
            </p>
            <p>
              <strong>Rating:</strong> {mentor.rating} ★
            </p>
            <button onClick={() => setChatMentor(mentor)}>Message Mentor</button>
            <button onClick={() => handleRateMentor(mentor, 5)}>Rate 5★</button>
          </div>
        ))}
      </div>
      {chatMentor && (
        <div className="modal" onClick={() => setChatMentor(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setChatMentor(null)}>
              &times;
            </span>
            <h2>Message {chatMentor.name}</h2>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write your message here..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableMentors;

