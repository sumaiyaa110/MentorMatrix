import React, { useState, useEffect } from "react";
import "./BlogInsights.css";

function BlogInsights() {
  const [showMore, setShowMore] = useState(false);
  const [userOpinion, setUserOpinion] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [opinions, setOpinions] = useState([
    {
      id: 1,
      name: "Ayesha Karim",
      avatar: "👩‍🎓",
      tags: ["Education", "Motivation"],
      content: "Education is the most powerful weapon which you can use to change the world.",
      likes: 10,
      dislikes: 0,
      love: 0,
      comments: [],
      isFollowed: true,
      reaction: null,
      date: "2024-12-01",
    },
    {
      id: 2,
      name: "Sofia Rahman",
      avatar: "👩‍💻",
      tags: ["Inclusivity", "Empowerment"],
      content: "A brighter future can be achieved through inclusivity and empowerment.",
      likes: 6,
      dislikes: 0,
      love: 0,
      comments: [],
      isFollowed: true,
      reaction: null,
      date: "2024-12-02",
    },
    {
      id: 3,
      name: "Fahim Hasan",
      avatar: "👨‍🎨",
      tags: ["Creativity", "Design"],
      content: "Art and design have the power to inspire and connect people across cultures.",
      likes: 12,
      dislikes: 0,
      love: 0,
      comments: [],
      isFollowed: false,
      reaction: null,
      date: "2024-12-03",
    },
    {
      id: 4,
      name: "Nazmul Islam",
      avatar: "👨‍💼",
      tags: ["Business", "Leadership"],
      content: "Good leadership creates a vision, articulates the vision, and steers the team towards achieving it.",
      likes: 8,
      dislikes: 0,
      love: 0,
      comments: [],
      isFollowed: true,
      reaction: null,
      date: "2024-12-04",
    },
    {
      id: 5,
      name: "Mahiya Ahmed",
      avatar: "👩‍🔬",
      tags: ["Science", "Research"],
      content: "Scientific innovation is key to solving many of the world’s greatest challenges.",
      likes: 7,
      dislikes: 0,
      love: 0,
      comments: [],
      isFollowed: false,
      reaction: null,
      date: "2024-12-05",
    },
    {
      id: 6,
      name: "Tasnim Akter",
      avatar: "👩‍🍳",
      tags: ["Food", "Lifestyle"],
      content: "Cooking is not just about recipes; it’s about creativity and expressing love.",
      likes: 9,
      dislikes: 0,
      love: 0,
      comments: [],
      isFollowed: false,
      reaction: null,
      date: "2024-12-06",
    },
    {
      id: 7,
      name: "Zahid Hossain",
      avatar: "👨‍🔧",
      tags: ["Technology", "Innovation"],
      content: "Technological advancements are transforming our lives at an unprecedented pace.",
      likes: 10,
      dislikes: 0,
      love: 0,
      comments: [],
      isFollowed: true,
      reaction: null,
      date: "2024-12-07",
    },
    {
      id: 8,
      name: "Raihan Chowdhury",
      avatar: "👨‍💻",
      tags: ["Programming", "Career"],
      content: "Learning to code opens doors to countless opportunities in the modern world.",
      likes: 12,
      dislikes: 0,
      love: 0,
      comments: [],
      isFollowed: true,
      reaction: null,
      date: "2024-12-08",
    },
    {
      id: 9,
      name: "Raisa Siddique",
      avatar: "👩‍🎤",
      tags: ["Culture", "Art"],
      content: "Preserving our cultural heritage is vital for maintaining our identity.",
      likes: 6,
      dislikes: 0,
      love: 0,
      comments: [],
      isFollowed: false,
      reaction: null,
      date: "2024-12-09",
    },
    {
      id: 10,
      name: "Shakib Rahman",
      avatar: "👨‍🏫",
      tags: ["Education", "Community"],
      content: "An educated community is a thriving community. Let's invest in our future.",
      likes: 11,
      dislikes: 0,
      love: 0,
      comments: [],
      isFollowed: false,
      reaction: null,
      date: "2024-12-10",
    },
    {
      id: 11,
      name: "Nazia Ahmed",
      avatar: "👩‍⚕️",
      tags: ["Health", "Wellness"],
      content: "Your health is your wealth. Take care of yourself first.",
      likes: 15,
      dislikes: 0,
      love: 2,
      comments: [],
      isFollowed: true,
      reaction: null,
      date: "2024-12-11",
    },
    {
      id: 12,
      name: "Rifat Hossain",
      avatar: "👨‍🚀",
      tags: ["Space", "Exploration"],
      content: "Exploring the unknown is what drives humanity forward.",
      likes: 18,
      dislikes: 1,
      love: 5,
      comments: [],
      isFollowed: false,
      reaction: null,
      date: "2024-12-12",
    },
    {
      id: 13,
      name: "Alina Chowdhury",
      avatar: "👩‍🌾",
      tags: ["Environment", "Sustainability"],
      content: "Protecting our planet is not a choice; it's a necessity for our future.",
      likes: 20,
      dislikes: 0,
      love: 4,
      comments: [],
      isFollowed: true,
      reaction: null,
      date: "2024-12-13",
    },
    {
      id: 14,
      name: "Tanvir Hasan",
      avatar: "👨‍🚒",
      tags: ["Courage", "Service"],
      content: "Serving others with courage and integrity is the highest honor.",
      likes: 22,
      dislikes: 0,
      love: 6,
      comments: [],
      isFollowed: false,
      reaction: null,
      date: "2024-12-14",
    },
  ]);
  
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // For user profile view
  const [language, setLanguage] = useState("en"); // Language state
  const [trendingThreshold, setTrendingThreshold] = useState(10); // Threshold for trending posts

  // Auto-save draft
  useEffect(() => {
    const savedDraft = localStorage.getItem("draft");
    if (savedDraft) setUserOpinion(savedDraft);
  }, []);

  useEffect(() => {
    localStorage.setItem("draft", userOpinion);
  }, [userOpinion]);

  const toggleShowMore = () => setShowMore(!showMore);

  const handleOpinionChange = (e) => setUserOpinion(e.target.value);

  const submitOpinion = () => {
    if (userOpinion.trim()) {
      const newOpinion = {
        id: opinions.length + 1,
        name: "User",
        avatar: "🙂",
        tags: ["User Contribution"],
        content: userOpinion,
        likes: 0,
        dislikes: 0,
        love: 0,
        comments: [],
        isFollowed: false,
        reaction: null,
        date: new Date().toISOString(),
      };
      setOpinions([...opinions, newOpinion]);
      setUserOpinion("");
      addNotification("Your opinion has been posted!");
    }
  };

  const updateReaction = (id, type) => {
    setOpinions(
      opinions.map((opinion) => {
        if (opinion.id === id) {
          if (opinion.reaction === type) {
            opinion.reaction = null;
            if (type === "like") opinion.likes -= 1;
            if (type === "dislike") opinion.dislikes -= 1;
            if (type === "love") opinion.love -= 1;
          } else {
            if (opinion.reaction === "like") opinion.likes -= 1;
            if (opinion.reaction === "dislike") opinion.dislikes -= 1;
            if (opinion.reaction === "love") opinion.love -= 1;

            opinion.reaction = type;
            if (type === "like") opinion.likes += 1;
            if (type === "dislike") opinion.dislikes += 1;
            if (type === "love") opinion.love += 1;
          }
        }
        return opinion;
      })
    );
  };

  const toggleFollow = (id) => {
    setOpinions(
      opinions.map((opinion) => {
        if (opinion.id === id) opinion.isFollowed = !opinion.isFollowed;
        return opinion;
      })
    );
  };

  const toggleBookmark = (id) => {
    setBookmarkedPosts((prev) =>
      prev.includes(id) ? prev.filter((postId) => postId !== id) : [...prev, id]
    );
  };

  const addNotification = (message) => {
    setNotifications([...notifications, message]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 3000);
  };

  const assignBadge = (user) => {
    if (user.likes > 50) return "🏆 Top Contributor";
    if (user.comments.length > 20) return "💬 Comment Star";
    return "👤 Member";
  };

  const deleteOpinion = (id) => {
    setOpinions(opinions.filter((opinion) => opinion.id !== id));
    addNotification("Opinion deleted!");
  };

  const editOpinion = (id, newContent) => {
    setOpinions(
      opinions.map((opinion) =>
        opinion.id === id ? { ...opinion, content: newContent } : opinion
      )
    );
    addNotification("Opinion updated!");
  };

  const translateContent = (text) => {
    const translations = {
      en: text,
      bn: "এই বিষয়বস্তু বাংলায় অনুবাদ করা হয়েছে।",
      es: "Este contenido ha sido traducido al español.",
    };
    return translations[language] || text;
  };

  const sortedOpinions = [...opinions].sort((a, b) => {
    if (sortBy === "likes") return b.likes - a.likes;
    if (sortBy === "date") return new Date(b.date) - new Date(a.date);
    return 0;
  });

  const filteredOpinions = sortedOpinions.filter(
    (opinion) =>
      (!selectedCategory || opinion.tags.includes(selectedCategory)) &&
      opinion.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const trendingOpinions = opinions.filter((opinion) => opinion.likes >= trendingThreshold);

  const totalReactions = opinions.reduce(
    (acc, opinion) => {
      acc.likes += opinion.likes;
      acc.dislikes += opinion.dislikes;
      acc.love += opinion.love;
      return acc;
    },
    { likes: 0, dislikes: 0, love: 0 }
  );

  return (
    <div className={`blog-insights-container ${darkMode ? "dark-mode" : ""}`}>
      <h1 className="blog-header">✨ Inspiring Blog Insights ✨</h1>
      <p className="blog-description">Explore opinions and share your thoughts to inspire others!</p>

      <div className="controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="reading-mode">
          <label>Font Size:</label>
          <button onClick={() => setFontSize((size) => Math.max(size - 2, 10))}>A-</button>
          <button onClick={() => setFontSize((size) => size + 2)}>A+</button>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        <div className="category-filters">
          <label>Filter by Category:</label>
          <select onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All</option>
            <option value="Education">Education</option>
            <option value="Creativity">Creativity</option>
            <option value="Inclusivity">Inclusivity</option>
            <option value="Science">Science</option>
            <option value="Food">Food</option>
            <option value="Technology">Technology</option>
            <option value="Programming">Programming</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Motivation">Motivation</option>
          </select>
        </div>
        <div className="sorting">
          <label>Sort by:</label>
          <select onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Default</option>
            <option value="likes">Most Liked</option>
            <option value="date">Newest</option>
          </select>
        </div>
        <div className="language-switcher">
          <label>Language:</label>
          <select onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="bn">Bangla</option>
            <option value="es">Spanish</option>
          </select>
        </div>
      </div>

      <div className="reaction-summary">
        <p>👍 {totalReactions.likes} Likes</p>
        <p>👎 {totalReactions.dislikes} Dislikes</p>
        <p>❤️ {totalReactions.love} Loves</p>
      </div>

      <div className="notifications">
        {notifications.map((note, index) => (
          <div key={index} className="notification">
            {note}
          </div>
        ))}
      </div>

      <div className="user-opinion">
        <h3>Share Your Opinion</h3>
        <textarea
          style={{ fontSize: `${fontSize}px` }}
          value={userOpinion}
          onChange={handleOpinionChange}
          placeholder="Write your opinion here..."
        />
        <button onClick={submitOpinion}>Submit Opinion</button>
      </div>

      <h2>🔥 Trending Posts</h2>
      <div className="trending-posts">
        {trendingOpinions.map((opinion) => (
          <div key={opinion.id} className="blog-post">
            <p>{translateContent(opinion.content)}</p>
          </div>
        ))}
      </div>

      <h2>📜 All Posts</h2>
      <div className="blog-posts">
        {filteredOpinions.slice(0, showMore ? filteredOpinions.length : 4).map((opinion) => (
          <div className="blog-post" key={opinion.id}>
            <div className="author-info">
              <div className="avatar">{opinion.avatar}</div>
              <span
                className="author-name"
                onClick={() => setSelectedUser(opinion)} // View User Profile
              >
                {opinion.name} {assignBadge(opinion)}
              </span>
              <button onClick={() => toggleFollow(opinion.id)}>
                {opinion.isFollowed ? "Unfollow" : "Follow"}
              </button>
              <button onClick={() => toggleBookmark(opinion.id)}>
                {bookmarkedPosts.includes(opinion.id) ? "Unbookmark" : "Bookmark"}
              </button>
            </div>
            <p className="content" style={{ fontSize: `${fontSize}px` }}>
              {translateContent(opinion.content)}
            </p>
            <div className="tags">
              {opinion.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="actions">
              <button
                className={opinion.reaction === "like" ? "active-reaction" : ""}
                onClick={() => updateReaction(opinion.id, "like")}
              >
                👍 {opinion.likes}
              </button>
              <button
                className={opinion.reaction === "dislike" ? "active-reaction" : ""}
                onClick={() => updateReaction(opinion.id, "dislike")}
              >
                👎 {opinion.dislikes}
              </button>
              <button
                className={opinion.reaction === "love" ? "active-reaction" : ""}
                onClick={() => updateReaction(opinion.id, "love")}
              >
                ❤️ {opinion.love}
              </button>
              <button onClick={() => deleteOpinion(opinion.id)}>Delete</button>
              <button onClick={() => editOpinion(opinion.id, prompt("Edit your opinion"))}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="user-profile-modal">
          <h2>👤 {selectedUser.name}'s Profile</h2>
          <p>Tags: {selectedUser.tags.join(", ")}</p>
          <p>Total Likes: {selectedUser.likes}</p>
          <button onClick={() => setSelectedUser(null)}>Close</button>
        </div>
      )}

      <button className="show-more-btn" onClick={toggleShowMore}>
        {showMore ? "Show Less" : "Show More"}
      </button>
    </div>
  );
}

export default BlogInsights;



















