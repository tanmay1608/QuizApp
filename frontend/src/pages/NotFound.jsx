import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-500 mb-6">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link to="/" className="text-lg text-blue-600 hover:underline">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
