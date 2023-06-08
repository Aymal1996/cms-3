import React from 'react';
import { Row, Col, Typography } from 'antd';
import CardExtension from 'Atoms/CardExtension';

const { Title, Text } = Typography;

export default (props) => {
  const { title, cards } = props;

  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <Title level={4} className="mb-0 c-default">
          {title}
        </Title>
      </Col>
      <Col span={24}>
        <Row gutter={[20, 20]} wrap={false}>
          <CardExtension data={cards} page={true} />
        </Row>
      </Col>
    </Row>
  );
};
