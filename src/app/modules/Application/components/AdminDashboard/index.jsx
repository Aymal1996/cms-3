import React, { useEffect } from 'react';
import { Row, Col, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './Dashboard';
import PendingRequests from './PendingRequests';
import StaffPerformance from '../StaffPerformance';
import RequestList from 'Modules/HRMS/Requests/RequestList';
import { getPolicyList, getTimesheetData } from '../../ducks/actions';
import Roles from '../../../../../routing/config/Roles';
import { allowed } from '../../../../../routing/config/utils';

const { Title } = Typography;

export default (props) => {
  const dispatch = useDispatch();
  const policyData = useSelector((state) => state.global.policyData);
  const timesheetData = useSelector((state) => state.global.timesheetData);

  useEffect(() => {
    dispatch(getPolicyList());
    dispatch(getTimesheetData());
  }, []);

  return (
    <Row gutter={[20, 50]}>
      <Col span={24}>
        <Row gutter={[20, 20]}>
          {/* <Col span={24}>
                    <Title level={3} className="text-white mb-0">Administrator</Title>
                </Col> */}

          <Col span={24}>
            <Dashboard policyData={policyData} timesheetData={timesheetData} />
          </Col>
        </Row>
      </Col>
      {allowed([Roles.REQUESTS], 'read') ? (
        <Col span={24}>
          <RequestList dashboard={true} />
        </Col>
      ) : null}
      {/* {allowed([Roles.ADVANCEMENT], 'read') ? (
        <Col span={24}>
          <StaffPerformance />
        </Col>
      ) : null} */}
      {allowed([Roles.SETUP], 'read') ? (
        <Col span={24}>
          <PendingRequests />
        </Col>
      ) : null}
    </Row>
  );
};
