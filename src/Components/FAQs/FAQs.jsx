// FAQs.jsx
import React, { useState } from 'react';
import './FAQs.css';

const FAQs = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  const faqData = [
    { 
      question: "What is MentorMatrix?", 
      answer: "MentorMatrix is a platform that connects mentors and mentees for personalized learning experiences." 
    },
    { 
      question: "How does the mentorship process work?", 
      answer: "Mentees can explore available mentors and their sessions. Once enrolled, they can attend scheduled sessions and receive guidance from their mentors." 
    },
    { 
      question: "How do I sign up as a mentor?", 
      answer: "To sign up as a mentor, go to the signup page, select the 'Mentor' role, and complete the required profile information to highlight your expertise." 
    },
    { 
      question: "How can I find and enroll in sessions?", 
      answer: "Go to the 'Available Sessions' section in the sidebar to browse and enroll in sessions that match your learning interests." 
    },
    { 
        question: "Is MentorMatrix free to use?",
        answer: "Yes! MentorMetrix is completely free for all users. You can access all features and connect with mentors without any cost.",
       },
    { 
      question: "How do I prepare for my first session?", 
      answer: "Before your first session, review the session objectives and any materials provided by the mentor to ensure you're ready to engage and ask questions." 
    },
    { 
      question: "What topics can I find on MentorMatrix?", 
      answer: "The platform covers a wide range of topics, including Data Science, AI, Software Engineering, Cybersecurity, and more. Check the sessions page for details." 
    },
    { 
      question: "Can I reschedule a session?", 
      answer: "Yes, you can request to reschedule a session based on the mentor's availability. Reach out to your mentor in advance if a scheduling conflict arises." 
    },
    { 
      question: "How do I leave feedback for a session?", 
      answer: "After a session, mentees have the option to rate the session and provide feedback in the 'Feedback' section to help improve the experience." 
    },
    { 
      question: "Are there technical requirements for using MentorMetrix?", 
      answer: "A stable internet connection and a device with audio and video capabilities are recommended for the best experience. Use Chrome or Firefox for compatibility." 
    },
    { 
      question: "How do I contact support if I have issues?", 
      answer: "If you have any issues, go to the 'Support' section in the sidebar or contact us directly via email or phone for assistance." 
    }
  ];

  return (
    <div className="faqs-container">
      <h1>Frequently Asked Questions</h1>
      {faqData.map((faq, index) => (
        <div key={index} className="faq">
          <h2 onClick={() => toggleQuestion(index)} className="faq-question">
            {faq.question}
          </h2>
          {expandedQuestion === index && (
            <p className="faq-answer">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQs;
