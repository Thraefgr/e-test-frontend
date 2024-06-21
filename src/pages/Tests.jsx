import { useEffect, useState } from "react";
import axios from "axios";
import {LOCAL_URL} from "../../config.js";
import Test from "../components/Test.jsx";
import { Flex } from "antd";
import { Link } from "react-router-dom";


export default function Tests() {
    const [tests, setTests] = useState([]);
    const token = JSON.parse(localStorage.getItem("user")).token;

    useEffect(() => {
        axios.get(`${LOCAL_URL}/tests`, {headers:{"Authorization": `Bearer ${token}`}})
        .then(res => setTests(res.data))
        .catch(err => console.log(err));
    }, [])

    return (
        <Flex wrap={true} style={{minHeight: "100vh", padding:"1rem"}} justify="space-evenly" align="center" gap="1rem">
            {tests.map(test => <Link key={test._id} to={`/tests/${test._id}`}><Test test={test}/></Link>)}
        </Flex>
    )
}