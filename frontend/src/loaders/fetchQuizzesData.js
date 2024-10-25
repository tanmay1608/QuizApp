import axios from "axios";
import { PORT } from "../utils/constants";

export const fetchQuizzesData = async () => {
  const quizzesData = await axios.get(`http://localhost:${PORT}/api/quizzes`);
  return quizzesData?.data?.quizzes;
};
