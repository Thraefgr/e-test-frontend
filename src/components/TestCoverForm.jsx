import { Form , Input, InputNumber, Select, Typography, Card } from "antd";
export default function TestCoverForm({value}) {
    const [test, setTest] = value

    const handleNameChange = (e) => {
        setTest({...test, name:e.target.value})
    }
    const handleSubjectChange = (e) => {
        setTest({...test, subject:e})
    }
    const handleTimeChange = (e) => {
        setTest({...test, timeLimit:(e*60)})
    }
    const handleDiffChange = (e) => {
        setTest({...test, difficulty:e})
    }
    return (
        <Card style={{width:"50%"}}>
            <Form>
                <Form.Item name="name" label="Title" required initialValue={test.name}>
                    <Input size="large" onChange={handleNameChange} value={test.name}/>
                </Form.Item>
                <Form.Item name="subject" label="Subject" required initialValue={test.subject}>
                    <Select size="large" onChange={handleSubjectChange} value={test.subject} options={subjects.toSorted((a,b)=>a.value.localeCompare(b.value))}/>
                </Form.Item>
                <Form.Item name="difficulty" label="Estimated Difficulty" required initialValue={test.difficulty}>
                    <Select size="large" onChange={handleDiffChange} options={[{value:"Very Easy"}, {value:"Easy"}, {value:"Medium"},  {value:"Hard"}, {value:"Very Hard"}]}/>
                </Form.Item>
                <Form.Item name="timeLimit" label="Time Limit(minutes)" required initialValue={test.timeLimit}>
                    <InputNumber size="large" onChange={handleTimeChange} value={test.timeLimit} min={1}/>
                </Form.Item>
                <Form.Item name="queCount" label="Number of Questions" required>
                    <Typography.Text >{test.questions.length}</Typography.Text>
                </Form.Item>
            </Form> 
        </Card>

    )
}


const subjects = [
    {
        value: "Biology",
    },
    {
        value: "Math",
    },
    {
        value: "Chemistry",
    },
    {
        value: "Physics",
    },
    {
        value: "Software Development",
    },
    {
        value: "Hardware Development",
    },
    {
        value: "History",
    },
    {
        value: "Literature",
    },
    {
        value: "Geography"
    },
    {
        value: "Philosophy"
    },
]