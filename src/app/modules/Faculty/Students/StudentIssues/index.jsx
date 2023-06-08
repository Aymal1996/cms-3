import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import CardListSwitchLayout from '../../../../molecules/CardListSwitchLayout';
import MultiView from '../../../../molecules/MultiView';
import Search from '../components/Search';
import { getAllFaculty, getAllPrograms } from '../../../Application/ducks/actions';
import { getStudentsIssuesList, getStudentsIssuesCard } from '../ducks/actions';

const colName = [
  {
    title: 'Student Name',
    dataIndex: 'student_name',
    key: 'student_name',
    sorter: true,
  },
  {
    title: 'Faculty',
    dataIndex: 'faculty_name',
    key: 'faculty_name',
    sorter: true,
  },
  {
    title: 'Programme',
    dataIndex: 'program_name',
    key: 'program_name',
    sorter: true,
  },
  {
    title: 'Issues',
    dataIndex: 'issue',
    key: 'issue',
    align: 'center',
    sorter: true,
    render: text => <span className='c-error'>{text}</span>
  },
];

export default (props) => {

  const dispatch = useDispatch();
  const facultyList = useSelector(state => state.global.faculties);
  const programList = useSelector(state => state.global.programmes);
  const data = useSelector(state => state.facultyStudent.issuesCard);
  const datalist = useSelector(state => state.facultyStudent.issuesList)
  const [faculty, setFaculty] = useState([]);
  const [program, setProgram] = useState([]);

  useEffect(() => {
    dispatch(getAllFaculty())
    dispatch(getAllPrograms())
  }, []);

  useEffect(() => {
    if (facultyList && facultyList.length > 0) {
      let temp = []
      facultyList.map((x, i) => {
        if (i == 0) {
          temp.push({ label: 'All Faculties', value: '' });
          temp.push({ label: x.faculty_name, value: x.faculty_code });
        } else {
          temp.push({ label: x.faculty_name, value: x.faculty_code });
        }
      });
      setFaculty(temp);
    }
  }, [facultyList]);

  useEffect(() => {
    if (programList && programList.length > 0) {
      let temp = []
      programList.map((x, i) => {
        if (i == 0) {
          temp.push({label: 'All Programmes', value: ''})
          temp.push({label: x.program_name, value: x.program_name})
        } else {
          temp.push({label: x.program_name, value: x.program_name})
        }
      });
      setProgram(temp);
    }
  }, [programList]);

  const onOverallAction = (filter, page, limit, sort, sortby, type, search) => {
    // if (type == 'list') {
      if (search) {
        let searchVal = {};
          searchVal = {
            student_name: search?.student_name ? search?.student_name : '',
            faculty_code:  search?.faculty ? search?.faculty.value : '',
            program_name: search?.program ? search?.program.value : '',
          }
          dispatch(getStudentsIssuesList(page, limit, sort, sortby, searchVal))
        } else {
          dispatch(getStudentsIssuesList(page, limit, sort, sortby, null))
        }
      
    // } else {
    //   dispatch(getStudentsIssuesCard(page, limit, sort, sortby));
    // }
  }

  const tabs = [
    {
      visible: true,
      title: 'Pending Issues',
      key: 'pending',
      count: datalist?.count,
      Comp: MultiView,
      iProps: {
        carddata: datalist?.rows || [],
        cardcount: datalist?.count,
        listdata: datalist?.rows || [],
        listcount: datalist?.count,
        listKey: 'student_id',
        cardLimit: 9,
        listLimit: 9,
        listCol: colName,
        Search: Search,
        link: '/faculty/students/details/',
        updateApi: onOverallAction,
        searchDropdowns: {
          field1: faculty,
          field2: program,
        },
        statData: {
          id: 'student_id',
          name: 'student_name',
          image: 'user_image'
        },
        same: true,
        statusKey:'issue'
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