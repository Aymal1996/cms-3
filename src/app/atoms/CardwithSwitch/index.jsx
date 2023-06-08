import React from 'react';
import { Switch, Row, Col, Typography, Space, Card } from 'antd';
import { useHistory } from 'react-router-dom';

const { Title, Text } = Typography;

export default (props) => {
  const history = useHistory();
  const { name, count, text, status, onChange } = props;

  return (
    <Card
      bordered={false}
      className="uni-card"
      style={{ cursor: 'pointer' }}
      onClick={() => history.push(`/aqa/forms/edit/${name}`)}
    >
      <Row gutter={20} align="middle" wrap={false}>
        <Col flex="auto">
          <Space direction="vertical">
            <Title level={4} className="mb-0">
              {name}
            </Title>
            <Text className="c-gray">
              {count} {text}
            </Text>
          </Space>
        </Col>
        <Col flex="40px">
          <Switch defaultChecked={status == 'Active'} onChange={onChange} />
        </Col>
      </Row>
    </Card>
  );
};
