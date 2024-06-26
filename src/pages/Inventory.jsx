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
        <Flex wrap gap="1rem" style={{padding:"1rem"}}>
            {owned?.map((test, i) => <InventoryCard key={i} test={test} own={[setOwned]}/>)}
        </Flex>
    )
}