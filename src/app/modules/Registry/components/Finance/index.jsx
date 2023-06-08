import React, { useEffect } from 'react';
import { Row, Col, Card, Tabs, Button, Typography } from 'antd';
import { useSelector } from 'react-redux';
import * as TabCards from './tabList';
import { LeftOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';
import StudentTemp from '../../Students/StudentTemp';

const { TabPane } = Tabs;
const { Title } = Typography;

export default (props) => {
  const { id } = useParams();
  const history = useHistory();
  const data = useSelector((state) => state.students.studentAppData);

  useEffect(() => {}, []);

  const tabs = [
    {
      name: 'Account',
      Comp: 'Payment',
    },
    {
      name: 'Scholarship',
      Comp: 'Scholarship',
    },
    {
      name: 'Incentive',
      Comp: 'Incentive',
    },
  ];

  return (
    <StudentTemp id={id} section="registry" request={false} setLoading={props.setLoading}>
      <Row gutter={[30, 20]}>
        <Col span={24}>
          <Row gutter={20}>
            <Col flex="auto">
              <Title level={4} className="mb-0">
                Finance & Scholarship
              </Title>
            </Col>
            <Col>
              <Button
                icon={<LeftOutlined />}
                size="middle"
                className="c-graybtn small-btn"
                onClick={() => history.goBack()}
              >
                Categories
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Tabs defaultActiveKey="1" type="card" className="custom-tabs">
            {tabs.map((item, index) => {
              const Cardi = TabCards[item.Comp];
              return (
                <TabPane tab={item.name} key={index + 1}>
                  <Cardi data={data} updateParent={props.updateParent} />
                </TabPane>
              );
            })}
          </Tabs>
        </Col>
      </Row>
    </StudentTemp>
  );
};
