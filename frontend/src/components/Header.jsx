import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slice/userSlice";

const Header = () => {
  const savedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const dispatch = useDispatch();
  const user=useSelector((state)=>state.user);

  let role=null;
  let name=null;
  if(user.user){
    role=user.user.role;
    name=user.user.name;
  }
  else{
    if(savedUser !== null) {
      role=savedUser?.role
      name=savedUser?.name
    }
  }
 

  

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
        {role === "user" ? (

          <div className="flex">
            <div className=" mx-2 flex justify-center items-center rounded-full w-[50px] h-[50px] bg-white">
              <Link to={"/profile"}><span className="uppercase text-xl font-bold">{name.charAt(0)}</span></Link>
            </div>
                <button
            className="px-4 py-2 bg-white font-semibold uppercase hover:text-black hover:font-semibold rounded-full   transition duration-200 ease-in-out shadow-md hover:scale-105"
            onClick={() => handleLogout()}
          >
            Log out
          </button>
          </div>
        
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
