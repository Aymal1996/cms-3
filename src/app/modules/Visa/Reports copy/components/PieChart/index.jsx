import React from 'react';
import { Pie } from '@ant-design/charts';
import { Card, Row, Col, Button, Typography } from 'antd';
const { Title } = Typography;

const data = [
  {
    type: 'Foundation',
    value: 27,
  },
  {
    type: 'Diploma',
    value: 25,
  },
  {
    type: 'Degree',
    value: 18,
  },
  {
    type: 'Postgraduate',
    value: 15,
  }
];

export default (props) => {
  var config = {
    appendPadding: 10,
    data: data,
    color : [ '#e89005' , '#02a574' , '#0077b6' , '#c3423f' ],
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.85,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
      offset : 50,
      style: {
        textAlign: 'center',
        fontSize: 14,
        padding: '5px 10px',
        backgroundColor: '#000',
        color: '#fff'
      },
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    statistic: {
      title: 'false',
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          color: '#ffffff',
          fontWeight: '300'
        },
        content: '406 Students',
      },
    },
    legend : { 
      visible : true , 
      position : 'bottom-center' , 
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
            <Pie {...config} />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};
