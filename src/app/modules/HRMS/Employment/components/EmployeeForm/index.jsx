import React, { useState } from 'react';
import { Tabs } from 'antd';
import * as TabCards from './tabList';

const { TabPane } = Tabs;



export default (props) => {

  const [activeTab, setActiveTab] = useState(props?.dTab?.tab || "1");
  const [idState, setidState]= useState(false)
  const onTabChange = (e) => {
    setActiveTab(e);
  }

  const tabs = [
    {
      name: 'Personal',
      Comp: 'Personal',
      setidState: setidState, 
      idState: idState
    },
    {
      name: 'Contract',
      Comp: 'Contract',
    },
    {
      name: 'Passport',
      Comp: 'Passport',
      idState: idState
    },
    {
      name: 'Medical',
      Comp: 'Medical',
    },
  ];

  return (
      <Tabs activeKey={activeTab} onChange={onTabChange} type="card" className="custom-tabs">
        {tabs.map((item, index) => {
          const Cardi = TabCards[item.Comp];
          return (
            <>
            {idState == true ?
            <TabPane tab={item.name} key={index + 1} forceRender>
              <Cardi title={item.title} {...props} setidState={item.setidState ? item.setidState : null} idState={item.idState ? item.idState : null} />
            </TabPane>
            : item.name != 'Passport' ? 
            <TabPane tab={item.name} key={index + 1} forceRender>
              <Cardi title={item.title} {...props} setidState={item.setidState ? item.setidState : null} idState={item.idState ? item.idState : null} />
            </TabPane>
            : 
            null}
            </>
          )
        })}
      </Tabs>
  );
};