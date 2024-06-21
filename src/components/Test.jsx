import { Card, Col, Row } from "antd";

export default function Test({test, onClick}) {
    const minutes = Math.floor(test.timeLimit/60);
    const seconds = test.timeLimit - minutes*60;
    return (
        <Card hoverable onClick={onClick} title={test.name} style={{textAlign:"center", backgroundColor:"wheat"}}>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Card type="inner" title="Subject">{test.subject}</Card>
                </Col>
                <Col span={12}>
                    <Card type="inner" title="Timelimit">{minutes}m {seconds}s</Card>
                </Col>
                <Col span={12}>
                    <Card type="inner" title="Question Count">{test.queCount}</Card>
                </Col>
                <Col span={12}>
                    <Card type="inner" title="Difficulty">{test.difficulty}</Card>
                </Col>
            </Row>
        </Card>
    )
}