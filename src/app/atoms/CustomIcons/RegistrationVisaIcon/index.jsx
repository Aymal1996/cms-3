import React from "react";
import Icon from '@ant-design/icons';

const VisaSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M6.9,8.8h6.3l0.5-3.7c0.2-2-1.2-3.8-3.2-4c-2-0.2-3.8,1.2-4,3.2c0,0.3,0,0.6,0,0.9L6.9,8.8z"/>
        <path d="M13,11.1H7c-1.4,0-2.7,0.9-3.2,2.3h12.2C15.7,12,14.4,11.1,13,11.1z"/>
<path d="M2.3,15.4h15.4c0.7,0,1.3,0.6,1.3,1.3v1c0,0.7-0.6,1.3-1.3,1.3H2.3C1.6,19,1,18.4,1,17.7v-1
	C1,16,1.6,15.4,2.3,15.4z"/>
    </svg>
  )

  const RegistrationVisaIcon = props => <Icon component={VisaSVG} {...props} />;

  export default RegistrationVisaIcon;