import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Card, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import StaffDetails from '../../components/StaffDetails';
import Employment from './components/Employment';
import Management from './components/Managment';
import { emptyStaffDetails, getAdvancementdetails } from '../Advancement/dcuks/actions';
import { getEmployeeProfile, getEmployeeDocuments } from './ducks/actions';
import Personal from './components/Personal';
import { getRequestDetails, emptyRequestDetails } from '../Requests/ducks/actions';
import Request from '../Requests/components/Request';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const { TabPane } = Tabs;
const { Title } = Typography;

export default (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const uid = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;
  const employeeProfileData = useSelector((state) => state.employeeProfile.employeeProfileData);
  const employeeDocuments = useSelector((state) => state.employeeProfile.employeeDocuments);
  const dataRequest = useSelector((state) => state.hrmsrequests.requestData);
  const [requests, setRequests] = useState({});

  useEffect(() => {
    dispatch(getEmployeeProfile(id || uid));
    dispatch(getAdvancementdetails(id || uid));
    if (!id) {
      dispatch(getRequestDetails(uid, uid));
      dispatch(getEmployeeDocuments(uid));
    }
    return () => {
      dispatch(emptyStaffDetails());
      dispatch(emptyRequestDetails());
    };
  }, [id]);

  useEffect(() => {
    if (!id) {
      if (dataRequest.length > 0) {
        setRequests({
          pending: dataRequest.filter((value) => value.status == 'Pending' && value.requester_id != uid),
          yourrequests: dataRequest.filter((value) => value.status == 'Pending' && value.requester_id == uid),
          archive: dataRequest.filter((value) => value.status != 'Pending'),
        });
      } else {
        setRequests({});
      }
    }
  }, [dataRequest]);

  const updateReqApi = () => {
    dispatch(getRequestDetails(uid, uid));
  };

  return (
    <StaffDetails
      id={id || uid}
      section="Employee"
      title={'Profile'}
      employeeDocuments={employeeDocuments}
      myProfile={false}
      doctype={true}
      nobutton={true}
      nodocument={true}
    >
      {id ? (
        <Card bordered={false} className="uni-card h-auto w-100">
          <Personal data={employeeProfileData} nochange={true} />
        </Card>
      ) : (
        <Row gutter={[20, 20]}>
          {dataRequest?.length > 0 && (
            <Col span={24}>
              <Card bordered={false} className="uni-card">
                <Row gutter={[20, 20]}>
                  <Col span={24}>
                    <Title level={4} className="mb-0 c-default">
                      Requests
                    </Title>
                  </Col>
                  <Col span={24}>
                    <Request
                      id={uid}
                      updateReqApi={updateReqApi}
                      data={requests}
                      selectedTab={'yourrequests'}
                      selectedPanel={''}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          )}
          <Col span={24}>
            <Card bordered={false} className="uni-card h-auto w-100">
              <Row gutter={[20, 20]}>
                <Col span={24}>
                  <Tabs defaultActiveKey="1" type="card" className="custom-tabs">
                    <TabPane tab="Employment" key="1">
                      <Employment id={uid} data={employeeProfileData} />
                    </TabPane>
                    <TabPane tab="Personal" key="2">
                      <Personal data={employeeProfileData} />
                    </TabPane>
                    <TabPane tab="Fit Index" key="3">
                      <Management id={uid} />
                    </TabPane>
                  </Tabs>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      )}
    </StaffDetails>
  );
};
