import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "../components/Home"
import { fetchQuizzesData } from "../loaders/fetchQuizzesData"
import App from "../App"
import Quiz from "../pages/Quiz"
import { fetchSingleQuiz } from "../loaders/fetchSingleQuiz"
import Login from "../pages/Login"
import SignUp from "../pages/Register"
import AddQuiz from "../components/AddQuiz"
import Admin from "../components/Admin"
import UserForm from "../pages/Register"
import AdminWrapper from "../pages/AdminWrapper"
import UserLogin from "../pages/UserLogin"
import Register from "../pages/Register"
import QuizWrapper from "../pages/QuizWrapper"
import AddQuizWrapper from "../pages/AddQuizWrapper"
import LeaderBoard from "../components/LeaderBoard"
import { fetchLeaderboardData } from "../loaders/fetchLeaderboardData"
import ProfileWrapper from "../pages/ProfileWrapper"
import Profile from "../components/Profile"

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
                element:<QuizWrapper/>,
                children:[
                    {
                        index:true,
                        element:<Quiz/>,
                        loader: fetchSingleQuiz
                    },
                    {
                        path:'leaderboard',
                        element:<LeaderBoard/>,
                        loader:fetchLeaderboardData
                    }
                    
                ]
                
                
            },
            {
                path:'admin',
                element:<AdminWrapper/>,
                children:[{
                    path:'/admin',
                    element:<Admin/>
                }]
            },
            {
                path:'login',
                element:<Login/>
            }
            ,{
                path:'register',
                element:<Register/>
            },
            {
                path:'add-quiz',
                element:<AddQuizWrapper/>,
                children:[
                    {
                        path:'/add-quiz',
                        element:<AddQuiz/>
                    }
                ]
            },
            {
                path:'profile',
                element:<ProfileWrapper/>,
                children:[
                    {
                        index:true,
                        element:<Profile/>
                    }
                ]
            }
        ]
        
    }
])

const Router = () => {
  return <RouterProvider router={allRoutes}/>
}

export default Router
