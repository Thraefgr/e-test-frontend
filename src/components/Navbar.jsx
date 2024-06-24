import {Menu, Typography} from "antd";

export default function Navbar() {
    const {Item} = Menu;
    return (
        <Menu mode="horizontal">
            <Item><Typography.Title>eTest</Typography.Title></Item>
            <Item>eTest</Item>
        </Menu>
    )
}