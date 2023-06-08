import React from "react";
import Icon from '@ant-design/icons';

const MailSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.6,13c-0.2,0.1-0.4,0.2-0.6,0.2c-0.2,0-0.4-0.1-0.6-0.2L0,7.3v7.6c0,1.6,1.3,3,3,3h14.1
	c1.6,0,3-1.3,3-3V7.3L10.6,13z"/>
<path d="M17,2.2H2.9c-1.4,0-2.6,1-2.9,2.3l9.9,6l9.9-6C19.6,3.1,18.4,2.2,17,2.2z"/>
    </svg>
  )

  const MailIcon = props => <Icon component={MailSVG} {...props} />;

  export default MailIcon;