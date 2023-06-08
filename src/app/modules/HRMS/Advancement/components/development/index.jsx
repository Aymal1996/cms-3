import React from 'react';
import { Card, Space, Tag, Typography } from 'antd';
const EmployeeExperience = (props) => {
  const { iColor, status, title, experience } = props;
  const { Title, Text } = Typography;
  return (
    <Card className="small-card8 b-black" bordered={false}>
      <Space size={8} direction="vertical" className="w-100" align="center">
        <Tag className={iColor}>{status}</Tag>
        <Title level={5} className={`mb-0 c-white`}>
          {title}
        </Title>
        <Text className="c-gray">{experience}</Text>
      </Space>
    </Card>
  );
};

export default EmployeeExperience;
