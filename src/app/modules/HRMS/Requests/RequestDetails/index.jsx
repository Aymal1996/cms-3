import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Tabs } from 'antd';
import StaffDetails from '../../../components/StaffDetails';
import { getAdvancementdetails, emptyStaffDetails } from '../../Advancement/dcuks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import Request from '../components/Request';
import { getRequestDetails, emptyRequestDetails } from '../ducks/actions';
import Roles from '../../../../../routing/config/Roles';
import { allowed } from '../../../../../routing/config/utils';
import EmployeeServices from '../components/EmployeeServices';

const { Title } = Typography;
const { TabPane } = Tabs;

export default (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const data = useSelector((state) => state.advancement.advData);
  const dataRequest = useSelector((state) => state.hrmsrequests.requestData);
  const [activeTab, setActiveTab] = useState('Requests');
  const [requests, setRequests] = useState({});
  const uid = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;

  useEffect(() => {
    dispatch(getAdvancementdetails(id));
    if (allowed([Roles.REQUESTS], 'read')) {
      dispatch(getRequestDetails(id, null));
    } else {
      dispatch(getRequestDetails(id, uid));
    }

    return () => {
      dispatch(emptyStaffDetails());
      dispatch(emptyRequestDetails());
    };
  }, []);

  useEffect(() => {
    if (dataRequest.length > 0) {
      setRequests({
        pending: dataRequest.filter((value) => value.status == 'Pending' && value.requester_id != uid),
        yourrequests: dataRequest.filter((value) => value.status == 'Pending' && value.requester_id == uid),
        archive: dataRequest.filter((value) => value.status != 'Pending'),
      });
    } else {
      setRequests({});
    }
  }, [dataRequest]);

  const updateReqApi = () => {
    if (allowed([Roles.REQUESTS], 'read')) {
      dispatch(getRequestDetails(id));
    } else {
      dispatch(getRequestDetails(id, uid));
    }
  };

  return (
    <StaffDetails id={id} section="Requests" data={data} myProfile={true}>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Card bordered={false} className="uni-card">
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <Title level={4} className="mb-0 c-default">
                  Requests & Complaints
                </Title>
              </Col>
              <Col span={24}>
                <Tabs activeKey={activeTab} type="card" className="custom-tabs" onChange={(e) => setActiveTab(e)}>
                  <TabPane tab="Requests" key="Requests">
                    <Request
                      id={uid}
                      updateReqApi={updateReqApi}
                      data={requests}
                      selectedTab={location?.state?.rstatus || 'Pending'}
                      selectedPanel={location?.state?.rid || ''}
                    />
                  </TabPane>
                  <TabPane tab="Complaints" key="Complaints"></TabPane>
                </Tabs>
              </Col>
            </Row>
          </Card>
        </Col>
        {allowed([Roles.REQUESTS, Roles.REQUESTS_MANAGER], 'read') ? (
          <Col span={24}>
            <EmployeeServices id={id} />
          </Col>
        ) : null}
      </Row>
    </StaffDetails>
  );
};
