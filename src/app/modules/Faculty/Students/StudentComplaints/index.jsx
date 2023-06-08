import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import CardListSwitchLayout from '../../../../molecules/CardListSwitchLayout';
import MultiView from '../../../../molecules/MultiView';
import SearchComplaints from '../components/SearchComplaints';
import { getStudentsComplaintsCard, getStudentsComplaintsList } from '../ducks/actions';
import { getAllFaculty, getAllPrograms } from '../../../Application/ducks/actions';
import { complaintTypeList } from '../../../../../configs/constantData';

const colName = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    sorter: true,
  },
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
    title: 'Type',
    dataIndex: 'complaint_type',
    key: 'complaint_type',
    sorter: true,
  },
  {
    title: 'Subject',
    dataIndex: 'issue',
    key: 'issue',
    sorter: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    sorter: true,
    render: text => <span className={text == 'Pending' ? 'c-pending' : 'c-success'}>{text}</span>
  },
];

const filters = [
    {
      label: 'Pending',
      value: 'Pending',
    },
    {
      label: 'Archive',
      value: 'Archive',
    },
];

export default (props) => {

  const dispatch = useDispatch();
  const data = useSelector(state => state.facultyStudent.complaintCard);
  const datalist = useSelector(state => state.facultyStudent.complaintList);
  const facultyList = useSelector(state => state.global.faculties);
  const programList = useSelector(state => state.global.programmes);
  const [faculty, setFaculty] = useState([]);
  const [program, setProgram] = useState([]);
  const [complaintType, setComplaintType] = useState([]);

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
            faculty_code: search?.faculty_code ? search.faculty_code?.value : '',
            program_name: search?.program_name ? search?.program_name.value : '',
            complaint_type: search?.complaint_type ? search?.complaint_type.value : '',
          }
            dispatch(getStudentsComplaintsList(filter, page, limit, sort, sortby, searchVal))
        } else {
            dispatch(getStudentsComplaintsList(filter, page, limit, sort, sortby, null))
        }
      
    // } else {
    //     dispatch(getStudentsComplaintsCard(page, limit, sort))
    // }
  }

  const tabs = [
    {
      visible: true,
      title: 'Student Complaints',
      key: 'pending',
      count: data?.count,
      Comp: MultiView,
      iProps: {
        carddata: datalist?.rows || [],
        cardcount: datalist?.count,
        listdata: datalist?.rows,
        listcount: datalist?.count,
        filters: filters,
        listKey: 'student_id',
        param: { key1: 'complaint', val1: 'name'},
        statData: {
          id: 'student_id',
          name: 'student_name',
          image: 'user_image',
          key1: 'complaint_type', 
          key2: 'issue', 
          class: 'b-error'
        },
        cardLimit: 9,
        listLimit: 9,
        listCol: colName,
        Search: SearchComplaints,
        link: '/faculty/students/details/',
        updateApi: onOverallAction,
        searchDropdowns: {
          field1: faculty,
          field2: program,
          field3: complaintTypeList,
        },
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