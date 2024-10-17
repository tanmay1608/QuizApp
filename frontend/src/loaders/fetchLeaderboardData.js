import axios from "axios"
import { PORT } from "../utils/constants";

const fetchQuizData=async (url)=>{
console.log("inside check");
    return await axios.get(`http://localhost:${PORT}/api/quizzes/${url}`)
}
export const fetchLeaderboardData=async (params)=>{
    
    const leaderBoardData=await Promise.allSettled([fetchQuizData(`${params.params.id}/leaderboard`),
        fetchQuizData(`${params.params.id}`)
    ]);

    console.log(leaderBoardData);
    return leaderBoardData
    // const leaderBoardData=await axios.get(`http://localhost:8000/api/quizzes/${params.params.id}/leaderboard`);
    // const quizInfo=await axios.get(`http://localhost:8000/api/quizzes/${params.params.id}`);
    // return leaderBoardData.data;
}