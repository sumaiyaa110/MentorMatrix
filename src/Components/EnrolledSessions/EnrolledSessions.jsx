import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./EnrolledSessions.module.css";

// Importing video files
import videoCyberSecurity from "../../assets/videos/session2.mp4";
import videoDataScience from "../../assets/videos/session1.mp4";

// Mapping session topics to video imports
const topicToVideoMap = {
  "Cyber Security": videoCyberSecurity,
  "Data Structures": videoDataScience,
  "Data Science":  videoDataScience,
};

const EnrolledSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("upcoming"); // 'upcoming' or 'past'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolledSessions = async () => {
      const userDetailsString = localStorage.getItem("userDetails");

      if (!userDetailsString) {
        setError("User not logged in. Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
        setLoading(false);
        return;
      }

      const userDetails = JSON.parse(userDetailsString);
      const userId = userDetails?.userId;

      try {
        // Fetch enrolled sessions from the backend
        const response = await axios.get(`http://localhost:8080/api/enrollments/mentee/${userId}/sessions`);
        setSessions(response.data);
      } catch (err) {
        console.error("Error fetching enrolled sessions:", err.response || err.message || err);
        setError("Error fetching enrolled sessions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledSessions();
  }, [navigate]);

  const handleUnenroll = async (enrollmentId, sessionId) => {
    try {
      await axios.delete(`http://localhost:8080/api/enrollments/${enrollmentId}`);
      console.log(`Successfully unenrolled from session ${sessionId}`);

      setSessions((prevSessions) =>
        prevSessions.filter((session) => session.enrollments[0]?.id !== enrollmentId)
      );
    } catch (err) {
      console.error("Error unenrolling:", err.response || err.message || err);
      alert("Failed to unenroll. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const currentDate = new Date();
  const upcomingSessions = sessions.filter((session) => new Date(session.date) >= currentDate);
  const pastSessions = sessions.filter((session) => new Date(session.date) < currentDate);

  const displayedSessions = filter === "upcoming" ? upcomingSessions : pastSessions;

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>My Enrolled Sessions</h2>

      {/* Filter Options */}
      <div className={styles.filterContainer}>
        <button
          className={`${styles.filterButton} ${filter === "upcoming" ? styles.activeFilter : ""}`}
          onClick={() => setFilter("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`${styles.filterButton} ${filter === "past" ? styles.activeFilter : ""}`}
          onClick={() => setFilter("past")}
        >
          Past
        </button>
      </div>

      {displayedSessions.length > 0 ? (
        <ul className={styles.sessionList}>
          {displayedSessions.map((session) => {
            const enrollment = session.enrollments.find(
              (enrollment) => enrollment.user.id === JSON.parse(localStorage.getItem("userDetails")).userId
            );

            // Get the video file based on the session topic
            const videoFile = topicToVideoMap[session.topic];

            return (
              <li className={styles.sessionItem} key={session.id}>
                <h3 className={styles.sessionTitle}>{session.topic}</h3>
                <p className={styles.sessionDetails}>{session.description}</p>
                <p className={styles.sessionDetails}>
                  <strong>Date:</strong> {session.date}
                </p>
                <p className={styles.sessionDetails}>
                  <strong>Time:</strong> {session.time}
                </p>
                <p className={styles.sessionDetails}>
                  <strong>Mentor:</strong> {`${session.user.firstName} ${session.user.lastName}`}
                </p>
                <p className={`${styles.sessionDetails} ${styles.slots}`}>
                  <strong>Current Slots:</strong> {session.currentSlots} / {session.maxSlots}
                </p>
                <p className={`${styles.sessionDetails} ${styles.status}`}>
                  <strong>Status:</strong> {filter === "past" ? "Completed" : enrollment?.status || "N/A"}
                </p>

                {/* Video for Past Sessions */}
                {filter === "past" && videoFile && (
                  <div className={styles.videoContainer}>
                    <h4>Session Video:</h4>
                    <video controls className={styles.videoPlayer}>
                      <source src={videoFile} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                {/* Unenroll Button for Upcoming Sessions */}
                {filter === "upcoming" && (
                  <button
                    className={styles.unenrollButton}
                    onClick={() => handleUnenroll(enrollment.id, session.id)}
                  >
                    Unenroll
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={styles.noSessions}>
          {filter === "upcoming" ? "No upcoming sessions found." : "No past sessions found."}
        </p>
      )}
    </div>
  );
};

export default EnrolledSessions;
