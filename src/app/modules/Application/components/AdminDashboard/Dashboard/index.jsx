import React from 'react';
import { Row, Col } from "antd";
import DashboardClock from '../../../components/DashboardClock';
import PolicyRequestCard from 'Molecules/PolicyRequestCard';
import LeaveCalendar from 'Molecules/HRMS/LeaveCalendar';
import ProgressCard from 'Molecules/HRMS/ProgressCard';

export default (props) => {
    const {policyData, timesheetData} = props;
    
    return (
        <Row gutter={[20,20]}>
            <Col span={24}>
                <DashboardClock />
            </Col>
            <Col flex='1 0 398px'>
                {policyData && policyData?.rows?.length > 0 && <PolicyRequestCard
                    data={policyData ? policyData?.rows : []}
                    title={'Policy'}
                    level={4}
                    spacing={10}
                />}
            </Col>
            <Col flex='1 0 398px'>
                <ProgressCard timesheetData={timesheetData} />
            </Col>
            <Col flex='1 0 398px'>
                <LeaveCalendar dashboard={true} />
            </Col>
        </Row>
    )
}