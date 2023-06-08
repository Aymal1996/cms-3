import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { getRequestPending } from '../../../AQA/Requests/ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import CardListSwitchLayout from '../../../../molecules/CardListSwitchLayout';
import RequestSection from '../../../../molecules/RequestSection';
import { useHistory } from 'react-router-dom';

export default (props) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [activeKey, setActiveKey] = useState('pending');
  const data = useSelector((state) => state.request.requestListPending);
  
  const onAction1 = (status, page, sort,limit) => {
      dispatch(getRequestPending('Faculty', page, sort, limit));
  }

  const tabs = [
    {
      visible: true,
      title: 'Student Requests',
      key: 'pending',
      count: data?.count,
      Comp: RequestSection,
      iProps : {
        key: 'pending',
        data: data?.rows || [],
        count: data?.count || 0,
        link: `/faculty/students/details/`,
        innerKey: 'student id',
        activeTab: activeKey,
        updateApi: onAction1,
        limit: 9
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
