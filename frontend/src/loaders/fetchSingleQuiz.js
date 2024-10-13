import axios from "axios"

export const fetchSingleQuiz=async(paramsObject)=>{
 
    const quizData=await axios.get(`http://localhost:8157/api/quizzes/${paramsObject?.params?.id}`)
    console.log(quizData);
    return  quizData.data;
}