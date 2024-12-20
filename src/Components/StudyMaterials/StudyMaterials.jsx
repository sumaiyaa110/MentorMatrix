import React from "react";
import "./StudyMaterials.css";

const studyMaterials = [
  {
    session: "Cybersecurity Basics",
    links: [
      { title: "Cybrary - Cybersecurity Basics", url: "https://www.cybrary.it/course/cyber-security/" },
      { title: "Coursera - Cybersecurity Courses", url: "https://www.coursera.org/browse/information-technology/cyber-security" },
      { title: "edX - Introductory Cybersecurity", url: "https://www.edx.org/learn/cybersecurity" }
    ]
  },
  {
    session: "Web Development Essentials",
    links: [
      { title: "freeCodeCamp - Full Stack Web Development", url: "https://www.freecodecamp.org/" },
      { title: "MDN Web Docs - Web Development", url: "https://developer.mozilla.org/en-US/docs/Web/Guide" },
      { title: "Codecademy - Web Development", url: "https://www.codecademy.com/learn/paths/web-development" }
    ]
  },
  {
    session: "Cloud Computing Fundamentals",
    links: [
      { title: "AWS Training and Certification - Cloud Computing", url: "https://aws.amazon.com/training/intro_to_cloud/" },
      { title: "Google Cloud Training - Cloud Fundamentals", url: "https://cloud.google.com/training" },
      { title: "Microsoft Learn - Cloud Computing", url: "https://learn.microsoft.com/en-us/training/paths/azure-fundamentals/" }
    ]
  }
];

const StudyMaterials = () => {
  return (
    <div className="study-materials">
      <h2>Study Materials</h2>

      {/* Study Material List */}
      <div className="study-materials-content">
        {studyMaterials.map((data, index) => (
          <div key={index} className="session-materials">
            <h3>{data.session}</h3>
            <ul>
              {data.links.map((link, linkIndex) => (
                <li key={linkIndex} className="study-link-item">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyMaterials;

