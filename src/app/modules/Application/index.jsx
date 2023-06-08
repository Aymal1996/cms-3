import React, { useEffect } from 'react';
import { Row, Typography, Col, Card } from 'antd';
import Faculty from './components/Faculty/index';
import Marketing from './components/Marketing';
import Roles from '../../../routing/config/Roles';
import AllRoles from '../../../routing/config/AllRoles';
import { allowed, allowedCheck } from '../../../routing/config/utils';
import AdminDashboard from './components/AdminDashboard';
import { useHistory } from 'react-router-dom';

const { Title } = Typography;

export default (props) => {
  const history = useHistory();

  useEffect(() => {
    if (allowed([AllRoles.STUDENT.AUDIT], 'read') && allowedCheck()) {
      history.push('/studentfile/auditor');
    }
  }, []);

  return (
    <Row gutter={[20, 30]}>
      {allowed([Roles.ATTENDANCE_INDIVIDUAL], 'read') && (
        <Col span={24}>
          <AdminDashboard />
        </Col>
      )}
      {allowed([AllRoles.FACULTY.STUDENTS], 'read') && (
        <Col span={24}>
          <Faculty setLoading={props.setLoading} />
        </Col>
      )}
      {allowed([Roles.MARKETING], 'read') && (
        <Col span={24}>
          <Marketing />
        </Col>
      )}

      {/* {allowed([Roles.SETUP], 'write') &&
        <Col span={24}>
          <Row gutter={[20, 20]} justify="center" align="middle" className="mb-2 mt-2">
            <Col span={24}>
              <Title level={3} className="text-white mb-0">
                Administration
              </Title>
            </Col>

            <Col flex='1 1 300px'>
              <Card className="uni-card main-card-hover" bordered={false} style={{ height: '500px' }}></Card>
            </Col>
            <Col flex='1 1 300px'>
              <Card className="uni-card main-card-hover" bordered={false} style={{ height: '500px' }}></Card>
            </Col>
            <Col flex='1 1 300px'>
              <Card className="uni-card main-card-hover" bordered={false} style={{ height: '500px' }}></Card>
            </Col>
          </Row>
        </Col>
      } */}
    </Row>
  );
};
