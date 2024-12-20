
import React from "react";
import Slider from "react-slick";
import './KeyFeatures.css'
import key1Img from "../../assets/key 1.svg"
import key2Img from "../../assets/key 2.png"
import key3Img from "../../assets/key 3.svg"
import key4Img from "../../assets/key 4.svg"


const data = [
  {
    img: key1Img, // Replace with actual image path
    heading: 'Mentor Expertise Management',
    explanation: 'Mentors can easily register their areas of expertise and input available time slots. This ensures mentees find the right mentor for specific skills or subjects, enhancing the learning experience and matching mentees with suitable mentors.'
  },
  {
    img: key2Img, // Replace with actual image path
    heading: 'Flexible Scheduling',
    explanation: 'Our platform offers a seamless scheduling experience, automatically generating sessions based on mentor availability. Mentees can browse, filter by topic, and enroll in sessions that align with their interests and availability, simplifying the process of booking quality mentoring.'
  },
  {
    img: key3Img, // Replace with actual image path
    heading: 'Feedback and Growth',
    explanation: 'After each session, mentees can provide constructive feedback and rate their mentors. This feedback loop helps mentors improve their teaching skills, while mentees use past ratings to select mentors, ensuring quality sessions and continuous improvement.'
  },
  {
    img: key4Img, // Replace with actual image path
    heading: 'Session Repository',
    explanation: 'All session resources, including video recordings, notes, and any shared documents, are securely stored in a session repository. Mentees can access these materials anytime, allowing them to revisit valuable content for continuous learning and reinforcement.'
  }
];


export default function KeyFeatures() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <div className="key-features">
      <h1><center>Key Features</center></h1>
      <Slider {...settings}>
        {data.map((feature, index) => (
          <div key={index} className="feature-card">
            <img src={feature.img} alt={feature.heading} />
            <h3>{feature.heading}</h3>
            <p>{feature.explanation}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

