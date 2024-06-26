import {createBrowserRouter} from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Tests from "./pages/Tests";
import Inventory from "./pages/Inventory";
import Exam from "./pages/Exam.jsx";
import MyCreation from "./pages/MyCreation.jsx";
import  NewCreation from "./pages/NewCreation.jsx";
import UpdateCreation from "./pages/UpdateCreation.jsx";
import Root from "./layouts/Root.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Auth from "./pages/Auth.jsx";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Root />,
        children:[
            {
                index:true,
                element:<Home />
            },
            {
                path:"/signin",
                element:<Signin />,
            }, 
            {
                path:"/signup",
                element:<Signup />
            },
            {
                path:"/tests",
                element:<Auth><Tests /></Auth>
            },
            {
                path:"/inventory",
                element:<Auth><Inventory /></Auth>
            },
            {
                path:"/exam/:id",
                element:<Auth><Exam /></Auth>
            },
            {
                path:"/mycreation",
                element:<Auth access={["teacher"]}><MyCreation /></Auth>
            },
            {
                path:"/mycreation/new",
                element: <Auth access={["teacher"]}><NewCreation /></Auth>
            },
            {
                path:"/mycreation/:id",
                element: <Auth access={["teacher"]}><UpdateCreation /></Auth>
            },
            {
                path:"/profile",
                element: <Auth><Profile /></Auth>
            },
            {
                path:"*",
                element: <h1>Looks like you are lost buddy. Just click Home button and you will be on your way.</h1>
            },
        ], 
    }
])

export default router;