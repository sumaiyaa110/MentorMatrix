import React, { useState } from "react";
import "./CaseStudies.css";
import mentee1 from '../../assets/mentee1.jpeg'; // Update the path to the mentee's image
import mentee2 from '../../assets/mentee2.jpeg'; // Update the path to the mentee's image
import mentee3 from '../../assets/mentee3.jpeg'; // Update the path to the mentee's image

function CaseStudies() {
  const [caseStudies] = useState([
    {
      id: 1,
      title: "Empowering Local Communities with IoT Solutions",
      description:
        "This project leverages IoT to improve water management in rural areas, fostering sustainability and collaboration.",
      methodologies: "Agile development, IoT sensor integration",
      outcomes: "50% reduction in water wastage, improved data-driven decision-making.",
      lessons: "Importance of user-centric design and continuous feedback.",
      author: "Mursal Jalaly",
      image: mentee3, // Correct property
      tags: ["Technology", "Sustainability"],
      date: "2024-10-15",
    },
    {
      id: 2,
      title: "Bridging the Education Gap Through E-Learning Platforms",
      description:
        "A comprehensive e-learning solution to make quality education accessible to underserved communities.",
      methodologies: "SCRUM methodology, content gamification",
      outcomes: "25% increase in student engagement, 15% improvement in test scores.",
      lessons: "Iterative content development and feedback loops enhance engagement.",
      author: "Anas Abdullah",
      image: mentee2, // Correct property
      tags: ["Education", "Technology"],
      date: "2024-11-10",
    },
    {
      id: 3,
      title: "Collaborative Urban Sustainability Hackathon",
      description:
        "An event bringing together innovators to design tech-driven solutions for urban challenges.",
      methodologies: "Hackathon, rapid prototyping",
      outcomes: "10 actionable projects, 3 of which secured funding for implementation.",
      lessons: "Cross-disciplinary collaboration leads to diverse, innovative solutions.",
      author: "Kiswar Sultana",
      image: mentee1, // Correct property
      tags: ["Innovation", "Collaboration"],
      date: "2024-12-01",
    },
  ]);

  return (
    <div className="case-studies-container">
      <h1>Case Studies</h1>
      <p>
        Showcasing our achievements in fostering innovation, collaboration, and
        social impact through technology. Gain insights into our methodologies,
        outcomes, and lessons learned.
      </p>

      <div className="case-studies">
        {caseStudies.map((study) => (
          <div key={study.id} className="case-study">
            <div className="case-header">
              <div className="avatar">
                <img src={study.image} alt={`Avatar of ${study.author}`} />
              </div>
              <div>
                <h3>{study.title}</h3>
                <p>by {study.author}</p>
                <p className="date">{new Date(study.date).toLocaleDateString()}</p>
              </div>
            </div>
            <p className="description">{study.description}</p>
            <div className="case-details">
              <div>
                <strong>Methodologies:</strong>
                <p>{study.methodologies}</p>
              </div>
              <div>
                <strong>Outcomes:</strong>
                <p>{study.outcomes}</p>
              </div>
              <div>
                <strong>Lessons Learned:</strong>
                <p>{study.lessons}</p>
              </div>
            </div>
            <div className="tags">
              {study.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CaseStudies;