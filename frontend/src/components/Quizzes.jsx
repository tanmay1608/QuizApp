import { useLoaderData, useNavigate } from "react-router-dom";

const Quizzes = () => {
  const quizzesData = useLoaderData();
  const navigate = useNavigate();
  const savedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  console.log(savedUser.role);

  const handleStartQuiz = (quizId) => {
    if (savedUser.role === "user") navigate(`/quiz/${quizId}`);
    else navigate("/register");
    //navigate(`/quiz/${quizId}`);
  };

  return (
    <div className="min-h-screen  p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Available Quizzes
      </h1>
      <div className="mb-6 text-center"></div>
      {quizzesData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzesData.map((quiz) => (
            <div
              key={quiz._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {quiz.title}
              </h2>
              <button
                className="w-full py-2 bg-gray-300 text-gray-600 rounded hover:bg-green-600  hover:text-white transition"
                onClick={() => handleStartQuiz(quiz._id)}
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      )}

      <div></div>
    </div>
  );
};

export default Quizzes;
