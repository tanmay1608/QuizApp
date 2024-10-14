import axios from "axios";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import QuizCard from "./QuizCard";

const Quizzes = () => {
  const quizzesData = useLoaderData();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [isDeleted,setIsDeleted]=useState(false);

  const updateIsDeleted=()=>{
    setIsDeleted(prev => !prev);
  }
  console.log(quizzesData);
  const title="quiz 1";
  const category="Science";
  const questions=[{
    questionText:"question1",
    options:["option1","option2","option3"],
    correctOption:"option1"
  }]

  const handleStartQuiz = (quizId) => {
    
    if (role === "user") navigate(`/quiz/${quizId}`);
    else navigate("/register-user");
    //navigate(`/quiz/${quizId}`);
  };

  const handleAddQuiz= async()=>{
    navigate('/add-quiz');
    const token = localStorage.getItem('authToken');

    // try {
    //     const response = await axios.post('http://localhost:8157/api/quizzes', {
    //         title,
    //         category,
    //         questions,
    //     }, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`, 
    //         },
    //     });
    //     console.log('Quiz created successfully:', response.data);
       
    // } catch (error) {
    //     console.log(error.response ? error.response.data.message : "Failed to create quiz");
    // }
  }
  return (
    <div className="min-h-screen  p-6"
    >
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Available Quizzes
      </h1>
      <div className="mb-6 text-center">

  </div>
    {
      quizzesData &&  
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
              className="w-full py-2 bg-gray-300 text-gray-600 rounded hover:bg-green-600  hover:text-white transition"
              onClick={() => handleStartQuiz(quiz._id)}
            >
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    }
      
      <div>

      </div>
    </div>
  );
};

export default Quizzes;
