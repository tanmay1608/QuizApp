import React, { useEffect, useState } from "react";
import Quizzes from "./Quizzes";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QuizCard from "./QuizCard";
import { PORT } from "../utils/constants";

const Admin = () => {
  const [quizzesData, setQuizzesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [groupedQuizzes, setGroupedQuizzes] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const quizzesData = await axios.get(
          `http://localhost:${PORT}/api/quizzes`
        );
        setQuizzesData(quizzesData.data.quizzes);
      };
      fetchData();
    } catch (error) {}
  }, []);

  const handleStartQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  const handleAddQuiz = async () => {
    navigate("/add-quiz");
  };

  const handleDeleteQuiz = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:${PORT}/api/quizzes/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setQuizzesData((prevQuizzes) =>
          prevQuizzes.filter((quiz) => quiz._id !== id)
        );

        const filteredGroupedQuizzes = groupedQuizzes[selectedCategory].filter(
          (quiz) => quiz._id !== id
        );
        if (filteredGroupedQuizzes.length === 0) {
          setGroupedQuizzes({});
          setSelectedCategory(null);
        } else setGroupedQuizzes[filteredGroupedQuizzes];
      }

      // groupedQuizzes[selectedCategory];
      // setSelectedCategory(null);
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  useEffect(() => {
    const updatedGroupedQuizzes = {};
    quizzesData.forEach((quiz) => {
      if (!updatedGroupedQuizzes[quiz.category.toLowerCase()]) {
        updatedGroupedQuizzes[quiz.category.toLowerCase()] = [];
      }
      updatedGroupedQuizzes[quiz.category.toLowerCase()].push(quiz);
    });

    setGroupedQuizzes(updatedGroupedQuizzes);
  }, [quizzesData]);

  return (
    <div className="min-h-screen  p-6 bg-[#0b0e15]">
      <h1 className="text-3xl font-bold text-center text-gray-400 mb-8">
        Quiz Categories
      </h1>
      <div className="mb-6 text-center">
        <button
          className="py-2 px-4 bg-gray-600 text-white rounded hover:bg-green-600 hover:scale-105 transition-all duration-200 ease-in-out"
          onClick={() => handleAddQuiz()}
        >
          Add Quiz
        </button>
      </div>
      <div className="w-full flex justify-center items-center mt-10">
        <div className=" flex justify-center items-center  flex-wrap">
          {Object.keys(groupedQuizzes).map((category, index) => (
            <div
              key={category}
              className={`w-32 h-32 mx-4 rounded-lg shadow-xl bg-[#181b22]    mb-10 hover:scale-105 hover:bg-[#f89f2b] transition-all duration-500 ease-in-out flex items-center justify-center border border-transparent backdrop-blur-lg`}
            >
              <button
                className="w-full h-full  px-4 py-2 text-white font-bold rounded hover:bg-opacity-80 transition-all duration-200"
                onClick={() => setSelectedCategory(category)}
              >
                {`${category?.charAt(0).toUpperCase()}${category.slice(1)}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedCategory && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {groupedQuizzes[selectedCategory].map((quiz) => {
            return (
              <QuizCard
                key={quiz._id}
                quiz={quiz}
                handleStartQuiz={handleStartQuiz}
                onDelete={handleDeleteQuiz}
              />
            );
          })}
        </div>
      )}
      {/* {quizzesData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzesData.map((quiz) => (
            <QuizCard
              key={quiz._id}
              quiz={quiz}
              handleStartQuiz={handleStartQuiz}
              onDelete={handleDeleteQuiz}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No quizzes available.</p>
      )} */}
    </div>
  );
};

export default Admin;
