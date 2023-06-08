import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Table, Space, Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from '../../../services/axiosInterceptor';
import { apiMethod } from '../../../configs/constants';

const { Title, Text } = Typography;
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { data, title, onClose, updateApi } = props;
  const [load, setLoad] = useState(false);
  
  const colName = [
    {
      title: 'Student ID',
      dataIndex: 'student',
      key: 'student',
    },
    {
      title: 'Module Code',
      dataIndex: 'modulecode',
      key: 'modulecode',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Attendance',
      dataIndex: 'attendance_status',
      key: 'attendance_status',
      render: (text) => {
        let clname = '';
        if (text.includes("Present")) {
          clname = 'c-success';
        } else {
          clname = 'c-error';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
    },
    {
      title: 'Action',
      align: 'center',
      render: (text) => {
        return (
          <Space size={4}>
            <Button type="primary" htmlType='button' danger style={{width: '100px'}}>Absent</Button> 
            <Button type="primary" htmlType='button' className="green-btn ml-1" style={{width: '100px'}}>Present</Button>
          </Space>
        );
      },
    },
  ];

  const onApprove = async (record, status) => {
    setLoad(true)
    const url = `${apiMethod}/faculty.faculty_dashboard.update_student_attendance?attendance_id=${record?.name}&attendance_status=${status}`
    try {
        await axios.get(url);
        setLoad(false)
        updateApi(record)
        message.success('Attendace Successfully Updated');
        
    } catch(e) {
        const { response } = e;
        message.error('Something went wrong');
        setLoad(false)
    }
  }

const onReject = async (record, status) => {
    setLoad(true)
    const url = `${apiMethod}/faculty.faculty_dashboard.update_student_attendance?attendance_id=${record?.name}&attendance_status=${status}`
    try {
        await axios.get(url);
        setLoad(false)
        updateApi(record)
        message.success('Attendace Successfully Updated');
        
    } catch(e) {
        const { response } = e;
        message.error('Something went wrong');
        setLoad(false)
    }
}

  const onClickRow = (record) => {
    return {
      onClick: (e) => {
        if (e.target.tagName == 'SPAN') {
          if(e.target.innerHTML == 'Present') {
            onApprove(record, 'Present')
          } else{
            onReject(record, 'Absent')
          }
        }
      },
    };
  }

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <Title level={3} className="mb-0">
          {title}
        </Title>
      </Col>
      <Col span={24} className="clickRow">
        <Table dataSource={data} columns={colName} bordered={false} pagination={false} onRow={onClickRow}/>
      </Col>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Button size="large" type="primary" htmlType="button" className="green-btn w-25" onClick={onClose}>
          Close
        </Button>
      </Col>
    </Row>
    </Spin>
  );
};
