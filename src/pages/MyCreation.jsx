import axios from "axios";
import { useEffect } from "react";
import { LOCAL_URL } from "../../config";
import { useState } from "react";
import { Flex, FloatButton } from "antd";
import Test from "../components/Test";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function MyCreation() {
    const [tests, setTests] = useState([]);
    const token = JSON.parse(localStorage.getItem("user")).token;
    useEffect(() => {
        axios.get(`${LOCAL_URL}/mycreation`, {headers:{"Authorization":`Bearer ${token}`}})
        .then(res => setTests(res.data))
        .catch(err=>console.log(err));
    }, [])

    return (
        <Flex wrap style={{padding:"1rem"}} justify="space-evenly" align="center">
            {tests.map(test => <Test key={test._id} test={test}/>)}
            <Link to="/tests" title="Create a new test"><FloatButton type="primary" style={{right:"5%", color:"green"}}icon={<PlusOutlined style={{color:"white"}}/>} /></Link>
        </Flex>
    )
}