import { DoubleRightOutlined } from "@ant-design/icons";
import {Button, Card, Form, Radio, Typography, message} from "antd"
import { LOCAL_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { Context } from "../App";
import { useContext } from "react";

export default function Question({question, index, test, postResult}) {
    const {Title} = Typography;
    const [currIndex, setCurrIndex] = index;
    const [testy] = test;
    const [creds] = useContext(Context)
    const token = creds.token;
    const navigate = useNavigate()
    console.log(currIndex)
    const handleFinish = (e) => {
        testy.questions[currIndex].choice = e.choice
        if (currIndex === testy.questions.length-1) {
            message.loading("Uploading your answers...");
            postResult(`${LOCAL_URL}/exam/${testy._id}`, testy, token)
            .then(() => {
                message.destroy()
                message.success("You have conquered the test! Now take a break.")
                navigate("/inventory")
            })
        } else {
            setCurrIndex(prev => ++prev)
        }

    }
    return (
        <Card style={{width:"60%", minWidth:"368px"}}>
            <Form onFinish={handleFinish}>
                <Form.Item name="question" initialValue={question.question}>
                    <Title level={3}>{question.question}</Title>
                </Form.Item>
                <Form.Item name="choice" initialValue="">
                    <Radio.Group name="choicegroup" style={{fontWeight:"bold"}}>
                        {question.choices?.map((choice, i) => <Radio value={choice} key={i}>{choice}</Radio>)}
                    </Radio.Group>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" style={{backgroundColor:"green", color:"white"}}>Next{<DoubleRightOutlined />}</Button>
                </Form.Item>
            </Form>
        </Card>

    )
}