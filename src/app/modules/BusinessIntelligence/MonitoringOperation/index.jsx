import React from 'react';
import { Row, Col, Card } from 'antd';
import BarGraph from '../components/BarGraph';
import DonutGraph from '../components/DonutGraph';
import LineGraph from '../components/LineGraph';
import AreaGraph from '../components/AreaGraph'
import VBarGraph from '../components/VBarGraph';


export default (props) => {
    return (
        <Row gutter={[20,20]}>
            <Col xl={12} span={24}>
                <Card bordered={false} className="uni-card" title="Failed Students">
                    <VBarGraph />
                </Card>
            </Col>
            <Col xl={12} span={24}>
                <Card bordered={false} className="uni-card" title="Student">
                    <BarGraph />
                </Card>
            </Col>
            <Col xxl={8} xl={12} span={24}>
                <Card bordered={false} className="uni-card" title="Modules">
                    <DonutGraph />
                </Card>
            </Col>
            <Col xxl={16} xl={12} span={24}>
                <Card bordered={false} className="uni-card" title="Terms">
                    <AreaGraph />
                </Card>
            </Col>
            <Col span={24}>
                <Card bordered={false} className="uni-card" title="Finance">
                    <LineGraph />
                </Card>
            </Col>
            
        </Row>
    )
}

