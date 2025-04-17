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
import timeImage from "../../images/timemanagement.jpeg";
import speakingImage from "../../images/publicspeaking.jpeg";
import FigmaImage from "../../images/Figma.jpeg";
import writingImage from "../../images/creative.jpeg";
import codingImage from "../../images/cracking.jpeg";
import BlockchainImage from "../../images/Blockchain.jpeg";
import careerImage from "../../images/career.jpeg";
import DigitalArtImage from "../../images/DigitalArt.jpeg";
import LinkedinImage from "../../images/Linkedin.jpeg";
import Biochemistry from "../../images/molecular-biology-vs-biochemistry-in-bsc (1).jpg";

const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("upcoming");
  const [sortCriteria, setSortCriteria] = useState("date");
  const [availabilityRange, setAvailabilityRange] = useState({ start: "", end: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDetails, setShowDetails] = useState({});
  const [selectedMentor, setSelectedMentor] = useState(null);

  const mentorMapping = {
    "Anisul Islam": {
      name: "Anisul Islam",
      expertise: "Cybersecurity, Network Security",
      sessions: ["Cyber Security", "Data Science", "Renewable Energy Technologies"],
      linkedin: "https://linkedin.com/in/anisulislam",
      github: "https://github.com/anisulislam",
    },
    "Prof. Alexander Lee": {
      name: "Prof. Alexander Lee",
      expertise: "Data Structures, Algorithms",
      sessions: ["Data Structures", "Algorithms"],
      linkedin: "https://linkedin.com/in/alexanderlee",
      github: "https://github.com/alexanderlee",
    },
    "Dr. John Doe": {
      name: "Dr. John Doe",
      expertise: "Web Development",
      sessions: ["Software Development with Java"],
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
    },
    "Ms. Tahmima Haque": {
      name: "Ms. Tahmima Haque",
      expertise: "High Voltage Engineering, Power Systems",
      sessions: ["High Voltage Engineering", 'Human-Computer Interaction', 'High Voltage Engineering', 'Microcontrollers and Embedded Systems'],
      linkedin: "https://linkedin.com/in/tahmimahaque",
      github: "https://github.com/tahmimahaque",
    },
    "Mr. Rakib Hasan": {
      name: "Mr. Rakib Hasan",
      expertise: "Machine Learning, Artificial Intelligence",
      sessions: ['Artificial Intelligence', "Machine Learning"],
      linkedin: "https://linkedin.com/in/hasanrakib",
      github: "https://github.com/hasanrakib",
    },

    "Ms. Ayesha Akter": {
      name: "Ms. Ayesha Akter",
      expertise: "Biochemistry",
      sessions: ["Biochemistry and Molecular Biology", "IoT Applications"],
      linkedin: "https://linkedin.com/in/ayeshaakter",
      github: "https://github.com/akterayesha",
    },

    "Mr. Shamim Reza": {
      name: "Mr. Shamim Reza",
      expertise: "Public Speaking, Career Development",
      sessions: ["Public Speaking for Career Growth", "Navigating Career Transitions Successfully"],
      linkedin: "https://linkedin.com/in/rezashamim",
      github: "https://github.com/rezashamim",
    },
    "Ms. Nusrat Jahan": {
      name: "Ms. Nusrat Jahan",
      expertise: "Time Management, Productivity",
      sessions: ["Effective Time Management for Students", "LinkedIn Optimization: Build Your Professional Profile","Creative Writing: Crafting Compelling Stories"],
      linkedin: "https://linkedin.com/in/nusratjahan",
      github: "https://github.com/nusratjahan",
    },
    "Ms. Tasfia Khanom": {
      name: "Ms. Tasfia Khanom",
      expertise: "Cracking Coding Interviews, Software Engineering",
      sessions: ["Cracking the Coding Interview", 'Exploring Blockchain: Beyond Cryptocurrency'],
      linkedin: "https://linkedin.com/in/khanomtasfia",
      github: "https://github.com/khanomtasfia",
    },
    "Ms. Nafisa Nawar": {
      name: "Ms. Nafisa Nawar",
      expertise: "Designing User Interfaces, Computer Science",
      sessions: ["Designing Stunning User Interfaces with Figma", 'Introduction to Digital Art'],
      linkedin: "https://linkedin.com/in/nawarnafisa",
      github: "https://github.com/nawarnafisa",
    },
  };

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8080/api/sessions");
        if (response.ok) {
          const data = await response.json();
          const mappedSessions = data.map((session) => ({
            id: session.id,
            title: session.topic,
            image: getSessionImage(session.topic),
            date: new Date(session.date),
            time: session.time,
            description: session.description,
            mentor: Object.keys(mentorMapping).find((key) =>
              mentorMapping[key].sessions.includes(session.topic)
            ) || "Unknown Mentor", // Dynamically assign mentor
            isAvailable: true,
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
      "Effective Time Management for Students": timeImage,
      "Public Speaking for Career Growth": speakingImage,
      "Designing Stunning User Interfaces with Figma": FigmaImage,
      "Creative Writing: Crafting Compelling Stories": writingImage,
      "Cracking the Coding Interview": codingImage,
      "Navigating Career Transitions Successfully": careerImage,
      "Introduction to Digital Art": DigitalArtImage,
      "Exploring Blockchain: Beyond Cryptocurrency": BlockchainImage,
      "Biochemistry and Molecular Biology" : Biochemistry,
      "LinkedIn Optimization: Build Your Professional Profile": LinkedinImage,
    };
    return topicImages[topic] || "/images/default.jpeg";
  };
  const toggleDetails = (id) => {
    setShowDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleMentorClick = (mentorName) => {
    setSelectedMentor(mentorMapping[mentorName]);
  };

  const closeMentorModal = () => {
    setSelectedMentor(null);
  };

  const filteredSessions = sessions
    .filter((session) => {
      const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterStatus === "all" ||
        (filterStatus === "available" && session.isAvailable) ||
        (filterStatus === "upcoming" && session.date >= new Date());
      const matchesRange =
        (!availabilityRange.start || session.date >= new Date(availabilityRange.start)) &&
        (!availabilityRange.end || session.date <= new Date(availabilityRange.end));
      return matchesSearch && matchesFilter && matchesRange;
    })
    .sort((a, b) => {
      if (sortCriteria === "date") {
        return a.date - b.date;
      } else if (sortCriteria === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <div className="session-container">
      <h1 className="session-title">Conducted Sessions</h1>

      <input
        type="text"
        placeholder="Search for a session..."
        className="session-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        className="session-filter"
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="upcoming">Upcoming Sessions</option>
        <option value="all">All Sessions</option>
        <option value="available">Available</option>
      </select>

      <select
        className="session-sort"
        value={sortCriteria}
        onChange={(e) => setSortCriteria(e.target.value)}
      >
        <option value="date">Sort by Date</option>
        <option value="title">Sort by Title</option>
      </select>

      <div className="availability-range">
        <label>Start Date:</label>
        <input
          type="date"
          value={availabilityRange.start}
          onChange={(e) => setAvailabilityRange({ ...availabilityRange, start: e.target.value })}
        />
        <label>End Date:</label>
        <input
          type="date"
          value={availabilityRange.end}
          onChange={(e) => setAvailabilityRange({ ...availabilityRange, end: e.target.value })}
        />
      </div>

      {isLoading ? (
        <p>Loading sessions...</p>
      ) : errorMessage ? (
        <p className="error-message">{errorMessage}</p>
      ) : filteredSessions.length > 0 ? (
        <div className="session-grid">
          {filteredSessions.map((session) => (
            <div key={session.id} className="session-thumbnail">
              <img src={session.image} alt={session.title} className="thumbnail-image" />
              <div className="thumbnail-title">{session.title}</div>
              <div>
                <p>
                  <strong>Date:</strong> {session.date.toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {session.time}
                </p>
                <p>
                  <strong>Mentor:</strong>{" "}
                  <span
                    className="mentor-name"
                    onClick={() => handleMentorClick(session.mentor)}
                  >
                    {session.mentor}
                  </span>
                </p>
              </div>
              <button onClick={() => toggleDetails(session.id)} className="details-button">
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

      {selectedMentor && (
        <div className="mentor-modal">
          <div className="mentor-modal-content">
            <button className="close-button" onClick={closeMentorModal}>
              ×
            </button>
            <h2>{selectedMentor.name}</h2>
            <p>
              <strong>Expertise:</strong> {selectedMentor.expertise}
            </p>
            <p>
              <strong>Conducted Sessions:</strong> {selectedMentor.sessions.join(", ")}
            </p>
            <p>
              <strong>LinkedIn:</strong>{" "}
              <a href={selectedMentor.linkedin} target="_blank" rel="noopener noreferrer">
                {selectedMentor.linkedin}
              </a>
            </p>
            <p>
              <strong>GitHub:</strong>{" "}
              <a href={selectedMentor.github} target="_blank" rel="noopener noreferrer">
                {selectedMentor.github}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionList;
