import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const QuizIdWrapper = () => {
    const savedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  return savedUser?.role === "user" ? <Outlet /> : <Navigate to={"/login"} />;
}

export default QuizIdWrapper
