import {createBrowserRouter} from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
    {
        path:"/signin",
        element:<Signin />,
    }, 
    {
        path:"/signup",
        element:<Signup />
    }
])

export default router;