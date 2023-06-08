import React,  { useState, useEffect } from 'react';
import {  Row, Typography, Col, Card, Divider, Space, Button, message} from 'antd';
import { useHistory } from 'react-router';
import { apiMethod } from '../../../../../../../configs/constants';
import axios from '../../../../../../../services/axiosInterceptor';
import { useDispatch, useSelector } from 'react-redux';
import { getFacultyTimetable } from '../../../ducks/actions';
import moment from 'moment';

export default (props) => {
  const { uDate } = props;
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const history = useHistory();
  const timetableData = useSelector((state) => state.clockin.facultytimetable);

	  useEffect(() => {
		dispatch(getFacultyTimetable());
	  }, []);



   const clockout = async (msg) => {   
   
	 let url =  `${apiMethod}/faculty.staff_checkin_out.check_in_out`;
	  
	  try {
		await axios.get(url);
		 if(msg ==='clockin'){
           message.success('Clocked In Sucessfully');
		  }else{
			message.success('Clocked Out Sucessfully');
		  }
      window.location.reload(false);
	  } catch (e) {
		const { response } = e;
		message.error('Something went wrong');
	  }
	};
	
    useEffect(() => {
      const interval = setInterval(() => {
        dispatch(getFacultyTimetable());
      }, 120000);
      return () => clearInterval(interval); 
    }, [])


   let action;

	  if(timetableData?.success === true){
		if(timetableData?.button_status == 1){
		   action = <Button onClick="" type="primary" size="large" htmlType="button" value="clockin" onClick={() => clockout('clockin')}  className="w-100 green-btn" loading=''> Clock In </Button>;
		  } else if(timetableData?.button_status == 2){
		   action = <Button onClick="" type="primary" size="large" htmlType="button" value="clockout" onClick={() => clockout('clockout')}  className="w-100 red-btn" loading=''> Clock Out </Button>;
		  } else if(timetableData?.button_status == 3){
		  action = <Button disabled="disabled" type="primary" size="large" htmlType="button" value="clockout"  className="w-100 red-btn" loading=''> Clocked Out </Button>;
	     }

	  }
	 
 
  return (
    <>

    <Col span={24}>
      <Space direction="vertical" size={0}>
        <Title level={3} className="mb-0">
          {uDate.date}
        </Title>
        <Title level={4} className="mb-0 c-default">
          {uDate.time}
        </Title>
      </Space>
    </Col>

         <Col span={24}>
            <Divider className="m-0" />
          </Col>

  <Col span={24}>
  <Row gutter={[8,8]} align="bottom" bordered={false}>
    <>
    {(() => {
         if(timetableData?.success === true){
          return (
            <Col flex="0 1 300px">
            <Space direction="vertical" size={6}>
              <Text className="c-gray smallFont12"> Current Class </Text>
              <Text className="c-white smallFont13">{timetableData?.value?.timetable_name}</Text>
              <Title level={4} className="mb-0 c-white smallFont14">{moment(timetableData?.value?.start_time,'HHmmss').format("hh:mm A")} - {moment(timetableData?.value?.end_time,'HHmmss').format("hh:mm A")}  </Title>
              <Text className="c-grey smallFont12">{timetableData?.value?.classroom_name}, Block:{timetableData?.value?.block}</Text>
            </Space>
          </Col>
          )
        }  else {
          return (
        <Col flex="0 1 300px">
        <Space direction="vertical" size={6}>
          <Text className="c-white smallFont14"> No class scheduled right now</Text>
        </Space>
        </Col>
          )
        }
      })()}
    </>
    
  <Col flex="auto">
    <Row gutter={[10, 10]} justify="end" wrap={false}>
      <Col flex="0 1 200px">
        {action}
      </Col>
    </Row>
  </Col>

  </Row>
</Col>
</>

  );
};
