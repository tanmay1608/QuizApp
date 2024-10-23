import axios from "axios";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PORT } from "../utils/constants";

const Quiz = () => {
  const quizData = useLoaderData();
  const id = quizData._id;
  const savedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showToastify, setShowToastify] = useState(false);
  const currentQuestion = quizData.questions[currentQuestionIndex];

  const notify = () => toast("Quiz submitted successfully!");

  const handleOptionSelect = (option) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion._id]: option }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    const score = calculateScore();
    try {
      await axios.post(`http://localhost:${PORT}/api/quizzes/submit`, {
        userId: savedUser?.id,
        quizId: id,
        score: score,
      });
      notify();
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  // const handleSubmit = () => {
  //   setIsSubmitted(true);
  // };

  const calculateScore = () => {
    return quizData.questions.filter((q) => q.correctOption === answers[q._id])
      .length;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        {quizData.title}
      </h1>
      <h2 className="text-xl text-center text-gray-600 mb-4">
        Category: {quizData.category}
      </h2>

      {isSubmitted ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Quiz Results</h2>
          <p className="text-lg">
            You scored {calculateScore()} out of {quizData.questions.length}.
          </p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {currentQuestionIndex + 1}. {currentQuestion.questionText}
          </h2>

          <div className="space-y-2 mb-4">
            {currentQuestion.options.map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={option}
                  checked={answers[currentQuestion._id] === option}
                  onChange={() => handleOptionSelect(option)}
                  className="mr-2 cursor-pointer"
                />
                <span
                  className="cursor-pointer"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            {currentQuestionIndex > 0 && (
              <button
                onClick={() =>
                  setCurrentQuestionIndex(currentQuestionIndex - 1)
                }
                className="py-2 px-4 bg-gray-300 text-gray-600 rounded hover:bg-gray-400 transition"
              >
                Previous
              </button>
            )}
            {currentQuestionIndex < quizData.questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="py-2 px-4 bg-gray-300 text-gray-600 rounded hover:bg-gray-700 hover:text-white transition"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 transition"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
