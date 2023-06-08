import React from 'react';
import { Descriptions, Avatar, Space, Typography } from 'antd';

export default (props) => {
  const { data } = props;
  const { Text } = Typography;
  return (
    <Descriptions className="student-description" colon={false} column={1}>
      <Descriptions.Item
        label={<Avatar size={65} src={data?.user_image && `${process.env.REACT_APP_BASE_URL}${data?.user_image}`} />}
      >
        <Space size={0} direction="vertical">
          <Text className="titlename">{data?.student_name}</Text>
          <Text className="c-gray">{data?.student_id}</Text>
        </Space>
      </Descriptions.Item>
      <Descriptions.Item label="Faculty">{data?.faculty_name}</Descriptions.Item>
      <Descriptions.Item label="Program">{data?.program_name}</Descriptions.Item>
      <Descriptions.Item label="Module">{data?.aqa_module}</Descriptions.Item>
      <Descriptions.Item label="Grade">
        <Text className="mb-0 c-success">{data?.grade}</Text>
      </Descriptions.Item>
    </Descriptions>
  );
};
