import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import './NetworkingEvents.css';

const events = [
  {
    id: 1,
    title: 'Tech Networking Night',
    date: 'October 30, 2025 19:00:00',
    location: 'Silicon Valley, CA',
    description: 'An evening of networking with tech industry professionals.',
    tags: ['In-Person', 'Tech'],
    organizer: 'Tech Valley Inc.',
    coordinates: { lat: 37.3875, lng: -122.0575 },
  },
  {
    id: 2,
    title: 'Career Fair Prep',
    date: 'November 5, 2024 15:00:00',
    location: 'Online',
    description: 'Get tips and insights to make the most of your career fair experience.',
    tags: ['Virtual', 'Career'],
  },
  {
    id: 3,
    title: 'Industry Panel Discussion',
    date: 'November 12, 2025 10:00:00',
    location: 'Hybrid (New York / Online)',
    description: 'Learn from industry experts about the latest trends in tech.',
    tags: ['Hybrid', 'Industry'],
    organizer: 'Global Tech Talks',
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: 4,
    title: 'Startup Showcase',
    date: 'December 14, 2025 18:00:00',
    location: 'Tech Park, Seattle',
    description: 'Discover innovative ideas from budding entrepreneurs.',
    tags: ['In-Person', 'Startup'],
    organizer: 'Startup Enthusiasts',
    coordinates: { lat: 47.6062, lng: -122.3321 },
  },
  {
    id: 5,
    title: 'Design Thinking Workshop',
    date: 'December 25, 2024 14:00:00',
    location: 'Online',
    description: 'Learn the fundamentals of design thinking and innovation.',
    tags: ['Virtual', 'Workshop'],
  },
  {
    id: 6,
    title: 'Women in Tech Conference',
    date: 'December 28, 2025 10:00:00',
    location: 'San Francisco, CA',
    description: 'Empowering women in the tech industry to thrive and succeed.',
    tags: ['In-Person', 'Diversity'],
    organizer: 'Women Tech Leaders',
    coordinates: { lat: 37.7749, lng: -122.4194 },
  },
];

export default function NetworkingEvents() {
  const [interested, setInterested] = useState({});
  const [timers, setTimers] = useState({});
  const [interestedCount, setInterestedCount] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [comments, setComments] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(null);
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimers = {};
      events.forEach((event) => {
        const eventTime = new Date(event.date).getTime();
        const now = new Date().getTime();
        const distance = eventTime - now;

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          updatedTimers[event.id] = `${days}d ${hours}h ${minutes}m`;
        } else if (distance <= 0 && distance > -3600000) {
          updatedTimers[event.id] = 'Ongoing';
        } else {
          updatedTimers[event.id] = 'Completed';
        }
      });
      setTimers(updatedTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const initialCounts = {};
    events.forEach((event) => {
      initialCounts[event.id] = Math.floor(Math.random() * 50) + 10;
    });
    setInterestedCount(initialCounts);
  }, []);

  const handleInterestedToggle = (id) => {
    setInterested((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setInterestedCount((prev) => ({
      ...prev,
      [id]: prev[id] + (interested[id] ? -1 : 1),
    }));
  };

  const handleFavoriteToggle = (id) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((fav) => fav !== id);
      }
      return [...prev, id];
    });
  };

  const handleCommentSubmit = (id, comment) => {
    setComments((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), { text: comment, timestamp: new Date().toLocaleString() }],
    }));
  };

  const handleRegisterClick = (id) => {
    setShowEmailInput(id);
  };

  const handleEmailSubmit = () => {
    if (email.trim()) {
      setNotification('Registration successful. Check your email for further updates.');
      setShowEmailInput(null);
      setEmail('');

      setTimeout(() => {
        setNotification('');
      }, 5000);
    } else {
      alert('Please enter a valid email address.');
    }
  };

  const filteredEvents = Array.from(
    new Map(
      events
        .filter((event) => {
          const matchesSearchTerm =
            searchTerm === '' ||
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase());

          const matchesTags =
            selectedTags.length === 0 || selectedTags.some((tag) => event.tags.includes(tag));

          return matchesSearchTerm && matchesTags;
        })
        .map((event) => [event.id, event]) // Map to track unique event IDs
    ).values()
  );

  const sliderSettings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: '40px',
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: '20px',
        },
      },
    ],
  };

  return (
    <div className={`networking-events ${darkMode ? 'dark-mode' : ''}`}>
      <h1 className="section-title">Networking Events</h1>
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="dark-mode-toggle"
      >
        Toggle Dark Mode
      </button>

      {notification && <div className="notification-popup">{notification}</div>}

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="tag-filters">
          {['In-Person', 'Virtual', 'Hybrid', 'Workshop', 'Tech'].map((tag) => (
            <button
              key={tag}
              className={`tag-button ${selectedTags.includes(tag) ? 'selected' : ''}`}
              onClick={() =>
                setSelectedTags((prev) =>
                  prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                )
              }
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <Slider {...sliderSettings}>
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-card-inner">
              <div className="event-card-front">
                <h2 className="event-title">{event.title}</h2>
                <p className="event-date">📅 {new Date(event.date).toDateString()}</p>
                <p className="event-location">
                  📍 {event.location}{' '}
                  {event.location !== 'Online' && event.coordinates && (
                    <a
                      href={`https://www.google.com/maps/search/${encodeURIComponent(
                        event.location
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Map
                    </a>
                  )}
                </p>
                <p className="event-organizer">👤 {event.organizer}</p>
                <div className="event-tags">
                  {event.tags.map((tag, idx) => (
                    <span key={idx} className="event-tag" title={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <p
                  className={`event-status ${timers[event.id]?.includes('Completed') ? 'completed' : ''}`}
                >
                  {timers[event.id] || 'Calculating...'}
                </p>
              </div>
              <div className="event-card-back">
                <p className="event-description">{event.description}</p>
                <button
                  className={`interested-button ${interested[event.id] ? 'active' : ''}`}
                  onClick={() => handleInterestedToggle(event.id)}
                >
                  {interested[event.id] ? '✔️ Interested' : '➕ Mark as Interested'}
                </button>
                <button
                  className={`favorite-button ${favorites.includes(event.id) ? 'active' : ''}`}
                  onClick={() => handleFavoriteToggle(event.id)}
                >
                  {favorites.includes(event.id) ? '❤️ Favorited' : '🤍 Add to Favorites'}
                </button>
                <p className="interested-count">📌 {interestedCount[event.id]} Interested</p>
                {!(timers[event.id]?.includes('Completed')) && (
                  <>
                    <button
                      className="register-button"
                      onClick={() => handleRegisterClick(event.id)}
                    >
                      Register Now
                    </button>
                    {showEmailInput === event.id && (
                      <div className="email-input">
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <button onClick={handleEmailSubmit}>Submit</button>
                      </div>
                    )}
                  </>
                )}
                <div className="comments-section">
                  <h3>Comments:</h3>
                  <ul>
                    {(comments[event.id] || []).map((comment, index) => (
                      <li key={index}>
                        <p>{comment.text}</p>
                        <small>{comment.timestamp}</small>
                      </li>
                    ))}
                  </ul>
                  <input
                    type="text"
                    placeholder="Leave a comment..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        handleCommentSubmit(event.id, e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
