import axios from "axios"

export const fetchQuizzesData=async ()=>{
    const quizzesData=await axios.get("http://localhost:8000/api/quizzes");
    console.log(quizzesData);
    return quizzesData?.data?.quizzes;
}