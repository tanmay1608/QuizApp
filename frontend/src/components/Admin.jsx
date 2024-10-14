import React, { useEffect, useState } from 'react'
import Quizzes from './Quizzes'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuizCard from './QuizCard';

const Admin = () => {
    console.log("inside Admin");
    const [quizzesData,setQuizzesData]=useState([]);
    const navigate = useNavigate();
    //const isLoggedIn = localStorage.getItem("authToken");
    const [isDeleted,setIsDeleted]=useState(false);
  
    useEffect(()=>{
        try {
            const fetchData=async ()=>{
                const quizzesData=await axios.get("http://localhost:8157/api/quizzes");
                setQuizzesData(quizzesData.data);
                console.log("data",quizzesData);
            }
            fetchData();
        } catch (error) {
            
        }
    },[]);
    const updateIsDeleted=()=>{
      setIsDeleted(prev => !prev);
    }
    console.log(quizzesData);
   
  
    const handleStartQuiz = (quizId) => {
      //console.log(isLoggedIn);
      // if (isLoggedIn) navigate(`/quiz/${quizId}`);
      // else navigate("/login");
      navigate(`/quiz/${quizId}`);
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
      <button
        className="py-2 px-4 bg-gray-600 text-white rounded hover:bg-green-600 hover:scale-105 transition-all duration-200 ease-in-out"
        onClick={() =>handleAddQuiz() } 
      >
        Add Quiz
      </button>
    </div>
      {
        quizzesData &&  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzesData.map((quiz) => (
           <QuizCard key={quiz._id} quiz={quiz} handleStartQuiz={handleStartQuiz} updateIsDeleted={updateIsDeleted}/>
          ))}
        </div>
      }
        
        <div>
  
        </div>
      </div>
    );
}

export default Admin
