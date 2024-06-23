import TestCoverForm from "../components/TestCoverForm";
import { Button, Flex } from "antd";
import { useState } from "react";
import QuestionForm from "../components/QuestionForm";
import ButtonGroup from "antd/es/button/button-group";
import {DoubleRightOutlined, DoubleLeftOutlined, PlusCircleOutlined, DeleteFilled} from "@ant-design/icons"

export default function NewCreation() {

    const[test, setTest] = useState({
        name: "",
        subject:"",
        difficulty:"",
        timeLimit: 60,
        questions:[
        {
            question: "9x9",
            choices: ["81", "45", "33"],
            answer: "81",
            points: 10,
            choice: ""
        },
        {
            question: "2",
            choices: [2, "wasdasd", "abc"],
            answer: "2",
            points: 10,
            choice: ""
        }
        ],
    })
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
                    <Button size="large" style={{backgroundColor:"green", color:"white"}} onClick={addQuestion} icon={<PlusCircleOutlined />}></Button>
                </ButtonGroup>
            </Flex>
        </Flex>
    )
}