import React from "react";
import Icon from '@ant-design/icons';

const ClockSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 21 20" fill="currentColor">
        <path d="M522,403.993a10,10,0,1,1,10-10,10,10,0,0,1-10,10Zm5-11.25h-3.75v-3.763a1.25,1.25,0,0,0-2.5,0v5.025a1.249,1.249,0,0,0,1.25,1.238h5a1.25,1.25,0,0,0,0-2.5Z" transform="translate(-511.5 -383.493)" stroke="rgba(0,0,0,0)" />
    </svg>
  );

  const ClockIcon = props => <Icon component={ClockSvg} {...props} />;

  export default ClockIcon;