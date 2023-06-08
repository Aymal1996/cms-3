import React from 'react';
import Icon from '@ant-design/icons';

const PieSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52">
    <path
      id="Path_28659"
      data-name="Path 28659"
      d="M-351.531,240.037a25.924,25.924,0,0,1-5.736,16.3l-18.3-17.165v-25.09A26.038,26.038,0,0,1-351.531,240.037Zm-52,2a26.038,26.038,0,0,0,25.958,24.039,25.948,25.948,0,0,0,17.568-6.82l-18.36-17.219Zm23.955-27.961a26.037,26.037,0,0,0-23.955,23.955h23.955Z"
      transform="translate(403.531 -214.079)"
      fill="#7c7c7c"
    />
  </svg>
);

const PieIcon = (props) => <Icon component={PieSVG} {...props} />;
export default PieIcon;
