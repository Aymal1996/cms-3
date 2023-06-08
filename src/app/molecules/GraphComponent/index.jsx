import React from 'react';
import { Row, Col, Card, Space, Typography } from 'antd';
import GraphCard from '../GraphCard';

const { Title, Text } = Typography;

export default (props) => {
  const { data, cardClass, title, count, countClass, text, search, barColor } = props;

  console.log('count-------', count)

  return (
    <Card bordered={false} className={`uni-card ${cardClass ? cardClass : ''}`}>
      <Row gutter={[20, 30]}>
        {search && <Col span={24}>{search}</Col>}
            <Col span={24}>
              <Row gutter={[20, 20]}>
                  {title && (
                    <Col span={24}>
                      <Title level={4} className="c-default mb-0">{title}</Title>
                    </Col>
                  )}
                  <Col span={24}>
                    <Space size={2} direction="vertical">
                      <Title level={3} className={`c-default mb-0 ${countClass ? countClass : ''}`}>
                        {count ? count : 0}
                      </Title>
                      <Text>{text}</Text>
                    </Space>
                  </Col>
              </Row>
            </Col>
        <Col span={24}>
          <GraphCard barColor={barColor} data={data} />
        </Col>
      </Row>
    </Card>
  );
};
