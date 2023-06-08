import React, { useState, useEffect } from 'react';
import { Row, Col, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import CardListSwitchLayout from '../../../../molecules/CardListSwitchLayout';
import MultiView from '../../../../molecules/MultiView';
import Search from './Search';
import { getUnassignStaffCard, getUnassignStaffList } from '../ducks/actions';

export default (props) => {
  const dispatch = useDispatch();
  const { Text } = Typography;
  const [faculty, setFaculty] = useState([]);
  const [program, setProgram] = useState([]);
  // const unassignStaffCard = useSelector((state) => state.lecturers.unassign_staff_card);
  const unassignStaffList = useSelector((state) => state.lecturers.unassign_staff_list);
  const facultyList = useSelector((state) => state.global.faculties);
  const programList = useSelector((state) => state.global.programmes);
  const colName = [
    {
      title: 'Staff Name',
      dataIndex: 'employee_name',
      key: 'employee_name',
      sorter: true,
    },
    {
      title: 'Faculty',
      dataIndex: 'faculty_code',
      key: 'faculty_code',
      sorter: true,
      render: (text) => (text ? <Text className="mb-0">{text}</Text> : '-'),
    },
    {
      title: 'Programme',
      dataIndex: 'program_name',
      key: 'program_name',
      ellipsis: true,
      sorter: true,
      render: (text) => (text ? <Text className="mb-0">{text}</Text> : '-'),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      sorter: true,
    },
    {
      title: 'Issue',
      dataIndex: 'issues',
      key: 'issues',
      sorter: true,
      render: (text) => {
        return <span className={`c-pending`}>{text}</span>;
      },
    },
  ];
  const onOverallAction = (filter, page, limit, sort, sortby, type, search) => {
    // if (type == 'list') {
      let searchVal = {};
      if (search) {
        searchVal = {
          staff_name: search.staff_name,
          faculty_code: search.faculty.value,
          program_name: search.programme.value,
        };
      }
      dispatch(getUnassignStaffList(page, limit, sort, sortby, searchVal));
    // } else {
    //   dispatch(getUnassignStaffCard(page, limit, sort, sortby));
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
      title: 'Unassigned Staff',
      key: 'pending',
      count: unassignStaffList?.count,
      Comp: MultiView,
      iProps: {
        carddata: unassignStaffList.rows || [],
        cardcount: unassignStaffList.count,
        listdata: unassignStaffList.rows,
        listcount: unassignStaffList.count,
        cardLimit: 9,
        listLimit: 9,
        listCol: colName,
        listKey: 'employee_id',
        Search: Search,
        link: '/faculty/lecturers/tasks/',
        updateApi: onOverallAction,
        statData: {
          id: 'employee_id',
          name: 'employee_name',
          image: 'user_image'
        },
        searchDropdowns: {
          field1: faculty,
          field2: program,
        },
        same: true,
        statusKey: 'issues',
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
