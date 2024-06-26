import TestCoverForm from "./TestCoverForm";
import { Button, Flex, Typography,} from "antd";
import { useState } from "react";
import QuestionForm from "./QuestionForm";
import ButtonGroup from "antd/es/button/button-group";
import {DoubleRightOutlined, DoubleLeftOutlined, DeleteFilled, PlusCircleFilled} from "@ant-design/icons"

export default function NewCreation({data}) {
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
        if (test.questions.length === 1 ) {
            console.log(1)
        } else {
            const newQs = test.questions.filter((que, i) => i!==curIndex)
            if (curIndex === test.questions.length - 1) {
                setCurIndex(prev => --prev)
            }
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
        console.log(test)
    } 

    return (
        <Flex align="center" vertical style={{minHeight:"calc(100vh - 64px)", padding:"2rem"}} gap="4rem">
            <TestCoverForm  value={[test, setTest]} />
            <Flex vertical gap="1rem" style={{width:"50%"}}>
                <QuestionForm value={[test, setTest]} index={[curIndex, setCurIndex]}/>
                    <Flex align="center" justify="space-between">
                        <ButtonGroup style={{display:"flex", alignItems:"center"}}>
                            <Button size="large" onClick={decIndex} icon={<DoubleLeftOutlined />}></Button>
                            <Button size="large" onClick={incIndex} icon={<DoubleRightOutlined />}></Button>
                        </ButtonGroup>
                        <Typography.Text style={{fontSize:"2rem"}}>{curIndex + 1}/{test.questions.length}</Typography.Text>
                        <ButtonGroup>
                            <Button size="large" style={{backgroundColor:"red", color:"white"}} onClick={deleteQuestion} icon={<DeleteFilled />}></Button>
                            <Button size="large" style={{backgroundColor:"green", color:"white"}} onClick={addQuestion} icon={<PlusCircleFilled />}></Button>
                        </ButtonGroup>
                    </Flex>
                </Flex>
            </Flex>
    )
}