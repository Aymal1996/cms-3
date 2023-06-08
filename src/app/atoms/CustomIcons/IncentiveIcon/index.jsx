import React from 'react';
import Icon from '@ant-design/icons';

const IncentiveSvg = () => (
  <svg
    id="Incentive_Icon"
    data-name="Incentive Icon"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      id="Incentive_Icon-2"
      data-name="Incentive Icon"
      d="M26.574,83.978a10,10,0,1,0,10,10A10,10,0,0,0,26.574,83.978ZM21.787,90.79a1.614,1.614,0,0,1,1.6-1.6h0a1.606,1.606,0,1,1-1.6,1.612Zm9.575,6.375a1.615,1.615,0,0,1-1.6,1.6h0a1.606,1.606,0,1,1,1.6-1.612ZM31,91.328,23.924,98.4a1.255,1.255,0,0,1-1.775-1.775l7.075-7.075A1.255,1.255,0,0,1,31,91.328Z"
      transform="translate(-16.574 -83.978)"
      fillRule="evenodd"
    />
  </svg>
);

const IncentiveIcon = (props) => <Icon component={IncentiveSvg} {...props} />;

export default IncentiveIcon;
