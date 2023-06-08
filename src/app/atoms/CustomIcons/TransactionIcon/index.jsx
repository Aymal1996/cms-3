import React from "react";
import Icon from '@ant-design/icons';

const TransSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <g transform="translate(-141.02 -178.481)">
            <path d="M144.54,184.73l6.26-6.25h-3.54l-6.24,6.24v2.51h20v-2.5Z" fill-rule="evenodd"/>
            <path d="M141.02,192.231H157.5l-6.26,6.25h3.54l6.24-6.24v-2.51h-20Z" fill-rule="evenodd"/>
        </g>
        
    </svg>
  );

  const TransactionIcon = props => <Icon component={TransSvg} {...props} />;

  export default TransactionIcon;