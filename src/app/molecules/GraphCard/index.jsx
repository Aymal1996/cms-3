import React from 'react';
import { Column } from '@ant-design/charts';

export default (props) => {
  const { data, barColor } = props;

  const config = {
    data: data ? data : [],
    xField: 'type',
    yField: 'value',
    maxColumnWidth: 10,
    columnStyle: {
      fill: `${barColor}`,
      fillOpacity: 1,
      cursor: 'pointer',
      radius: [13, 13, 0, 0],
    },
    style: {
      fill: '#FFFFFF',
      opacity: 1,
    },
    label: {
      position: 'top',
      layout: 'overlap',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#fff',
        opacity: 1,
        backGround: '#ff0000',
        radius: [20, 20, 20, 20],
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
  };
  return <Column {...config} />;
};
