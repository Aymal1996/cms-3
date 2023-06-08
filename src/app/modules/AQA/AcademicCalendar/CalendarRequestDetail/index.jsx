import React from "react";
import { Row, Col, Form, Typography, Card, Descriptions, Space, Button } from "antd";
import { LoadingOutlined, CheckCircleFilled  } from "@ant-design/icons";
// import SidarApplication from '../../Requests/RequestDetail/component/sidebar';
const antIcon = <LoadingOutlined spin />;
const { Title, Text } = Typography;

export default (props) => {
    return (
        <>
            <Row gutter={[24, 24]} justify="center" align="middle" className="mb-2">
                <Col flex="auto">
                    <Title level={3} className="text-white mb-0">
                    Request Details
                    </Title>
                </Col>
            </Row>
            <Form layout="vertical">
                <Row gutter={[24, 24]} className="heightAuto">
                    {/* <Col span={8}>
                        <SidarApplication />
                    </Col> */}
            
                    <Col span={16}>
                        <Row gutter={[24, 24]} className="heightAuto">
                            <Col span={24}>
                                <Card className="delayedApplication" bordered={false}>
                                    <Title level={4} className="text-offwhite font-500 mb-3">Add Module</Title>
                                    <Descriptions>
                                        <Descriptions.Item span={24} label="Department">Faculty (FABE)</Descriptions.Item>
                                        <Descriptions.Item span={24} label="Date">2nd March 2021</Descriptions.Item>
                                        <Descriptions.Item span={24} label="Student">Janice Matthews</Descriptions.Item>
                                        <Descriptions.Item span={24} label="Student ID">0019224</Descriptions.Item>
                                        <Descriptions.Item span={24} label="Requester">Prof. Justin Pearson</Descriptions.Item>
                                        <Descriptions.Item span={24} label="Programme">Bachelor of Arts (Hons) in Industrial Design</Descriptions.Item>
                                        <Descriptions.Item span={24} label="Intake">April 2014</Descriptions.Item>
                                        <Descriptions.Item span={24} label="Term">2015-07</Descriptions.Item>
                                        <Descriptions.Item span={24} label="Module">FIT3024 Mathematics II</Descriptions.Item>
                                        <Descriptions.Item span={24} label="Reason">Lack of semester's credit</Descriptions.Item>
                                        <Descriptions.Item span={24} label="Faculty"><Space>Applied <CheckCircleFilled style={{fontSize: '20px'}} /></Space></Descriptions.Item>
                                        <Descriptions.Item span={24} label="Registry"><Space>Verified <CheckCircleFilled style={{fontSize: '20px'}} /></Space></Descriptions.Item>
                                    </Descriptions>
                                    {/* <Space className="fullSpace" size="middle">
                                        <Button type="primary" className="successButton">Approve</Button>
                                        <Button type="primary" className="warningButton">Reject</Button>
                                    </Space> */}
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </>
    )   
}