import { Card, Col, Row } from "antd";

export default function Test({test, onClick}) {
    const minutes = Math.floor(test.timeLimit/60);
    const seconds = test.timeLimit - minutes*60;
    return (
        <Card hoverable onClick={onClick} title={test.name} style={{textAlign:"center", backgroundColor:"wheat", maxWidth:"600px"}}>
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
                <Col span={8}>
                    <Card type="inner" title="Created by">{test.creator}</Card>
                </Col>
                <Col span={8}>
                    <Card type="inner" title="Created at">{test.createdAt.slice(0, test.createdAt.indexOf("T"))}</Card>
                </Col>
                <Col span={8}>
                    <Card type="inner" title="Updated at">{test.createdAt.slice(0, test.createdAt.indexOf("T"))}</Card>
                </Col>
            </Row>
        </Card>
    )
}