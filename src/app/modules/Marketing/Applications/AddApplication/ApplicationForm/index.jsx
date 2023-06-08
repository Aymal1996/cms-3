import React, { useState, useRef } from 'react';
import { Tabs, Button, Space, Row, Col, Typography } from 'antd';
import Personal from './Personal';
import Academic from './Academic';
import Payment from './Payment';

const { TabPane } = Tabs;
const { Title } = Typography;

export default (props) => {
    
    const myRef = useRef(null);
    const [activeTab, setActiveTab] = useState("1");

    const handleChange = () => {
        setActiveTab('2')
        myRef.current?.scrollIntoView({behavior: 'smooth'})
    }

    return (
        <>
            <div ref={myRef}></div>
            <Tabs activeKey={activeTab} onChange={(e) => setActiveTab(e)} type="card" className="custom-tabs">
                <TabPane tab={'Personal Details'} key={"1"} forceRender>
                    <Space size={30} direction='vertical' className='w-100'>
                        <Personal {...props} />
                        <Row gutter={20} justify='center'>
                            <Col>
                                {props.mode == 'view' ?
                                <Title level={5} className="c-default text-center">
                                    To edit the design, please click the settings icon on the application
                                    status card and select revert to earlier stage
                                </Title>
                                :
                                <Button size='large' type="primary" htmlType='button' onClick={() => handleChange()} className="green-btn">Proceed to Academic Details</Button>
                                }   
                            </Col>
                        </Row>
                    </Space>
                </TabPane>
                <TabPane tab={'Academic Details'} key={"2"} forceRender>
                    <Space size={30} direction='vertical' className='w-100'>
                        <Academic {...props} />
                        <Row gutter={20} justify='center'>
                            <Col>
                                {props.mode == 'view' ?
                                <Title level={5} className="text-center c-default">
                                    To edit the design, please click the settings icon on the application
                                    status card and select revert to earlier stage
                                </Title>
                                :
                                <Button size='large' className='green-btn' type="primary" htmlType="submit">Submit Application</Button>
                                }
                            </Col>
                        </Row>
                    </Space>
                </TabPane>
                {props.stage != 'incomplete-documents' && props.stage != 'eligibility-assessments' && props.mode != 'add' &&
                <TabPane tab={'Payment Details'} key={"3"} forceRender>
                    <Payment />
                </TabPane>}
            </Tabs>
        </>
    )
}