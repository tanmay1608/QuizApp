
import Quizzes from "./Quizzes";

const Home = () => (
  <div>
   <div className="w-full h-[50vh]  flex flex-col items-center justify-center relative"
   >
     <div className="absolute  w-full h-[50vh] flex justify-center">
      <img className="w-full object-cover " src="https://cdn.pixabay.com/photo/2015/12/13/09/40/banner-1090830_1280.jpg"/>
     </div>
     <div className="bg-black opacity-30 absolute inset-0"></div>
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
