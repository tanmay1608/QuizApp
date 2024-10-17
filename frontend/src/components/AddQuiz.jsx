import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PORT } from "../utils/constants";

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
      const response = await axios.post(
        `http://localhost:${PORT}/api/quizzes`,
        {
          title: formData.title,
          category: formData.category,
          questions: formData.questions,
        },
        { withCredentials: true }
      );
      setSuccessMessage("Quiz created successfully!");
      navigate("/admin");
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data.message : "Failed to create quiz"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full bg-gradient-to-br from-[#fbc2b3] to-[#f89f2b]">
      <div className="flex-grow flex items-center justify-center p-4 sm:p-8">
        <form
          className="flex flex-col w-full max-w-lg bg-white rounded-lg shadow-lg p-6 sm:p-8"
          onSubmit={handleFormSubmit}
        >
          <h2 className="text-center text-3xl font-extrabold text-[#f89f2b] mb-6">
            Create Your Quiz
          </h2>

          {errorMessage && (
            <div className="text-red-600 mb-2 text-sm">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-600 mb-2 text-sm">{successMessage}</div>
          )}

          <input
            className="p-3 mb-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#f89f2b] transition duration-200"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Quiz Title"
            required
          />
          <input
            className="p-3 mb-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#f89f2b] transition duration-200"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Quiz Category"
            required
          />

          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Questions
            </h3>
            {formData.questions.length > 0 ? (
              formData.questions.map((q, index) => (
                <div
                  key={index}
                  className="border border-gray-300 p-4 mb-2 bg-gray-50 rounded-lg shadow-sm"
                >
                  <p className="font-medium text-gray-800">
                    {index + 1}. {q.questionText}
                  </p>
                  <p className="text-gray-600">Options: {q.options.join(", ")}</p>
                  <p className="text-gray-600">Correct: {q.correctOption}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No questions added yet.</p>
            )}
          </div>

          <input
            className="p-3 mb-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#f89f2b] transition duration-200"
            type="text"
            name="currentQuestion"
            value={formData.currentQuestion}
            placeholder="Enter your question"
            onChange={handleChange}
          />
          {formData.currentOptions.map((option, index) => (
            <input
              key={index}
              className="p-3 mb-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#f89f2b] transition duration-200"
              type="text"
              value={option}
              placeholder={`Option ${index + 1}`}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          ))}
          <input
            className="p-3 mb-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#f89f2b] transition duration-200"
            type="text"
            name="correctOption"
            value={formData.correctOption}
            placeholder="Correct option"
            onChange={handleChange}
          />

          <button
            type="button"
            className="bg-[#f89f2b] text-white rounded-lg w-full py-3 mt-4 font-bold hover:bg-[#f89f2b] transition duration-200"
            onClick={handleAddQuestion}
          >
            Add Question
          </button>

          <button
            type="submit"
            className={`bg-[#f89f2b] text-white rounded-lg w-full py-3 mt-4 font-bold hover:bg-[#e38a00] transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Quiz"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuiz;
