import React from "react";
import Icon from '@ant-design/icons';

const StudentsSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M11.8,14.3l5.9-3.6v3.9c0,2.4-3.5,4.4-7.7,4.4s-7.7-1.9-7.7-4.4h0v-3.9l5.9,3.6
	C9.3,15,10.7,15,11.8,14.3L11.8,14.3z M18.5,5.9l-7.8-4.7c-0.4-0.2-0.9-0.2-1.3,0L1.5,5.9C1,6.2,0.9,6.8,1.1,7.3
	c0.1,0.2,0.2,0.3,0.4,0.4l0.7,0.4l7.1,4.2c0.4,0.2,0.9,0.2,1.3,0l7.1-4.3l0.7-0.4c0.5-0.3,0.7-0.9,0.4-1.4C18.8,6.1,18.6,6,18.5,5.9
	z"/>
    </svg>
  );

  const StudentsIcon = props => <Icon component={StudentsSvg} {...props} />;
  export default StudentsIcon;

  
