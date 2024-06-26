import { useContext } from "react";
import { Context } from "../App";
import { Navigate } from "react-router-dom";

export default function Auth({access = ["student", "teacher"], children}) {
    const [creds] = useContext(Context);
    if (!creds) {
        return <Navigate to="/signin"/>
    }
    if (access.includes(creds.role)) {
        return children
    }
    return <Navigate to="/"/>
}