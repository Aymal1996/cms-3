import React, { useState } from 'react';
import { Row, Col, Card, Typography } from 'antd';
import CategoryCard from 'Atoms/CategoryCard';
import { CalendarIcon } from 'Atoms/CustomIcons';
import { useLocation } from 'react-router-dom';

const { Title } = Typography;

export default (props) => {
  const { id } = props;
  const location = useLocation();
  const urlpage = location.pathname.split('/')[2];
  const url = location.pathname.split('/')[1];
  const cardData = [
    {
      title: 'Personal Information',
      icon: <CalendarIcon />,
      text: '',
      status: '',
      link: `/${
        url == 'studentfile' ? (urlpage == 'auditor' ? `studentfile/${urlpage}` : `studentfile`) : 'registry'
      }/students/personal/${id}`,
      hide: [],
    },
    {
      title: 'Academic Information',
      icon: <CalendarIcon />,
      text: '',
      status: '',
      link: `/${url == 'studentfile' ? `studentfile` : 'registry'}/students/academic/${id}`,
      hide: ['auditor'],
    },
    {
      title: 'Transcript',
      icon: <CalendarIcon />,
      text: '',
      status: 'c-pending',
      link: `/${url == 'studentfile' ? `studentfile` : 'registry'}/students/transcript/${id}`,
      hide: ['auditor'],
    },
    {
      title: 'Immigration',
      icon: <CalendarIcon />,
      text: '',
      status: '',
      link: `/${url == 'studentfile' ? `studentfile` : 'registry'}/students/immigration/${id}`,
      hide: ['auditor', 'internaloffice'],
    },
    {
      title: 'Finance & Scholarship',
      icon: <CalendarIcon />,
      text: '',
      status: 'c-error',
      link: `/${url == 'studentfile' ? `studentfile` : 'registry'}/students/finance/${id}`,
      hide: ['auditor'],
    },
    {
      title: 'Graduation',
      icon: <CalendarIcon />,
      text: '',
      status: '',
      //link: `/registry/students/graduation/${id}`
      hide: ['auditor', 'internaloffice'],
    },
    {
      title: 'Accommodation',
      icon: <CalendarIcon />,
      text: '',
      status: '',
      link: `/registry/students/accommodation/${id}`,
      hide: ['auditor', 'internaloffice'],
    },
  ];

  const [data, setData] = useState(cardData);

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <Title level={4} className="mb-0">
          Select Category
        </Title>
      </Col>
      <Col span={24}>
        <Row gutter={[20, 20]}>
          {data?.map((x, i) => (
            <>
              {console.log(
                '===========',
                x.hide.findIndex((y) => y == urlpage),
              )}
              {x.hide.findIndex((y) => y == urlpage) < 0 && (
                <Col flex="1 0 250px" key={i}>
                  <CategoryCard data={x} />
                </Col>
              )}
            </>
          ))}
        </Row>
      </Col>
    </Row>
  );
};
