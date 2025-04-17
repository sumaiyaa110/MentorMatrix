import React, { useState } from "react";
import "./ScheduleNotification.css";

const ScheduleNotification = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Collect recipient groups (mentors/mentees)
    const recipients = [];
    formData.getAll("recipients").forEach((recipient) => {
      recipients.push(recipient);
    });

    const payload = {
      message: formData.get("message"),
      priority: formData.get("priority"),
      scheduleTime: formData.get("scheduleTime"),
      recipients, // Include recipients in the payload
    };

    // Make API call to Spring Boot backend
    fetch("http://localhost:8080/api/schedule-notification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to schedule notification.");
        }
        return response.json();
      })
      .then(() => {
        setSuccessMessage("Notification Scheduled Successfully!");
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage("Error: " + error.message);
        setSuccessMessage("");
      });
  };

  return (
    <div className="notification-container">
      <form onSubmit={handleSubmit} className="schedule-form">
        <h2>Schedule a Notification</h2>
        
        <input 
          type="text" 
          name="message" 
          placeholder="Message" 
          required 
        />
        
        <select name="priority" required>
          <option value="normal">Normal</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
        
        <input 
          type="datetime-local" 
          name="scheduleTime" 
          required 
        />
        
        <div className="recipients">
          <label>
            <input 
              type="checkbox" 
              name="recipients" 
              value="mentors" 
            />
            Mentors
          </label>
          <label>
            <input 
              type="checkbox" 
              name="recipients" 
              value="mentees" 
            />
            Mentees
          </label>
        </div>
        
        <button type="submit">Schedule</button>
      </form>

      {/* Display success or error messages */}
      {successMessage && (
        <p className="success-message">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}
    </div>
  );
};

export default ScheduleNotification;
