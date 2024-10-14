import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "../components/Home"
import { fetchQuizzesData } from "../loaders/fetchQuizzesData"
import App from "../App"
import Quiz from "../pages/Quiz"
import { fetchSingleQuiz } from "../loaders/fetchSingleQuiz"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"
import AddQuiz from "../components/AddQuiz"
import Admin from "../components/Admin"
import UserForm from "../components/UserForm"
import AdminWrapper from "../pages/AdminWrapper"
import UserLogin from "../pages/UserLogin"

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
                path:'admin',
                element:<AdminWrapper/>,
                children:[{
                    path:'/admin',
                    element:<Admin/>
                }]
            },
            {
                path:'login-user',
                element:<UserLogin/>
            },
            {
                path:'register-user',
                element:<UserForm/>
            },
            {
                path:'login',
                element:<Login/>
            }
            ,{
                path:'signup',
                element:<SignUp/>
            },
            {
                path:'add-quiz',
                element:<AddQuiz/>
            }
        ]
        
    }
])

const Router = () => {
  return <RouterProvider router={allRoutes}/>
}

export default Router
