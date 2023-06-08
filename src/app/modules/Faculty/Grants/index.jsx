import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import CardListSwitchLayout from 'Molecules/CardListSwitchLayout';
import MyGrants from './components/MyGrants';
import OverallGrants from './components/OverallGrants';
import { allowed } from '../../../../routing/config/utils';
import AllRoles from '../../../../routing/config/AllRoles';


export default (props) => {

  let activeTab = 'MyGrant';

  useEffect(() => {
    if (allowed([AllRoles.FACULTY.MANAGER], 'read') || allowed([AllRoles.FACULTY.DEAN], 'read')) {
      activeTab = 'OverallGrants'
    }
  }, []);
	
	const tabs = [
    {
      visible: allowed([AllRoles.FACULTY.MANAGER], 'read') || allowed([AllRoles.FACULTY.DEAN], 'read'),
      title: 'OverAll Grants',
      key: 'OverallGrants',
      Comp: OverallGrants,
    },
    {
      visible: allowed([AllRoles.FACULTY.GRANTS], 'read'),
      title: 'My Grants',
      key: 'MyGrant',
      Comp: MyGrants,
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