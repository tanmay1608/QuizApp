import axios from "axios"
import { PORT } from "../utils/constants";

export const fetchQuizzesData=async ()=>{
    const quizzesData=await axios.get(`http://localhost:${PORT}/api/quizzes`);
    console.log(quizzesData);
    return quizzesData?.data?.quizzes;
}