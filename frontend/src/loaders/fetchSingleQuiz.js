import axios from "axios";
import { PORT } from "../utils/constants";

export const fetchSingleQuiz = async (paramsObject) => {
  const quizData = await axios.get(
    `http://localhost:${PORT}/api/quizzes/${paramsObject?.params?.id}`
  );

  return quizData.data.quiz;
};
