import {Card, Typography, Flex, Form, FloatButton, message} from "antd"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { LOCAL_URL } from "../../config"
import { DeleteOutlined, LogoutOutlined, SaveOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Context } from "../App";
import ProfileField from "../components/ProfileField";

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

    const fields = [
        {
            label: "Username",
            value: profile.username,
            readOnly: true,
            onChange: null
        },
        {
            label: "Role",
            value: profile?.role?.slice(0,1).toUpperCase() + profile?.role?.slice(1,profile.role.length),
            readOnly: true,
            onChange: null
        },
        {
            label: "Name",
            value: profile.name,
            readOnly: false,
            onChange: handleNameChange
        },
        {
            label: "Surname",
            value: profile.surname,
            readOnly: false,
            onChange: handleSurnameChange
        },
        {
            label: "Job",
            value: profile.job,
            readOnly: false,
            onChange: handleJobChange
        },
        {
            label: "University",
            value: profile.university,
            readOnly: false,
            onChange: handleUniversityChange
        },
        {
            label: "Major",
            value: profile.major,
            readOnly: false,
            onChange: handleMajorChange
        },
        {
            label: "GPA",
            value: profile.GPA,
            readOnly: false,
            onChange: handleGPAChange,
            number :{
                value:true,
                max:4
            }
        },
    ]

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

    const signOut = () => {
        localStorage.clear();
        nav("/");
        setCreds(null);
    }



    useEffect(()=>{
        axios.get(`${LOCAL_URL}/profile`, {headers:{"Authorization":`Bearer ${token}`}})
        .then(res => {setProfile(res.data);console.log(res)})
    }, [token])
    return (
        <Flex justify="center" align="center" style={{minHeight:"calc(100vh - 64px)", padding:"1rem"}}>
            <Card title={<Typography.Title style={{textAlign:"center"}}>Profile</Typography.Title>} style={{minWidth:"50%", padding:"1rem"}}>
                <Form style={{display:"flex", flexDirection:"column", gap:"1rem"}}>
                    {fields.map(field => <ProfileField key={field.label} label={field.label} value={field.value} readOnly={field.readOnly} onChange={field.onChange} number={field.number}/>)}
                </Form>
            </Card>
            <FloatButton onClick={updateProfile} tooltip="Update your profile" style={{right:"15%"}} icon={<SaveOutlined />}>Hey</FloatButton>
            <FloatButton onClick={deleteProfile} tooltip="Delete your profile" icon={<DeleteOutlined />} style={{right:"10%"}}>Hey</FloatButton>
            <FloatButton onClick={signOut} tooltip="Sign out" icon={<LogoutOutlined />} style={{right:"5%"}}>Hey</FloatButton>
        </Flex>
    )
}