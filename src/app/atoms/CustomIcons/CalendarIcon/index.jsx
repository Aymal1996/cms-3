import React from "react";
import Icon from '@ant-design/icons';

const CalendarSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20.001" height="20" viewBox="0 0 20.001 20" fill="currentColor">
      <g id="Academic_Calendar_Icon" data-name="Academic Calendar Icon" transform="translate(0.001 0)">
        <path id="Path_28352" data-name="Path 28352" d="M155.707,228.262a1.171,1.171,0,0,0,1.17-1.17v-2.35a1.17,1.17,0,0,0-2.34,0v2.35A1.165,1.165,0,0,0,155.707,228.262Z" transform="translate(-141.018 -223.572)"/>
        <path id="Path_28353" data-name="Path 28353" d="M146.327,228.262a1.165,1.165,0,0,0,1.17-1.17v-2.35a1.17,1.17,0,0,0-2.34,0v2.35A1.165,1.165,0,0,0,146.327,228.262Z" transform="translate(-141.018 -223.572)"/>
        <path id="Path_28354" data-name="Path 28354" d="M141.017,241.422a2.147,2.147,0,0,0,2.15,2.15h15.7a2.147,2.147,0,0,0,2.15-2.15v-6.36h-20Z" transform="translate(-141.018 -223.572)"/>
        <path id="Path_28355" data-name="Path 28355" d="M159.377,225.982v1.11a3.67,3.67,0,1,1-7.34,0v-1.17H150v1.17a3.67,3.67,0,1,1-7.34,0v-1.11a2.147,2.147,0,0,0-1.64,2.09v4.49h20v-4.49A2.147,2.147,0,0,0,159.377,225.982Z" transform="translate(-141.018 -223.572)" />
      </g>
    </svg>
  )

  const CalendarIcon = props => <Icon component={CalendarSVG} {...props} />;
  
  export default CalendarIcon;