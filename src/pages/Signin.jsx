import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, message} from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import {LOCAL_URL} from "../../config.js";

export default function Signin() {
    const handleFinish = (formData) => {
        message.loading("Trying to sign you in...")
        axios.post(`${LOCAL_URL}/signin`, formData)
        .then(res => localStorage.setItem("user", JSON.stringify(res.data)))
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
        <Flex style={{height:"100vh", padding:"1rem"}} justify="center" align="center">
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
        </Flex>
    )
}