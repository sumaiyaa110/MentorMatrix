import React, { useState, useEffect } from 'react';
import './ManageQuizzes.css';
import { FaPlusCircle, FaTrash, FaEdit, FaSave, FaLink } from 'react-icons/fa';

const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [editQuizId, setEditQuizId] = useState(null);
  const [editQuizName, setEditQuizName] = useState('');
  const [editGoogleForm, setEditGoogleForm] = useState('');

  // Load quizzes from local storage
  useEffect(() => {
    const savedQuizzes = localStorage.getItem('quizzes');
    if (savedQuizzes) {
      setQuizzes(JSON.parse(savedQuizzes));
    }
  }, []);

  // Save quizzes to local storage
  useEffect(() => {
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  const addQuiz = () => {
    const newQuiz = {
      id: quizzes.length + 1,
      name: `Quiz ${quizzes.length + 1}`,
      googleFormLink: '',
    };
    setQuizzes([...quizzes, newQuiz]);
  };

  const deleteQuiz = (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this quiz?');
    if (confirmation) {
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
    }
  };

  const startEditing = (id, currentName, currentLink) => {
    setEditQuizId(id);
    setEditQuizName(currentName);
    setEditGoogleForm(currentLink);
  };

  const saveEdit = (id) => {
    const updatedQuizzes = quizzes.map((quiz) =>
      quiz.id === id
        ? { ...quiz, name: editQuizName, googleFormLink: editGoogleForm }
        : quiz
    );
    setQuizzes(updatedQuizzes);
    setEditQuizId(null);
    setEditQuizName('');
    setEditGoogleForm('');
  };

  return (
    <div className="manage-quizzes-container">
      <header className="header">Manage Quizzes</header>
      <button onClick={addQuiz} className="add-quiz-btn">
        <FaPlusCircle /> Create New Quiz
      </button>
      <ul className="quizzes-list">
        {quizzes.map((quiz) => (
          <li key={quiz.id} className="quiz-item">
            {editQuizId === quiz.id ? (
              <>
                <input
                  type="text"
                  value={editQuizName}
                  onChange={(e) => setEditQuizName(e.target.value)}
                  placeholder="Quiz Name"
                  className="edit-input"
                />
                <input
                  type="text"
                  value={editGoogleForm}
                  onChange={(e) => setEditGoogleForm(e.target.value)}
                  placeholder="Google Form Link"
                  className="edit-input"
                />
                <button onClick={() => saveEdit(quiz.id)} className="save-btn">
                  <FaSave /> Save
                </button>
              </>
            ) : (
              <>
                <span>{quiz.name}</span>
                {quiz.googleFormLink && (
                  <a
                    href={quiz.googleFormLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="google-form-link"
                  >
                    <FaLink /> Open Form
                  </a>
                )}
                <button
                  onClick={() => startEditing(quiz.id, quiz.name, quiz.googleFormLink)}
                  className="edit-btn"
                >
                  <FaEdit /> Edit
                </button>
                <button onClick={() => deleteQuiz(quiz.id)} className="delete-btn">
                  <FaTrash /> Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageQuizzes;

