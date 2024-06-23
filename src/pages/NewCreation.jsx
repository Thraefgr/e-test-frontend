import { useState } from "react"
import Creation from "../components/Creation.jsx"

export default function NewCreation() {
    const [test, setTest] = useState({
        name: "",
        subject:"",
        difficulty:"",
        timeLimit: 60,
        queCount: 0,
        questions:[
        {
            question: "",
            choices: [],
            answer: "",
            points: 10,
            choice: ""
        }
        ],
    })

    return (
        <Creation data={[test, setTest]}/>
    )

}