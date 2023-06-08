import React from "react";
import Icon from '@ant-design/icons';

const ClassSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path id="Path_28811" d="M7,6.5H3.4V0h13.2v6.5H13v2H7V6.5z M0,11v4.7h7V14h10.5v6H20v-9H0z M0,20h7v-1.8H0V20z"/>
    </svg>
  )

  const ClassroomIcon = props => <Icon component={ClassSVG} {...props} />;

  export default ClassroomIcon;