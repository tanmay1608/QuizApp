
import { Link } from "react-router-dom";
import Header from "./Header";
import Quizzes from "./Quizzes";

const Home = () => (
  <div>
   <div className="w-full h-[50vh]  flex flex-col items-center justify-center relative"
   style={{backgroundColor:"#37808f"}}>
     <div className="absolute  w-full h-[50vh] flex justify-center">
      <img className="w-[60%] h-full " src="https://t3.ftcdn.net/jpg/02/30/30/70/240_F_230307061_W3AAOhexkQjFgjwx0AhffaVi5VQcvpHI.jpg"/>
     </div>
     <div className="bg-black opacity-70 absolute inset-0"></div>
      <div className="text-center space-y-4 absolute">
        <h1 className="text-7xl font-bold text-white">
          Welcome to QuizMaster!
        </h1>
        <p className="text-2xl text-white">
          Test your knowledge with our fun and engaging quizzes!
        </p>
      </div>
  </div>
  <Quizzes/>
  </div>
);

export default Home;
