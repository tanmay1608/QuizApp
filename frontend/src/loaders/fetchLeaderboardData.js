import axios from "axios"

const fetchQuizData=async (url)=>{
    return await axios.get(`http://localhost:8000/api/quizzes/${url}`)
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