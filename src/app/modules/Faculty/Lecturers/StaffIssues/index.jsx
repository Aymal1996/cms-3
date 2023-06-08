import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import CardListSwitchLayout from '../../../../molecules/CardListSwitchLayout';
import MultiView from '../../../../molecules/MultiView';
import Search from './Search';
import { getPendingIssuesCard, getPendingIssuesList } from '../ducks/actions';

const colName = [
  {
    title: 'Staff Name',
    dataIndex: 'employee_name',
    key: 'staff_name',
    sorter: true,
  },
  {
    title: 'Faculty',
    dataIndex: 'faculty_code',
    key: 'faculty_code',
    sorter: true,
  },
  {
    title: 'Programme',
    dataIndex: 'program_name',
    key: 'program_name',
    ellipsis: true,
    sorter: true,
  },
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
    sorter: true,
  },
  {
    title: 'Issue',
    dataIndex: 'issue',
    key: 'issue',
    sorter: true,
    render: (text) => {
      return <span className={`c-error`}>{text}</span>;
    },
  },
];

export default (props) => {
  const dispatch = useDispatch();
  const [faculty, setFaculty] = useState([]);
  const [program, setProgram] = useState([]);
  const pendingIssuesCard = useSelector((state) => state.lecturers.pending_issues_card);
  const pendingIssuesList = useSelector((state) => state.lecturers.pending_issues_list);
  const facultyList = useSelector((state) => state.global.faculties);
  const programList = useSelector((state) => state.global.programmes);

  const onOverallAction = (filter, page, limit, sort, sortby, type, search) => {
    // if (type == 'list') {
      let searchVal = null;
      if (search) {
        searchVal = {
          staff_name: search.staff_name,
          faculty_code: search.faculty.value,
          program_name: search.programme.value,
        };
      }
      dispatch(getPendingIssuesList(page, limit, sort, sortby, searchVal));
    // } else {
    //   dispatch(getPendingIssuesCard(page, limit, sort, sortby));
    // }
  };
  useEffect(() => {
    if (facultyList && facultyList.length > 0) {
      let temp = [];
      facultyList.map((x, i) => {
        if (i == 0) {
          temp.push({ label: 'All Faculties', value: '' });
          temp.push({ label: x.name, value: x.name });
        } else {
          temp.push({ label: x.name, value: x.name });
        }
      });
      setFaculty(temp);
    }
  }, [facultyList]);

  useEffect(() => {
    if (programList && programList.length > 0) {
      let temp = [];
      programList.map((x, i) => {
        if (i == 0) {
          temp.push({ label: 'All Programmes', value: '' });
          temp.push({ label: x.program_name, value: x.program_name });
        } else {
          temp.push({ label: x.program_name, value: x.program_name });
        }
      });
      setProgram(temp);
    }
  }, [programList]);
  const tabs = [
    {
      visible: true,
      title: 'Pending Issues',
      key: 'pending',
      count: pendingIssuesList?.count,
      Comp: MultiView,
      iProps: {
        carddata: pendingIssuesList.rows || [],
        cardcount: pendingIssuesList.count,
        listdata: pendingIssuesList.rows,
        listcount: pendingIssuesList.count,
        cardLimit: 9,
        listLimit: 9,
        listCol: colName,
        listKey: 'employee_id',
        Search: Search,
        link: '/faculty/lecturers/tasks/',
        updateApi: onOverallAction,
        searchDropdowns: {
          field1: faculty,
          field2: program,
        },
        statData: {
          id: 'employee_id',
          name: 'employee_name',
          image: 'employee_image'
        },
        statusKey: 'issue',
        same: true,
      },
    },
  ];

  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <CardListSwitchLayout tabs={tabs} active={tabs[0].key} />
      </Col>
    </Row>
  );
};
