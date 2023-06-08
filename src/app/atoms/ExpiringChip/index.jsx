import React from 'react';
import { Card, Typography, Space } from 'antd';
import moment from 'moment';

const { Title, Text } = Typography;

export default (props) => {
  
const { data } = props;

  return (
    <Card bordered={false} className="uni-card pending-card">
        <Space direction='vertical' size={10}>
          <Text className='op-6 lineHeight20'>{data.program_name}</Text>
          <Title level={4} className='lineHeight20 mb-0'>{moment(data.ineffective_date).diff(moment(), 'day')} Days Left</Title>
        </Space>
    </Card>
  );
};
