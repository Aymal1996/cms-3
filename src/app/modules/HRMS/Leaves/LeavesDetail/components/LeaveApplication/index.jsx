import React, { useState, useEffect } from 'react';
import { Tabs, Button, Spin, message, Space } from 'antd';
import ListWithDetails from './ListWithDetails';
import { apiMethod } from '../../../../../../../configs/constants';
import { LoadingOutlined } from '@ant-design/icons';
import axios from '../../../../../../../services/axiosInterceptor';

import moment from 'moment';
import { allowed } from '../../../../../../../routing/config/utils';
import Roles from '../../../../../../../routing/config/Roles';

const { TabPane } = Tabs;
const antIcon = <LoadingOutlined spin />;

export default (props) => {

    const { id, data, tabSelected, updateApi, progressData } = props;
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
          return moment(text).format('DD/MM/YYYY')
        }
      },
      {
        title: 'Start',
        dataIndex: 'start_date',
        key: 'start_date',
        sorter: true,
        render: (text) => {
          return moment(text).format('DD/MM/YYYY')
        }
      },
      {
        title: 'End',
        dataIndex: 'end_date',
        key: 'end_date',
        sorter: true,
        render: (text) => {
          return moment(text).format('DD/MM/YYYY')
        }
      },
      {
        title: 'Type',
        dataIndex: 'leave_type',
        key: 'leave_type',
        sorter: true,
      },
      {
        title: 'Action',
        align: 'center',
        render: (text) => {
          return (
            <Space size={4}>
              <Button type="primary" htmlType='button' danger>Reject</Button> 
              <Button type="primary" htmlType='button' className="green-btn ml-1">Approve</Button>
            </Space>
          );
        },
      },
    ]

    const ListCol2 = [
      {
        title: 'Date Applied',
        dataIndex: 'creation',
        key: 'creation',
        sorter: true,
        render: (text) => {
          return moment(text).format('DD/MM/YYYY')
        }
      },
      {
        title: 'Start',
        dataIndex: 'start_date',
        key: 'start_date',
        sorter: true,
        render: (text) => {
          return moment(text).format('DD/MM/YYYY')
        }
      },
      {
        title: 'End',
        dataIndex: 'end_date',
        key: 'end_date',
        sorter: true,
        render: (text) => {
          return moment(text).format('DD/MM/YYYY')
        }
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
    ]

    const onApprove = async (name) => {
        setLoad(true)
        let url = ''
        if(allowed([Roles.REQUESTS])) {
          url = `${apiMethod}/hrms.leaves_api.approve_leave_application_request?name=${name}&status=Approved&role=Admin`
        } else {
          url = `${apiMethod}/hrms.leaves_api.approve_leave_application_request?name=${name}&status=Approved&role=`
        }
        try {
            await axios.get(url);
            setLoad(false)
            message.success('Leaves Successfully Approved');
            setTimeout(() => updateApi('Pending', 1, 10, '', ''), 2000);
            
        } catch(e) {
            const { response } = e;
            message.error('Something went wrong');
            setLoad(false)
        }
        
    }

    const onReject = async (name) => {
        setLoad(true)
        let url = ''
        if(allowed([Roles.REQUESTS])) {
          url = `${apiMethod}/hrms.leaves_api.cancel_reject_application?name=${name}&status=Rejected&role=Admin`
        } else {
          url = `${apiMethod}/hrms.leaves_api.cancel_reject_application?name=${name}&status=Rejected&role=`
        }
        try {
            await axios.get(url);
            setLoad(false)
            message.success('Leaves Successfully Rejected');
            setTimeout(() => updateApi('Pending', 1, 10, '', ''), 2000);
            
        } catch(e) {
            const { response } = e;
            message.error('Something went wrong');
            setLoad(false)
        }
    }

    const tabs = [
        {
            title: 'Pending',
            key: 'Pending',
            heading: 'Pending Leaves Application',
            data: data,
            column: ListCol,
            nodetail: false,
            detailTitle: 'Pending Leave Details',
            onAction1: onApprove,
            onAction2: onReject,
        },
        {
            title: 'History',
            key: 'History',
            data: data,
            heading: 'Leave History',
            column: ListCol2,
            nodetail: false,
            detailTitle: 'Leave Details',
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
                        <ListWithDetails 
                        details={item} 
                        progressData={progressData} 
                        updateApi={updateApi} 
                        update={update} 
                        />
                    </TabPane>
                ))}
            </Tabs>
        </Spin>
    )
}