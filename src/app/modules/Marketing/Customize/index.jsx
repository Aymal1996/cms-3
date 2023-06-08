import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import { useDispatch } from 'react-redux';
import HeadingChip from '../../../molecules/HeadingChip';
import Source from './components/Source';
import RequestForms from './components/RequestForms';

const sections = [
  {
    tabTtile: 'Source',
    comp: <Source />,
    permission: true,
  },
  {
    tabTtile: 'Request Forms',
    comp: <RequestForms />,
    permission: true,
  },
];

export default (props) => {
  
    const dispatch = useDispatch();
    const [tabComp, setTabComp] = useState({ comp: <Source />, id: 0});
    
    const loadComponent = (comp, id) => {
        setTabComp({
            comp: comp,
            id: id,
        });
    };

  useEffect(() => {
  }, []);

  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <HeadingChip title="Setup" />
      </Col>
      {sections.map((value, index) => (
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
