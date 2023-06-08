import React, {useState} from 'react';
import { Tabs } from 'antd';
import { useTranslate } from 'Translate';
import Pending from './tabList/Pending';
import Issues from './tabList/Issues';
import History from './tabList/History';

const { TabPane } = Tabs;

export default (props) => {
  const {data} = props;
  console.log('data----', data);
  const il8n = useTranslate();
  const { t } = il8n;
  return (
    <Tabs defaultActiveKey="1" type="card" className="tab-bold">
      <TabPane tab="Pending" key="1">
        <Pending data={data?.pending}/>
      </TabPane>
      <TabPane tab="Issues" key="2">
        <Issues data={data?.issues} />
      </TabPane>
      <TabPane tab="History" key="3">
        <History data={data?.history} />
      </TabPane>
    </Tabs>
  );
};