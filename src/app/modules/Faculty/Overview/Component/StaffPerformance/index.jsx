import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import CardListSwitchLayout from '../../../../../molecules/CardListSwitchLayout';
import DashboardMultiview from './Components/DashboardMultiview/';
import MainStatusCardDashboard from '../../../../../atoms/MainStatusCard';
import { useHistory } from 'react-router-dom';

export default (props) => {
  const { performanceData } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeKey, setActiveKey] = useState('pending');
  const staffData = useSelector(state => state.global.staffData);
  const company = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company;


  const data = [
    {
      "employee_id": "HR-EMP-00001",
      "employee_name": "sheeraz kaleem",
      "image": "/files/profile.jpg",
      "percentage_leaves": "0%",
      "status": "Poor",
      "fit_index": "50%",
      "attendance": "0%",
      statusKey:'Low Class Attendance'
    },
    {
      "employee_id": "HR-EMP-00002",
      "employee_name": "Owais Zafar",
      "image": "/files/14.jpg",
      "percentage_leaves": "0%",
      "status": "Average",
      "fit_index": "77%",
      "attendance": "0.0%"
    },
    {
      "employee_id": "HR-EMP-00003",
      "employee_name": "Student Counselor 1",
      "image": "/files/limkokwing.jpg",
      "percentage_leaves": "0%",
      "status": "",
      "fit_index": "90%",
      "attendance": "0%"
    },
    {
      "employee_id": "HR-EMP-00004",
      "employee_name": "Zain Kafeel",
      "image": "/files/limkokwing.jpg",
      "percentage_leaves": "0%",
      "status": "Execllent",
      "fit_index": "89%",
      "attendance": "0%"
    },
    {
      "employee_id": "HR-EMP-00005",
      "employee_name": "Muhammad Waqas Baig",
      "image": "/files/statusicon-removebg-preview.png",
      "percentage_leaves": "0%",
      "status": "Poor",
      "fit_index": "50%",
      "attendance": "0%"
    },
    {
      "employee_id": "HR-EMP-00007",
      "employee_name": "Ahmed Faraz",
      "image": "/files/limkokwing.jpg",
      "percentage_leaves": "0%",
      "status": "Poor",
      "fit_index": "50%",
      "attendance": "0.67%"
    }
  ]

  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <MainStatusCardDashboard data={data} />
      </Col>
    </Row>
  );
};
