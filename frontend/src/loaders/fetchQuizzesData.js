import axios from "axios"

export const fetchQuizzesData=async ()=>{
    const quizzesData=await axios.get("http://localhost:8000/api/quizzes");;
    return quizzesData.data;
}