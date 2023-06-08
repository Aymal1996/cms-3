import React, { useEffect, useState } from 'react';
import { Row, Typography, Col, Card, Progress, Empty } from 'antd';

const { Title } = Typography;

export default (props) => {
  const { facultyProgress } = props;

  const getPercent = (value, totalNumber) => {
    return parseInt((value / totalNumber) * 100);
  };

  return (
    <Row gutter={[10, 10]}>
      {facultyProgress && facultyProgress?.length > 0 ? (
        facultyProgress?.map((resp, i) => (
          <Col span={3}>
            <Card bordered={false} className="progress-card">
              <Progress
                type="dashboard"
                width={100}
                trailColor="#171717"
                strokeColor="#02A574"
                percent={getPercent(resp?.value, resp?.totalNumber)}
                gapDegree={150}
                format={(percent) => `${resp?.value}`}
              />
              <Title level={5}>{resp?.heading}</Title>
            </Card>
          </Col>
        ))
      ) : (
        <Col span={24}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </Col>
      )}

      {/* <Col span={3}>
        <Card bordered={false} className="progress-card">
          <Progress type="dashboard" width={100} trailColor="#171717" strokeColor="#02A574" percent={80} gapDegree={150} format={percent => `17`} />
          <Title level={5}>Teaching <br />Hours</Title>
        </Card>
      </Col>

      <Col span={3}>
        <Card bordered={false} className="progress-card">
          <Progress type="dashboard" width={100} trailColor="#171717" strokeColor="#02A574" percent={80} gapDegree={150} format={percent => `8`} />
          <Title level={5}>Programme /Module Supervision</Title>
        </Card>
      </Col>

      <Col span={3}>
        <Card bordered={false} className="progress-card">
          <Progress type="dashboard" width={100} trailColor="#171717" strokeColor="#02A574" percent={80} gapDegree={150} format={percent => `6`} />
          <Title level={5}>Publication This Year</Title>
        </Card>
      </Col>

      <Col span={3}>
        <Card bordered={false} className="progress-card">
          <Progress type="dashboard" width={100} trailColor="#171717" strokeColor="#02A574" percent={90} gapDegree={150} format={percent => `${percent}%`} />
          <Title level={5}>Academic Efficiency</Title>
        </Card>
      </Col>

      <Col span={3}>
        <Card bordered={false} className="progress-card">
          <Progress type="dashboard" width={100} trailColor="#171717" strokeColor="#02A574" percent={80} gapDegree={150} format={percent => `${percent}%`} />
          <Title level={5}>Client <br />Charter</Title>
        </Card>
      </Col>

      <Col span={3}>
        <Card bordered={false} className="progress-card">
          <Progress type="dashboard" width={100} trailColor="#171717" strokeColor="#E89005" percent={50} gapDegree={150} format={percent => `${percent}%`} />
          <Title level={5}>Own Class Attendance</Title>
        </Card>
      </Col>

      <Col span={3}>
        <Card bordered={false} className="progress-card">
          <Progress type="dashboard" width={100} trailColor="#171717" strokeColor="#E89005" percent={50} gapDegree={150} format={percent => `${percent}%`} />
          <Title level={5}>Contribution to Faculty/Campus</Title>
        </Card>
      </Col>

      <Col span={3}>
        <Card bordered={false} className="progress-card">
          <Progress type="dashboard" width={100} trailColor="#171717" strokeColor="#C3423F" percent={40} gapDegree={150} format={percent => `${percent}%`} />
          <Title level={5}>Teaching <br />Quality</Title>
        </Card>
      </Col> */}
    </Row>
  );
};
