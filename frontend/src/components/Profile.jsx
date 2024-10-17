import React from "react";
import { useLoaderData } from "react-router-dom";

const Profile = () => {
 
  const profileInfo=useLoaderData();
  console.log(profileInfo);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{profileInfo.name}</h1>
        <p className="text-lg text-gray-500">{profileInfo.email}</p>
      </div>

     
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quizzes Attempted</h2>
      
      {profileInfo.quizzesTaken.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No quizzes attempted yet.</p>
      ) : (
        <div className="space-y-4">
          {profileInfo.quizzesTaken.map((quizObject) => (
            <div
              key={quizObject?.quiz?.id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{quizObject?.quiz?.title}</h3>
                <p className="text-sm text-gray-500">Category: {quizObject?.quiz.category}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium text-green-600">{quizObject?.score*10} Points</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  );
};

export default Profile;
