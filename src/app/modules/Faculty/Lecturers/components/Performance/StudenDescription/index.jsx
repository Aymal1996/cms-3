import React from 'react';
import { Descriptions, Avatar, Divider } from 'antd';

export default (props) => {
  const { data } = props;
  return (
    <Descriptions className="reqData" bordered colon={false} column={1}>
      <Descriptions.Item label={<Avatar size="large" size={70} src={`http://cms2dev.limkokwing.net`} />}>
        {data.faculty}
      </Descriptions.Item>
      <Descriptions.Item label="Program">{data?.programme}</Descriptions.Item>
      <Descriptions.Item label="Module">{data?.module}</Descriptions.Item>
      <Descriptions.Item label="Grade">{data?.grade}</Descriptions.Item>
    </Descriptions>
  );
};
