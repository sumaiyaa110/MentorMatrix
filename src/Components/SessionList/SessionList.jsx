import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SessionList.css";
import artificialImage from "../../images/AI.jpeg";
import CybersecurityImage from "../../images/cybersecurity.jpeg";
import DataScienceImage from "../../images/DataScience.jpeg";
import DataStructureImage from "../../images/datastructure.jpeg";
import HighvoltageImage from "../../images/highvoltage.jpeg";
import javaImage from "../../images/java.jpeg";
import microcontrollerImage from "../../images/microcontroller.jpeg";
import machinelearningImage from "../../images/MachineLearning.jpeg";
import renewableenergyImage from "../../images/renewableenergy.jpeg";
import algorithmImage from "../../images/algorithm.jpeg";
import roboticsImage from "../../images/robotics.jpeg";
const SessionList = () => {
  const [sessions, setSessions] = useState([]); // State for backend sessions
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [filterStatus, setFilterStatus] = useState("all"); // Filter state
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [showDetails, setShowDetails] = useState({}); // State to track expanded session details

  // Fetch sessions from the backend API
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8080/api/sessions");
        if (response.ok) {
          const data = await response.json();

          // Map backend sessions
          const mappedSessions = data.map((session) => ({
            id: session.id,
            title: session.topic,
            image: getSessionImage(session.topic),
            date: session.date,
            time: session.time,
            description: session.description,
            isAvailable: true, // Default availability
          }));

          setSessions(mappedSessions);
        } else {
          throw new Error("Failed to fetch sessions");
        }
      } catch (error) {
        setErrorMessage("Unable to load sessions. Please try again.");
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  // Function to dynamically assign images based on the topic
  const getSessionImage = (topic) => {
    const topicImages = {
      "Cyber Security": CybersecurityImage,
      "Data Structures": DataStructureImage,
      "Data Science": DataScienceImage,
      "High Voltage Engineering": HighvoltageImage,
      "Software Development with Java": javaImage,
      "Human-Computer Interaction": roboticsImage,
      "Machine Learning": machinelearningImage,
      "Algorithms": algorithmImage,
      "Microcontrollers and Embedded Systems": microcontrollerImage,
      "Renewable Energy Technologies": renewableenergyImage,
      "Artificial Intelligence": artificialImage,
    };

    return topicImages[topic] || "/images/default.jpeg";
  };

  // Toggle description visibility for a session
  const toggleDetails = (id) => {
    setShowDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filtered sessions
  const filteredSessions = sessions.filter((session) => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "available" && session.isAvailable) ||
      (filterStatus === "filled" && !session.isAvailable);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="session-container">
      <h1 className="session-title">Conducted Sessions</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for a session..."
        className="session-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filter Dropdown */}
      <select
        className="session-filter"
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="all">All Sessions</option>
        <option value="available">Available</option>
        <option value="filled">Filled Up</option>
      </select>

      {/* Loading, Error, or Sessions Grid */}
      {isLoading ? (
        <p>Loading sessions...</p>
      ) : errorMessage ? (
        <p className="error-message">{errorMessage}</p>
      ) : filteredSessions.length > 0 ? (
        <div className="session-grid">
          {filteredSessions.map((session) => (
            <div key={session.id} className="session-thumbnail">
              <img
                src={session.image}
                alt={session.title}
                className="thumbnail-image"
              />
              <div className="thumbnail-title">{session.title}</div>
              <div>
                <p>
                  <strong>Date:</strong> {session.date}
                </p>
                <p>
                  <strong>Time:</strong> {session.time}
                </p>
              </div>
              <button
                onClick={() => toggleDetails(session.id)}
                className="details-button bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
              >
                {showDetails[session.id] ? "Hide Details" : "View Details"}
              </button>
              {showDetails[session.id] && (
                <div className="thumbnail-description">
                  <p>
                    <strong>Description:</strong> {session.description}
                  </p>
                </div>
              )}
              <div
                className={`thumbnail-status ${
                  session.isAvailable ? "status-available" : "status-filled"
                }`}
              >
                {session.isAvailable ? "Available" : "Filled Up"}
              </div>
              {session.isAvailable && (
                <Link to="/login">
                  <button className="enroll-button">Enroll Now</button>
                </Link>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No sessions found.</p>
      )}
    </div>
  );
};

export default SessionList;
