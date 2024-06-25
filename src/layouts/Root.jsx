import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import MyHeader from "../components/Header";

export default function Root() {
    return (
        <Layout>
            <MyHeader />
            <Layout.Content style={{backgroundColor:"#eee"}}>
                <Outlet />
            </Layout.Content>
        </Layout>
    )
}