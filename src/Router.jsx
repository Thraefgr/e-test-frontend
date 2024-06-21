import {createBrowserRouter} from "react-router-dom";
import Signin from "./pages/Signin";

const router = createBrowserRouter([{
    path:"/signin",
    element:<Signin />
}])

export default router;