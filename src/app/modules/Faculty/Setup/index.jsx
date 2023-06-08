import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { ClassRoom, ExamHall } from './Components';
import { useDispatch } from 'react-redux';
import { getAllBlock, getAllClassroomType, getAllFacultyLevel } from './ducks/actions';

import HeadingChip from '../../../molecules/HeadingChip';

const setupSections = [
  {
    tabTtile: 'Classroom',
    comp: <ClassRoom />,
    permission: true,
  },
  {
    tabTtile: 'Exam Hall',
    comp: <ExamHall />,
    permission: true,
  },
];

export default (props) => {
  const [tabComp, setTabComp] = useState({ comp: '', id: '' });
  const dispatch = useDispatch();
  const loadComponent = (component, id) => {
    setTabComp({
      comp: component,
      id: id,
    });
  };

  useEffect(() => {
    console.log('hello');
    dispatch(getAllBlock());
    dispatch(getAllClassroomType());
    dispatch(getAllFacultyLevel());
  }, []);

  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <HeadingChip title="Setup" />
      </Col>
      {setupSections.map((value, index) => (
        <Col span={6}>
          <Card
            hoverable
            className={tabComp.id === index ? 'uni-card-small-active' : 'uni-card-small'}
            bordered={false}
            onClick={() => loadComponent(value.comp, index)}
          >
            {value.tabTtile}
          </Card>
        </Col>
      ))}
      <Col span={24}>{tabComp.comp}</Col>
    </Row>
  );
};
