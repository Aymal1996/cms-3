import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import CardListSwitchLayout from 'Molecules/CardListSwitchLayout';
import MyPublications from './components/MyPublications';
import OverallPublications from './components/OverallPublications';
import { allowed } from '../../../../routing/config/utils';
import AllRoles from '../../../../routing/config/AllRoles';

export default (props) => {

  let activeTab = 'MyPublications';

  useEffect(() => {
    if (allowed([AllRoles.FACULTY.MANAGER], 'read') || allowed([AllRoles.FACULTY.DEAN], 'read')) {
      activeTab = 'OverallPublications'
    }
  }, []);
	
	const tabs = [
    {
      visible: allowed([AllRoles.FACULTY.MANAGER], 'read') || allowed([AllRoles.FACULTY.DEAN], 'read'),
      title: 'OverAll Publications',
      key: 'OverallPublications',
      Comp: OverallPublications,
    },
    {
      visible: allowed([AllRoles.FACULTY.PUBLICATIONS], 'read'),
      title: 'My Publications',
      key: 'MyPublications',
      Comp: MyPublications,
    }
  
  ]

  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <CardListSwitchLayout tabs={tabs} active={activeTab} /> 
      </Col>
    </Row>
    )
}