import { Form, Input, InputNumber, Flex } from "antd";

export default function QuestionForm({value, index}) {
    const [test, setTest] = value;
    const [curIndex] = index;

    const handleQuChange = (e) => {
        test.questions[curIndex].question = e.target.value;
        setTest({...test});
    }
    const handleCsChange = (e) => {
        const choices = e.target.value;
        const trimmed = choices.trim();
        const choiceList = trimmed.split("__");
        test.questions[curIndex].choices = choiceList;
        setTest({...test})
    }
    const handleAnswerChange = (e) => {
        const answer = e.target.value;
        const trimmed = answer.trim();
        test.questions[curIndex].answer = trimmed;
        setTest({...test})
    }

    const handlePointChange = (e) => {
        test.questions[curIndex].points = e;
        setTest({...test})
    }
    return (
        <Form >
            <Flex wrap gap="1rem">
                <Input spellCheck={false}addonBefore="Question" onChange={handleQuChange} size="large" value={test.questions[curIndex].question} required/>
                <Input spellCheck={false}addonBefore="Choices" onChange={handleCsChange} size="large" value={test.questions[curIndex].choices.join("__")} required/>
                <Input addonBefore="Answer" onChange={handleAnswerChange} size="large" value={test.questions[curIndex].answer} required/>
                <InputNumber addonBefore="Points" onChange={handlePointChange} min={1} size="large" value={test.questions[curIndex].points} required/>  
            </Flex>
        </Form>
    )
}