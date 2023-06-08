import React, { useState, useEffect } from 'react';
import { Row, Typography, Col, Card, Divider, Space, Button, message } from 'antd';
import moment from 'moment';
import { useHistory } from 'react-router';
import DateTime from './DateTime';
import { useDispatch, useSelector } from 'react-redux';
const { Title, Text } = Typography;

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [load, setLoad] = useState(false);
  const [lateData, setLateData] = useState({});
  const [uDate, setUDate] = useState({
    date: '',
    time: '',
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const id = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;

  useEffect(() => {
    setInterval(() => {
      setUDate({
        date: moment(new Date()).format('dddd, Do MMMM YYYY'),
        time: moment(new Date()).format('LT'),
      });
    }, 1000);
  }, []);

  return (
    <>
      <Card bordered={false} className="uni-card">
        <Row gutter={[20, 20]}>
          <DateTime uDate={uDate} />
          <Col span={24}>
            <Divider className="m-0" />
          </Col>
          <Col span={24}>
            <Row gutter={[20, 20]} align="bottom">
              
            </Row>
          </Col>
        </Row>
      </Card>
    </>
  );
};
