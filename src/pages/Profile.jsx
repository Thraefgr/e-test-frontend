import {Card, Input, Typography, Flex, Form, FloatButton, message} from "antd"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { LOCAL_URL } from "../../config"
import { DeleteOutlined, SaveOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Context } from "../App";

export default function Profile() {
    const [creds, setCreds] = useContext(Context)
    const token = creds.token;
    const [profile, setProfile] = useState({})
    const nav = useNavigate();
    const handleNameChange = (e) => {
        setProfile({...profile, name:e.target.value})
    }
    const handleSurnameChange = (e) => {
        setProfile({...profile, surname:e.target.value})
    }
    const handleUniversityChange = (e) => {
        setProfile({...profile, university:e.target.value})
    }
    const handleMajorChange = (e) => {
        setProfile({...profile, major:e.target.value})
    }
    const handleGPAChange = (e) => {
        setProfile({...profile, GPA:e.target.value})
    }
    const handleJobChange = (e) => {
        setProfile({...profile, job:e.target.value})
    }

    const updateProfile = () => {
        axios.put(`${LOCAL_URL}/profile`, profile, {headers:{"Authorization":`Bearer ${token}`}})
        .then(()=>{
            message.success("You have successfully updated your profile!")
        })
    }
    
    const deleteProfile = () => {
        axios.delete(`${LOCAL_URL}/profile`, {headers:{"Authorization":`Bearer ${token}`}})
        .then(()=>{
            message.success("You profile... is gone. Forever.")
            localStorage.clear()
            setCreds(null)
            nav("/")
        })
    }



    useEffect(()=>{
        axios.get(`${LOCAL_URL}/profile`, {headers:{"Authorization":`Bearer ${token}`}})
        .then(res => {setProfile(res.data);console.log(res)})
    }, [])
    return (
        <Flex justify="center" align="center" style={{minHeight:"calc(100vh - 64px)", padding:"1rem"}}>
            <Card title={<Typography.Title style={{textAlign:"center"}}>Profile</Typography.Title>} style={{minWidth:"50%", padding:"1rem"}}>
                <Form>
                        <Flex align="center" wrap>
                            <Typography.Text style={{fontSize:"2rem"}}>Username:</Typography.Text>
                            <Input style={{fontSize:"2rem", width:"fit-content"}} variant="borderless" value={profile.username} readOnly />
                        </Flex>
                        <Flex align="center">
                            <Typography.Text style={{fontSize:"2rem"}}>Role:</Typography.Text>
                            <Input style={{fontSize:"2rem", width:"fit-content"}} variant="borderless" value={profile.role} readOnly/>
                        </Flex>
                        <Flex align="center">
                            <Typography.Text style={{fontSize:"2rem"}}>Name:</Typography.Text>
                            <Input style={{fontSize:"2rem", width:"fit-content"}} variant="borderless" value={profile.name} onChange={handleNameChange}/>
                        </Flex>
                        <Flex align="center">
                            <Typography.Text style={{fontSize:"2rem"}}>Surname:</Typography.Text>
                            <Input style={{fontSize:"2rem", width:"fit-content"}} variant="borderless" value={profile.surname} onChange={handleSurnameChange}/>
                        </Flex>
                        <Flex align="center">
                            <Typography.Text style={{fontSize:"2rem"}}>Job:</Typography.Text>
                            <Input style={{fontSize:"2rem", width:"fit-content"}} variant="borderless" value={profile.job} onChange={handleJobChange}/>
                        </Flex>
                        <Flex align="center">
                            <Typography.Text style={{fontSize:"2rem"}}>University:</Typography.Text>
                            <Input style={{fontSize:"2rem", width:"fit-content"}} variant="borderless" value={profile.university} onChange={handleUniversityChange}/>
                        </Flex>
                        <Flex align="center">
                            <Typography.Text style={{fontSize:"2rem"}}>Major:</Typography.Text>
                            <Input style={{fontSize:"2rem", width:"fit-content"}} variant="borderless" value={profile.major} onChange={handleMajorChange}/>
                        </Flex>
                        <Flex align="center">
                            <Typography.Text style={{fontSize:"2rem"}}>GPA:</Typography.Text>
                            <Input type="number" style={{fontSize:"2rem", width:"fit-content"}} variant="borderless" max={4} value={profile.GPA} onChange={handleGPAChange}/>
                        </Flex>
                </Form>
            </Card>
            <FloatButton onClick={updateProfile} tooltip="Update your profile" style={{right:"160px"}} icon={<SaveOutlined />}>Hey</FloatButton>
            <FloatButton onClick={deleteProfile} tooltip="Delete your profile" icon={<DeleteOutlined />} style={{right:"80px"}}>Hey</FloatButton>
        </Flex>
    )
}