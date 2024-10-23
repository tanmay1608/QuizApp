import axios from "axios";
import { PORT } from "../utils/constants";

const fetchQuizData = async (url) => {
  return await axios.get(`http://localhost:${PORT}/api/quizzes/${url}`);
};
export const fetchLeaderboardData = async (params) => {
  const leaderBoardData = await Promise.allSettled([
    fetchQuizData(`${params.params.id}/leaderboard`),
    fetchQuizData(`${params.params.id}`),
  ]);

  return leaderBoardData;
};
