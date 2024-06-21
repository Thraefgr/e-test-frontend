import {createBrowserRouter} from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Tests from "./pages/Tests";

const router = createBrowserRouter([
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
    }
])

export default router;