

import React from "react";
import Icon from '@ant-design/icons';

const HomeSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M18.5,8.8L18.5,8.8l-7.3-7.3c-0.6-0.6-1.7-0.6-2.3,0c0,0,0,0,0,0L1.5,8.8l0,0
	c-0.6,0.6-0.6,1.7,0,2.3c0.3,0.3,0.7,0.5,1.1,0.5h0.1h0.3v5.4c0,1.1,0.9,1.9,1.9,1.9c0,0,0,0,0,0h2.9c0.3,0,0.5-0.2,0.5-0.5l0,0
	v-4.2c0-0.5,0.4-0.9,0.9-0.9h1.7c0.5,0,0.9,0.4,0.9,0.9v4.2c0,0.3,0.2,0.5,0.5,0.5h0h2.9c1.1,0,1.9-0.9,1.9-1.9v-5.4h0.3
	c0.9,0,1.7-0.7,1.7-1.7C19,9.6,18.8,9.1,18.5,8.8z"/>
    </svg>
  )

  const HomeIcon = props => <Icon component={HomeSvg} {...props} />;

  export default HomeIcon;