import { useLoaderData } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { customColors } from "../utils/customColors";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Profile = () => {
  const profileInfo = useLoaderData();

  const chartData = {
    labels: profileInfo.quizzesTaken.map(
      (quizObject) => quizObject?.quiz?.title
    ),
    datasets: [
      {
        label: "Score",
        data: profileInfo.quizzesTaken.map(
          (quizObject) => quizObject?.score * 10
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: profileInfo.quizzesTaken.map(
      (quizObject) => quizObject?.quiz?.title
    ),
    datasets: [
      {
        label: "Scores",
        data: profileInfo.quizzesTaken.map(
          (quizObject) => quizObject?.score * 10
        ),
        backgroundColor: profileInfo.quizzesTaken.map(
          (_, index) => customColors[index % customColors.length]
        ),
        borderColor: profileInfo.quizzesTaken.map((_, index) =>
          customColors[index % customColors.length].replace(/0.6/, "1")
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {profileInfo.name}
          </h1>
          <p className="text-lg text-gray-500">{profileInfo.email}</p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Quizzes Attempted
        </h2>

        {profileInfo.quizzesTaken.length === 0 ? (
          <p className="text-center text-lg text-gray-500">
            No quizzes attempted yet.
          </p>
        ) : (
          <div className="space-y-4">
            {profileInfo.quizzesTaken.map((quizObject) => (
              <div
                key={quizObject?.quiz?.id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {quizObject?.quiz?.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Category: {quizObject?.quiz.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium text-green-600">
                    {quizObject?.score * 10} Points
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

     {profileInfo.quizzesTaken.length !== 0 &&
      ( <div className="w-full p-20">
        <div className="mt-8 ">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
            Quiz Scores Chart
          </h2>
          <div className="w-full flex p-10">
            <div className="w-1/2 m-5">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Quiz Scores Distribution
              </h3>
              <Pie data={pieData} />
            </div>
            <div className="w-1/2 m-5">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Quiz Scores Overview
              </h3>
              <Bar data={chartData} />
            </div>
          </div>
        </div>
      </div>)
     }
      
    </div>
  );
};

export default Profile;
