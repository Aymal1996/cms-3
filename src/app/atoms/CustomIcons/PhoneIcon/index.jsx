

import React from "react";
import Icon from '@ant-design/icons';

const PhoneSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor">
      <path d="M19.5,14.7l-2.8-2.8c-0.7-0.7-1.9-0.8-2.6,0c-0.2,0.2-0.4,0.5-0.5,0.7
			c-0.3,0.9-1.3,1.4-2.2,1.2C9,12.9,7.1,11,6.2,8.6C5.9,7.7,6.5,6.7,7.4,6.4c1-0.3,1.5-1.4,1.2-2.3C8.5,3.8,8.3,3.5,8.1,3.3L5.3,0.5
			c-0.8-0.7-1.9-0.7-2.7,0L0.7,2.4c-1.9,2,0.2,7.3,4.9,12s10,6.9,12,4.9l1.9-1.9C20.2,16.6,20.2,15.4,19.5,14.7z"/>
    </svg>
  )

  const PhoneIcon = props => <Icon component={PhoneSVG} {...props} />;

  export default PhoneIcon;