import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "../components/Home"
import { fetchQuizzesData } from "../loaders/fetchQuizzesData"
import App from "../App"
import Quiz from "../pages/Quiz"
import { fetchSingleQuiz } from "../loaders/fetchSingleQuiz"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"

const allRoutes=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                index:true,
                element:<Home/>,
                loader:fetchQuizzesData
            },
            {
                path:'quiz/:id',
                element:<Quiz/>,
                loader: fetchSingleQuiz
                
            },
            {
                path:'login',
                element:<Login/>
            }
            ,{
                path:'signup',
                element:<SignUp/>
            }
        ]
        
    }
])

const Router = () => {
  return <RouterProvider router={allRoutes}/>
}

export default Router
