import React, { useState } from "react";
import "./CaseStudies.css";
import { saveAs } from "file-saver";

function CaseStudies() {
  const [activeStudy, setActiveStudy] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("title");
  const [darkMode, setDarkMode] = useState(false);
  const [ratings, setRatings] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const caseStudies = [
    {
      id: 1,
      title: "Empowering through Technology",
      category: "Technology",
      tags: ["Innovation", "Tech"],
      description: "How mentorship in tech helps students land their dream jobs in leading software companies.",
      symbol: "💻",
      moreInfo: "Mentorship in tech has significantly helped students get placed in top software companies. Many transitioned from internships to full-time developers in just one year.",
      demoLink: "https://example.com/demo/tech",
    },
    {
      id: 2,
      title: "Success in Healthcare Careers",
      category: "Healthcare",
      tags: ["Health", "Wellness"],
      description: "Mentorship stories from students pursuing careers in healthcare and making an impact.",
      symbol: "⚕️",
      moreInfo: "Mentorship has provided students with the opportunity to work in healthcare, contributing to advancements in biotechnology and medical research.",
      demoLink: null,
    },
    {
      id: 3,
      title: "Designing the Future",
      category: "Design",
      tags: ["Creativity", "Art"],
      description: "How mentorship is shaping the careers of aspiring designers, bringing new ideas to the world.",
      symbol: "💡",
      moreInfo: "Through mentorship, these designers have worked on high-profile projects, influencing major brand identities and user experience designs.",
      demoLink: "https://example.com/demo/design",
    },
    {
      id: 4,
      title: "Financial Growth through Mentorship",
      category: "Finance",
      tags: ["Investment", "Wealth"],
      description: "The role of mentorship in helping students excel in finance and investment.",
      symbol: "💰",
      moreInfo: "Mentors in finance guide students through real-world financial modeling, stock market analysis, and personal financial management, leading to strong career growth.",
      demoLink: null,
    },
    {
      id: 5,
      title: "Environmental Sustainability Careers",
      category: "Environment",
      tags: ["Green", "Sustainability"],
      description: "See how mentorship is helping students build impactful careers in environmental sustainability.",
      symbol: "🌍",
      moreInfo: "Through mentorship, students have contributed to various environmental sustainability initiatives, working on projects that aim to reduce carbon footprints and promote renewable energy solutions.",
      demoLink: "https://example.com/demo/environment",
    },
    {
      id: 6,
      title: "The Future of Education",
      category: "Education",
      tags: ["Teaching", "Growth"],
      description: "Mentorship in education is inspiring the next generation of educators and innovators.",
      symbol: "📚",
      moreInfo: "Education-focused mentorship has enabled mentees to improve literacy rates and innovate in teaching methodologies.",
      demoLink: null,
    },
    {
      id: 7,
      title: "Artistic Breakthroughs",
      category: "Art",
      tags: ["Creativity", "Expression"],
      description: "How mentorship is shaping the careers of artists worldwide.",
      symbol: "🎨",
      moreInfo: "With guidance, mentees have showcased art in global galleries, creating a ripple effect in the art world.",
      demoLink: "https://example.com/demo/art",
    },
    {
      id: 8,
      title: "Sports Mentorship Success",
      category: "Sports",
      tags: ["Athletics", "Discipline"],
      description: "Mentorship in sports is helping athletes achieve new heights in their careers.",
      symbol: "⚽",
      moreInfo: "Athletes have excelled in national and international tournaments, breaking records under expert mentorship.",
      demoLink: null,
    },
    {
      id: 9,
      title: "Breaking Barriers in STEM",
      category: "STEM",
      tags: ["Science", "Technology"],
      description: "Discover how mentorship is empowering underrepresented groups in STEM to achieve their dreams.",
      symbol: "🔬",
      moreInfo: "Through mentorship, mentees have broken barriers in STEM fields, winning prestigious scholarships and contributing to cutting-edge research.",
      demoLink: "https://example.com/demo/stem",
    },
    {
      id: 10,
      title: "Social Entrepreneurship Success",
      category: "Business",
      tags: ["Startup", "Social Impact"],
      description: "Learn how mentorship has helped entrepreneurs build startups with a social impact focus.",
      symbol: "🌟",
      moreInfo: "Mentors have guided mentees in building sustainable businesses that address critical societal challenges, like clean water access and affordable healthcare.",
      demoLink: "https://example.com/demo/entrepreneurship",
    },
    {
      id: 11,
      title: "Pioneering AI Innovation",
      category: "Artificial Intelligence",
      tags: ["AI", "Machine Learning"],
      description: "Explore the stories of mentees who revolutionized AI applications through dedicated mentorship.",
      symbol: "🤖",
      moreInfo: "Mentees have developed groundbreaking AI solutions, from natural language processing tools to innovative robotics systems, under expert mentorship.",
      demoLink: "https://example.com/demo/ai",
    }    
  ];

  const toggleMoreInfo = (id) => {
    setActiveStudy(activeStudy === id ? null : id);
  };

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((fav) => fav !== id)
        : [...prevFavorites, id]
    );
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleRating = (id, rating) => {
    setRatings((prev) => ({ ...prev, [id]: rating }));
  };

  const downloadPDF = (study) => {
    const blob = new Blob(
      [`${study.title}\n\n${study.description}\n\n${study.moreInfo}`],
      { type: "text/plain;charset=utf-8" }
    );
    saveAs(blob, `${study.title}.pdf`);
  };

  const filteredStudies = caseStudies
    .filter((study) =>
      (categoryFilter === "All" || study.category === categoryFilter) &&
      (study.title.toLowerCase().includes(searchQuery) ||
        study.description.toLowerCase().includes(searchQuery))
    )
    .sort((a, b) => (a[sortOption] > b[sortOption] ? 1 : -1));

  const paginatedStudies = filteredStudies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredStudies.length / itemsPerPage);

  return (
    <section
      className={`case-studies-container ${darkMode ? "dark-mode" : ""}`}
      aria-labelledby="case-studies-title"
    >
      <h1 id="case-studies-title" className="section-header">
        Explore Case Studies
      </h1>
      <p className="section-description">
        Discover how mentorship has transformed the careers of students across
        different industries. Learn from real-world success stories.
      </p>

      {/* Controls Section */}
      <div className="controls">
        <button
          className="dark-mode-toggle"
          onClick={() => setDarkMode((prev) => !prev)}
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
        <input
          type="text"
          placeholder="Search case studies..."
          className="search-bar"
          onChange={handleSearch}
        />
        <select className="category-filter" onChange={handleCategoryChange}>
          <option value="All">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Design">Design</option>
          <option value="Finance">Finance</option>
          <option value="Environment">Environment</option>
          <option value="Education">Education</option>
          <option value="Art">Art</option>
          <option value="Sports">Sports</option>
        </select>
        <select className="sort-filter" onChange={handleSortChange}>
          <option value="title">Sort by Title</option>
          <option value="category">Sort by Category</option>
        </select>
      </div>

      {/* Case Studies List */}
      <div className="case-studies">
        {paginatedStudies.map((study) => (
          <div
            className={`case-study ${
              favorites.includes(study.id) ? "favorite" : ""
            }`}
            key={study.id}
          >
            <div className="case-study-symbol" aria-label="Case Study Symbol">
              <span className="symbol" role="img" aria-hidden="true">
                {study.symbol}
              </span>
            </div>
            <div className="case-study-content">
              <h3>{study.title}</h3>
              <p>{study.description}</p>
              <div className="tags">
                {study.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                className="more-info-btn"
                onClick={() => toggleMoreInfo(study.id)}
                aria-expanded={activeStudy === study.id}
                aria-controls={`info-${study.id}`}
              >
                {activeStudy === study.id ? "Show Less" : "Show More"}
              </button>
              {activeStudy === study.id && (
                <div id={`info-${study.id}`} className="more-info">
                  <p>{study.moreInfo}</p>
                </div>
              )}
              <div className="sharing-buttons">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    window.location.href
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="facebook"
                >
                  Share on Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    window.location.href
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="twitter"
                >
                  Share on Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
                    window.location.href
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin"
                >
                  Share on LinkedIn
                </a>
              </div>
              <button
                className="favorite-btn"
                onClick={() => toggleFavorite(study.id)}
                aria-label="Add to Favorites"
              >
                {favorites.includes(study.id) ? "★ Favorited" : "☆ Add to Favorites"}
              </button>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${ratings[study.id] >= star ? "filled" : ""}`}
                    onClick={() => handleRating(study.id, star)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <button
                className="download-btn"
                onClick={() => downloadPDF(study)}
              >
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`pagination-btn ${page === currentPage ? "active" : ""}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </section>
  );
}

export default CaseStudies;







