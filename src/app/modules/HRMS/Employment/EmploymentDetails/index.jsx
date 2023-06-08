import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Button, Spin } from 'antd';
import StaffDetails from '../../../components/StaffDetails';
import { getAdvancementdetails, emptyStaffDetails } from '../../Advancement/dcuks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { LeftOutlined } from '@ant-design/icons';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import { emptyStaff, getEmployeeDetail } from '../ducks/action';
import { LoadingOutlined } from '@ant-design/icons';
import { getEmployeeDocuments } from '../../Profile/ducks/actions';
import ExpiredChip from 'Atoms/ExpiredChip';
import ExpiringChip from 'Atoms/ExpiringChip';

const { Title } = Typography;
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const details = useSelector((state) => state.employment.empDetails);
  const employeeDocuments = useSelector((state) => state.employeeProfile.employeeDocuments);

  useEffect(() => {
    dispatch(getAdvancementdetails(id));
    dispatch(getEmployeeDetail(id));
    dispatch(getEmployeeDocuments(id));
    return () => {
      dispatch(emptyStaff());
      dispatch(emptyStaffDetails());
    };
  }, []);

  const updateApi = () => {
    dispatch(getEmployeeDetail(id));
  };

  const actionUpload = () => {
    dispatch(getEmployeeDocuments(id));
  };

  return (
    <StaffDetails
      id={id}
      section="Employee"
      uploadBtn={true}
      updateApi={actionUpload}
      employeeDocuments={employeeDocuments}
      myProfile={true}
    >
      {details?.issues && details?.issues.length > 0 && (
        <Card bordered={false} className="uni-card">
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Title level={4} className="c-default mb-0">
                {'Issues'}
              </Title>
            </Col>
            {details?.issues.map((item, index) =>
              item.status == 'Expired' ? (
                <Col span={24} key={index}>
                  <ExpiredChip data={{ ineffective_date: item.date, program_name: item.type }} />
                </Col>
              ) : (
                <Col flex="1 0 200px" key={index}>
                  <ExpiringChip data={{ ineffective_date: item.date, program_name: item.type }} />
                </Col>
              ),
            )}
          </Row>
        </Card>
      )}
      <Card bordered={false} className="uni-card h-auto w-100">
        <Row gutter={[20, 30]}>
          <Col flex="auto">
            <Title level={4} className="mb-0">
              Employment
            </Title>
          </Col>
          <Col>
            <Button
              icon={<LeftOutlined />}
              size="middle"
              className="c-graybtn small-btn"
              onClick={() => history.push(`/hrms/requests/${id}`)}
            >
              Categories
            </Button>
          </Col>
          <Col span={24}>
            <Spin indicator={antIcon} size="large" spinning={load}>
              <EmployeeForm
                mode="edit"
                data={details}
                updateApi={updateApi}
                id={id}
                setLoad={setLoad}
                dTab={location?.state}
              />
            </Spin>
          </Col>
        </Row>
      </Card>
    </StaffDetails>
  );
};
