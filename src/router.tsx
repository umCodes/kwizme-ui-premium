import { createBrowserRouter } from "react-router";
import App from "./App";
import Lab from "./pages/Lab/Lab";
import QuizHistory from "./pages/QuizHistory/QuizHistory";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Quiz from "./pages/Quiz/Quiz";
import Feedback from "./pages/Feedback/Feedback";



export const router = createBrowserRouter([
        {
                path: "/",
                element: <App/>,
                children: [
                        {
                                path: "",
                                element: <Lab/>,
                        },
                        {
                                path: "quizhistory",
                                element: <QuizHistory/>,
                        },
                        {
                                path: "feedback",
                                element: <Feedback />,
                        },
                ]
        },
         
        {
                path: "signup",
                element: <Signup />
        },
        {
                path: "login",
                element: <Login />
        },
        {
                path: "/quiz/:id",
                element: <Quiz />,
        }
])