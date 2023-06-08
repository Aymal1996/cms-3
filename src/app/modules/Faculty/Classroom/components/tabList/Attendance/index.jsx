import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Card, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import CMSCalendar from 'Molecules/CMSCalendar';
import { getModuleAttendance, getModuleTimetable } from '../../../ducks/actions';
import { useLocation, useParams } from 'react-router-dom';
import moment from 'moment';

const {Title, Text} = Typography;

const sorter = {
    "monday": 1,
    "tuesday": 2,
    "wednesday": 3,
    "thursday": 4,
    "friday": 5,
    "saturday": 6,
    "sunday": 7
  }

export default (props) => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [timetable, setTimetable] = useState([])
    const attendanceMod = useSelector(state => state.classroom.attendance);
    const timetableMod = useSelector(state => state.classroom.timetable);
    
    useEffect(() => {
        dispatch(getModuleTimetable(id, props.semester))
    }, []);

    
    useEffect(() => {
        if (timetableMod && timetableMod.length) {
            let temp = [...timetableMod];
            temp.sort(function sortByDay(a, b) {
                let day1 = a?.day ? a?.day.toLowerCase() : '';
                let day2 = b?.day ? b?.day.toLowerCase() : '';
                return sorter[day1] - sorter[day2];
              });
            setTimetable(temp);
        }
    }, [timetableMod]);

    const updateCal = (start, end) => {
        dispatch(getModuleAttendance(id, props.semester, start, end))
    }

    return (
        <Row gutter={[20, 50]}>
            <Col span={24}>
                <Row gutter={[20,30]}>
                    <Col span={24}>
                        <Title level={5} className='mb-0 c-default'>Timetable</Title>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[20,20]}>
                            {timetable.map((x,i) => (
                                <Col span={6} key={i}>
                                    <Card bordered={false} className='uni-card-small b-black'>
                                        <Space direction='vertical' size={1}>
                                            <Title level={5} className='mb-0 c-white'>{x?.day}</Title>
                                            <Title level={4} className='mb-0 c-white'>{`${moment(x?.start_time, 'hh:mm:ss').format('hh:mm a')} - ${moment(x?.end_time, 'hh:mm:ss').format('hh:mm a')}`}</Title>
                                            <Text className='c-gray smallFont12'>{`${x?.classroom_name}, Block ${x?.block}, Level ${x?.level}`}</Text>
                                        </Space>
                                    </Card>
                                </Col>
                            ))}
                            
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[20,30]}>
                    <Col span={24}>
                        <Title level={5} className='mb-0 c-default'>Attendance</Title>
                    </Col>
                    <Col span={24}>
                        <CMSCalendar pWidth={1320} extra={props.semester} updateCal={updateCal} calenderData={attendanceMod} comp={'AttendanceTable'} />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
} 