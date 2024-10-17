import React, { useEffect, useState } from "react";
import Quizzes from "./Quizzes";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QuizCard from "./QuizCard";

const Admin = () => {
  const [quizzesData, setQuizzesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [groupedQuizzes,setGroupedQuizzes] = useState({});
 
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const quizzesData = await axios.get(
          "http://localhost:8000/api/quizzes"
        );
        setQuizzesData(quizzesData.data.quizzes);
        console.log("data", quizzesData);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleStartQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  const handleAddQuiz = async () => {
    navigate("/add-quiz");
  };

  const handleDeleteQuiz = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/quizzes/${id}`, {
        withCredentials: true,
      });
      setQuizzesData((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz._id !== id)
      );
      setSelectedCategory(null);
      console.log("Quiz deleted successfully:", id);
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const gradients = [
    "bg-gradient-to-br from-[#007675] via-[#065555] to-[#023836]",
    "bg-gradient-to-br from-[#182a5f] via-[#121f42] to-[#0f1730]",
    "bg-gradient-to-br from-[#9e6130] via-[#874613] to-[#672404]",
    "bg-gradient-to-br from-[#218589] via-[#236a71] to-[#2f515b]",
  ];

  function getRandomGradient() {
    return gradients[Math.floor(Math.random() * gradients.length)];
  }

  
 
  
  useEffect(()=>{
    const updatedGroupedQuizzes={}
    quizzesData.forEach((quiz) => {
      if (!updatedGroupedQuizzes[quiz.category]) {
        updatedGroupedQuizzes[quiz.category] = [];
      }
      updatedGroupedQuizzes[quiz.category].push(quiz);
    });

    setGroupedQuizzes(updatedGroupedQuizzes);
  },[quizzesData])

  

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
             
              className={`w-40 h-48 mx-4 rounded-lg shadow-xl bg-[#181b22]     mb-10 hover:scale-105 hover:bg-[#f89f2b] transition-all duration-500 ease-in-out flex items-center justify-center border border-transparent backdrop-blur-lg`}
            >
              <button
                className="w-full px-4 py-2 text-white font-bold rounded hover:bg-opacity-80 transition-all duration-200"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
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
