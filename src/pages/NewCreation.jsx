import { useContext, useState } from "react"
import Creation from "../components/Creation.jsx"
import axios from "axios";
import { LOCAL_URL } from "../../config"
import { FloatButton, message } from "antd";
import { useNavigate } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";
import { Context } from "../App.jsx";

export default function NewCreation() {
    const navigate = useNavigate();
    const [creds] = useContext(Context)
    const token = creds.token;
    const [test, setTest] = useState({
        name: "",
        subject:"",
        difficulty:"",
        timeLimit: 60,
        queCount: 0,
        questions:[
        {
            question: "",
            choices: [],
            answer: "",
            points: 10,
            choice: ""
        }
        ],
    })

    async function createTest() {
        test.queCount = test.questions.length;
        axios.post(`${LOCAL_URL}/mycreation`, test, {headers:{"Authorization":`Bearer ${token}`}})
        .then(() => {
            message.success("Come on, checkout your new creation! It is so exciting!");
            navigate("/mycreation")
        })
        .catch(()=>message.error("Fill all required fields!"))
    }

    return (
        <>
            <Creation data={[test, setTest]}/>
            <FloatButton style={{right:"96px"}}onClick={createTest} icon={<CheckOutlined />}/>
        </>
    )

}