import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import ExpiredChip from '../../atoms/ExpiredChip';
import ExpiringChip from '../../atoms/ExpiringChip';

const { Title } = Typography;

export default (props) => {
  const { data, title, type } = props;

  return (
    <Card bordered={false} className="uni-card">
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Title level={4} className='c-default mb-0'>{title}</Title>
        </Col>
        {data.map((item, index) => (
          type == 'expired' ? 
          <Col span={24} key={index}>
            <ExpiredChip data={item} />
          </Col>
          :
          <Col flex='1 0 200px' key={index}>
            <ExpiringChip data={item} />
          </Col>
        ))}
      </Row>
    </Card>
  );
};
