import React from 'react';
import { Space } from 'antd';
const StatsBar = (props) => {
  const { steps, assign, total } = props;
  const styledSteps = [];
  const current = Math.round(steps * (assign / total));
  let barColor = '';
  console.log({ current, steps });
  current > steps ? (barColor = '#C3423F') : (barColor = '#02A574');
  for (let i = 0; i < steps; i++) {
    styledSteps.push(
      <div
        key={i}
        style={{
          backgroundColor: i <= current - 1 ? barColor : '#202020',
          width: '75px',
          height: '10px',
          borderRadius: i == 0 ? '4px 0px 0px 4px' : i == steps - 1 ? '0px 4px 4px 0px' : '',
        }}
      />,
    );
  }
  return (
    <div>
      <Space direction="horizontal" size={4}>
        {styledSteps}
      </Space>
    </div>
  );
};

export default StatsBar;
