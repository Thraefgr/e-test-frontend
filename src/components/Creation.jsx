import TestCoverForm from "./TestCoverForm";
import { Button, Flex, FloatButton, message } from "antd";
import { useState } from "react";
import QuestionForm from "./QuestionForm";
import ButtonGroup from "antd/es/button/button-group";
import {DoubleRightOutlined, DoubleLeftOutlined, DeleteFilled, PlusCircleFilled, CheckOutlined} from "@ant-design/icons"
import axios from "axios";
import { LOCAL_URL } from "../../config"
import { useNavigate } from "react-router-dom";

export default function NewCreation({data}) {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const navigate = useNavigate();
    const [test, setTest] = data;

    const [curIndex, setCurIndex] = useState(0);
    const incIndex = () => {
        if(curIndex === test.questions.length-1){
            setCurIndex(0)
        }else {
            setCurIndex(prev=>++prev)
        }
    }

    const decIndex = () => {
        if(curIndex === 0){
            setCurIndex(test.questions.length-1)
        }else {
            setCurIndex(prev=>--prev)
        }
    }

    const deleteQuestion = () => {
        if(test.questions.length === 1 ) {
            console.log(1)
        } else {
            const newQs = test.questions.filter((que, i) => i!==curIndex)
            setCurIndex(pre => --pre)
            setTest({...test, questions:newQs}) 
        }
    }


    const addQuestion = () => {
        const newq = {
            question: "",
            choices: [],
            answer: "",
            points: 10,
            choice: ""
        }
        setTest({...test, questions:[...test.questions, newq]})
    } 

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
        <Flex style={{minHeight:"100vh", padding:"2rem"}} gap="2rem">
            <TestCoverForm  value={[test, setTest]}/>
            <Flex vertical gap={2}>
                <QuestionForm value={[test, setTest]} index={[curIndex, setCurIndex]}/>
                <ButtonGroup>
                    <Button size="large" onClick={decIndex} icon={<DoubleLeftOutlined />}></Button>
                    <Button size="large" onClick={incIndex} icon={<DoubleRightOutlined />}></Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button size="large" style={{backgroundColor:"red", color:"white"}} onClick={deleteQuestion} icon={<DeleteFilled />}></Button>
                    <Button size="large" style={{backgroundColor:"green", color:"white"}} onClick={addQuestion} icon={<PlusCircleFilled />}></Button>
                </ButtonGroup>
            </Flex>
            <FloatButton style={{right:"96px"}}onClick={createTest} icon={<CheckOutlined />}/>
        </Flex>
    )
}