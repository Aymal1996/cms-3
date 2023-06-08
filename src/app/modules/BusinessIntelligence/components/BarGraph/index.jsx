import React from 'react';
import { Column } from '@ant-design/charts';

// $blue: #0077B6;
// $container-color: #171717;
// $element-color: #202020;
// $gray: #7C7C7C;
// $based-color: #BEBEBE;
// $green-color: #02A574;
// $errors: #C3423F;
// $gold-color: #E89005;
// $menu-gray: #2C2C2C;

export default (props) => {
  const data = [
    {
      type: '1-3',
      value: 0.16,
    },
    {
      type: '4-10',
      value: 0.125,
    },
    {
      type: '11-30',
      value: 0.24,
    },
    {
      type: '31-60',
      value: 0.19,
    },
    {
      type: '1-3',
      value: 0.22,
    },
    {
      type: '3-10',
      value: 0.05,
    },
    {
      type: '10-30',
      value: 0.01,
    },
    {
      type: '30+',
      value: 0.015,
    },
  ];
  const paletteSemanticRed = '#C3423F';
  const brandColor = '#02A574';
  const config = {
    data,
    xField: 'type',
    yField: 'value',
    seriesField: '',
    color: ({ type }) => {
      if (type === '10-30' || type === '30+') {
        return paletteSemanticRed;
      }

      return brandColor;
    },
    label: {
      content: (originData) => {
        const val = parseFloat(originData.value);

        if (val < 0.05) {
          return (val * 100).toFixed(1) + '%';
        }
      },
      offset: 10,
    },
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };
  return <Column {...config} />;
};