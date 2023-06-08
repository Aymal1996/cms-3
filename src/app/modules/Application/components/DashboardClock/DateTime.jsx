import React from 'react';
import { Typography, Col, Space } from 'antd';

const { Title } = Typography;

export default (props) => {
  
  const { uDate } = props;
  
  return (
    <Col span={24}>
      <Space direction="vertical" size={0}>
        <Title level={3} className="mb-0">
          {uDate.date}
        </Title>
        <Title level={4} className="mb-0 c-default">
          {uDate.time}
        </Title>
      </Space>
    </Col>
  );
};
