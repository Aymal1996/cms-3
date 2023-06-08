import React, { useState, useEffect } from 'react';
import { Tabs, Button, Spin, message } from 'antd';
import ListWithDetails from './ListWithDetails';
import { LoadingOutlined } from '@ant-design/icons';
import { ApproveRejectTimesheet } from '../../../../Tasks/ducks/services';

const { TabPane } = Tabs;
const antIcon = <LoadingOutlined spin />;

export default (props) => {

    const { id, data, tabSelected, updateApi } = props;
    const [load, setLoad] = useState(false);
    const [update, setUpdate] = useState(false);
    const [activeTab, setActiveTab] = useState(tabSelected ? tabSelected : 'Pending');

    const ListCol = [
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
          sorter: true,
        },
        {
            title: 'Project',
            dataIndex: 'project',
            key: 'project',
            elipsis: true,
            sorter: true,
        },
        {
            title: 'Hours',
            dataIndex: 'hours',
            key: 'hours',
            align: 'center',
            sorter: true,
        },
        {
            title: 'Task',
            dataIndex: 'tasks',
            key: 'tasks',
            ellipsis: true,
            sorter: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'right',
            render: (text) => {
              let clname = '';
              if (text == 'Approved') {
                clname = 'c-success';
              } else if (text == 'Rejected') {
                clname = 'c-error';
              } else if (~text.indexOf('Pending')) {
                clname = 'c-pending';
              }
              return <span className={`SentanceCase ${clname}`}>{text}</span>;
            },
        },
      ]

      const ListCol2 = [
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 250,
            render: (text) => {
              let clname = '';
              if (text == 'Approved') {
                clname = 'c-success';
              } else if (text == 'Rejected') {
                clname = 'c-error';
              } else if (~text.indexOf('Pending')) {
                clname = 'c-pending';
              }
              return <span className={`SentanceCase ${clname}`}>{text}</span>;
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            width: 120,
            render: (text) => (
                <Button type="primary" htmlType='button' danger>Notify</Button>
            ),
        },
      ]

    const onApprove = async (name) => {
      setLoad(true);
      ApproveRejectTimesheet(id, name, 'Approved').then(res => {
        setLoad(false);
        message.success('Timesheet Successfully Approved');
        setTimeout(() => updateApi('Pending', 1, 10, '', ''), 2000);
      }).catch(e => {
        const { response } = e;
        message.error('Something went wrong');
        setLoad(false)
      })
    }

    const onReject = async (name) => {
      setLoad(true)
      ApproveRejectTimesheet(id, name, 'Rejected').then(res => {
        setLoad(false);
        message.success('Timesheet Successfully Rejected');
        setTimeout(() => updateApi('Pending', 1, 10, '', ''), 2000);
      }).catch(e => {
        const { response } = e;
        message.error('Something went wrong');
        setLoad(false)
      })
    }
  
    const tabs = [
        {
            title: 'Pending',
            key: 'Pending',
            heading: 'Pending Timesheet List',
            data: data,
            column: ListCol,
            nodetail: false,
            detailTitle: 'Pending Timesheet Details',
            onAction1: onApprove,
            onAction2: onReject,
        },
        {
            title: 'Issues',
            key: 'Issues',
            data: data,
            heading: 'Missed Timesheet List',
            column: ListCol2,
            nodetail: true,
        },
        {
            title: 'History',
            key: 'History',
            data: data,
            heading: 'Timesheet Archive',
            column: ListCol,
            nodetail: false,
            detailTitle: 'Timesheet Details',
        },
    ]

    const changeTab = (e) => {
      setActiveTab(e);
      updateApi(e, 1, 10, '', '');
      setUpdate(true);
    }
 
    return (
        <Spin indicator={antIcon} size="large" spinning={load}>
            <Tabs activeKey={activeTab} type="card" className="gray-tabs" onChange={changeTab}>
                {tabs.map((item) => (
                    <TabPane tab={item.title} key={item.key}>
                        <ListWithDetails details={item} updateApi={updateApi} update={update} />
                    </TabPane>
                ))}
            </Tabs>
        </Spin>
    )
}