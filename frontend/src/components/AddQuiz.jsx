import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AddQuiz = () => {

  const [title,setTitle]=useState("");
  const [category,setCategory]=useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [questions, setQuestion] = useState([]);
  const [currentQuestion, setCurrenQuestion] = useState("");
  const [currentOptions, setCurrentOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState("");
  const navigate = useNavigate();
  console.log(questions);


  const handleFormSubmit=async (e)=>{
    e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8157/api/quizzes', {
            title,
            category,
            questions,
        });
        console.log('Quiz created successfully:', response.data);
        navigate("/");
       
    } catch (error) {
        console.log(error);
        console.log(error.response ? error.response.data.message : "Failed to create quiz");
    }
  }

  const reset = () => {
    setCorrectOption("");
    setCurrenQuestion("");
    setCurrentOptions(["", "", "", ""]);
  };

  const handleTitleChange=(e)=>{
    if(questions.length !== 0 ) return ;
    setTitle(e.target.value)
  }

  const handleCategoryChange=(e)=>{
    if(questions.length !== 0 ) return ;
    setCategory(e.target.value);
  }

  const handleAddQuestion = (e) => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setQuestion((prev) => {
        if (questions.length === 1 && currentQuestion === "") {
          reset();
          return [
            {
              questionText: currentQuestion,
              options: currentOptions,
              correctOption: correctOption,
            },
          ];
        }

        reset();
        return [
          ...prev,
          {
            questionText: currentQuestion,
            options: currentOptions,
            correctOption: correctOption,
          },
        ];
      });
      setIsOpen(false);
    }
  };
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <form className="flex flex-col w-[500px] border border-black p-4 shadow-lg rounded-xl"
      onSubmit={handleFormSubmit}
      >
        <input
          className="p-2 m-2 text-center border text-black border-black"
          type="text"
          value={title}
          onChange={(e)=> handleTitleChange(e)}
          placeholder="title of your quiz"
        />
        <input
          className="p-2 m-2 text-center border text-black  border-black"
          type="text"
          value={category}
          onChange={(e)=> handleCategoryChange(e)}
          placeholder="category of your quiz"
        />
        {isOpen && (
          <div className="w-full">
            <input
              className="p-2 m-2 text-center border text-black border-black"
              type="text"
              value={currentQuestion}
              placeholder="Enter your question"
              onChange={(e) => setCurrenQuestion(e.target.value)}
            />
            <input
              className="p-2 m-2 text-center border text-black border-black"
              type="text"
              value={currentOptions[0]}
              placeholder="Enter option1"
              onChange={(e) =>
                setCurrentOptions((prev) => {
                  console.log("prev", prev);
                  const newOptions = [...prev];
                  newOptions[0] = e.target.value;
                  return newOptions;
                })
              }
            />

            <input
              className="p-2 m-2 text-center border text-black border-black"
              type="text"
              value={currentOptions[1]}
              placeholder="Enter option2"
              onChange={(e) =>
                setCurrentOptions((prev) => {
                  console.log("prev", prev);
                  const newOptions = [...prev];
                  newOptions[1] = e.target.value;
                  return newOptions;
                })
              }
            />

            <input
              className="p-2 m-2 text-center border text-black border-black"
              type="text"
              value={currentOptions[2]}
              placeholder="Enter option3"
              onChange={(e) =>
                setCurrentOptions((prev) => {
                  console.log("prev", prev);
                  const newOptions = [...prev];
                  newOptions[2] = e.target.value;
                  return newOptions;
                })
              }
            />

            <input
              className="p-2 m-2 text-center border text-black border-black"
              type="text"
              value={currentOptions[3]}
              placeholder="Enter option4"
              onChange={(e) =>
                setCurrentOptions((prev) => {
                  console.log("prev", prev);
                  const newOptions = [...prev];
                  newOptions[3] = e.target.value;
                  return newOptions;
                })
              }
            />

            <input
              className="p-2 m-2 text-center border text-black border-black"
              type="text"
              value={correctOption}
              placeholder="Enter correct option"
              onChange={(e) => setCorrectOption(e.target.value)}
            />
          </div>
        )}
        <div className="w-full flex justify-end p-2">
          <div
            className="cursor-pointer bg-green-700 py-2 px-4 rounded-lg font-bold text-white"
            onClick={() => handleAddQuestion()}
          >
            {isOpen ? "Add now" : "Add question"}
          </div>
        </div>
        <div className="flex justify-center w-full">
          <button
            type="submit"
            className="bg-gray-600 text-gray-300 rounded-2xl w-60 py-3 m-2"
          >
            {" "}
            Add Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuiz;
