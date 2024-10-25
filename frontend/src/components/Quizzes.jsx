import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toggleSuccess } from "../../redux/slice/userSlice";
import { PORT } from "../utils/constants";
import QuizCategoryCard from "./QuizCategoryCard";


const Quizzes = () => {
  const quizzesData = useLoaderData();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredList, setFilteredList] = useState({});
  const savedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const [groupedQuizzes, setGroupedQuizzes] = useState({});
  

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
          console.log(error.message);
        }
      };
      fetchUser();
    }
  }, []);

  const notify = (state) => {
    if (state === "loggedIn") toast("Logged In successfully");
    else toast("Logged Out successfully");
  };
  useEffect(() => {
    const quizzesByCategory = {};

    quizzesData.forEach((quiz) => {
      
      if (!quizzesByCategory[quiz.category.toLowerCase()]) {
        quizzesByCategory[quiz.category.toLowerCase()] = [];
      }
      quizzesByCategory[quiz.category.toLowerCase()].push(quiz);
    });

    setGroupedQuizzes(quizzesByCategory);
    setFilteredList(quizzesByCategory);
  }, [quizzesData]);

  const handleSetSelectedCategory = (category) => {
    setSelectedCategory(category);
    navigate("/category", {
      state: { filteredList, selectedCategory: category,userInfo },
    });
  };

  const handleOnChange = (e) => {
    const searchParam = e.target.value.toLowerCase();
    setSearchInput(searchParam);
    setSelectedCategory(null);

    const updatedList = {};

    Object.keys(groupedQuizzes).forEach((category) => {
      if (category.toLowerCase().includes(searchParam)) {
        updatedList[category] = groupedQuizzes[category];
      }
    });

    setFilteredList(updatedList);
  };

  const quizzesCompletedPercentage = (category) => {
    
    const totalQuizzes = filteredList[category]?.length || 0;
  
    const attemptedQuizzes = filteredList[category]?.filter((quiz) => {
      const isAttempted = userInfo?.quizzesTaken.find(
        (q) => q?.quiz.id === quiz._id
      );
      return isAttempted;
    }) || [];
  
   
    const attemptedCount = attemptedQuizzes.length;
    const percentage = totalQuizzes > 0 ? (attemptedCount / totalQuizzes) * 100 : 0;
  
    return percentage.toFixed(0)
  };

  return (
    <div className="min-h-screen bg-[#0b0e15] p-6 flex flex-col items-center">
      <ToastContainer />

      <div className="flex justify-center mb-12 p-5">
        <h1 className="text-4xl font-extrabold text-center text-gray-400 mr-5 ">
          Available Quizzes
        </h1>
        <input
          type="text"
          placeholder="Search Categories..."
          value={searchInput}
          onChange={(e) => handleOnChange(e)}
          className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f89f2b]"
        />
      </div>

      <div className="mb-6 flex items-center justify-center flex-wrap">
        {Object.keys(filteredList).map((category, index) => (
          <QuizCategoryCard
            key={index}
            category={category}
            handleSetSelectedCategory={handleSetSelectedCategory}
            completion={savedUser?.role ==="user" ? quizzesCompletedPercentage(category) : null}
          />
        ))}
      </div>

      {!selectedCategory && (
        <div className="text-center text-gray-600 text-lg">
          Please select a category to view quizzes.
        </div>
      )}
    </div>
  );
};

export default Quizzes;
