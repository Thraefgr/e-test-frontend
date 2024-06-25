import { Card, Flex, Typography } from "antd";
import log from "../assets/note_3840.jpg";
import { Link } from "react-router-dom";


export default function Home() {
    return (
            <Flex align="center" justify="center" style={{minHeight:"calc(100vh - 64px)", backgroundImage:`url(${log})`, backgroundSize:"cover", backgroundPosition:"50%"}}>
                <Card style={{backgroundColor:"rgba(22, 22, 22, 0.6)", height:"fit-content"}}>
                    <Typography.Title style={{color:"white", textAlign:"center", textShadow:"0 0 8px black"}}>Welcome, dear knowledge chaser!</Typography.Title>
                    <Typography.Title level={2} style={{color:"white", textAlign:"center", textShadow:"0 0 8px black"}}>
                        If you want to learn by solving incredible tests created by people, very much like, you then you are in the right place.<br />
                        Just, <Link to="/signup">click here</Link> to register! Or if you already have got an account, <Link to="/signin">click here</Link>.
                    </Typography.Title>
                </Card>
            </Flex>
    )
}