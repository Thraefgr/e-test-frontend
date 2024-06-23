import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LOCAL_URL } from "../../config";
import axios from "axios";
import Creation from "../components/Creation.jsx";

export default function UpdateCreation() {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const {id} = useParams();
    const [test, setTest] = useState();
    useEffect(() => {
        axios.get(`${LOCAL_URL}/mycreation/${id}`, {headers:{"Authorization":`Bearer ${token}`}})
        .then(res => setTest(res.data))
    })
    return (
        test ? <Creation data={[test, setTest]} /> : <h1>Hell0</h1>
    )
}