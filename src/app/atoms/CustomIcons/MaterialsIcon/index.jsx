import React from "react";
import Icon from '@ant-design/icons';

const MatSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path id="Path_28812" d="M9.4,20h1.2c1.6,0,2.9-1.3,2.9-2.9h-7C6.5,18.7,7.8,20,9.4,20z"/>
        <path id="Path_28813" d="M10,0C6.1,0,3,3.2,3,7.1c0,2.1,0.9,4,2.5,5.3c0.6,0.5,1,1.3,1,2.2h7c0-0.8,0.3-1.6,0.9-2.1
            c3-2.5,3.4-6.9,0.9-10C14,1,12.1,0,10,0L10,0z M9.6,3.9C9.3,3.9,6.7,4.5,7,7.8c0,0.5-0.4,1-0.9,1.1H6c-0.5,0-1-0.4-1-0.9
            c-0.4-2.8,1.4-5.5,4.2-6c0.5-0.1,1.1,0.3,1.2,0.8C10.4,3.2,10.1,3.7,9.6,3.9L9.6,3.9z"/>
    </svg>
  )

  const MaterialsIcon = props => <Icon component={MatSVG} {...props} />;

  export default MaterialsIcon;