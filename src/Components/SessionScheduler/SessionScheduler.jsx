import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "./SessionScheduler.css";

const SessionScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionDetails, setSessionDetails] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  // Load sessions for the logged-in user from the backend
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true);

        // Get user ID from localStorage
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const userId = userDetails?.userId;

        if (!userId) {
          setErrorMessage("User ID not found. Please log in again.");
          return;
        }

        const response = await fetch(`http://localhost:8080/api/sessions/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setSessionDetails(data);
        } else {
          const errorText = await response.text();
          console.error("Failed to fetch sessions:", errorText);
          setErrorMessage("Failed to load sessions.");
        }
      } catch (error) {
        console.error("Error fetching sessions:", error);
        setErrorMessage("An error occurred while fetching sessions.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  // Handle session submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTime || !topic || !description) {
      setErrorMessage("Please fill in all the fields!");
      return;
    }

    // Get user ID from localStorage
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const userId = userDetails?.userId;

    if (!userId) {
      setErrorMessage("User ID not found. Please log in again.");
      return;
    }

    const sessionData = {
      date: selectedDate.toDateString(),
      time: selectedTime,
      topic,
      description,
    };

    try {
      setIsLoading(true);
      setErrorMessage(""); // Clear previous errors
      const response = await fetch(`http://localhost:8080/api/sessions?userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionData),
      });

      if (response.ok) {
        const savedSession = await response.json();
        setSessionDetails([...sessionDetails, savedSession]); // Add new session to list
        setSubmitted(true);

        // Clear inputs
        setTopic("");
        setSelectedTime("");
        setDescription("");

        setTimeout(() => setSubmitted(false), 3000); // Reset success message
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText); // Display backend error message
      }
    } catch (error) {
      console.error("Error scheduling session:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle session deletion
  const handleRemoveSession = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/sessions/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSessionDetails(sessionDetails.filter((session) => session.id !== id));
      } else {
        const errorText = await response.text();
        alert(`Failed to delete session: ${errorText}`);
      }
    } catch (error) {
      console.error("Error deleting session:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="session-scheduler-container">
      <div className="session-scheduler-form">
        <h2>Schedule a Mentorship Session</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Select a Date</label>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="border rounded"
            />
            <p className="selected-date">Selected Date: {selectedDate.toDateString()}</p>
          </div>
          <div className="mb-4">
            <label>Select a Time</label>
            <TimePicker
              onChange={setSelectedTime}
              value={selectedTime}
              className="border rounded"
              disableClock={true}
            />
          </div>
          <div className="mb-4">
            <label>Topic</label>
            <input
              type="text"
              placeholder="Enter topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label>Description</label>
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Show errors */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Schedule Session"}
          </button>
        </form>
        {submitted && <p className="success-message">Session scheduled successfully!</p>}
      </div>

      <div className="scheduled-sessions">
        <h3>Scheduled Sessions</h3>
        {isLoading && sessionDetails.length === 0 ? (
          <p>Loading sessions...</p>
        ) : sessionDetails.length === 0 ? (
          <p>No sessions scheduled yet.</p>
        ) : (
          <ul>
            {sessionDetails.map((session) => (
              <li key={session.id} className="session-item">
                <p>
                  <strong>Date:</strong> {session.date}
                </p>
                <p>
                  <strong>Time:</strong> {session.time}
                </p>
                <p>
                  <strong>Topic:</strong> {session.topic}
                </p>
                <p>
                  <strong>Description:</strong> {session.description}
                </p>
                <button
                  onClick={() => handleRemoveSession(session.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SessionScheduler;






