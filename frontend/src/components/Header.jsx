import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slice/userSlice";
import UserMenu from "./UserMenu";

const Header = () => {
  const savedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  let role = null;
  let name = null;
  let id = null;
  if (user.user) {
    role = user.user.role;
    name = user.user.name;
    id = user.user.id;
  } else {
    if (savedUser !== null) {
      role = savedUser?.role;
      name = savedUser?.name;
      id = savedUser?.id;
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center p-5 bg-[#0b0e15]">
      <div>
        <h1 className="text-2xl font-extrabold text-[#f89f2b] tracking-widest">
          <Link to="/">QuizMaster</Link>
        </h1>
      </div>

      <div className="flex items-center">
        {role === "user" ? (
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#f89f2b] flex items-center justify-center hover:scale-105 transition-transform">
              <Link to={`/profile/${id}`}>
                <span className="text-xl font-bold uppercase text-white">
                  {name.charAt(0)}
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <Link
            to="/admin"
            className="px-4 py-1  text-white text-lg transition-all duration-200 ease-in-out hover:text-[#e38a00] hover:font-semibold"
          >
            Admin
          </Link>
        )}
        {role && <UserMenu role={role} handleLogout={handleLogout} />}
      </div>
    </header>
  );
};

export default Header;
