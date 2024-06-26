import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {LOCAL_URL} from "../../config.js";
import Test from "../components/Test.jsx";
import { Flex } from "antd";
import PurchasePop from "../components/PurchasePop.jsx";
import { Context } from "../App.jsx";


export default function Tests() {
    const [creds] = useContext(Context)
    const token = creds.token;
    const [tests, setTests] = useState([]);
    useEffect(() => {
        axios.get(`${LOCAL_URL}/tests`, {headers:{"Authorization": `Bearer ${token}`}})
        .then(res => setTests(res.data))
        .catch(err => console.log(err));
    }, [token])

    return (
        <Flex wrap={true} style={{minHeight: "calc(100vh - 64px)", padding:"1rem"}} justify="center" align="center" gap="1rem">
            {tests.map(test => <PurchasePop key={test._id} testId={test._id} name={test.name} creator={test.creator} value={[tests, setTests]}><Test test={test}/></PurchasePop>)}
        </Flex>
    )
}