import React from 'react';
import Icon from '@ant-design/icons';

const BarSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="currentColor">
    <path
      d="M-478.308,214.037h15.092v52h-15.092Zm18.453,52h15.093v-26h-15.093Zm18.454-36.384v36.384h15.093V229.653Z"
      transform="translate(478.308 -214.037)"
    />
  </svg>
);

const BarIcon = (props) => <Icon component={BarSVG} {...props} />;
export default BarIcon;
