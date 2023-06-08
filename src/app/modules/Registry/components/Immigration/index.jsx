import React from 'react';
import { Row, Col, Tabs, Button, Typography } from 'antd';
import { useSelector } from 'react-redux';
import * as TabCards from './tabList';
import { LeftOutlined } from '@ant-design/icons';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import StudentTemp from '../../Students/StudentTemp';

const { TabPane } = Tabs;
const { Title } = Typography;

export default (props) => {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const data = useSelector((state) => state.students.studentAppData);
  const dtab = location?.state?.stab;

  const tabs = [
    {
      name: 'Summary',
      Comp: 'Summary',
    },
    {
      name: 'Application',
      Comp: 'Application',
    },
  ];

  return (
    <StudentTemp id={id} section="visa" document={true} request={false} setLoading={props.setLoading}>
      <Row gutter={[30, 20]}>
        <Col span={24}>
          <Row gutter={20}>
            <Col flex="auto">
              <Title level={4} className="mb-0">
                Immigration
              </Title>
            </Col>
            <Col>
              <Button
                icon={<LeftOutlined />}
                size="middle"
                className="c-graybtn small-btn"
                onClick={() => history.push(`/registry/students/${id}`)}
              >
                Categories
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Tabs defaultActiveKey={dtab ? dtab : "1"} type="card" className="custom-tabs">
            {tabs.map((item, index) => {
              const Cardi = TabCards[item.Comp];
              return (
                <TabPane tab={item.name} key={index + 1}>
                  <Cardi data={data} setLoading={props.setLoading} updateParent={props.updateParent} />
                </TabPane>
              );
            })}
          </Tabs>
        </Col>
      </Row>
    </StudentTemp>
  );
};
