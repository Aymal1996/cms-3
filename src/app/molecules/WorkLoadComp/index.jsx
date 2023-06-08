import React from 'react';
import { Row, Col, Typography, Space } from 'antd';
import StatusBar from '../../atoms/StatsBar';
const WorkLoadComp = (props) => {
  const { Title, Text } = Typography;
  const { steps, assign, total, text, type } = props;
  return (
    <>
      {steps && (
        <Row gutter={24}>
          <Col span={24}>
            <Title level={3} className={`${assign > total ? 'c-error' : assign == 0 ? 'c-white' : 'c-success'} mb-0`}>
              {assign}
            </Title>
          </Col>
          <Col span={24}>
            <Space direction="horizontal" size={11} className="w-100">
              <Text className="d-block c-white op-6 smallFont12">{text}</Text>
              <StatusBar steps={steps} assign={assign} total={total} />
              <Text className="d-block c-white op-6 smallFont12">
                {`${assign}/${total}`} {type}
              </Text>
            </Space>
          </Col>
        </Row>
      )}
    </>
  );
};

export default WorkLoadComp;
