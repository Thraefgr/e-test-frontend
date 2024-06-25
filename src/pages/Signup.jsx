import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Form, Input, Select, Typography, message} from "antd";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import {LOCAL_URL} from "../../config.js";
import { useContext } from "react";
import { Context } from "../App.jsx";

export default function Signup() {
    const [creds] = useContext(Context);
    if (creds) {
        return <Navigate to="/profile"/>
    }
    const handleFinish = (formData) => {
        message.loading("Trying to sign you up...")
        axios.post(`${LOCAL_URL}/signup`, formData)
        .then(() => {
            message.destroy();
            message.success("You are signed up! Now, sign in!")
        })
        .catch(err => {
            message.destroy()
            message.error(err.response.data.message)
        })
    }
    return (
        <Flex style={{minHeight:"calc(100vh - 64px)"}} justify="center" align="center" vertical>
            <Card>
                <Typography.Title style={{textAlign:"center"}}>Sign Up</Typography.Title>
                <Form onFinish={handleFinish} style={{width:"400px" ,maxWidth:"400px"}}>
                    <Form.Item name="email" rules={[{required:true, message:"Email is required!"}]}>
                        <Input type="email" prefix={<MailOutlined />} placeholder="Email"/>
                    </Form.Item>
                    <Form.Item name="username" rules={[{required:true, message:"Username is required!"}]}>
                        <Input prefix={<UserOutlined/>} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{required:true, message:"Password is required!"}]}>
                        <Input.Password prefix={<LockOutlined />} placeholder="Password"/>
                    </Form.Item>
                    <Form.Item name="role" rules={[{required:true, message:"Role is required!"}]}>
                        <Select placeholder="Role">
                            <Select.Option value="teacher">Teacher</Select.Option>
                            <Select.Option value="student">Student</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Link to="/signin">Oh, you already have an account? Fantastic, click me to sign in!!</Link>
                    </Form.Item>
                </Form>
            </Card>
        </Flex>
    )
}