import axios from "axios";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PORT } from "../utils/constants";
import bg_img from "../assets/result_bg.png";
import quiz_bg from "../assets/quiz_bg.png";

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

  const calculateScore = () => {
    return quizData.questions.filter((q) => q.correctOption === answers[q._id])
      .length;
  };

  return (
    <div className="min-h-screen bg-[#0b0e15] p-6 relative">
      <ToastContainer />
      <img
        src={isSubmitted ? bg_img : quiz_bg}
        alt="Background"
        className="absolute w-[90%] h-[95%] object-cover top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      <h1 className="text-3xl font-bold text-center text-white mb-8 relative z-10">
        {!isSubmitted && quizData.title}
      </h1>
      <h2 className="text-xl text-center text-white mb-4 z-10 relative">
        {!isSubmitted && `Category: ${quizData.category}`}
      </h2>

      {isSubmitted ? (
        

          <div className="w-[50%] h-[50%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute flex flex-col justify-center items-center">
            <h2 className="text-4xl font-bold mb-4 text-[#383527] ">Bravo! You have Scored</h2>
            <p className="text-9xl text-white font-bold italic">
              {calculateScore()} / {quizData.questions.length}
            </p>
          </div>
        
      ) : (
        <div className="p-6 flex justify-center  relative z-10">
          <div className="min-w-[700px] max-w-[1200px] mx-auto  bg-transparent p-6 rounded-lg shadow-xl  backdrop-blur-sm border border-white border-opacity-30 relative z-10">
            <h2 className="text-xl  text-white font-semibold mb-4 py-5 text-center">
              {currentQuestionIndex + 1}. {currentQuestion.questionText}
            </h2>

            <div className="grid grid-cols-2 grid-rows-2 gap-6 mb-6">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={option}
                  className={`flex items-center justify-center  shadow-lg p-2 rounded-lg cursor-pointer
                    transition-transform duration-200 ease-in-out transform active:translate-y-1
                    ${
                      answers[currentQuestion._id] === option
                        ? "bg-[#c3e2ff]"
                        : "bg-white"
                    }
                   `}
                  onClick={() => handleOptionSelect(option)}
                >
                  <div className="flex items-center justify-between w-full text-lg font-medium ">
                    <div
                      className={`flex justify-center items-center ${
                        answers[currentQuestion._id] === option
                          ? "bg-[#80beff]"
                          : "bg-[#efdffc]"
                      }  rounded-full w-10 h-10`}
                    >
                      <span
                        className={`${
                          answers[currentQuestion._id] === option
                            ? "text-[#e3f7ff]"
                            : "text-[#8e51ee]"
                        } text-xl font-bold`}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>
                    </div>

                    <span className="text-gray-700 m-2">{option}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              {currentQuestionIndex > 0 && (
                <button
                  onClick={() =>
                    setCurrentQuestionIndex(currentQuestionIndex - 1)
                  }
                  className="py-2 px-4 bg-[#80beff] text-[#e3f7ff] rounded transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-[#e3f7ff] hover:text-[#80beff] duration-200"
                >
                  Previous
                </button>
              )}
              {currentQuestionIndex < quizData.questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="py-2 px-4 bg-[#80beff] text-[#e3f7ff] rounded transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-[#e3f7ff] hover:text-[#80beff] duration-300"
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
        </div>
      )}
    </div>
  );
};

export default Quiz;
