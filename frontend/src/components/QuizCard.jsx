import axios from "axios";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

const QuizCard = ({ quiz, onDelete }) => {
  const [error, setError] = useState(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
      {error && <p className="text-red-500">{error}</p>}
      <h2 className="text-xl font-semibold text-gray-700 mb-2">{quiz.title}</h2>
      <button
        className="w-full py-2 bg-gray-300 text-gray-600 rounded hover:bg-red-600 hover:text-white transition"
        onClick={() => onDelete(quiz._id)}
      >
        Delete Quiz
      </button>
    </div>
  );
};

export default QuizCard;
