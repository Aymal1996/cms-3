import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import {
  getRequestPending, 
  getRequestArchive, 
  getYourRequest } 
from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import CardListSwitchLayout from 'Molecules/CardListSwitchLayout';
import RequestSection from 'Molecules/RequestSection';
import { useHistory } from 'react-router-dom';
import Roles from '../../../../../routing/config/Roles';
import {allowed} from '../../../../../routing/config/utils';

export default (props) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [activeKey, setActiveKey] = useState();
  const dataPending = useSelector((state) => state.hrmsrequests.requestListPending);
  const dataYour = useSelector((state) => state.hrmsrequests.requestListYourRequest);
  const dataArchive = useSelector((state) => state.hrmsrequests.requestListArchive);
  const id = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;
  // const company = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company;
  
  const onAction1 = (status, page, sort, limit) => {
    if(allowed([Roles.REQUESTS], 'read')) {
      dispatch(getRequestPending(page, sort,limit, ''));
    } else {
      dispatch(getRequestPending(page, sort,limit, id));
    }
  }

  const onAction2 = (status, page, sort, limit) => {
    if(allowed([Roles.REQUESTS], 'read')) {
      dispatch(getYourRequest(page, sort,limit,''));
    } else {
      dispatch(getYourRequest(page, sort,limit,id));
    }
    
  }

  const onAction3 = (status, page, sort, limit) => {
    if(allowed([Roles.REQUESTS], 'read')) {
      dispatch(getRequestArchive(page, sort,limit, ''));
    } else {
      dispatch(getRequestArchive(page, sort,limit, id));
    }
      
  }

  const onAdd = () => {
    history.push('/hrms/requests/addnew')
  }

  const tabs = [
    {
      visible: allowed([Roles.REQUESTS_MANAGER, Roles.REQUESTS], 'read'),
      title: 'Staff Requests',
      key: 'pending',
      count: dataPending?.count,
      Comp: RequestSection,
      iProps : {
        key: 'pending',
        data: dataPending && dataPending?.rows || [],
        count: dataPending && dataPending?.count || 0,
        link: '/hrms/requests/',
        innerKey: 'employee_id',
        activeTab: activeKey,
        updateApi: onAction1,
        limit: props.dashboard == true ? 3 : 6
      },
    },
    {
      visible: allowed([Roles.REQUESTS_INDIVIDUAL], 'read'),
      title: 'My Requests',
      key: 'yourrequests',
      count: dataYour?.count,
      Comp: RequestSection,
      iProps : {
        key: 'yourrequests',
        data: dataYour && dataYour?.rows || [],
        count: dataYour && dataYour?.count || 0,
        link: '/hrms/requests/',
        innerKey: 'employee_id',
        activeTab: activeKey,
        updateApi: onAction2,
        addbtn: '+ New Request',
        btnclass: 'green-btn',
        btnAction: onAdd,
        limit: props.dashboard== true ? 3 : 6
      },
    },
    {
      visible: allowed([Roles.REQUESTS], 'read'),
      title: 'Archive',
      key: 'archive',
      Comp: RequestSection,
      iProps : {
        key: 'archive',
        data: dataArchive && dataArchive?.rows || [],
        count: dataArchive && dataArchive?.count || 0,
        link: '/hrms/requests/',
        innerKey: 'employee_id',
        activeTab: activeKey,
        updateApi: onAction3,
        limit: props.dashboard== true ? 3 : 6
      },
    },
  ]

  useEffect(() => {
    if (allowed([Roles.REQUESTS, Roles.REQUESTS_MANAGER], 'read')) {
      setActiveKey('pending')
    } else {
      setActiveKey('yourrequests')
    }
  }, []);
  
  return (
      <Row gutter={[24, 30]}>
        <Col span={24}>
          <CardListSwitchLayout tabs={tabs} active={activeKey} />
        </Col>
      </Row>
  );
};
