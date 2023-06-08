import React from 'react';
import { Card, Col, Row, Typography, Space } from 'antd';
const JobFitStats = (props) => {
  const { Title, Text } = Typography;
  const { mainHeading, percent, jobRole } = props;

  return (
    <Card bordered={false} className="uni-card small-card8 b-black">
      <Space direction="vertical" align="center" size={5} className="w-100">
        <Title
          level={mainHeading ? 2 : 3}
          className={`mb-0 ${percent >= 60 ? 'c-success' : percent >= 35 ? 'c-pending' : 'c-error'}`}
        >
          {`${percent}%`}
        </Title>
        <Text className="mb-0 c-gray">{mainHeading ? 'Fit Index' : jobRole}</Text>
        {mainHeading && (
          <Title level={4} className="mb-0 c-white">
            {jobRole}
          </Title>
        )}
      </Space>
    </Card>
  );
};

export default JobFitStats;
