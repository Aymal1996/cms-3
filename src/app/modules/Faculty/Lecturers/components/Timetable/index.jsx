import React, { useState, useEffect } from 'react';
import { Row, Col, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CMSCalendar from '../../../../../molecules/CMSCalendar';
import GraphComponent from '../../../../../molecules/GraphComponent';
import { calenderData } from '../../ducks/actions';
import { getTimetableGraph } from '../../ducks/services';

// const { Title, Text } = Typography;
const badge = [
  {
    title: 'Class',
    color: '#0077B6',
  },
  {
    title: 'Appointments',
    color: '#9B5DE5',
  },
  {
    title: 'Exam',
    color: '#02A574',
  },
  {
    title: 'Holiday',
    color: '#E89005',
  },
];

export default () => {
  const { Title } = Typography;
  const { id } = useParams();
  const dispatch = useDispatch();
  const [timetableGraphData, setTimeTableGraph] = useState([]);
  const calData = useSelector((state) => state.lecturers.timetableData);

  console.log({ timetableGraphData });

  const graphProps = {
    title: '',
    barColor: '#C3423F',
    countClass: 'c-error',
    count: timetableGraphData?.percantage_number,
    text: `${timetableGraphData?.year_number} Class Attendance Rate`,
    // search: <SearchProgram onSearch={onSearch} field1={faculty} field2={program} />,
  };

  useEffect(() => {
    dispatch(calenderData(id));
    getTimetableGraph(id).then((response) => setTimeTableGraph(response?.data?.message));
  }, [id]);
  const updateCal = (start, end) => {
    dispatch(calenderData(id, start, end));
  };
  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <Title level={4} className="mb-0">
          Class Attendance
        </Title>
      </Col>
      <Col span={24}>
        <GraphComponent data={timetableGraphData?.list} cardClass="b-black" {...graphProps} />
      </Col>
      <Col span={24}>
        <Title level={4} className="mb-0">
          Calender
        </Title>
      </Col>
      <Col span={24}>
        <CMSCalendar updateCal={updateCal} comp={'CalendarTable'} badges={badge} calenderData={calData} pWidth={1000} />
      </Col>
    </Row>
  );
};
