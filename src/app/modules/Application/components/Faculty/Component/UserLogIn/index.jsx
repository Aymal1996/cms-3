import React, { useEffect, useState } from 'react';
import { Row, Typography, Col, Avatar, Button , Space} from "antd";
import { baseUrl } from '../../../../../../../configs/constants';
const { Title } = Typography;

export default (props) => {
  const {facultyProgress} = props;
  const numbers = facultyProgress && facultyProgress?.length ? facultyProgress?.length : 0;
  const userName = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].full_name;
  return (
    <Row gutter={[10, 10]} className="mb-3">
      <Col span={14}>
        <Space size={20}>
          <Avatar className="userImage" size={60} src={baseUrl+'/files/14.jpg'} />
          <Space direction="vertical" size={2}>
            <Title level={5} className="smallFont14 mb-0">Good morning, {userName}</Title>
            <Title level={3} className="mb-0">{numbers} out of {numbers} Performance Metrics Achieved</Title>
          </Space>
        </Space>
      </Col>
      <Col span={10}>
        <Row gutter={20} justify='space-around'>
          <Col span={12}>
            <Button size='large' type='primary' htmlType='submit' className='black-btn w-100'>Add Timesheet</Button>
          </Col>
          <Col span={12}>
            <Button size='large' type='primary' htmlType='submit' className='green-btn w-100'>Clock In</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}