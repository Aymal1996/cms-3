import React from "react"
import { Row, Col, Card,Typography } from "antd";


const { Title } = Typography;

export default (props) => {

    const { icon, status, iColor } = props;

    return (
        <Card bordered={false} className={`smallcard-wicon ${iColor}`}>
            <Row gutter={5} wrap={false} align='middle'>
                <Col flex='auto'>
                    <Title level={5} className='mb-0 lineHeight20'>{status}</Title>
                </Col>
                <Col flex='20px'>
                    {icon}
                </Col>
            </Row>
        </Card>
    )
}