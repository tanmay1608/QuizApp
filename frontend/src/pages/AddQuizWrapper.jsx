import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const AddQuizWrapper = () => {
    const savedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

    console.log(savedUser?.role === "admin");

  return savedUser?.role === "admin" ? <Outlet /> : <Navigate to={"/login"} />;
}

export default AddQuizWrapper
