import React, {useState, useEffect} from 'react';
import { Row } from 'antd';
import { useTranslate } from 'Translate';
import HeadingChip from '../../../../../../molecules/HeadingChip';
import GridView from './Components/GridView';
import ListView from './Components/ListView';

export default (props) => {
  const il8n = useTranslate();
  const { t } = il8n;
  const [girdView, setGridView] = useState('2');
  const btnList = [
    {
      type: 'GridViewChanger',
      action: (key) => {
        console.log({ key });
        setGridView(key);
      },
    },
  ];

  return (
    <>
      <HeadingChip btnList={btnList} />
      <Row gutter={[20, 30]} align='bottom'>
        {girdView === '1' && <ListView />}
        {girdView === '2' && <GridView />}
      </Row>
    </>
  );
};