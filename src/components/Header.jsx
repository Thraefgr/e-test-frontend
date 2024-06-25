import { Menu } from "antd"
import { Header } from "antd/es/layout/layout"
import {FileDoneOutlined, FileOutlined, FolderOutlined, HomeOutlined, LoginOutlined, UserOutlined} from "@ant-design/icons";
import Title from "antd/es/typography/Title"
import { Link } from "react-router-dom"
import { useContext } from "react";
import {Context} from "../App";

export default function MyHeader() {
    const {Item} = Menu;
    const [creds] = useContext(Context);
    return (
        <Header style={{backgroundColor:"white", display:"flex", justifyContent:"space-between"}}>
                <Title><Link to="/">eTest</Link></Title>
            <Menu mode="horizontal">
                <Item key="home" icon={<HomeOutlined />}><Link to="/">Home</Link></Item>
                {creds && <Item key="tests" icon={<FileOutlined />}><Link to="/tests">Tests</Link></Item>}
                {creds && <Item key="folder" icon={<FolderOutlined />}><Link to="/inventory">Folder</Link></Item>}
                {creds?.role ==="teacher" && <Item key="mycreation" icon={<FileDoneOutlined />}><Link to="/mycreation">My Creation</Link></Item>}
                {creds && <Item key="profile" icon={<UserOutlined />}><Link to="/profile">Profile</Link></Item>}
                {!creds && <Item key="signin" icon={<LoginOutlined />}><Link to="/signin">Sign in</Link></Item>}
            </Menu>
        </Header>
    )
}