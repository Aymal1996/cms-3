import React from 'react';
import { Card, Typography, Space } from 'antd';
import moment from 'moment';

const { Title, Text } = Typography;

export default (props) => {
  
const { data } = props;

  return (
    <Card bordered={false} className="uni-card red-card">
        <Space direction='vertical' size={10}>
          <Title level={5} className='mb-0 lineHeight20'>{data.program_name}</Title>
          <Text className='op-6 lineHeight20'>Expired on {moment(data.ineffective_date).format('LL')}</Text>
        </Space>
    </Card>
  );
};
