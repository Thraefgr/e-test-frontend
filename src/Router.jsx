import {createBrowserRouter} from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Tests from "./pages/Tests";
import Inventory from "./pages/Inventory";

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
    },
    {
        path:"/inventory",
        element:<Inventory />
    }
])

export default router;