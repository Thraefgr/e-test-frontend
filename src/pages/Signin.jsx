import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Form, Input, Typography, message} from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {LOCAL_URL} from "../../config.js";
import { useContext } from "react";
import { Context } from "../App.jsx";

export default function Signin() {
    const [creds, setCreds] = useContext(Context);
    const nav = useNavigate();
    const handleFinish = (formData) => {
        message.loading("Trying to sign you in...")
        axios.post(`${LOCAL_URL}/signin`, formData)
        .then(res => {
            localStorage.setItem("credentials", JSON.stringify(res.data));
            setCreds(JSON.parse(localStorage.getItem("credentials")));
            nav("/profile");
        })
        .then(() => {
            message.destroy()
            message.success("You are signed in. Now go solve some tests, tiger!!")
        })
        .catch(e => {
            message.destroy()
            message.error(e.response.data.message)
        });
    }
    return (
        <Flex style={{minHeight:"calc(100vh - 64px)", padding:"1rem"}} justify="center" align="center" vertical>
            <Card>
                <Typography.Title style={{textAlign:"center"}}>Sign In</Typography.Title>
                <Form onFinish={handleFinish} style={{width:"400px" ,maxWidth:"400px"}}>
                    <Form.Item name="username" rules={[{required:true, message:"Username is required!"}]}>
                        <Input prefix={<UserOutlined/>} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{required:true, message:"Password is required!"}]}>
                        <Input.Password prefix={<LockOutlined />} placeholder="Password"/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Link to="/signup">Oh, you want to register? Click me then!</Link>
                    </Form.Item>
                </Form>
            </Card>
        </Flex>
    )
}