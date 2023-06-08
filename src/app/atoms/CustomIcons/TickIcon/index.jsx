import React from "react";
import Icon from '@ant-design/icons';

const TickSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor">
      <path d="M18.4,6.8L9,16.3c-0.8,0.8-2.1,0.9-2.9,0.1c0,0,0,0,0,0L6,16.3l-4.4-4.5
	c-0.8-0.9-0.8-2.2,0-3.1c0.8-0.8,2.2-0.9,3,0c0,0,0,0,0,0l2.8,2.9l7.8-8c0.8-0.8,2.2-0.9,3,0c0,0,0,0,0,0
	C19.2,4.5,19.2,5.9,18.4,6.8z"/>
    </svg>
  );

  const TickIcon = props => <Icon component={TickSVG} {...props} />;
  export default TickIcon;

  
