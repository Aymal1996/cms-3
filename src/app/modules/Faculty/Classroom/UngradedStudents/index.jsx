import React, { useState } from 'react';
import { Row, Col, Typography, Breadcrumb, Tabs, Card } from 'antd';
import { useHistory, useLocation } from 'react-router';
import * as TabCards from '../components/tabList';

const { TabPane } = Tabs;
const { Title } = Typography;

const tabs = [
    {
        name: 'Attendance',
        Comp: "Attendance",
    },
    {
        name: 'Materials',
        Comp: "Materials",
    },
    {
        name: 'Students',
        Comp: "Students",
    },
    {
        name: 'Assessment',
        Comp: "Assessment",
    },
]

export default (props) => {

    const history = useHistory();
    const location = useLocation();

    return (
        <>
            <Breadcrumb separator=">" className="mb-1">
                <Breadcrumb.Item href="/faculty/classroom">Faculty</Breadcrumb.Item>
                <Breadcrumb.Item>Module Details</Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={[20,30]}>
                <Col span={24}>
                    <Title level={3} className='mb-0 c-default'>{location?.state?.module}</Title>
                </Col>
                <Col span={24}>
                    <Card bordered={false} className='uni-card'>
                    <Row gutter={[30, 20]}>
                        <Col span={24}>
                            <Tabs defaultActiveKey="1" type="card" className='custom-tabs custom-tabs2 -space30'>
                                {tabs.map((item, index) => {
                                    const Cardi = TabCards[item.Comp];
                                    return <TabPane tab={item.name} key={index + 1}><Cardi semester={location?.state?.semester_code} tt_id={location?.state?.tt_id} data={props.data} updateParent={props.updateParent} /></TabPane>
                                })}
                            </Tabs>
                        </Col>
                    </Row>
                    </Card>
                </Col>
            </Row>
        </>
    )
}