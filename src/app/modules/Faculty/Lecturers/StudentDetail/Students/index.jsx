import React, { useState } from 'react';
import { Card, Col, Row, Tabs, Typography, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';
import Performance from '../../components/Performance';
import Feedback from '../../components/Feedback';

export default (props) => {
  const { Title } = Typography;
  const { TabPane } = Tabs;
  const { id } = useParams();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState('Performance');
  return (
    <Card bordered={false} className="uni-card h-auto w-100">
      <Row gutter={[24, 20]}>
        <Col flex="auto">
          <Title level={4} className="mb-0 c-default">
            Students
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
          <Tabs activeKey={activeTab} type="card" className="custom-tabs" onChange={(e) => setActiveTab(e)}>
            <TabPane tab="Performance" key="Performance">
              <Performance />
            </TabPane>
            <TabPane tab="Feedback" key="Feedback">
              <Feedback />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Card>
  );
};
