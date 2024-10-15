import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toggleSuccess } from "../../redux/slice/userSlice";

const Quizzes = () => {
  const quizzesData = useLoaderData();
  const navigate = useNavigate();
  const user=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const {error,success}=useSelector((state)=> state.user);
  const [userInfo,setUserInfo]=useState(null);
  const savedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  console.log("render",success);

  useEffect(()=>{
    if(success){
      notify();
      dispatch(toggleSuccess());
    }
  },[success]);

  useEffect(()=>{
    
      if(savedUser?.role === "user"){
            try {
              const fecthUser=async ()=>{
                const userInfo=await axios.get(`http://localhost:8000/api/user/${savedUser?.id}`);
                console.log(userInfo);
                setUserInfo(userInfo.data);
              }
              fecthUser();
            } catch (error) {
              
            }
      }
  },[])

  useEffect(()=>{
   // console.log("user",user.user);
    if(user.user === null || user.user?.length === 0) setUserInfo(null);
  },[user])

  

  const handleStartQuiz = (quizId) => {
    if (savedUser?.role === "user") navigate(`/quiz/${quizId}`);
    else navigate("/register");
    //navigate(`/quiz/${quizId}`);
  };
  const notify = () => toast("Logged In successfuly");

  return (
    <div className="min-h-screen  p-6">
       <ToastContainer />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Available Quizzes
      </h1>
      <div className="mb-6 text-center"></div>
      {quizzesData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {quizzesData.map((quiz) => (
            <div
              key={quiz._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition relative"
            >

             <h2 className="text-2xl font-bold text-gray-700 mb-2 text-center">
                {quiz.category}
              </h2> 
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {quiz.title}
              </h2>
              <h2 className="font-semibold text-gray-700 mb-2 underline text-end relative z-10 p-4">
                <Link to={`/quiz/${quiz._id}/leaderboard`}>view leaderboard</Link>
              </h2>
            
              {
                userInfo?.quizzesTaken.find((q)=> q.quizId === quiz._id) && 
               <>
               <div className="absolute inset-0 bg-black opacity-30"></div>
               <div className="flex justify-center m-2 text-xl"><p>You Scored: { userInfo?.quizzesTaken.find((q)=> q.quizId === quiz._id).score} Points</p></div>
               </>
            
              }
              <button
              disabled= {userInfo?.quizzesTaken.find((q)=> q.quizId === quiz._id) !== undefined}
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700  hover:text-white transition"
                onClick={() => handleStartQuiz(quiz._id)}
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      )}

      <div></div>
    </div>
  );
};

export default Quizzes;
