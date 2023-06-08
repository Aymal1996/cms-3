import React, {useState} from 'react';
import { Card } from 'antd';
import { useTranslate } from 'Translate';
import MyTasksTabs from './Component/MyTasksTabs';
import AddNewTimeSheet from './Component/AddNewTimeSheet';
import HeadingChip from '../../../../../../molecules/HeadingChip';
import { PlusOutlined } from '@ant-design/icons';

export default (props) => {
  const il8n = useTranslate();
  const { t } = il8n;
  const [newTimeSheet, setNewTimeSheet] = useState(false)
  const btnList = [
    {
      text: 'Add New Timesheet',
      icon: <PlusOutlined />,
      action: () => setNewTimeSheet(true),
    },
  ];

  return (
    <>
      {newTimeSheet ? (
        <>
          <AddNewTimeSheet newTimeSheet={newTimeSheet} setNewTimeSheet={setNewTimeSheet} />
        </>
        ) : (
          <>
            <HeadingChip btnList={btnList} />
            <MyTasksTabs t={t} />
          </>
        )
      }      
    </>
  );
};