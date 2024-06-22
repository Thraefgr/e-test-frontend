import axios from "axios"
import { useEffect } from "react"
import { LOCAL_URL } from "../../config"

export default function Inventory() {
    const token = JSON.parse(localStorage.getItem("user")).token;

    useEffect(() => {
        axios.get(`${LOCAL_URL}/inventory`, {headers:{"Authorization":`Bearer ${token}`}})
        .then(res => {console.log(res.data)})
        .catch(err => console.log(err))
    }, [])

    return (
        <h1>Inventory</h1>
    )
}