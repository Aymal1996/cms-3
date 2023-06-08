import React from 'react';
import { Row, Col, Card, Tabs, Typography, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';
import Modules from '../../components/Modules';
import Grants from '../../components/Grants';
import Publication from '../../components/Publications';
import TimeTable from '../../components/Timetable';
const StaffTasks = () => {
  const { TabPane } = Tabs;
  const history = useHistory();
  const { id } = useParams();
  const { Title } = Typography;
  return (
    <Card bordered={false} className="uni-card h-auto w-100">
      <Row gutter={[30, 20]}>
        <Col flex="auto">
          <Title level={4} className="mb-0">
            Tasks
          </Title>
        </Col>
        <Col>
          <Button
            icon={<LeftOutlined />}
            size="middle"
            className="c-graybtn small-btn"
            onClick={() => history.push(`/faculty/staff/${id}`)}
          >
            Categories
          </Button>
        </Col>
        <Col span={24}>
          <Tabs defaultActiveKey="1" type="card" className="custom-tabs custom-tabs2 -space30">
            <TabPane tab={'Modules'} key={'1'}>
              <Modules />
            </TabPane>
            <TabPane tab={'Timetable'} key={'2'}>
              <TimeTable />
            </TabPane>
            <TabPane tab={'Grants'} key={'3'}>
              <Grants />
            </TabPane>
            <TabPane tab={'Publication'} key={'4'}>
              <Publication />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Card>
  );
};

export default StaffTasks;
