import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LOCAL_URL } from "../../config";
import axios from "axios";
import Creation from "../components/Creation.jsx";
import { FloatButton, message } from "antd";
import { SaveFilled, SaveOutlined } from "@ant-design/icons";

export default function UpdateCreation() {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const {id} = useParams();
    const [test, setTest] = useState();
    useEffect(() => {
        axios.get(`${LOCAL_URL}/mycreation/${id}`, {headers:{"Authorization":`Bearer ${token}`}})
        .then(res => setTest(res.data))
    }, [])

    const updateTest = () => {
        test.queCount = test.questions.length;
        axios.put(`${LOCAL_URL}/mycreation/${id}`, test, {headers:{"Authorization": `Bearer ${token}`}})
        .then(() => message.success("Successully updated your test!"))
        .catch(() => message.error("Could not update the test. Sorry..."))
    }
    return (
        test ? 
        <>
            <Creation data={[test, setTest]} />
            <FloatButton style={{right:"96px"}} icon={<SaveOutlined />} onClick={updateTest}>Click</FloatButton>
        </> : <h1></h1>
    )
}