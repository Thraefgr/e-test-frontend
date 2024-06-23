import TestCoverForm from "../components/TestCoverForm";
import { Button, Flex } from "antd";
import { useState } from "react";

export default function NewCreation() {
    const[test, setTest] = useState({
        name: "",
        subject:"",
        difficulty:"",
        timeLimit: 60,
        questions:[{
            question: "",
            choices: [],
            answer: "",
            points: 10
        }],
    })
    return (
        <Flex style={{minHeight:"100vh"}}>
            <TestCoverForm  value={[test, setTest]}/>
            <Button onClick={()=>{console.log(test)}}>asds</Button>
        </Flex>
    )
}