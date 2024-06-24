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
                element:<Tests />
            },
            {
                path:"/inventory",
                element:<Inventory />
            },
            {
                path:"/exam/:id",
                element:<Exam />
            },
            {
                path:"/mycreation",
                element:<MyCreation />
            },
            {
                path:"/mycreation/new",
                element: <NewCreation />
            },
            {
                path:"/mycreation/:id",
                element: <UpdateCreation />
            },
            {
                path:"/profile",
                element: <Profile />
            },
        ], 
    }
])

export default router;