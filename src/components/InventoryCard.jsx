import { Button, Card, Flex, Popover, Typography, message } from "antd";
import dateConverter from "../lib/dateConverter.js";
import { LOCAL_URL } from "../../config.js";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../App.jsx";

export default function InventoryCard({test, own}) {
    const {testId, finishDate, rightOnes, score} = test;
    const {Title, Text} = Typography;
    const minutes = Math.floor(testId?.timeLimit/60);
    const seconds = testId?.timeLimit - minutes*60;
    const [creds] = useContext(Context)
    const token = creds.token;
    const [setOwned] = own;
    const handleRemove = () => {
        message.loading("Removing the test from your account.")
        axios.delete(`${LOCAL_URL}/inventory/${testId?._id}`, {headers:{"Authorization":`Bearer ${token}`}})
        .then(() => {
            message.destroy()
            message.success("Hey you no longer have this nasty, filthy test!")
            setOwned(pre => {
                return pre.filter(test => test?.testId?._id!==testId?._id)
            })
            })
        .catch(err => {
            console.log(err)
        })
    }


    const content = (
        <Card bordered={false} style={{maxWidth:"480px", gap:"4rem"}}>
            <Title level={2}>Results</Title>
            {
                finishDate ?
                <Flex vertical gap="1rem">
                    <Text strong>Solved at: {dateConverter(finishDate)}</Text>
                    <Text strong>Right Answers: {rightOnes} / {testId?.queCount}</Text>
                    <Text strong>Final Score: {score} / {testId?.totalPoints}</Text>
                </Flex> :
                <Flex vertical gap="1rem">
                    <Text>Looks like you have not even solved it yet! Go head and solve it tiger!!</Text>
                    <Link to={`/exam/${testId?._id}`}><Button style={{backgroundColor:"green", color:"white"}}>Solve!</Button></Link>
                </Flex>
            }
            <Button onClick={handleRemove} style={{marginTop:"1rem", backgroundColor:"red", color:"white"}}>Remove this Test</Button>
        </Card>
    );


    return (
        testId ?
        <Popover trigger="click" content={content}>
            <Card hoverable style={{width:"360px", maxWidth:"480px", backgroundColor:"wheat", height:"fit-content", opacity:`${finishDate && 0.5}`}}>
                <Flex vertical>
                    <Title level={2}>{testId.name}</Title>
                    <Text strong style={{fontSize:"1.25rem"}}>Subject: {testId.subject}</Text>
                    <Text strong style={{fontSize:"1.25rem"}}>Number of Questions: {testId.queCount}</Text>
                    <Text strong style={{fontSize:"1.25rem"}}>Estimated Difficulty: {testId.difficulty}</Text>
                    <Text strong style={{fontSize:"1.25rem"}}>Time Limit: {minutes}m{seconds}s</Text>
                    <Text style={{marginTop:"1rem"}}>Created by {testId.creator} at {testId.createdAt.slice(0, testId.createdAt.indexOf("T"))}</Text>
                    <Text>Last updated at {testId.updatedAt.slice(0, testId.updatedAt.indexOf("T"))}</Text>
                </Flex>
            </Card>
        </Popover> :
        <></>
    )
}