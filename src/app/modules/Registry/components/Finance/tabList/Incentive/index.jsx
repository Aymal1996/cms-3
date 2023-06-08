import React from 'react';
import { Row, Col, Typography, Space, Tag, Card } from 'antd';

const { Title, Text } = Typography;

export default (props) => {
  const { data } = props;
  const company_currency =
    localStorage.getItem('userdetails') &&
    JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company_currency;
  function calc() {
    return data?.incentive?.reduce((n, { tution_fee_covered }) => n + tution_fee_covered, 0);
  }

  return (
    <>
      <Space direction="vertical" size={20} className="w-100">
        <Card bordered={false} className="small-card12 b-black">
          <Row gutter={[20, 20]} justify="space-between">
            <Col>
              <Title level={3} className="mb-0 c-success">
                {data?.incentive?.length > 0 ? calc() : 0}%
              </Title>
              <Text>Tution fee incentive applied</Text>
            </Col>
            <Col>
              <Space size={0} direction="vertical">
                <Space size={10}>
                  <Title level={3} className="mb-0 c-success">
                    {company_currency} {data?.program_fee - (data?.program_fee * calc()) / 100}
                  </Title>
                  <Title level={4} className="c-gray mb-0">
                    /{company_currency} {data?.program_fee}
                  </Title>
                </Space>
                <Text>Total tution fee after discount</Text>
              </Space>
            </Col>
          </Row>
        </Card>
        <Space size={20}>
          {data?.incentive?.map((item, index) => (
            <Tag closable={false} className="incentive-card-tag" key={item.name}>
              <Space direction="vertical" size={15} className="w-100" align="center">
                <Text className="c-white tag-title">{item.incentive_name}</Text>
                <Space direction="vertical" size={0} className="w-100" align="center">
                  <Title level={4} className="mb-0 c-success">
                    {item.tution_fee_covered}%
                  </Title>
                  <Text className="c-gray">Discount</Text>
                </Space>
              </Space>
            </Tag>
          ))}
        </Space>
      </Space>
    </>
  );
};
