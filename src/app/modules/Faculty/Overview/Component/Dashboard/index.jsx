import React from 'react';
import { Row, Col } from "antd";
import DashboardClock from './DashboardClock';

export default (props) => {
    const {policyData, timesheetData} = props;
    
    return (
        <Row gutter={[20,20]}>
            <Col span={24}>
                <DashboardClock />
            </Col>
        </Row>
    )
}