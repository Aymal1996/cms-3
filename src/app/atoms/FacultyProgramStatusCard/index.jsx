import React from 'react';
import { Card, Typography, Space } from 'antd';

const { Title, Text } = Typography;

export default (props) => {
  
const { data } = props;

  return (
    <Card bordered={false} className={`uni-card status-card ${data?.type == 'expired' ? 'b-error' : data?.type == 'Inactive Programme' ? 'b-default' :'b-pending' }`}>
        <Space direction='vertical' size={10}>
          <Text className='c-white lineHeight20'>{data?.title}</Text>
          <Title level={3} className='mb-0 lineHeight20'>{data?.type == 'expired' ? 'Expired' : data?.type == 'Inactive Programme' ? data?.type : `${data?.type} Days Left` } </Title>
        </Space>
    </Card>
  );
};
