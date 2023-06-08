import React from "react";
import Icon from '@ant-design/icons';

const RequestSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
  <g id="_1" dataName="1" transform="translate(-110 -310)">
    <rect id="BG" width="40" height="40" rx="8" transform="translate(110 310)" fill="#e89005"/>
    <g id="Group_24470" dataName="Group 24470" transform="translate(20 9.999)">
      <path id="Path_28806" dataName="Path 28806" d="M522,403.993a10,10,0,1,1,10-10,10,10,0,0,1-10,10Zm5-11.25h-3.75V388.98a1.25,1.25,0,0,0-2.5,0v5.025a1.249,1.249,0,0,0,1.25,1.238h5a1.25,1.25,0,0,0,0-2.5Z" transform="translate(-412 -73.992)" fill="#fff" fillRule="evenodd"/>
    </g>
  </g>
</svg>
  )

  const RequestTime = props => <Icon component={RequestSVG} {...props} />;
  export default RequestTime;

  
