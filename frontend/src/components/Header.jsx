import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">QuizMaster</h1>
      </div>
      <div className="flex gap-4">
        <Link
          to="/signup"
          className="px-4 py-2 border border-black text-gray-700 rounded hover:bg-gray-200 hover:text-black transition"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="px-4 py-2 border border-black text-gray-700 rounded hover:bg-gray-200 hover:text-black transition"
        >
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
