import React from 'react';
import { Descriptions, Avatar, Divider, Steps } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
export default (props) => {
  const { data } = props;
  const { Step } = Steps;
  return (
    <Descriptions className="reqData" bordered colon={false} column={1}>
      <Descriptions.Item label={<Avatar size="large" size={70} src={`http://cms2dev.limkokwing.net`} />}>
        {data.intake}
      </Descriptions.Item>
      <Descriptions.Item label="Thesis">{data?.thesis}</Descriptions.Item>
      <Descriptions.Item label="Supervisor">{data?.supervisor}</Descriptions.Item>
      <Descriptions.Item label="Co-Sup">{data?.co_sup}</Descriptions.Item>
      <Descriptions.Item label="Stage">
        <Steps current={1} labelPlacement="vertical" size="small">
          <Step icon={<CheckCircleFilled />} title="Thesis Defense" />
          <Step icon={<CheckCircleFilled />} title="Pre-Viva" />
          <Step icon={<CheckCircleFilled />} title="Final Viva" />
        </Steps>
      </Descriptions.Item>
      <Descriptions.Item label="Viva Date">{data?.viva_date}</Descriptions.Item>
      <Descriptions.Item label="Grade">{data?.grade}</Descriptions.Item>
    </Descriptions>
  );
};
