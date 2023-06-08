import React, { useState } from 'react';
import { Row, Col } from 'antd';
import Renewal from './Renewal';
import Cancellation from './Cancellation';

export default (props) => {
  const { data } = props;

  return (
    <Row gutter={[20, 50]}>
      <Col span={24}>
        <Renewal {...props} />
      </Col>
      <Col span={24}>
        <Cancellation {...props} />
      </Col>
    </Row>
  );
};
