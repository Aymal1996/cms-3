import React from 'react';
import { Row, Typography, Col, Card, Empty } from 'antd';

const { Title } = Typography;

export default (props) => {
  const { pendingData } = props;
  return (
    <Card bordered={false} className="uni-card main-card-hover" style={{ height: '450px' }}>
      <Title level={4} className="c-default mb-1">
        Pending Grading
      </Title>
      <Row gutter={[10, 10]} className="modules-height">
        {pendingData &&
          pendingData?.length > 0 &&
          pendingData?.map((resp, i) => (
            <Col span={24} key={i}>
              <Card bordered={false} className="red-card uni-card">
                {/* <Title level={4} className='w-100 smallFont12 text-uppercase' style={{ marginBottom: '6px', color: 'rgba(255, 255, 255, .60)' }}>Assignment 1 (10%)</Title> */}
                <Row justify="space-between" align="bottom">
                  <Col span={12}>
                    <Title level={5} className="mb-0 mt-0 smallFont14">
                      {resp?.module_name}
                    </Title>
                  </Col>
                  <Col span={12}>
                    <Title level={5} className="mb-0 mt-0 smallFont14 text-right">
                      {resp?.count} Ungraded
                    </Title>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}

        <Col span={24}>{pendingData && pendingData?.length == 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}</Col>
      </Row>
    </Card>
  );
};
