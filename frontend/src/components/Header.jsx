import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slice/userSlice";

const Header = () => {
  const savedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header
      className="flex justify-between items-center p-4"
      style={{ backgroundColor: "#317988" }}
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-300">
          <Link to={"/"}>QuizMaster</Link>
        </h1>
      </div>
      {}
      <div className="flex gap-4">
        {savedUser?.role === "user" ? (
          <button
            className="px-4 py-2  text-gray-300 hover:text-white rounded-full   transition duration-200 ease-in-out shadow-md hover:scale-105"
            onClick={() => handleLogout()}
          >
            Log out
          </button>
        ) : (
          <Link
            to="/admin"
            style={{ backgroundColor: "#4297aa" }}
            className="px-4 py-2  text-gray-300 hover:text-white rounded-full   transition duration-200 ease-in-out shadow-md hover:scale-105 "
          >
            Admin
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
