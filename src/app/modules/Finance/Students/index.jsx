import React, { useState, useEffect } from 'react';
import { Row, Col, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import CardListSwitchLayout from '../../../molecules/CardListSwitchLayout';
import MultiView from '../../../molecules/MultiView';
import Search from './Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getAllFaculty, getAllPrograms } from '../../Application/ducks/actions';
import {
  getFinanceStudentsList,
  getFinanceStudentsCard,
  getFinanceStudentRequestsCard,
  getFinanceStudentRequestsList,
} from '../ducks/actions';
import { ignorePendingStudent } from '../ducks/services';

const colName2 = [
  {
    title: 'Student ID',
    dataIndex: 'student_id',
    key: 'student_id',
    sorter: true,
  },
  {
    title: 'Student Name',
    dataIndex: 'student_name',
    key: 'student_name',
    sorter: true,
  },
  {
    title: 'Request ID',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
  },
  {
    title: 'Request Type',
    dataIndex: 'status',
    key: 'status',
    sorter: true,
  },
];

export default (props) => {
  const company_currency = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company_currency;

  const colName = [
    {
      title: 'Student Name',
      dataIndex: 'student_name',
      key: 'student_name',
      sorter: true,
    },
    {
      title: 'Faculty',
      dataIndex: 'faculty',
      key: 'faculty',
      sorter: true,
    },
    {
      title: 'Programme',
      dataIndex: 'program_name',
      key: 'program_name',
      sorter: true,
    },
    {
      title: 'Outstanding Balance',
      dataIndex: 'outstanding_amount',
      key: 'outstanding_amount',
      align: 'right',
      sorter: true,
      render: (text) => (
        <span className="c-error">
          {company_currency} {text}
        </span>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <Button type="link" className="list-links">
          <CloseCircleFilled />
        </Button>
      ),
    },
  ];

  const dispatch = useDispatch();
  const facultyList = useSelector((state) => state.global.faculties);
  const programList = useSelector((state) => state.global.programmes);
  const data = useSelector((state) => state.finance.studentCard);
  const datalist = useSelector((state) => state.finance.studentList);
  const data2 = useSelector((state) => state.finance.studentRequestsFinance);
  const [faculty, setFaculty] = useState([]);
  const [program, setProgram] = useState([]);

  useEffect(() => {
    dispatch(getAllFaculty());
    dispatch(getAllPrograms());
  }, []);

  useEffect(() => {
    if (facultyList && facultyList.length > 0) {
      let temp = [];
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

  const callingApi = (filter, page, limit, sort, sortby, type, search) => {
    if (type == 'list') {
      if (search) {
        let searchVal = {};
        searchVal = {
          faculty_code: search?.faculty ? search?.faculty.value : '',
          program_name: search?.program ? search?.program.value : '',
        };
        dispatch(getFinanceStudentsList(filter, page, limit, sort, sortby, searchVal));
      } else {
        dispatch(getFinanceStudentsList(filter, page, limit, sort, sortby, null));
      }
    } else {
      dispatch(getFinanceStudentsCard(page, limit, sort));
    }
  };

  const onOverallAction = (filter, page, limit, sort, sortby, type, search, team, id) => {
    if (id) {
      ignorePendingStudent(id, filter == 'Ignored' && type == 'list' ? 'Show' : 'Ignored')
        .then((res) => {
          message.success(res.data.message.message);
          callingApi(filter, page, limit, sort, sortby, type, search);
        })
        .catch((e) => {
          const { response } = e;
          message.error(response.data.message);
        });
    } else {
      callingApi(filter, page, limit, sort, sortby, type, search);
    }
  };

  const onOverallAction2 = (filter, page, limit, sort, sortby, type, search) => {
    dispatch(getFinanceStudentRequestsCard(page, limit, sort, sortby));
  };

  const filters = [
    {
      label: 'All',
      value: 'Active',
    },
    {
      label: 'Archive',
      value: 'Archive',
    },
  ];

  const tabs = [
    {
      visible: true,
      title: 'Student Outstanding Balance',
      key: 'pending',
      count: data?.count,
      Comp: MultiView,
      iProps: {
        carddata: data.row || [],
        cardcount: data.count,
        listdata: datalist.rows,
        listcount: datalist.count,
        listKey: 'name',
        cardLimit: 9,
        listLimit: 9,
        listCol: colName,
        Search: Search,
        filters: filters,
        link: '/registry/students/finance/',
        updateApi: onOverallAction,
        searchDropdowns: {
          field1: faculty,
          field2: program,
        },
        statData: { key1: 'status', key2: 'outstanding_amount', currency: `${company_currency} ` },
        statusKey: 'status',
        hide: true,
      },
    },
  ];

  // const tabs1 = [
  //   {
  //     visible: true,
  //     title: 'Student Refund Request',
  //     key: 'pending',
  //     count: data2?.count,
  //     Comp: MultiView,
  //     iProps: {
  //       carddata: data2.rows || [],
  //       cardcount: data2.count,
  //       listdata: data2.rows,
  //       listcount: data2.count,
  //       listKey: 'request_name',
  //       cardLimit: 3,
  //       listCol: colName2,
  //       link: '/registry/students/',
  //       updateApi: onOverallAction2,
  //       statData: {key1: 'date', key2: 'status'},
  //       statusKey:'status'
  //     },
  //   },
  // ];

  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <CardListSwitchLayout tabs={tabs} active={tabs[0].key} />
      </Col>
      {/* <Col span={24}>
        <CardListSwitchLayout tabs={tabs1} active={tabs1[0].key} />
      </Col> */}
    </Row>
  );
};
