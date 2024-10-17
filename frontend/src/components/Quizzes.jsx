import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toggleSuccess } from "../../redux/slice/userSlice";
import { PORT } from "../utils/constants";

const Quizzes = () => {
  const quizzesData = useLoaderData();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const savedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;


  useEffect(()=>{
      if(!savedUser){
        setSelectedCategory(null);
        setUserInfo(null);
      }
  },[savedUser])

console.log(success);
  useEffect(() => {
    if (success) {
      notify(success);
      dispatch(toggleSuccess());
    }
  }, [success]);

  useEffect(() => {
    if (savedUser?.role === "user") {
      const fetchUser = async () => {
        try {
          const userData = await axios.get(
            `http://localhost:${PORT}/api/user/${savedUser?.id}`,
            { withCredentials: true }
          );
          setUserInfo(userData.data.user);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }
  }, []);

  const handleStartQuiz = (quizId) => {
    if (savedUser?.role === "user") navigate(`/quiz/${quizId}`);
    else navigate("/login");
  };

  const notify = (state) => {
    if(state === "loggedIn") toast("Logged In successfully")
      else toast("Logged Out successfully")
  }

  const groupedQuizzes = {};
  quizzesData.forEach((quiz) => {
    if (!groupedQuizzes[quiz.category]) {
      groupedQuizzes[quiz.category] = [];
    }
    groupedQuizzes[quiz.category].push(quiz);
  });

  return (
    <div className="h-[60vh] bg-[#0b0e15] p-6">
      <ToastContainer />
      <h1 className="text-4xl font-extrabold text-center text-gray-400 mb-12">
        Available Quizzes
      </h1>

      <div className="mb-6 flex justify-center flex-wrap items-center ">
        {Object.keys(groupedQuizzes).map((category, index) => (
          <div
            key={category}
            className={`w-40 mx-2 h-32 px-4 py-7 rounded-lg shadow-md  bg-[#19b4fa] mb-10 hover:scale-105 transition-all duration-300 ease-in-out flex items-center`}
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
      {selectedCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {groupedQuizzes[selectedCategory].map((quiz) => {
            const isAttempted = userInfo?.quizzesTaken.find(
              (q) => q?.quiz?.id === quiz._id
            );

            return (
              <div
                key={quiz._id}
                className={`relative bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 ${
                  isAttempted ? "opacity-90" : ""
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
                      {isAttempted.score*10} Points
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
      ) : (
        <div className="text-center text-gray-600 text-lg">
          Please select a category to view quizzes.
        </div>
      )}
    </div>
  );
};

export default Quizzes;
