import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ExploreTheCommunity.css';
import explore1 from '../../assets/Explore1.svg';
import explore2 from '../../assets/Explore2.svg';
import explore3 from '../../assets/Explore3.svg';

const ExploreTheCommunity = () => {
  const navigate = useNavigate();
  const communitySegments = [
    {
      title: 'Networking Events',
      description: 'Join us for upcoming networking events and connect with professionals in your field.',
      image: explore1,
      buttonLabel: 'View Events',
      path: '/networking-events'
    },
    {
      title: 'Blog Insights',
      description: 'Read our latest blog posts to gain insights on skill development and industry trends.',
      image: explore2,
      buttonLabel: 'Read Blogs',
      path: '/blog-insights'
    },
    {
      title: 'Case Studies',
      description: 'Explore case studies to see how mentorship has transformed the careers of students.',
      image: explore3,
      buttonLabel: 'View Case Studies',
      path: '/case-studies'
    },
  ];

  const handleButtonClick = (segment) => {
    navigate(segment.path, { state: { showEvents: segment.title === 'Networking Events' } });
  };

  return (
    <div className="explore-the-community-container">
      <h1 className="text-center text-3xl font-bold mb-8">
        <center>Explore the Community</center>
      </h1>
      <div className="community-rows">
        {communitySegments.map((segment, index) => (
          <div
            key={index}
            className={`community-row ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
          >
            <div className="community-image-container">
              <img src={segment.image} alt={segment.title} className="community-image" />
            </div>
            <div className="community-text-container">
              <h3 className="community-title">{segment.title}</h3>
              <p className="community-description">{segment.description}</p>
              <button
                className="community-button"
                onClick={() => handleButtonClick(segment)}
              >
                <b>{segment.buttonLabel}</b>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreTheCommunity;
