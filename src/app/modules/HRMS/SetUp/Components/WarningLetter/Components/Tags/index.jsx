import React from 'react';
import { Row, Col, Descriptions, Typography } from 'antd';

const TagsList = () => {
  const { Title, Text } = Typography;
  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <Row gutter={24} justify="center">
          <Col>
            <Title level={3} className="mb-0">
              List of Tags
            </Title>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Descriptions labelStyle={{ color: '#0077B6' }}>
          <Descriptions.Item span={24} label="[name]">
            Staff name
          </Descriptions.Item>
          <Descriptions.Item span={24} label="[identification]">
            Staff idntification number
          </Descriptions.Item>
          <Descriptions.Item span={24} label="[position]">
            Staff position
          </Descriptions.Item>
          <Descriptions.Item span={24} label="[team]">
            Staff team
          </Descriptions.Item>
          <Descriptions.Item span={24} label="[supervisor]">
            Staff supervisor name
          </Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  );
};

export default TagsList;
