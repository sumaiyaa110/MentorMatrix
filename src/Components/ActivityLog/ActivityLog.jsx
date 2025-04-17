import React, { useState, useEffect } from "react";
import "./ActivityLog.css";

const ActivityLog = () => {
  const [activities, setActivities] = useState({
    pastSessions: [],
    feedbackGiven: [],
    completedQuizzes: [],
    certificates: [],
  });

  useEffect(() => {
    // Fetch data from localStorage
    const storedData = localStorage.getItem("activityLog");
    if (storedData) {
      setActivities(JSON.parse(storedData));
    } else {
      // If no data exists, you can set default data
      const dummyData = {
        pastSessions: [
          {
            title: "Data Science",
            mentor: "Anisul Islam",
            date: "2024-12-15",
            time: "10:00 AM",
            status: "Completed",
            sessionSummary: "Covered basics of Data Science.",
          },
          {
            title: "Cyber Security",
            mentor: "Anisul Islam",
            date: "2024-12-10",
            time: "2:00 PM",
            status: "Missed",
            sessionSummary: "",
          },
        ],
        feedbackGiven: [
          {
            sessionTitle: "Data Science",
            feedback: "Excellent session, very informative.",
            date: "2024-12-15",
          },
        ],
        completedQuizzes: [
          {
            quizTitle: "Data Science Quiz",
            score: "85%",
            date: "2024-12-16",
          },
        ],
        certificates: [
          {
            title: "Certificate in Data Science",
            issuedDate: "2024-12-20",
            downloadLink: "http://example.com/certificate.pdf",
          },
        ],
      };
      localStorage.setItem("activityLog", JSON.stringify(dummyData));
      setActivities(dummyData);
    }
  }, []);

  return (
    <div className="activity-log">
      <h2>Activity Log</h2>

      <section className="log-section">
        <h3>Past Sessions</h3>
        <ul>
          {activities.pastSessions.map((session, index) => (
            <li key={index}>
              <strong>{session.title}</strong> with {session.mentor} on {session.date} at {session.time} - {session.status}
              {session.sessionSummary && <p><i>Summary: {session.sessionSummary}</i></p>}
            </li>
          ))}
        </ul>
      </section>

      <section className="log-section">
        <h3>Feedback Given</h3>
        <ul>
          {activities.feedbackGiven.map((feedback, index) => (
            <li key={index}>
              Feedback for <strong>{feedback.sessionTitle}</strong>: {feedback.feedback} <br />
              <i>Date: {feedback.date}</i>
            </li>
          ))}
        </ul>
      </section>

      <section className="log-section">
        <h3>Completed Quizzes</h3>
        <ul>
          {activities.completedQuizzes.map((quiz, index) => (
            <li key={index}>
              {quiz.quizTitle} - Score: {quiz.score} <br />
              <i>Date: {quiz.date}</i>
            </li>
          ))}
        </ul>
      </section>

      <section className="log-section">
        <h3>Certificates Earned</h3>
        <ul>
          {activities.certificates.map((certificate, index) => (
            <li key={index}>
              {certificate.title} - Issued on {certificate.issuedDate} <br />
              <a href={certificate.downloadLink} target="_blank" rel="noopener noreferrer">
                Download Certificate
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ActivityLog;
