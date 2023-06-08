import React from "react";
import Icon from '@ant-design/icons';

const LogOutSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
        <g id="Off_Icon" data-name="Off Icon" transform="translate(-141.02 -340.436)">
            <path id="Path_28829" data-name="Path 28829" d="M148.02,340.436h0a.875.875,0,0,1,.875.875v5.253a.875.875,0,0,1-.875.875h0a.875.875,0,0,1-.875-.875v-5.253A.875.875,0,0,1,148.02,340.436Zm7,7a7.038,7.038,0,0,0-2.813-5.611.878.878,0,1,0-1.051,1.406,5.244,5.244,0,1,1-6.272,0,.878.878,0,0,0-1.051-1.406,7,7,0,1,0,11.187,5.61Z" fill="#bebebe" fill-rule="evenodd"/>
        </g>
    </svg>
  );

  const LogOutIcon = props => <Icon component={LogOutSvg} {...props} />;

  export default LogOutIcon;