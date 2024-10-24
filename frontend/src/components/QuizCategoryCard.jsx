import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const QuizCategoryCard = ({ category,completion, handleSetSelectedCategory }) => {
   console.log(category);
  return (
    <div
      key={category}
      className="min-w-[300px]  mx-2 h-auto p-6 rounded-lg shadow-md bg-white my-10 hover:scale-105 transition-all duration-300 ease-in-out flex flex-col items-center relative"
    >      
      {
        
        <div className="flex justify-between items-center w-full mb-4 "> 
        <h3 className="text-black font-bold text-xl mb-4 text-center  w-full"> {`${category?.charAt(0).toUpperCase()}${category.slice(1)}`}</h3>
          { completion &&
            <div className="flex flex-col items-center w-1/2">
            <CircularProgressbar
              value={completion}
              text={`${completion}%`}
              styles={buildStyles({
                pathColor: '#4caf50',
                trailColor: '#d1d5db',
                textColor:"#000",
              })}
              className="w-12 h-12 font-bold"
            />
            <span className="text-black font-semibold mt-2 text-xs">Completion</span>
          </div>
          }
        </div>
      }

      <button
        className="w-full mt-4 py-2 px-4 bg-[#2C2C2C] text-white font-bold rounded hover:bg-opacity-90 transition-all duration-200"
        onClick={() => handleSetSelectedCategory(category)}
      >
        Explore Quizzes
      </button>
    </div>
  );
};

export default QuizCategoryCard;
