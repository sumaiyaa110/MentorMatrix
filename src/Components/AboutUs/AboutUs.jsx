import React from "react";
import "./AboutUs.css";

import AdnanImage from "../../assets/mentor1.jpeg";
import TanishaImage from "../../assets/mentor2.jpeg";
import AhmedImage from "../../assets/mentor3.jpeg";
import RaisahImage from "../../assets/mentee1.jpeg";

const AboutUs = () => {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p>
        Welcome to MentorMatrix, our mentorship platform! We are dedicated to connecting mentors and mentees 
        to foster growth and learning. Our mission is to create a supportive environment 
        where knowledge can be shared and professional relationships can flourish.
      </p>
      <p>
        Our mentors are experienced professionals from various fields, 
        ready to guide you in your learning journey. Whether you're looking to gain new skills, 
        explore career paths, or enhance your expertise, you're in the right place!
      </p>

      {/* Added Features */}
      <div className="features-section">
        <h2>Why Choose MentorMatrix?</h2>
        <ul className="features-list">
          <li>
            <span>🎯</span> Personalized mentorship tailored to your goals.
          </li>
          <li>
            <span>🌟</span> Access to a network of experienced professionals.
          </li>
          <li>
            <span>📈</span> Opportunities to grow and advance in your career.
          </li>
          <li>
            <span>🤝</span> A supportive community that fosters collaboration.
          </li>
          <li>
            <span>🚀</span> Advanced tools and analytics to track your progress.
          </li>
          <li>
            <span>📚</span> Access to exclusive learning resources and workshops.
          </li>
        </ul>
      </div>

      <div className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img
              src={AdnanImage}
              alt="Adnan Karim"
              className="team-image"
            />
            <h3>Adnan Karim</h3>
            <p>Co-Founder & CEO</p>
          </div>
          <div className="team-member">
            <img
              src={TanishaImage}
              alt="Tanisha Islam"
              className="team-image"
            />
            <h3>Tanisha Islam</h3>
            <p>Mentorship Coordinator</p>
          </div>
          <div className="team-member">
            <img
              src={AhmedImage}
              alt="Ahmed Ali"
              className="team-image"
            />
            <h3>Ahmed Ali</h3>
            <p>Technical Advisor</p>
          </div>
          <div className="team-member">
            <img
              src={RaisahImage} 
              alt="Raisah Fatima"
              className="team-image"
            />
            <h3>Raisah Fatima</h3>
            <p>Community Manager</p>
          </div>
        </div>
      </div>

      <div className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonial">
          <p>
            "MentorMatrix has completely transformed my career path. The personalized guidance I received was invaluable!"
          </p>
          <h4>- Sara Fatima</h4>
        </div>
        <div className="testimonial">
          <p>
            "I found amazing mentors who genuinely care about my growth. Highly recommend this platform!"
          </p>
          <h4>- Amina Khan</h4>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join our community and take your skills to the next level!</p>
        <a href="/signup" className="cta-button">Join Now</a>
      </div>
    </div>
  );
};

export default AboutUs;
