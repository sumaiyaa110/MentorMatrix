import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Menubar/Sidebar"; // Import your Sidebar component
import "./TopBar.css";

const TopBar = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate(); // For navigation on search

  // Predefined search suggestions
  const options = [
    "Home",
    "About Us",
    "Contact Us",
    "Login",
    "Sign Up",
    "Services",
    "Blog",
    "FAQs",
    "Careers",
  ];

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() !== "") {
      const filteredSuggestions = options.filter((option) =>
        option.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle search submission
  const handleSearchSubmit = () => {
    if (searchQuery.trim() === "") {
      alert("Please enter a search term.");
      return;
    }

    // Example navigation to a search results page
    alert(`You searched for: ${searchQuery}`);
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`); // Replace with your desired action
    setSearchQuery(""); // Clear input
    setSuggestions([]); // Clear suggestions
  };

  // Handle click on a suggestion
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  const handleSubscription = () => {
    if (email.trim() === "") {
      alert("Please enter a valid email address.");
      return;
    }
    alert(`Thank you for subscribing, ${email}!`);
    setEmail("");
    setIsSubscribed(true);

    // Automatically hide the thank-you message after 5 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 5000);
  };

  return (
    <div className="top-bar">
      {/* Left Section: Sidebar */}
      <div className="top-bar-left">
        <Sidebar />
      </div>

      {/* Middle Section: Search Bar with Suggestions */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()} // Submit on Enter key
        />
        {suggestions.length > 0 && (
          <ul className="search-suggestions">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="suggestion-item"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right Section: Buttons and Subscription */}
      <div className="top-bar-right">
        {/* Navigation Buttons */}
        <div className="buttons">
          <button className="top-bar-button">
            <Link to="/about-us">About Us</Link>
          </button>
          <button className="top-bar-button">
            <Link to="/contact-us">Contact Us</Link>
          </button>
          <button className="top-bar-button">
            <Link to="/login">Login</Link>
          </button>
          <button className="top-bar-button">
            <Link to="/signup">Sign Up</Link>
          </button>
        </div>

        {/* Subscription Form */}
        <div className={`subscription-section ${isSubscribed ? "subscribed" : ""}`}>
          {!isSubscribed ? (
            <div className="subscription-form">
              <input
                type="email"
                placeholder="Subscribe for updates"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="subscription-input"
              />
              <button onClick={handleSubscription} className="subscribe-btn">
                Subscribe
              </button>
            </div>
          ) : (
            <span className="thank-you-message">Thank you for subscribing!</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;