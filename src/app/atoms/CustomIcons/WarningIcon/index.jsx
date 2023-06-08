import React from "react";
import Icon from '@ant-design/icons';

const WarningSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 50 50" fill="currentColor">
        <path d="M127.951,216.981l-16.924-34.054a8.114,8.114,0,0,0-14.474,0L79.63,216.981a7.99,7.99,0,0,0,7.224,11.5h33.873A7.973,7.973,0,0,0,127.951,216.981Zm-24.148,3.85a3.125,3.125,0,1,1,3.125-3.125A3.126,3.126,0,0,1,103.8,220.832Zm3.125-12.727a3.125,3.125,0,1,1-6.25,0V194.253a3.125,3.125,0,1,1,6.25,0Z" transform="translate(-78.797 -178.483)"/>
    </svg>
  )

  const WarningIcon = props => <Icon component={WarningSVG} {...props} />;
  export default WarningIcon;

  
