import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { LOCAL_URL } from "../../config";
import Question from "../components/Question.jsx";
import { Flex, Typography, message } from "antd";
import { Context } from "../App.jsx";

export default function Exam() {
    const {id} = useParams();
    const [test, setTest] = useState();
    const [currIndex, setCurrIndex] = useState(0);
    const [time, setTime] = useState(0)
    const minutes = `${Math.floor(time/60)}m${time-Math.floor(time/60)*60}s`;
    const [creds] = useContext(Context)
    const token = creds.token;
    const nav = useNavigate()

    useEffect(() => {
        axios.get(`${LOCAL_URL}/exam/${id}`, {headers:{"Authorization":`Bearer ${token}`}})
        .then(res => {
            setTest(res.data);
            setTime(res.data.timeLimit)
        })
        .then(() => {
            setInterval(()=>{
                setTime(pre => --pre)
            },1000)
        })
        .catch(err => console.log(err))
    }, [id, token])

    if(time <= -1){
        message.loading("Uploading your answers...");
        postResult(`${LOCAL_URL}/exam/${id}`, test, token).
        then(() => {
            message.destroy()
            message.success("You have conquered the test! Now take a break.")
            nav("/inventory")
        })
    }
    
    return (
        <Flex vertical style={{minHeight:"100vh"}} justify="center" align="center" gap="2rem">
                <Flex wrap justify="space-between" align="center"style={{width:"60%", minWidth:"400px"}}>
                    <Typography.Title level={2} style={{marginBottom:"-104px"}}>{minutes}</Typography.Title>
                    <Typography.Title>{test?.name}</Typography.Title>
                    <Typography.Title level={2} style={{marginBottom:"-64px"}}>{currIndex + 1}/{test?.questions.length}</Typography.Title>
                </Flex>
            {test && <Question question={test?.questions[currIndex]} index={[currIndex, setCurrIndex]} test={[test, setTest]} postResult={postResult}/>}
        </Flex>
    )
}


async function postResult(url, data, token) {
    const response = await axios.post(url, data, {headers:{"Authorization": `Bearer ${token}`}});
    return response
}