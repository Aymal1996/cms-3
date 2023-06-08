import React, { useState, useEffect } from 'react';
import { Row, Typography, Col, Card, Divider, Space, Button, message } from 'antd';
import { Popup } from 'Atoms/Popup';
import LateCockOutReason from './LateClockOut';
import moment from 'moment';
import { useHistory } from 'react-router';
import DateTime from './DateTime';
import { getCheckInData } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { clockINOUT } from '../../ducks/services';

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
  const checkInData = useSelector((state) => state.global.checkInData);
  const todayDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
  const todayDate = moment().format('YYYY-MM-DD');
  const clockin = checkInData?.last_log_time ? moment(checkInData?.last_log_time).format('hh:mm A') : '';

  useEffect(() => {
    setInterval(() => {
      setUDate({
        date: moment(new Date()).format('dddd, Do MMMM YYYY'),
        time: moment(new Date()).format('LT'),
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (checkInData?.log_type_last === 'IN') {
      dispatch(getCheckInData(id));
    }
  }, [uDate.time]);

  useEffect(() => {
    dispatch(getCheckInData(id, todayDate));
  }, []);

  const getTimeInOut = () => {
    setLoad(true);
    let log = '';
    if (checkInData?.log_type_last == 'IN') {
      log = 'OUT';
    } else {
      log = 'IN';
    }
    clockINOUT(id, log)
      .then((response) => {
        const resData = response?.data;
        if (resData.Attendance_status.overtime == 1 || resData.Attendance_status.last_check_in_status == 'IN') {
          setVisible(true);
          setLateData(resData.Attendance_status.data);
        }
        if (resData.Response.success == true) {
          message.success(resData.Response.message);
          dispatch(getCheckInData(id));
        } else {
          message.error(resData.Response.message);
        }
        setLoad(false);
      })
      .catch((e) => {
        setLoad(false);
        message.error('Something went wrong');
      });
  };

  const popup = {
    closable: false,
    visibility: visible,
    content: <LateCockOutReason lateData={lateData} title="Late Clock Out" onClose={() => setVisible(false)} />,
    width: 536,
    onCancel: () => setVisible(false),
  };

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
              {clockin && (
                <>
                  <Col flex="0 1 150px">
                    <Space direction="vertical" size={4}>
                      <Text className="c-gray smallFont12">
                        Clock {checkInData?.log_type_last == 'IN' ? 'In' : 'Out'} Time
                      </Text>
                      <Title level={4} className="mb-0 c-default">
                        {moment(clockin, 'hh:mm A').format('LT')}
                      </Title>
                    </Space>
                  </Col>

                  <Col flex="0 1 180px">
                    <Space direction="vertical" size={4}>
                      <Text className="c-gray smallFont12">Work Duration</Text>
                      <Title level={4} className="mb-0 c-default">
                        {checkInData?.total_work_hour}
                      </Title>
                    </Space>
                  </Col>
                </>
              )}

              <Col flex="auto">
                <Row gutter={[20, 20]} justify="end" wrap={false}>
                  <Col flex="0 1 200px">
                    <Button
                      onClick={() => history.push({ pathname: '/hrms/tasks', state: { addTimeSheet: true } })}
                      type="primary"
                      size="large"
                      htmlType="button"
                      className="w-100 green-btn"
                    >
                      Add Timesheet
                    </Button>
                  </Col>
                  <Col flex="0 1 200px">
                    <Button
                      onClick={getTimeInOut}
                      type="primary"
                      size="large"
                      htmlType="button"
                      className="w-100 red-btn"
                      loading={load}
                    >
                      {checkInData?.log_type_last == 'IN' || checkInData?.yesterday_forget_status == 'IN'
                        ? 'Clock Out'
                        : 'Clock IN'}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <Popup {...popup} />
    </>
  );
};
