import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import HeadingChip from '../../../molecules/HeadingChip';
import { useDispatch, useSelector } from 'react-redux';
import { Tasks, Employment, Attendance, LeaveEntitlement } from './Components';
export default (props) => {
  const [activeID, setActiveID] = useState(null);
  const [tabComp, setTabComp] = useState(null);

  const data = [
    {
      tabTitle: 'Tasks',
      comp: <Tasks />,
      permission: true,
    },
    {
      tabTitle: 'Employment',
      comp: <Employment />,
      permission: true,
    },
    {
      tabTitle: 'Attendance',
      comp: <Attendance />,
      permission: true,
    },
    {
      tabTitle: 'Leave Entitlement',
      comp: <LeaveEntitlement />,
      permission: true,
    },
  ];

  const loadComp = (data, id) => {
    setTabComp(data?.comp);
    setActiveID(id);
  };

  return (
    <>
      <Row gutter={[20, 50]}>
        <Col span={24}>
          <Row gutter={[20, 30]}>
            <Col span={24}>
              <HeadingChip title="Download Reports" />
            </Col>
            {data &&
              data?.map((resp, i) => (
                <Fragment key={i}>
                  <Col span={6}>
                    <Card
                      className={activeID === i ? 'uni-card-small-active' : 'uni-card-small'}
                      bordered={false}
                      onClick={() => loadComp(resp, i)}
                    >
                      {resp?.tabTitle}
                    </Card>
                  </Col>
                </Fragment>
              ))}
          </Row>
        </Col>
        <Col span={24}>{tabComp}</Col>
      </Row>
    </>
  );
};
