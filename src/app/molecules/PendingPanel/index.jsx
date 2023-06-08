import React, { useState } from 'react';
import { Card, Row, Col, Typography, Button } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
const PendingPanel = (props) => {
  const { Title } = Typography;
  const { departmentName } = props;
  const [iconPos, setIconPos] = useState(false);
  return (
    <Card bordered={false} className="pending_card">
      <Row gutter={[24]}>
        <Col span={24}>
          <Title level={5} className="c-default">
            {departmentName}
          </Title>
        </Col>
      </Row>
      <Row justify="space-between">
        <Col>
          <Title level={4}>Add Module</Title>
        </Col>
        <Col>
          <Button
            type="link"
            className="c-white"
            onClick={() => setIconPos(!iconPos)}
            icon={iconPos ? <UpOutlined /> : <DownOutlined />}
          >
            {iconPos ? 'View Details' : 'Hide'}
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default PendingPanel;
