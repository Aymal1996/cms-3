import React from 'react';
import { Space, Rate, Typography } from 'antd';

export default (props) => {
  const { data } = props;
  const { Title, Text } = Typography;
  return (
    <Space direction="vertical" size={4}>
      <Title
        className={`${data?.feedback_type != 'Overall Rating' ? 'smallFont12 c-white op-6' : ''} mb-0`}
        level={data?.feedback_type == 'Overall Rating' ? 4 : 5}
      >
        {data?.feedback_type}
      </Title>
      <Title strong={true} className="mb-0" level={data?.feedback_type == 'Overall Rating' ? 3 : 5}>
        {parseFloat(data?.overall_rating).toFixed(2)}
      </Title>
      <Rate style={{ color: '#E89005' }} allowHalf={true} disabled value={data?.overall_rating} />
    </Space>
  );
};
