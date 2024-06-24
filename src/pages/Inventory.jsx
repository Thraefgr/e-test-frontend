import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { LOCAL_URL } from "../../config"
import { Flex } from "antd";
import InventoryCard from "../components/InventoryCard";
import { Context } from "../App";

export default function Inventory() {
    const [creds] = useContext(Context)
    const token = creds.token;
    const [owned, setOwned] = useState([]);

    useEffect(() => {
        axios.get(`${LOCAL_URL}/inventory`, {headers:{"Authorization":`Bearer ${token}`}})
        .then(res => setOwned(res.data))
        .catch(err => console.log(err))
    }, [token])

    return (
        <Flex wrap gap="1rem" style={{padding:"1rem", minHeight:"calc(100vh - 64px)"}} justify="center">
            {owned?.map(test => <InventoryCard key={test?.testId?._id} test={test} own={[setOwned]}/>)}
        </Flex>
    )
}