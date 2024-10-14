import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Header = ({isLoggedIn,setIsLoggedIn}) => {


  return (
   
          <header className="flex justify-between items-center p-4" style={{backgroundColor:"#317988"}}>
      <div>
        <h1 className="text-2xl font-bold text-gray-300">
          <Link to={"/"}>
          QuizMaster
          </Link>
        </h1>
      </div>
      {
        
      }
      <div className="flex gap-4">
        <Link
          to="/admin"
          style={{backgroundColor:"#4297aa"}}
          className="px-4 py-2  text-gray-300 hover:text-white rounded-full   transition duration-200 ease-in-out shadow-md hover:scale-105 "
        >
          Admin
        </Link>
      </div>
    </header>
   
    
  );
};

export default Header;
