import React, { useState, useEffect } from 'react';
import { Tabs, Button, Spin, message } from 'antd';
import ListWithDetails from './ListWithDetails';
import { apiMethod } from '../../../../../../configs/constants';
import { LoadingOutlined } from '@ant-design/icons';
import axios from '../../../../../../services/axiosInterceptor';
import moment from 'moment';

const { TabPane } = Tabs;
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { id, data, tabSelected, updateApi, ListData } = props;
  const [load, setLoad] = useState(false);
  const [update, setUpdate] = useState(false);
  const [activeTab, setActiveTab] = useState(tabSelected ? tabSelected : 'Pending');

  const ListCol = [
    {
      title: 'Date Applied',
      dataIndex: 'creation',
      key: 'creation',
      sorter: true,
      render: (text) => {
        return moment(text).format('Do MMMM YYYY');
      },
    },
    {
      title: 'Start',
      dataIndex: 'start_date',
      key: 'start_date',
      sorter: true,
      render: (text) => {
        return moment(text).format('Do MMMM YYYY');
      },
    },
    {
      title: 'End',
      dataIndex: 'end_date',
      key: 'end_date',
      sorter: true,
      render: (text) => {
        return moment(text).format('Do MMMM YYYY');
      },
    },
    {
      title: 'Period',
      dataIndex: 'leave_period',
      key: 'leave_period',
      elipsis: true,
      sorter: true,
    },
    {
      title: 'Type',
      dataIndex: 'leave_type',
      key: 'leave_type',
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'application_status',
      key: 'application_status',
      align: 'center',
      sorter: true,
      render: (text) => {
        let clname = '';
        if (text == 'Approved') {
          clname = 'c-success';
        } else if (text == 'Rejected' || text == 'Missed') {
          clname = 'c-error';
        } else if (text == 'Pending') {
          clname = 'c-pending';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
    },
  ];

  const onCancel = async (name) => {
    setLoad(true);
    let url = `${apiMethod}/hrms.leaves_api.cancel_reject_application?name=${name}&status=Cancelled`;
    try {
      await axios.get(url);
      setLoad(false);
      message.success('Leaves Successfully Cancelled');
      setTimeout(() => updateApi('Pending', 1, 10, '', ''), 2000);
    } catch (response) {
      message.error(response?.data?.message?.message ?? 'Something went wrong');
      setLoad(false);
    }
  };

  const tabs = [
    {
      title: 'Pending',
      key: 'Pending',
      heading: 'Pending Leaves Application',
      data: data,
      column: ListCol,
      nodetail: false,
      detailTitle: 'Pending Leaves Details',
      onAction2: onCancel,
    },
    {
      title: 'History',
      key: 'History',
      data: data,
      heading: 'Leaves History',
      column: ListCol,
      nodetail: false,
      detailTitle: 'Leave Details',
    },
  ];

  const changeTab = (e) => {
    setActiveTab(e);
    updateApi(e, 1, 10, '', '');
    setUpdate(true);
  };

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Tabs activeKey={activeTab} type="card" className="gray-tabs" onChange={changeTab}>
        {tabs.map((item) => (
          <TabPane tab={item.title} key={item.key}>
            <ListWithDetails details={item} progressData={ListData} updateApi={updateApi} update={update} />
          </TabPane>
        ))}
      </Tabs>
    </Spin>
  );
};
