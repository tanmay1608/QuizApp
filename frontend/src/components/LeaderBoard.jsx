import { useLoaderData} from "react-router-dom";
import { FaCrown } from "react-icons/fa"; 

const LeaderBoard = () => {
  const leaderboardData = useLoaderData();
  const quizInfo = leaderboardData[1]?.value?.data.quiz;
  const leaderboardInfo = leaderboardData[0]?.value?.data.leaderboard;
  const user = localStorage.getItem("user");
  let currentUserEmail = null;
  if (user) currentUserEmail = JSON.parse(user).email;

  return (
    <div className="w-full h-screen flex justify-center items-start pt-12 bg-gradient-to-b from-gray-100 to-gray-300">
      {leaderboardInfo.length === 0 ? (
        <div className="text-center bg-white p-6 rounded-md shadow-xl">
          <p className="text-2xl font-semibold text-gray-800">
            No one has attempted this quiz yet.
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Be the first to take the quiz and claim the top spot!
          </p>
        </div>
      ) : (
        <div className="w-4/5 md:w-1/2 bg-white rounded-3xl shadow-2xl p-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {quizInfo?.category}
          </h1>
          <p className="text-lg text-gray-600 mb-8">{quizInfo?.title}</p>

          <div className="space-y-6">
            {leaderboardInfo.map((data, index) => (
              <div
                key={data.id}
                className={`flex items-center justify-between p-5 rounded-lg ${
                  data.email === currentUserEmail
                    ? index === 0
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg"
                      : "bg-green-300 text-white shadow-lg"
                    : index === 0
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold">
                    {index === 0 ? (
                      <FaCrown className="text-yellow-300" />
                    ) : (
                      `#${index + 1}`
                    )}
                  </div>
                  <p
                    className={`text-lg font-semibold uppercase ${
                      data.id === currentUserEmail
                        ? "text-white"
                        : index === 0
                        ? "text-white"
                        : "text-gray-800"
                    }`}
                  >
                    {data.name}
                  </p>
                </div>
                <p
                  className={`${
                    data.id === currentUserEmail
                      ? "text-gray-200"
                      : "text-gray-600"
                  }`}
                >
                  {data.email}
                </p>
                <p
                  className={`text-xl font-semibold ${
                    data.id === currentUserEmail
                      ? "text-white"
                      : index === 0
                      ? "text-white"
                      : "text-blue-600"
                  }`}
                >
                  {data.score * 10} pts
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderBoard;
