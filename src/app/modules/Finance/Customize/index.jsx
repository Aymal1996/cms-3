import React, { useState } from 'react';
import { Row, Col, Card } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import RequestForms from '../../Marketing/Customize/components/RequestForms';
import FeeSetup from './components/FeeSetup';

const sections = [
  {
    tabTtile: 'Fee Setup',
    comp: <FeeSetup />,
    permission: true,
  },
  {
    tabTtile: 'Request Forms',
    comp: <RequestForms />,
    permission: true,
  }
];

export default (props) => {
  
    const [tabComp, setTabComp] = useState({ comp: <FeeSetup />, id: 0});
    
    const loadComponent = (comp, id) => {
        setTabComp({
            comp: comp,
            id: id,
        });
    };

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
