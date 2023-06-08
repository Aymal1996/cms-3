import React from 'react';
import { Tabs } from 'antd';
import * as TabCards from './tabList';

const { TabPane } = Tabs;

const tabs = [
  {
    name: 'Summary',
    Comp: 'Summary',
  },
  {
    name: 'Materials',
    Comp: 'Materials',
  },
  {
    name: 'Lecturers',
    Comp: 'Lecturers',
  },
  {
    name: 'Students',
    Comp: 'Students',
  },
  {
    name: 'Timetable',
    Comp: 'Timetable',
  },
];

export default (props) => {

  return (
      <Tabs defaultActiveKey='Summary' type="card" className="custom-tabs">
        {tabs.map((item) => {
          const Cardi = TabCards[item.Comp];
          return (
            <TabPane tab={item.name} key={item.name}>
              <Cardi title={item.title} {...props} />
            </TabPane>
          )
        })}
      </Tabs>
  );
};