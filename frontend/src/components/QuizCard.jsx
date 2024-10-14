import axios from 'axios';
import React from 'react'
import { MdDelete } from "react-icons/md";
const QuizCard = ({quiz,handleStartQuiz}) => {



    const deleteQuiz=async (id)=>{
        try{
            const response= await axios.delete(`http://localhost:8157/api/quizzes/${id}`)
            console.log(response);
        }
        catch(e){
            console.log(e);
        }
    }

  return (
    <div
            key={quiz._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              {quiz.title}
            </h2>
            <button
              className="w-full py-2 bg-gray-300 text-gray-600 rounded hover:bg-green-600  hover:text-white transition"
              onClick={()=> deleteQuiz(quiz._id)}
            >
              Delete Quiz
            </button>
            
          </div>
  )
}

export default QuizCard
