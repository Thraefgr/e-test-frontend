import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LOCAL_URL } from "../../config";
import { Button, Flex, FloatButton, Popover, message } from "antd";
import Test from "../components/Test";
import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Context } from "../App";

export default function MyCreation() {
    const [tests, setTests] = useState([]);
    const [creds] = useContext(Context)
    const token = creds.token;
    useEffect(() => {
        axios.get(`${LOCAL_URL}/mycreation`, {headers:{"Authorization":`Bearer ${token}`}})
        .then(res => setTests(res.data))
        .catch(err=>console.log(err));
    }, [token])

    return (
        <Flex wrap style={{padding:"1rem", gap:"1rem", minHeight:"calc(100vh - 64px)"}} justify="center" align="center">
            {tests.map(test => {
                return <Popover trigger="click" content={()=> <Content id={test._id} token={token} value={[tests, setTests]}/>} key={test._id}>
                            <Test test={test}/>
                        </Popover>
                        }
            )}
            <Link to="/mycreation/new" title="Create a new test"><FloatButton type="primary" style={{right:"5%", color:"green"}}icon={<PlusOutlined style={{color:"white"}}/>} /></Link>
        </Flex>
    )
}


const Content = ({id, token, value}) => {
    const [tests, setTests] = value;
    const deleteCreation = () => {
        axios.delete(`${LOCAL_URL}/mycreation/${id}`, {headers:{"Authorization":`Bearer ${token}`}})
        .then(()=> {
            message.success("You have successfully deleted that nasty, filthy test!")
            const filtered = tests.filter(test => id!==test._id)
            setTests([...filtered])
        }).catch(err => console.log(err))
    }


    return (
        <Button.Group>
            <Button onClick={deleteCreation} icon={<DeleteFilled />}>Delete</Button>
            <Link to={`/mycreation/${id}`}><Button icon={<EditFilled />}>Edit</Button></Link>
        </Button.Group>
    )
}   
