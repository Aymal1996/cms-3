import React, { useEffect } from 'react';
import {Row, Col, Card, Tabs } from 'antd';
import * as TabCards from './tabList';

const { TabPane } = Tabs;

export default (props) => {

    const tabs = [
        {
            name: 'Timesheet',
            Comp: "Timesheet"
        },
        {
            name: 'Projects',
            Comp: "Projects"
        }
    ]

    useEffect(() => {
        
    }, []);

    return (
    <Card bordered={false} className="uni-card h-auto">
        <Row gutter={[30, 20]}>
            <Col span={24}>
                <Tabs defaultActiveKey="1" type="card" className='custom-tabs -space30'>
                    {tabs.map((item, index) => {
                        const Cardi = TabCards[item.Comp];
                        return <TabPane tab={item.name} key={index + 1} forceRender={true}><Cardi {...props}/></TabPane>
                    })}
                </Tabs>
            </Col>
        </Row>
    </Card>
    )
}