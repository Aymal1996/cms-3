import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography } from 'antd';
import CategoryCard from '../../../../../atoms/CategoryCard';
import { StudentsIcon } from '../../../../../atoms/CustomIcons';
import { useSelector, useDispatch } from 'react-redux';

const { Title } = Typography;

export default (props) => {
  const { id } = props;
  const cardData = [
    {
      title: 'Tasks',
      icon: <StudentsIcon />,
      text: 'Poor Class Attendance',
      status: 'c-error',
      link: `/faculty/lecturers/tasks/${id}`,
    },
    {
      title: 'Students',
      icon: <StudentsIcon />,
      text: 'Poor Student Performance',
      status: 'c-error',
      link: `/faculty/lecturers/students/${id}`,
    },
  ];

  const [data, setData] = useState(cardData);

  return (
    <Card bordered={false} className="uni-card h-auto w-100">
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <Title level={4} className="mb-0">
            Select Category
          </Title>
        </Col>
        <Col span={24}>
          <Row gutter={[20, 20]}>
            {data?.map((x, i) => (
              <Col flex="1 0 250px" key={i}>
                <CategoryCard data={x} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Card>
  );
};
