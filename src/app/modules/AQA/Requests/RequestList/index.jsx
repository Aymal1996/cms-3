import React, { useState } from 'react';
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

export default (props) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { section, sectionLink } = props;
  const [activeKey, setActiveKey] = useState('pending');
  const dataPending = useSelector((state) => state.request.requestListPending);
  const dataYour = useSelector((state) => state.request.requestListYourRequest);
  const dataArchive = useSelector((state) => state.request.requestListArchive);
  
  const onAction1 = (status, page, sort, limit) => {
      dispatch(getRequestPending(section, page, sort, limit));
  }

  const onAction2 = (status, page, sort, limit) => {
    dispatch(getYourRequest(section, page, sort, limit));
  }

  const onAction3 = (status, page, sort, limit) => {
      dispatch(getRequestArchive(section, page, sort, limit));
  }

  const onAdd = () => {
    history.push(`/${sectionLink}/requests/addnew`)
  }

  const tabs = [
    {
      visible: true,
      title: 'Pending Requests',
      key: 'pending',
      count: dataPending?.count,
      Comp: RequestSection,
      iProps : {
        key: 'pending',
        data: dataPending?.rows || [],
        count: dataPending?.count || 0,
        link: `/${sectionLink}/requests/`,
        innerKey: 'student id',
        activeTab: activeKey,
        updateApi: onAction1,
        limit: 6,
      },
    },
    {
      visible: true,
      title: 'Your Requests',
      key: 'yourrequests',
      count: dataYour?.count,
      Comp: RequestSection,
      iProps : {
        key: 'yourrequests',
        data: dataYour?.rows || [],
        count: dataYour?.count || 0,
        link: `/${sectionLink}/requests/`,
        innerKey: 'student id',
        activeTab: activeKey,
        updateApi: onAction2,
        addbtn: '+ New Request',
        btnAction: onAdd,
        limit: 6,
      },
    },
    {
      visible: true,
      title: 'Archive',
      key: 'archive',
      Comp: RequestSection,
      iProps : {
        key: 'archive',
        data: dataArchive?.rows || [],
        count: dataArchive?.count || 0,
        link: `/${sectionLink}/requests/`,
        innerKey: 'student id',
        activeTab: activeKey,
        updateApi: onAction3,
        limit: 6,
      },
    },
  ]
 
  return (
      <Row gutter={[24, 30]}>
        <Col span={24}>
          <CardListSwitchLayout tabs={tabs} active={activeKey} />
        </Col>
      </Row>
  );
};
