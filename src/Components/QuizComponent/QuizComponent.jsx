import React, { useState } from 'react';
import './QuizComponent.css';

const QuizComponent = () => {
    const quizData = {
        title: "Mentor's Quiz on JavaScript Basics",
        description: 'Test your knowledge on basic JavaScript concepts!',
        questions: [
            {
                id: 1,
                text: 'What is the output of 1 + "1" in JavaScript?',
                options: ['2', '11', 'NaN', 'Error'],
            },
            {
                id: 2,
                text: 'Which of these is not a JavaScript data type?',
                options: ['String', 'Boolean', 'Integer', 'Undefined'],
            },
            {
                id: 3,
                text: 'What does `typeof null` return?',
                options: ['object', 'null', 'undefined', 'function'],
            },
        ],
    };

    const [answers, setAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleAnswerChange = (questionId, answer) => {
        setAnswers({
            ...answers,
            [questionId]: answer,
        });
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        console.log('Submitted Answers:', answers);
    };

    return (
        <div className="quiz-container">
            <h1>{quizData.title}</h1>
            <p>{quizData.description}</p>
            {!isSubmitted ? (
                <form>
                    {quizData.questions.map((question, index) => (
                        <div key={question.id} className="question">
                            <h3>
                                {index + 1}. {question.text}
                            </h3>
                            <div className="options">
                                {question.options.map((option) => (
                                    <label key={option}>
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={option}
                                            onChange={() =>
                                                handleAnswerChange(question.id, option)
                                            }
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={handleSubmit}>
                        Submit
                    </button>
                </form>
            ) : (
                <div className="thank-you">
                    <h2>Thank you for completing the quiz!</h2>
                    <p>Your answers have been recorded:</p>
                    <ul>
                        {quizData.questions.map((question) => (
                            <li key={question.id}>
                                <strong>{question.text}</strong>: {answers[question.id] || 'Not Answered'}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default QuizComponent;
