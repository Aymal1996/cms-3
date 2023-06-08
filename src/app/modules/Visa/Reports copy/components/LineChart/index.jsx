import React from 'react';
import { Line } from '@ant-design/charts';
import { Card, Row, Col, Button, Typography } from 'antd';
const { Title } = Typography;
const LineData = [
  {
    year: '2016',
    value: 250,
    category: 'Enrolled Students',
  },
  {
    year: '2016',
    value: 120,
    category: 'Graduating Students',
  },
  {
    year: '2017',
    value: 350,
    category: 'Enrolled Students',
  },
  {
    year: '2017',
    value: 198,
    category: 'Graduating Students',
  },
  {
    year: '2018',
    value: 400,
    category: 'Enrolled Students',
  },
  {
    year: '2018',
    value: 190,
    category: 'Graduating Students',
  },
  {
    year: '2019',
    value: 420,
    category: 'Enrolled Students',
  },
  {
    year: '2019',
    value: 215,
    category: 'Graduating Students',
  },
  {
    year: '2020',
    value: 350,
    category: 'Enrolled Students',
  },
  {
    year: '2020',
    value: 225,
    category: 'Graduating Students',
  },
  {
    year: '2021',
    value: 330,
    category: 'Enrolled Students',
  },
  {
    year: '2021',
    value: 280,
    category: 'Graduating Students',
  },
];

export default (props) => {

  var COLOR_PLATE_10 = ['#0077B6', '#C3423F'];

  var config = {
    data: LineData,
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    yAxis: {},
    height: 300,
    color: COLOR_PLATE_10,
    point: {
      size: 5,
      shape: 'circle'
    },
    lineStyle: {
      lineWidth: 2,
    }
  
  };

  return (
    <Card>
      <Row gutter={[20, 30]}>
        <Col flex="auto">
          <Title level={4} className="mb-0 mt-0">
            Graduating Students by Year
          </Title>
        </Col>
        <Col>
          <Button className="gray-btn c-white">Edit Report</Button>
        </Col>
        <Col>
          <Button className="green-btn c-white">Download PDF</Button>
        </Col>
        <Col span={24}>
          <Card>
            <Line {...config} />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};
