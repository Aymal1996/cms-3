import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import CardListSwitchLayout from '../../../molecules/CardListSwitchLayout';
import MultiView from '../../../molecules/MultiView';
import { CloseCircleFilled } from '@ant-design/icons';
// import { getAllFaculty, getAllPrograms } from '../../Application/ducks/actions';
import { getFinanceGrantsList, getFinanceGrantsCard } from '../ducks/actions';

const colName = [
  {
    title: 'Grant Name',
    dataIndex: 'grant_name',
    key: 'grant_name',
    sorter: true,
  },
  {
    title: 'Lecturer Name',
    dataIndex: 'lecturer_name',
    key: 'lecturer_name',
    sorter: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: true,
  },
  // {
  //   title: 'Payment Verification',
  //   dataIndex: 'balance',
  //   key: 'balance',
  //   align: 'right',
  //   sorter: true,
  //   render: text => <span className='c-pending'>{text}</span>
  // },
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

//   const datalist = {
//     count: 10,
//     rows: [
//         {
//             student_id: '00005235',
//             student_name: 'Janet Reynolds',
//             faculty_code: 'FABE',
//             program_name: 'Bachelor of Arts (Hons) in Urban Planning & Design',
//             balance: 'RM 10,000.00'
//         },
//         {
//             student_id: '00005235',
//             student_name: 'Janet Reynolds',
//             faculty_code: 'FABE',
//             program_name: 'Bachelor of Arts (Hons) in Urban Planning & Design',
//             balance: 'RM 10,000.00'
//         },
//         {
//             student_id: '00005235',
//             student_name: 'Janet Reynolds',
//             faculty_code: 'FABE',
//             program_name: 'Bachelor of Arts (Hons) in Urban Planning & Design',
//             balance: 'RM 10,000.00'
//         },
//         {
//             student_id: '00005235',
//             student_name: 'Janet Reynolds',
//             faculty_code: 'FABE',
//             program_name: 'Bachelor of Arts (Hons) in Urban Planning & Design',
//             balance: 'RM 10,000.00'
//         },
//         {
//             student_id: '00005235',
//             student_name: 'Janet Reynolds',
//             faculty_code: 'FABE',
//             program_name: 'Bachelor of Arts (Hons) in Urban Planning & Design',
//             balance: 'RM 10,000.00'
//         },
//         {
//             student_id: '00005235',
//             student_name: 'Janet Reynolds',
//             faculty_code: 'FABE',
//             program_name: 'Bachelor of Arts (Hons) in Urban Planning & Design',
//             balance: 'RM 10,000.00'
//         },
//     ]
// }

// const data = {
//     count: 10,
//     rows: [
//         {
//             student_id: '00005235',
//             student_name: 'Janet Reynolds',
//             faculty_code: 'FABE',
//             program_name: 'Bachelor of Arts (Hons) in Urban Planning & Design',
//             date: '12th August 2021',
//             issue: 'Payment Verification',
//         },
//         {
//             student_id: '00005235',
//             student_name: 'Janet Reynolds',
//             faculty_code: 'FABE',
//             program_name: 'Bachelor of Arts (Hons) in Urban Planning & Design',
//             date: '12th August 2021',
//             issue: 'Payment Verification',
//         },
//         {
//             student_id: '00005235',
//             student_name: 'Janet Reynolds',
//             faculty_code: 'FABE',
//             program_name: 'Bachelor of Arts (Hons) in Urban Planning & Design',
//             date: '12th August 2021',
//             issue: 'Payment Verification',
//         },

//     ]
// }

export default (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.finance.grantsCard);
  const datalist = useSelector((state) => state.finance.grantsList);

  const onOverallAction = (filter, page, limit, sort, sortby, type, search, a) => {
    if (type == 'list') {
      if (search) {
        dispatch(getFinanceGrantsCard(page, limit, sort, sortby, 'All'));
      } else {
        dispatch(getFinanceGrantsList(page, 9, sort, sortby, 'All'));
      }
    } else {
      dispatch(getFinanceGrantsCard(page, limit, sort, sortby, 'All'));
    }
  };

  const tabs = [
    {
      visible: true,
      title: 'Grant Pending Verification',
      key: 'pending',
      count: data?.count,
      Comp: MultiView,
      iProps: {
        carddata: data.rows || [],
        cardcount: data.count,
        listdata: datalist.rows,
        listcount: datalist.count,
        listKey: 'grant_id',
        listCol: colName,
        link: '/finance/grants/',
        updateApi: onOverallAction,
        statData: { id: 'grant_id', name: 'grant_name', key1: 'date', key2: 'status' },
        statusKey: 'status',
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
