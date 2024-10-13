
import { Link } from "react-router-dom";
import Header from "./Header";
import Quizzes from "./Quizzes";

const Home = () => (
  <div>
   <div className="w-full h-[50vh] bg-gray-300 flex flex-col items-center justify-center">
     
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to QuizMaster!
        </h1>
        <p className="text-lg text-gray-600">
          Test your knowledge with our fun and engaging quizzes!
        </p>
      </div>
  </div>
  <Quizzes/>
  </div>
);

export default Home;
