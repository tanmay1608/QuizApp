import axios from "axios"

export const fetchQuizzesData=async ()=>{
    console.log("inside")
    const quizzesData=await axios.get("http://localhost:8157/api/quizzes");
    console.log("loader",quizzesData.data);
    return quizzesData.data;
    //return [];
}