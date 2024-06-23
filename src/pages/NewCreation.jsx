import TestCoverForm from "../components/TestCoverForm";
import { Button, Flex } from "antd";
import { useState } from "react";
import QuestionForm from "../components/QuestionForm";

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
    return (
        <Flex style={{minHeight:"100vh"}}>
            <TestCoverForm  value={[test, setTest]}/>
            <QuestionForm value={[test, setTest]} index={[curIndex, setCurIndex]}/>
            <Button onClick={()=>{setCurIndex(prev=>++prev)}}>asds</Button>
        </Flex>
    )
}