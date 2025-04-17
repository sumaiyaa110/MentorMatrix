import React, { useState } from "react";
import "./ManageQuizzes.css";
import { FaPlusCircle, FaTrash, FaEdit, FaSearch } from "react-icons/fa";

const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      name: "Quantum Mechanics",
      description: "Explore the fundamentals of quantum mechanics.",
      timing: "10:00 AM - 11:00 AM",
      marks: 50,
    },
    {
      id: 2,
      name: "Machine Learning",
      description: "Test your knowledge of ML algorithms and concepts.",
      timing: "12:00 PM - 1:00 PM",
      marks: 60,
    },
    {
      id: 3,
      name: "Data Structures",
      description: "Assess your understanding of key data structures.",
      timing: "2:00 PM - 3:00 PM",
      marks: 40,
    },
    {
      id: 4,
      name: "Cybersecurity",
      description: "Check your knowledge of cybersecurity principles.",
      timing: "4:00 PM - 5:00 PM",
      marks: 70,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editQuiz, setEditQuiz] = useState(null);

  const addQuiz = () => {
    const newQuiz = {
      id: quizzes.length + 1,
      name: `Quiz ${quizzes.length + 1}`,
      description: "Add a description here",
      timing: "6:00 PM - 7:00 PM",
      marks: Math.floor(Math.random() * 50) + 20,
    };
    setQuizzes([...quizzes, newQuiz]);
  };

  const deleteQuiz = (id) => {
    const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== id);
    setQuizzes(updatedQuizzes);
  };

  const startEdit = (quiz) => {
    setEditQuiz({ ...quiz });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditQuiz((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    const updatedQuizzes = quizzes.map((quiz) =>
      quiz.id === editQuiz.id ? editQuiz : quiz
    );
    setQuizzes(updatedQuizzes);
    setEditQuiz(null);
  };

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-quizzes-container">
      <header>Manage Quizzes</header>
      <div className="toolbar">
        <button onClick={addQuiz} className="add-quiz-btn">
          <FaPlusCircle /> Create New Quiz
        </button>
        <div className="search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="quiz-cards">
        {filteredQuizzes.map((quiz) => (
          <div className="quiz-card" key={quiz.id}>
            {editQuiz && editQuiz.id === quiz.id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={editQuiz.name}
                  onChange={handleEditChange}
                  className="quiz-input"
                />
                <textarea
                  name="description"
                  value={editQuiz.description}
                  onChange={handleEditChange}
                  className="quiz-textarea"
                />
                <input
                  type="text"
                  name="timing"
                  value={editQuiz.timing}
                  onChange={handleEditChange}
                  className="quiz-input"
                />
                <input
                  type="number"
                  name="marks"
                  value={editQuiz.marks}
                  onChange={handleEditChange}
                  className="quiz-input"
                />
                <button onClick={saveEdit} className="save-btn">
                  Save
                </button>
              </>
            ) : (
              <>
                <h3>{quiz.name}</h3>
                <p>{quiz.description}</p>
                <p>
                  <strong>Timing:</strong> {quiz.timing}
                </p>
                <p>
                  <strong>Marks:</strong> {quiz.marks}
                </p>
                <div className="quiz-actions">
                  <button onClick={() => startEdit(quiz)}>
                    <FaEdit /> Edit
                  </button>
                  <button onClick={() => deleteQuiz(quiz.id)}>
                    <FaTrash /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageQuizzes;

