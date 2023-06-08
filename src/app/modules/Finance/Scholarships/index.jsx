import React, { useState, useEffect } from 'react';
import { Row, Col, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import CardListSwitchLayout from '../../../molecules/CardListSwitchLayout';
import MultiView from '../../../molecules/MultiView';
import Search from './Search';
import { CloseCircleFilled } from '@ant-design/icons';
// import { getStudentsIssuesList, getStudentsIssuesCard } from '../ducks/actions';
import {
  getFinanceScholarshipList,
  getFinanceScholarshipCard,
  getFinanceScholarshipPendingList,
  getFinanceScholarshipPendingCard,
} from '../ducks/actions';
import { formatCurrency } from '../../../../features/utility';
import { ignorePendingScholarship, ignoreScholarship } from './ducks/services';

const filters = [
  {
    label: 'All',
    value: 'All',
  },
  {
    label: 'Ignored',
    value: 'Ignored',
  },
];

export default (props) => {
  const company_currency = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company_currency;
  const colName = [
    {
      title: 'Scholarship Name',
      dataIndex: 'scholarship_name',
      key: 'scholarship_name',
      sorter: true,
    },
    {
      title: 'Students',
      dataIndex: 'total_students',
      key: 'total_students',
      sorter: true,
    },
    {
      title: 'Schemes',
      dataIndex: 'total_schemes',
      key: 'total_schemes',
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
          {company_currency} {text && formatCurrency(text)}
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

  const colName2 = [
    {
      title: 'Scholarship Name',
      dataIndex: 'scholarship_name',
      key: 'scholarship_name',
      sorter: true,
    },
    {
      title: 'Students',
      dataIndex: 'students',
      key: 'students',
      sorter: true,
    },
    {
      title: 'Schemes',
      dataIndex: 'schemes',
      key: 'schemes',
      sorter: true,
    },
    {
      title: 'Payment Verification',
      dataIndex: 'status',
      key: 'status',
      align: 'right',
      sorter: true,
      render: (text) => <span className="c-pending">{text}</span>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <Button
          type="link"
          className="list-links"
          onClick={() => {
            alert('test');
          }}
        >
          <CloseCircleFilled />
        </Button>
      ),
    },
  ];

  const dispatch = useDispatch();
  // const facultyList = useSelector(state => state.global.faculties);
  // const programList = useSelector(state => state.global.programmes);
  const data = useSelector((state) => state.finance.scholarshipsCard);
  const datalist = useSelector((state) => state.finance.scholarshipsList);
  const data2 = useSelector((state) => state.finance.scholarshipsPendingCard);
  const datalist2 = useSelector((state) => state.finance.scholarshipsPendingList);
  // const [faculty, setFaculty] = useState([]);
  // const [program, setProgram] = useState([]);

  // useEffect(() => {
  //   if (facultyList && facultyList.length > 0) {
  //     let temp = []
  //     facultyList.map((x, i) => {
  //       if (i == 0) {
  //         temp.push({ label: 'All Faculties', value: '' });
  //         temp.push({ label: x.faculty_name, value: x.faculty_code });
  //       } else {
  //         temp.push({ label: x.faculty_name, value: x.faculty_code });
  //       }
  //     });
  //     setFaculty(temp);
  //   }
  // }, [facultyList]);

  // useEffect(() => {
  //   if (programList && programList.length > 0) {
  //     let temp = []
  //     programList.map((x, i) => {
  //       if (i == 0) {
  //         temp.push({label: 'All Programmes', value: ''})
  //         temp.push({label: x.program_name, value: x.program_name})
  //       } else {
  //         temp.push({label: x.program_name, value: x.program_name})
  //       }
  //     });
  //     setProgram(temp);
  //   }
  // }, [programList]);

  const callingApi = (filter, page, limit, sort, sortby, type, search) => {
    if (type == 'list') {
      if (search) {
        let searchVal = {};
        searchVal = {
          scholarship_name: search?.scholarship_name ? search?.scholarship_name.value : '',
          scholarship_type: search?.scholarship_type ? search?.scholarship_type.value : '',
        };
        dispatch(getFinanceScholarshipList(page, limit, sort, sortby, searchVal, filter));
      } else {
        dispatch(getFinanceScholarshipList(page, limit, sort, sortby, null, filter));
      }
    } else {
      dispatch(getFinanceScholarshipCard(page, limit, sort, sortby));
    }
  };

  const onOverallAction = (filter, page, limit, sort, sortby, type, search, team, id) => {
    if (id) {
      ignoreScholarship(id, filter == 'Ignored' && type == 'list' ? 'Show' : 'Ignored')
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

  const onOverallAction1 = (filter, page, limit, sort, sortby, type, search, team, id) => {
    if (id) {
      ignorePendingScholarship(id)
        .then((res) => {
          message.success(res.data.message);
        })
        .catch((e) => {
          const { response } = e;
          message.error(response.data.message);
        });
    }
    if (type == 'list') {
      if (search) {
        let searchVal = {};
        // searchVal = {
        //   scholarship_name: search?.scholarship_name ? search?.scholarship_name.value : '',
        //   scholarship_type:  search?.scholarship_type ? search?.scholarship_type.value : '',
        // }
        dispatch(getFinanceScholarshipPendingList(page, limit, sort, sortby, searchVal));
      } else {
        dispatch(getFinanceScholarshipPendingList(page, limit, sort, sortby, null));
      }
    } else {
      dispatch(getFinanceScholarshipPendingCard(page, limit, sort));
    }
  };

  const tabs = [
    {
      visible: true,
      title: 'Scholarship Outstanding Balance',
      key: 'pending',
      count: data?.count,
      Comp: MultiView,
      iProps: {
        carddata: data.rows || [],
        cardcount: data.count,
        listdata: datalist.rows,
        listcount: datalist.count,
        listKey: 'name',
        filters: filters,
        cardLimit: 9,
        listLimit: 9,
        listCol: colName,
        Search: Search,
        link: '/finance/scholarships/',
        updateApi: onOverallAction,
        statData: { id: 'name', name: 'scholarship_name', key1: 'status', key2: 'outstanding_amount' },
        statusKey: 'status',
        hide: true,
      },
    },
  ];

  const tabs1 = [
    {
      visible: true,
      title: 'Scholarship Pending Verification',
      key: 'pending',
      count: data2?.count,
      Comp: MultiView,
      iProps: {
        carddata: data2.rows || [],
        cardcount: data2.count,
        listdata: datalist2.rows,
        listcount: datalist2.count,
        listKey: 'scholarship_id',
        cardLimit: 3,
        listCol: colName2,
        link: '/finance/scholarships/',
        updateApi: onOverallAction1,
        statData: { id: 'scholarship_id', name: 'scholarship_name', key1: 'scholarship_name', key2: 'status' },
        statusKey: 'status',
        hide: false,
      },
    },
  ];

  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <CardListSwitchLayout tabs={tabs} active={tabs[0].key} />
      </Col>
      <Col span={24}>
        <CardListSwitchLayout tabs={tabs1} active={tabs1[0].key} />
      </Col>
    </Row>
  );
};
