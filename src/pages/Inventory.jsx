import axios from "axios"
import { useEffect, useState } from "react"
import { LOCAL_URL } from "../../config"
import { Flex } from "antd";
import InventoryCard from "../components/InventoryCard";

export default function Inventory() {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const [owned, setOwned] = useState([]);

    useEffect(() => {
        axios.get(`${LOCAL_URL}/inventory`, {headers:{"Authorization":`Bearer ${token}`}})
        .then(res => setOwned(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <Flex wrap gap="1rem" style={{padding:"1rem"}} justify="center">
            {owned?.map(test => <InventoryCard key={test.testId._id} test={test} own={[setOwned]}/>)}
        </Flex>
    )
}