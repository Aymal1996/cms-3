import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography } from 'antd';
const {Title} = Typography;

export default (props) => {
    const { id, data, title } = props;

    const getCompanyPercent = (totalLeaves, totalTaken) => {
        const percent = totalTaken/totalLeaves * 100
        return percent ? parseFloat(percent).toFixed(2) : 0;
    }

    const getStaffPercent = (totalLeaves, totalTaken) => {
        const percent = totalTaken/totalLeaves * 100
        return percent ? parseFloat(percent).toFixed(2) : 0;
    }
 
    return (
        <>
            <Title level={4} className="c-default">{title}</Title>

            <Row gutter={[20,20]}>
                {data && data?.map((resp,ind) => (
                    <Col span={8} key={ind}>
                        <Card className="summary">
                            <Col span={24}>{resp?.leave_type}</Col>
                            <Col span={24}><Title level={5} className="c-default">Company Average</Title></Col>
                            <Col span={24} className="b-font">{getCompanyPercent(resp?.total_employees_entitlement, resp?.total_employees_taken)}%</Col>
                            <Col span={24}><Title level={5} className="c-default mb-0">Taken by Staff</Title></Col>
                            <Col span={24} className={getStaffPercent(resp?.employee_entitlement, resp?.taken_employee_leaves) > 80 ? 'c-error b-font' : 'c-success b-font'}>{getStaffPercent(resp?.employee_entitlement, resp?.taken_employee_leaves)}%</Col>
                        </Card>
                    </Col>
                ))}                
            </Row>
        </>
    )
}