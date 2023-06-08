import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import CardListSwitchLayout from 'Molecules/CardListSwitchLayout';
import MultiView from 'Molecules/MultiView';
import Search from '../Search';
import { allowed } from '../../../../../routing/config/utils';
import Roles from '../../../../../routing/config/Roles';
import { getStaffPerformance } from '../../ducks/actions';

const ListColOverall = [
  {
    title: 'ID',
    dataIndex: 'employee_id',
    key: 'employee_id',
    sorter: true,
    width: 150,
  },
  {
    title: 'Name',
    dataIndex: 'employee_name',
    key: 'employee_name',
    sorter: true,
  },

  {
    title: 'Team',
    dataIndex: 'team_name',
    key: 'team_name',
    sorter: true,
  },
  {
    title: 'Fit Index',
    dataIndex: 'fit_index',
    key: 'fit_index',
    sorter: true,
    render: (text, record) => (text == '0' || text == '0%' ? record?.fit_index_text : text),
  },
  {
    title: 'Leaves',
    dataIndex: 'percentage_leaves',
    key: 'percentage_leaves',
    sorter: true,
  },
  {
    title: 'Attendance',
    dataIndex: 'attendance',
    key: 'attendance',
    sorter: true,
    width: 100,
  },
  {
    title: 'Performance',
    dataIndex: 'status',
    key: 'status',
    width: 140,
    render: (text) => {
      let clname = '';
      if (text == 'Excellent') {
        clname = 'c-success';
      } else if (text == 'Poor') {
        clname = 'c-error';
      } else if (text == 'Average') {
        clname = 'c-pending';
      }
      return <span className={`SentanceCase ${clname}`}>{text}</span>;
    },
  },
];

export default (props) => {
  const dispatch = useDispatch();
  const staffData = useSelector((state) => state.global.staffData);

  const onAction1 = (status, page, limit, sort, sortby, search, team) => {
    dispatch(getStaffPerformance(page, limit, sort, sortby));
  };

  const tabs = [
    {
      visible: allowed([Roles.ADVANCEMENT], 'read'),
      title: 'Staff Performance',
      key: 'staff',
      count: staffData?.count,
      Comp: MultiView,
      iProps: {
        key: 'pending',
        carddata: staffData?.rows || [],
        cardcount: staffData?.count || 0,
        listdata: staffData?.rows || [],
        listcount: staffData?.count || 0,
        cardLimit: 6,
        listLimit: 6,
        listCol: ListColOverall,
        link: '/hrms/advancement/',
        innerKey: 'employee_id',
        statusKey: 'status',
        listKey: 'employee_id',
        Search: Search,
        updateApi: onAction1,
        statData: {
          id: 'employee_id',
          name: 'employee_name',
          image: 'user_image',
        },
        same: true,
        graph: true,
        searchDropdowns: {
          field1: [{ label: 'All', value: 'All' }],
          field2: [{ label: 'All', value: 'All' }],
        },
        extraData: [
          { label: 'Fit Index Score', value: 'fit_index' },
          { label: 'Attendance', value: 'attendance' },
          { label: 'Leaves', value: 'percentage_leaves' },
        ],
      },
    },
  ];

  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <CardListSwitchLayout tabs={tabs} active={'staff'} />
      </Col>
    </Row>
  );
};
