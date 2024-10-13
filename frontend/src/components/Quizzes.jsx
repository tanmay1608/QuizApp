import axios from "axios";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const Quizzes = () => {
  const quizzesData = useLoaderData();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("authToken");
  console.log(quizzesData);

  const handleStartQuiz = (quizId) => {
    console.log(isLoggedIn);
    if (isLoggedIn) navigate(`/quiz/${quizId}`);
    else navigate("/login");
  };

  const handleAddQuiz= async()=>{
    const token = localStorage.getItem('authToken');

    try {
        const response = await axios.post('http://localhost:8157/api/quizzes', {
            title,
            category,
            questions,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`, 
            },
        });
        console.log('Quiz created successfully:', response.data);
       
    } catch (error) {
        console.log(error.response ? error.response.data.message : "Failed to create quiz");
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Available Quizzes
      </h1>
      <div className="mb-6 text-center">
    <button
      className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
      onClick={() =>handleAddQuiz() } 
    >
      Add Quiz
    </button>
  </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzesData.map((quiz) => (
          <div
            key={quiz._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              {quiz.title}
            </h2>
            <button
              className="w-full py-2 bg-gray-300 text-gray-600 rounded hover:bg-gray-700 hover:text-white transition"
              onClick={() => handleStartQuiz(quiz._id)}
            >
              Start Quiz
            </button>
          </div>
        ))}
      </div>
      <div>

      </div>
    </div>
  );
};

export default Quizzes;
