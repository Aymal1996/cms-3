import React, { useEffect, useState } from 'react';
import { Row, Typography, Col, Card } from "antd";
import { getLecturerTimetable, getTeamModulesList } from '../../../Marketing/ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import PendingRequestCard from '../../../../molecules/PendingRequestCard';
import CMSCalendar from 'Molecules/CMSCalendar';
import { calenderData } from '../../../Faculty/Lecturers/ducks/actions';
import ListComponent from '../../../../molecules/ListComponent';
import { WarningIcon } from '../../../../atoms/CustomIcons';
import Search from '../Search';
import ListCard from '../../../../molecules/ListCard';
import moment from 'moment';

const { Title } = Typography;
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

const colName = [
  {
    title: 'Module Name',
    dataIndex: 'module_name',
    key: 'module_name',
    sorter: (a, b) => a?.module_name?.length - b.module_name?.length,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    sorter: (a, b) => a?.type?.length - b.type?.length,
  },

  {
    title: 'Faculty',
    dataIndex: 'fcaulty',
    key: 'fcaulty',
    sorter: (a, b) => a?.fcaulty?.length - b.fcaulty?.length,
  },
  {
    title: 'Lecturers',
    dataIndex: 'lecturers',
    key: 'lecturers',
    align: 'center',
    sorter: (a, b) => a?.lecturers?.length - b.lecturers?.length,
    render: (text) => {
      let clname = '';
      if (text.includes("Assigned")) {
        clname = 'c-success';
      } else {
        clname = 'c-error';
      }
      return <span className={`SentanceCase ${clname}`}>{text}</span>;
    },
  },
];

export default (props) => {
  const dispatch = useDispatch();
  const lecturerTodaySchedule = useSelector(state => state.marketing.lecturerTodaySchedule);
  const teamModulesList = useSelector(state => state.marketing.teamModulesList);
  const calData = useSelector((state) => state.lecturers.timetableData);
  const id = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;
  let startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
  let endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
  const unassignedCount = teamModulesList?.unassigned_moduels || 0;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    dispatch(getTeamModulesList(1, 10, '', ''));
  }, [])

  useEffect(() => {
    dispatch(calenderData(id));
    dispatch(getLecturerTimetable(id, startOfMonth, endOfMonth))
  }, [id]);

  const updateCal = (start, end) => {
    dispatch(calenderData(id, start, end));
  };

  const listProps = {
    listStat: [
      {
        width: '1 0 300px',
        icon: <WarningIcon className="fontSize40 c-white" />,
        title: 'Assign Module',
        text: unassignedCount && `${unassignedCount} Modules Unassigned`,
      },
    ],
  };

  function updateList(current, pageSize) {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    dispatch(facultyProgramList(current, pageSize));
  }

  const onSearch = (search) => {
    // if (search) {
    //   let searchVal = {};
    //   searchVal = {
    //     staff_name: search.staff_name,
    //     role: search.role.value,
    //     faculty_code: search.faculty.value,
    //     program_name: search.programme.value,
    //   };
    //   dispatch(getStaffList(filterVal, page, limit, '', '', searchVal));
    // } else {
    //   dispatch(getStaffList(filterVal, page, limit, '', '', null));
    // }
  };

  const listData = [
    {
      name: "Lori Ramirez",
      quiz_1: "3%",
      assignment_1: "3%",
      mid_term: '8%',
      quiz_2: '4%',
      assignment_2: '4%',
      final: '60',
      overall: '82%',
      grade: 'A',
    },
    {
      name: "Tom Foster",
      quiz_1: "3%",
      assignment_1: "2%",
      mid_term: '7%',
      quiz_2: '4%',
      assignment_2: '4%',
      final: '52',
      overall: '72%',
      grade: 'A',
    },
    {
      name: "Dennis Ellis",
      quiz_1: "3%",
      assignment_1: "3%",
      mid_term: '8%',
      quiz_2: '4%',
      assignment_2: '4%',
      final: '50',
      overall: '72%',
      grade: 'A',
    },
    {
      name: "Chris Andrews",
      quiz_1: "3%",
      assignment_1: "2%",
      mid_term: '9%',
      quiz_2: '4%',
      assignment_2: '4%',
      final: '55',
      overall: '77%',
      grade: 'A',
    },
    {
      name: "Rose Murphy",
      quiz_1: "3%",
      assignment_1: "3%",
      mid_term: '6%',
      quiz_2: '4%',
      assignment_2: '4%',
      final: '50',
      overall: '82%',
      grade: 'A',
    },
    {
      name: "July Murphy",
      quiz_1: "3%",
      assignment_1: "2%",
      mid_term: '5%',
      quiz_2: '4%',
      assignment_2: '4%',
      final: '62',
      overall: '82%',
      grade: 'A',
    },
]

  const ListCol = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Quiz 1 (5%)',
      dataIndex: 'quiz_1',
      key: 'quiz_1',
      sorter: (a, b) => a.quiz_1.length - b.quiz_1.length,
      width: 90,
      align: 'center',
    },
    {
      title: 'Assignment 1 (5%)',
      dataIndex: 'assignment_1',
      key: 'assignment_1',
      sorter: (a, b) => a.assignment_1 - b.assignment_1,
      width: 130,
      align: 'center',
    },
    {
      title: 'Mid Term (10%)',
      dataIndex: 'mid_term',
      key: 'mid_term',
      sorter: (a, b) => a.mid_term - b.mid_term,
      width: 130,
      align: 'center',
    },
    {
      title: 'Quiz 2 (5%)',
      dataIndex: 'quiz_2',
      key: 'quiz_2',
      sorter: (a, b) => a.quiz_2.length - b.quiz_2.length,
      width: 90,
      align: 'center',
    },
    {
      title: 'Assignment 2 (5%)',
      dataIndex: 'assignment_2',
      key: 'assignment_2',
      sorter: (a, b) => a.assignment_2 - b.assignment_2,
      width: 130,
      align: 'center',
    },
    {
      title: 'Final (65%)',
      dataIndex: 'final',
      key: 'final',
      sorter: (a, b) => a.final - b.final,
      width: 90,
      align: 'center',
    },
    {
      title: 'Overall (100%)',
      dataIndex: 'overall',
      key: 'overall',
      sorter: (a, b) => a.overall - b.overall,
      width: 110,
      align: 'center',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
      sorter: (a, b) => a.grade - b.grade,
      width: 85,
    },
  ]

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getTermList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
      dispatch(getTermList(pagination.current, pagination.pageSize, '', ''));
    }
  }

  const onClickRow = (record) => {
    return {
      onClick: () => {
        //history.push(`/aqa/academic-calendar/terms-detail/${record.name}`)
      },
    };
  }

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
            {lecturerTodaySchedule && (
              <Row gutter={[20, 20]} className="mb-2">
                {lecturerTodaySchedule?.length > 0 && lecturerTodaySchedule?.map((resp, i) => (
                  <Col span={6} key={i}>
                    <Card className='calendar_card'>
                      <Title level={5} className="text-white w-100 smallFont12">
                        Today
                      </Title>
                      <Title level={5} className="text-white mt-0 w-100">
                        {resp?.start_time && moment(resp?.start_time, 'hh').format("LT")} - {resp?.end_time && moment(resp?.end_time, 'hh').format("LT")}
                      </Title>
                      <Title level={5} className="c-gray mt-0 w-100 smallFont12">
                        {resp?.classroom_name}, {resp?.block && `Block ${resp?.block}`}, {resp?.block && `Level ${resp?.level}`}
                      </Title>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
            <CMSCalendar updateCal={updateCal} comp={'CalendarTable'} badges={badge} calenderData={calData} pWidth={1000} />
          </Col>

          <Col flex="1 0 50%">
            <PendingRequestCard
              data={[]}
              title="Outstanding List"
              count={5}
              link="lecturers/issues/"
              label="Most outstanding Students"
              innerlink="staff/"
              status={'b-error'}
              idKey={'employee_id'}
              nameKey={'employee_name'}
            />
          </Col>

          <Col flex="1 0 50%">
            <PendingRequestCard
              data={[]}
              title="Outstanding List"
              count={5}
              link="lecturers/issues/"
              label="Most outstanding Students"
              innerlink="staff/"
              status={'b-error'}
              idKey={'employee_id'}
              nameKey={'employee_name'}
            />
          </Col>

          <Col span={24}>
            <ListComponent
              link="/faculty/programmes/"
              linkKey="name"
              ListCol={colName}
              defaultLimit={10}
              listProps={listProps}
              data={teamModulesList}
              updateList={updateList}
            />
          </Col>

          <Col span={24}>
            <ListCard
              title='Student Marks'
              onRow={onClickRow}
              Search={Search}
              onSearch={onSearch}
              ListCol={ListCol}
              ListData={listData}
              onChange={onTableChange}
              pagination={{
                total: listData?.length,
                current: page,
                pageSize: limit
              }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}