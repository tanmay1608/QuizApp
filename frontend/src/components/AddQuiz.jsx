import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddQuiz = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    questions: [],
    currentQuestion: "",
    currentOptions: ["", "", "", ""],
    correctOption: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOptionChange = (index, value) => {
    setFormData((prev) => {
      const newOptions = [...prev.currentOptions];
      newOptions[index] = value;
      return { ...prev, currentOptions: newOptions };
    });
  };

  const validateForm = () => {
    const { title, category, questions } = formData;
    if (!title || !category) return "Title and category are required";
    if (questions.length === 0) return "At least one question is required";
    return null;
  };

  const handleAddQuestion = () => {
    const { currentQuestion, currentOptions, correctOption } = formData;

    if (
      !currentQuestion ||
      currentOptions.some((option) => option.trim() === "") ||
      !correctOption
    ) {
      setErrorMessage("All fields for the question must be filled.");
      return;
    }

    const newQuestion = {
      questionText: currentQuestion,
      options: currentOptions,
      correctOption: correctOption,
    };

    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
      currentQuestion: "",
      currentOptions: ["", "", "", ""],
      correctOption: "",
    }));
    setErrorMessage("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:8000/api/quizzes", {
        title: formData.title,
        category: formData.category,
        questions: formData.questions,
      });
      setSuccessMessage("Quiz created successfully!");
      navigate("/"); 
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data.message : "Failed to create quiz"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-100">
      <form
        className="flex flex-col w-[500px] max-h-[80vh] bg-white border border-[#317988] shadow-lg rounded-lg p-6 overflow-y-auto"
        onSubmit={handleFormSubmit}
      >
        <h2 className="text-center text-3xl font-bold text-[#317988] mb-4">
          Create a New Quiz
        </h2>

        {errorMessage && (
          <div className="text-red-500 mb-2">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 mb-2">{successMessage}</div>
        )}

        <input
          className="p-3 mb-4 border border-[#317988] rounded focus:outline-none focus:ring focus:ring-[#317988] transition duration-200"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title of your quiz"
          required
        />
        <input
          className="p-3 mb-4 border border-[#317988] rounded focus:outline-none focus:ring focus:ring-[#317988] transition duration-200"
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category of your quiz"
          required
        />

        {formData.questions.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-[#317988] mb-2">
              Questions:
            </h3>
            {formData.questions.map((q, index) => (
              <div
                key={index}
                className="border p-2 mb-2 bg-gray-50 rounded shadow"
              >
                <p className="font-medium text-gray-800">
                  <span className="font-semibold">Question:</span>{" "}
                  {q.questionText}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Options:</span>{" "}
                  {q.options.join(", ")}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Correct Option:</span>{" "}
                  {q.correctOption}
                </p>
              </div>
            ))}
          </div>
        )}

        <input
          className="p-3 mb-4 border border-[#317988] rounded focus:outline-none focus:ring focus:ring-[#317988] transition duration-200"
          type="text"
          name="currentQuestion" 
          value={formData.currentQuestion}
          placeholder="Enter your question"
          onChange={handleChange} 
        />
        {formData.currentOptions.map((option, index) => (
          <input
            key={index}
            className="p-3 mb-4 border border-[#317988] rounded focus:outline-none focus:ring focus:ring-[#317988] transition duration-200"
            type="text"
            value={option}
            placeholder={`Enter option ${index + 1}`}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        ))}
        <input
          className="p-3 mb-4 border border-[#317988] rounded focus:outline-none focus:ring focus:ring-[#317988] transition duration-200"
          type="text"
          name="correctOption" 
          value={formData.correctOption}
          placeholder="Enter correct option"
          onChange={handleChange}
        />

        <button
          type="button"
          className="cursor-pointer bg-[#317988] hover:bg-[#2a6464] text-white py-2 px-4 rounded-lg font-bold transition duration-200"
          onClick={handleAddQuestion}
        >
          Add Question
        </button>

        <button
          type="submit"
          className={`bg-[#317988] text-white rounded-lg w-full py-3 mt-4 font-semibold transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Add Quiz"}
        </button>
      </form>
    </div>
  );
};

export default AddQuiz;
