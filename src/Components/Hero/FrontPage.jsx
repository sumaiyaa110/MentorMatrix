import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FrontPage.css"; // CSS file for styling the front page
import svgImage from "../../assets/front page img 4.svg"; // Replace with the path to your SVG image

const FrontPage = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ["Connect", "Learn", "Grow"]; // Words to dynamically cycle
  const navigate = useNavigate(); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="front-page">
      <div className="content">
        <h2 className="platform-name">MentorMatrix</h2>
        <h5>Empowering Growth Through Mentorship</h5>
        <h1>{words[currentWordIndex]}</h1>
        <p>
          <center>
            Streamline your mentoring process with seamless session scheduling,
            expertise management, and transparent mentor profiles.
          </center>
        </p>
        <center>
          {/* Add onClick to navigate to /mentor-registration */}
          <button
            className="get-started-btn"
            onClick={() => navigate("/mentor-registration")}
          >
            Join as a Mentor
          </button>
        </center>
      </div>
      <div className="image-container">
        <img src={svgImage} alt="Mentorship" className="svg-image" />
      </div>
    </div>
  );
};

export default FrontPage;
