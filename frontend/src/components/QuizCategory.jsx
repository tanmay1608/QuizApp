import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import home from "../assets/home.png";

const QuizCategory = () => {
  const savedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const navigate = useNavigate();
  const location = useLocation();
  const { filteredList, selectedCategory,userInfo} = location.state;
  console.log(userInfo);

  const handleStartQuiz = (quizId) => {
    if (savedUser?.role === "user") navigate(`/quiz/${quizId}`);
    else navigate("/login");
  };

  return (
    <div className="w-full min-h-screen p-10 relative">
      <img
        src={home}
        alt="Background"
        className="absolute w-full h-full object-cover top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      <p className="text-2xl text-center font-bold">
        Ready, Set, Quiz! How Many Can You Complete?
      </p>
      <div className="grid grid-cols-3 gap-8 mt-10 w-[90%]">
        {filteredList[selectedCategory].map((quiz) => {
          const isAttempted = userInfo?.quizzesTaken.find(
            (q) => q?.quiz.id === quiz._id
          );
          console.log(`Quiz ID: ${quiz._id}, Attempted: ${!!isAttempted}`);

          return (
            <div
              key={quiz._id}
              className={`min-w-[400px] relative bg-white   p-8 rounded-2xl shadow-xl border-t-2 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 ${
                isAttempted ? "backdrop:blur-md bg-opacity-30" : ""
              }`}
            >
              <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4 uppercase tracking-wider">
                {quiz.category}
              </h2>
              <h3 className="text-xl font-medium text-gray-600 mb-4 text-center">
                {quiz.title}
              </h3>

              {isAttempted && (
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-1 rounded-full shadow-lg text-sm font-bold tracking-wide z-10">
                  <Link
                    to={`/quiz/${quiz._id}/leaderboard`}
                    className="hover:underline"
                  >
                    🏆 View Leaderboard
                  </Link>
                </div>
              )}

              {isAttempted && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center pointer-events-none ">
                  <p className="text-2xl font-bold text-gray-800">
                    You Scored:
                  </p>
                  <p className="text-4xl font-extrabold text-green-500 mb-10">
                    {isAttempted.score * 10} Points
                  </p>
                </div>
              )}

              <button
                disabled={isAttempted}
                className={`w-full py-3 mt-4 text-white rounded-xl transition-all duration-300 transform ${
                  isAttempted
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                }`}
                onClick={() => handleStartQuiz(quiz._id)}
              >
                {isAttempted ? "Quiz Attempted" : "Start Quiz"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizCategory;
