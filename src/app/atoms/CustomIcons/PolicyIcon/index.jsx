import React from "react";
import Icon from '@ant-design/icons';

const PolicySvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M25.193,355.8v2.489a2.135,2.135,0,1,1-4.27,0V355.8Zm5.078-12.887a6.1,6.1,0,0,1-3.649,1.741l-1.426.07H21.634a2.134,2.134,0,0,0-2.007,1.428H19.5a2.857,2.857,0,1,0,0,5.713h.131a2.135,2.135,0,0,0,2.007,1.428H25.2l1.426.07a6.1,6.1,0,0,1,3.649,1.74l.626.628V342.284ZM36.6,355.937v-13.9a1.6,1.6,0,0,0-1.6-1.6h0a1.6,1.6,0,0,0-1.6,1.6v13.9a1.6,1.6,0,0,0,1.6,1.6h0A1.6,1.6,0,0,0,36.6,355.937Z" transform="translate(-16.598 -340.438)" />
    </svg>
  );

  const PolicyIcon = props => <Icon component={PolicySvg} {...props} />;

  export default PolicyIcon;