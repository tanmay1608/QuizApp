import React from 'react'
import { Navigate, Outlet, useLoaderData } from 'react-router-dom';

const AddQuizWrapper = () => {


    const savedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
    console.log(savedUser)
    const isVerfied=useLoaderData();
    console.log("isVerified",isVerfied);   

  return  isVerfied && savedUser?.role === "admin" ? <Outlet /> : <Navigate to={"/login"} />;

}

export default AddQuizWrapper
