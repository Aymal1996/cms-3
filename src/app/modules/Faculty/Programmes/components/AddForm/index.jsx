import React from 'react';
import { Row, Col, Card, Tabs } from 'antd';
import * as TabCards from './tabList';

const { TabPane } = Tabs;

export default (props) => {
  const { t } = props;

  const tabs = [
    {
      name: t('Faculty.Program.Tab1'),
      Comp: 'Summary',
    },
    {
      name: t('Faculty.Program.Tab2'),
      Comp: 'Lecturers',
    },
    {
      name: t('Faculty.Program.Tab3'),
      Comp: 'Students',
    },
    {
      name: t('Faculty.Program.Tab4'),
      Comp: 'Timetable',
    },
  ];

  return (
    <Card bordered={false} className="uni-card h-auto">
      <Row gutter={[30, 20]}>
        <Col span={24}>
          <Tabs defaultActiveKey="1" type="card" className="custom-tabs -space30">
            {tabs.map((item, index) => {
              const Cardi = TabCards[item.Comp];
              return (
                <TabPane tab={item.name} key={index + 1} forceRender={true}>
                  <Cardi {...props} />
                </TabPane>
              );
            })}
          </Tabs>
        </Col>
      </Row>
    </Card>
  );
};
