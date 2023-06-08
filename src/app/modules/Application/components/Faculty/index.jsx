import React, { useEffect, useState } from 'react';
import { Row, Typography, Col, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PendingRequestCard from '../../../../molecules/PendingRequestCard';
import CMSCalendar from 'Molecules/CMSCalendar';
import { calenderData } from '../../../Faculty/Lecturers/ducks/actions';
import ListComponent from '../../../../molecules/ListComponent';
import { WarningIcon, RequestTime } from '../../../../atoms/CustomIcons';
import Search from '../Search';
import ListCard from '../../../../molecules/ListCard';
import Progress from './Component/Progress';
import moment from 'moment';
import Calendar from './Component/Calendar';
import Modules from './Component/Modules';
import Submissions from './Component/Submissions';
import PendingGrading from './Component/PendingGrading';
import UserLogIn from './Component/UserLogIn';
import {
  getFacultyPendingGradingList,
  getFacultySubmissionList,
  getFacultyModuleList,
  getStudentToAssistList,
  getFacultyRequestList,
  getFacultyCalendarList,
  getFacultyCalendarListWeekly,
  getFacultyCalendarClassList,
  getFacultyProgress,
} from '../../../Marketing/ducks/actions';
import CalendarClasses from './Component/CalendarClasses';
import FacultyCalendarWithModal from '../../../../molecules/FacultyCalendarWithModal';

const { Title } = Typography;

export default (props) => {
  const dispatch = useDispatch();
  const id = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;
  const currentDate = moment().format('YYYY-MM-DD');
  const dateTo = moment().add(5, 'd').format('YYYY-MM-DD');
  const dateFrom = moment().subtract(7, 'd').format('YYYY-MM-DD');

  const facultyProgress = useSelector((state) => state.marketing.facultyProgress);
  const facultyCalendarList = useSelector((state) => state.marketing.facultyCalendarList);
  const facultyCalendarListWeekly = useSelector((state) => state.marketing.facultyCalendarListWeekly);
  const facultyCalendarListClass = useSelector((state) => state.marketing.facultyCalendarListWeekly);
  const facultyRequestList = useSelector((state) => state.marketing.facultyRequestList);
  const studentToAsist = useSelector((state) => state.marketing.studentToAssistList);
  const facultyModuleList = useSelector((state) => state.marketing.facultyModuleList);
  const facultySubmissionList = useSelector((state) => state.marketing.facultySubmissionList);
  const facultyPendingGradingList = useSelector((state) => state.marketing.facultyPendingGradingList);

  useEffect(() => {
    dispatch(getFacultyProgress());
    dispatch(getFacultyCalendarList(id, currentDate, currentDate));
    dispatch(getFacultyCalendarListWeekly(id, currentDate, dateTo));
    dispatch(getFacultyCalendarClassList(id, dateTo, dateFrom));
    dispatch(getFacultyRequestList());
    dispatch(getStudentToAssistList());
    dispatch(getFacultyModuleList());
    dispatch(getFacultySubmissionList());
    dispatch(getFacultyPendingGradingList());
  }, []);

  console.log('facultyCalendarListClass', facultyCalendarListClass);

  useEffect(() => {
    dispatch(calenderData(id));
  }, [id]);

  const updateCal = (start, end) => {
    dispatch(calenderData(id, start, end));
  };

  const updateApi = (e) => {
    dispatch(getFacultyCalendarList(id, e, e));
  };

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <Row gutter={[20, 20]} justify="center" align="middle" className="mb-2 mt-2">
          <Col span={24}>
            <Title level={3} className="text-white mb-0">
              Faculty
            </Title>
          </Col>

          <Col span={24}>
            <Card bordered={false} className="uni-card">
              {/* <UserLogIn facultyProgress={facultyProgress} /> */}
              <Progress facultyProgress={facultyProgress} />
            </Card>
          </Col>

          <Col flex="1 0 340px">
            <Calendar
              updateApi={updateApi}
              calendarData={facultyCalendarList}
              calendarWeekly={facultyCalendarListWeekly}
              setLoading={props.setLoading}
            />
          </Col>

          <Col flex="1 0 340px">
            <FacultyCalendarWithModal
              data={facultyCalendarListClass}
              title=""
              count=""
              link=""
              label="Attendance"
              innerlink=""
              nameKey="module_code"
              idKey="program_name"
              listClass="card-list"
            />
          </Col>

          <Col flex="1 0 340px">
            <PendingRequestCard
              data={facultyRequestList}
              title=""
              count=""
              link=""
              label="Requests"
              innerlink=""
              nameKey="student"
              idKey="request"
              listClass="card-list"
              titleIcon={<RequestTime />}
            />
          </Col>

          <Col flex="1 0 340px">
            <PendingRequestCard
              data={studentToAsist}
              title=""
              count=""
              link=""
              label="Students to Assist"
              innerlink=""
              nameKey="student_name"
              idKey="status"
              titleClass="c-error"
              listClass="card-list"
            />
          </Col>

          <Col flex="1 0 340px">
            <Modules moduleData={facultyModuleList} />
          </Col>

          <Col flex="1 0 340px">
            <Submissions facultySubmissionList={facultySubmissionList} />
          </Col>

          <Col flex="1 0 340px">
            <PendingGrading pendingData={facultyPendingGradingList} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
