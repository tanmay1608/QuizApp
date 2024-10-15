import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slice/userSlice";

const Header = () => {
  const savedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  let role = null;
  let name = null;
  let id=null;
  if (user.user) {
    role = user.user.role;
    name = user.user.name;
    id=user.user.id;
  } else {
    if (savedUser !== null) {
      role = savedUser?.role;
      name = savedUser?.name;
      id=savedUser?.id;
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="flex justify-between items-center p-5 bg-gradient-to-r from-teal-500 to-cyan-600 shadow-md">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-widest">
          <Link to="/">QuizMaster</Link>
        </h1>
      </div>

      <div className="flex items-center gap-6">
        {role === "user" ? (
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <Link to={`/profile/${id}`}>
                <span className="text-xl font-bold uppercase text-cyan-700">
                  {name.charAt(0)}
                </span>
              </Link>
            </div>

            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-white text-teal-600 font-semibold uppercase rounded-full shadow-md transition-all hover:bg-teal-400 hover:text-white hover:scale-105"
            >
              Log out
            </button>
          </div>
        ) : (
          <Link
            to="/admin"
            className="px-5 py-2 bg-cyan-700 text-white font-semibold uppercase rounded-full shadow-md transition-all hover:bg-cyan-500 hover:scale-105"
          >
            Admin
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
