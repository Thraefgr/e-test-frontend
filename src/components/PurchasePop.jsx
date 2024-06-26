
import { Button, Flex, Popover, Typography, message } from "antd";
import axios from "axios";
import { useState, useContext } from "react";
import { LOCAL_URL } from "../../config";
import { Context } from "../App";


export default function PurchasePop({children, name, creator, testId, value}) {
    const [open, setOpen] = useState(false);
    const [creds] = useContext(Context)
    const [tests, setTests] = value
    const token = creds.token;
    const handleOpen = (newOpen) => {
        setOpen(newOpen)
    }
    const handleNo = () => {
        setOpen(false)
    }
    const handleYes = () => {
        message.loading("Adding a new victim to your inventory...");
        axios.post(`${LOCAL_URL}/inventory`, {testId:testId}, {headers:{"Authorization":`Bearer ${token}`}})
        .then(() => {
            message.destroy();
            message.success("Go on tiger! Solve them all!!");
            const filtered = tests.filter(test => test._id !== testId);
            setTests(filtered);
        })
        .catch(() => {
            message.destroy();
            message.error("Seems like you already have this test!");
        })
    }

    const content = (
        <Flex vertical={true}>
            <Typography.Text>It is completely free!</Typography.Text>
            <Typography.Title level={4}>{name} by @{creator}</Typography.Title>
            <Button onClick={handleYes} style={{backgroundColor:"green", color:"white"}}>Yes!</Button>
            <Button onClick={handleNo} style={{backgroundColor:"red", color:"white"}}>No!</Button>
        </Flex>
    )
    return (
        <Popover content={content} open={open} onOpenChange={handleOpen} trigger={"click"} title={`Would you like to add this test to your inventory?`} placement="top" >
            {children}
        </Popover>
    )
}