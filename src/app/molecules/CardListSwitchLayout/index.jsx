import React, { useState } from 'react';
import { Tabs, Typography, Space, Badge } from 'antd';

const { TabPane } = Tabs;
const { Title } = Typography;

export default (props) => {
  const { tabs, active, setCurrentTab } = props;
  const [activeKey, setActiveKey] = useState(active);

  return (
    <Tabs
      activeKey={activeKey}
      type="card"
      className="tab-bold"
      onChange={(key) => {
        setActiveKey(key);
        setCurrentTab && setCurrentTab(key);
      }}
    >
      {tabs.map((item, index) => {
        const { Comp, title, count, key, iProps, visible } = item;
        if (visible == true) {
          return (
            <TabPane
              tab={
                <Space size={12}>
                  <Title className="tab-header mb-0" level={4}>
                    {title}
                  </Title>
                  {count ? <Badge count={count} overflowCount={999} className="tab-badge" /> : null}
                </Space>
              }
              key={key}
              forceRender={true}
            >
              {Comp && <Comp iProps={iProps} />}
            </TabPane>
          );
        }
      })}
    </Tabs>
  );
};
