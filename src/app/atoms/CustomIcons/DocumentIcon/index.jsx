import React from "react";
import Icon from '@ant-design/icons';

const DocumentSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M12.7,5.5V1.1c0.4,0.1,0.8,0.3,1.1,0.6l2.5,2.6c0.3,0.3,0.5,0.8,0.6,1.2H12.7L12.7,5.5z
	 M10.5,5.5c0,1.2,0.9,2.2,2.1,2.2c0,0,0,0,0,0H17v9c0,1.2-0.9,2.2-2.1,2.2c0,0,0,0,0,0H5.2c-0.6,0-1.1-0.2-1.5-0.7
	c-0.4-0.4-0.6-1-0.6-1.6V3.3C3,2,3.9,1,5.2,1h5.4L10.5,5.5L10.5,5.5z"/>
    </svg>
  );

  const DocumentIcon = props => <Icon component={DocumentSVG} {...props} />;
  export default DocumentIcon;

  
