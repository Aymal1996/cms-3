import React from 'react';
import { Space, Typography } from 'antd';
import moment from 'moment';
export default (props) => {
  const { data } = props;
  const { Text } = Typography;
  return (
    <Space size={16} direction="vertical">
      <Text className="mb-0">{`"${data.message}"`}</Text>
      <Text className="mb-0 c-gray">{moment(data.intake).format('Do MMMM YYYY')}</Text>
    </Space>
  );
};
