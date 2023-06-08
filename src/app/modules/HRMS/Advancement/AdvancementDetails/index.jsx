import React, { useEffect } from 'react';
import { Row, Col, Card, Button, Tabs, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { getAdvancementdetails, getFitFigure, emptyStaffDetails } from '../dcuks/actions';
import StaffDetails from '../../../components/StaffDetails';
import Management from './Managment';
import PostEmployment from './PostEmployment';

const { Title } = Typography;
const { TabPane } = Tabs;

export default (props) => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.advancement.advData);
  const figures = useSelector((state) => state.advancement.fitFigures);

  useEffect(() => {
    dispatch(getAdvancementdetails(id));
    dispatch(getFitFigure(id));
    return () => {
      dispatch(emptyStaffDetails());
    };
  }, []);

  return (
    <StaffDetails id={id} section="HRMS Advancement" data={data} title={'Advancement'} myProfile={true}>
      <Card bordered={false} className="uni-card h-auto w-100">
        <Row gutter={[20, 30]}>
          <Col flex="auto">
            <Title level={4} className="mb-0">
              Advancement
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
            <Tabs defaultActiveKey="1" type="card" className="custom-tabs">
              <TabPane tab={'Management'} key={'1'}>
                <Management id={id} />
              </TabPane>
              <TabPane tab={'Post Employment'} key={'2'}>
                <PostEmployment id={id} />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </StaffDetails>
  );
};
