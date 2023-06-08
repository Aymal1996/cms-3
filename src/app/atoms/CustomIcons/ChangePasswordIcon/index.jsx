import React from "react";
import Icon from '@ant-design/icons';

const ChangePasswordSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
        <g id="Password_Icon" data-name="Password Icon" transform="translate(-109.995 -340.436)">
            <path id="Path_28828" data-name="Path 28828" d="M122.945,346.036H122.6v-1.8a3.8,3.8,0,0,0-3.8-3.8h-3.6a3.8,3.8,0,0,0-3.8,3.8v1.8h-.354a1.053,1.053,0,0,0-1.05,1.05v6.3a1.053,1.053,0,0,0,1.05,1.05h11.9a1.053,1.053,0,0,0,1.05-1.05v-6.3A1.053,1.053,0,0,0,122.945,346.036Zm-9.8-1.8a2.053,2.053,0,0,1,2.051-2.051h3.6a2.053,2.053,0,0,1,2.051,2.051v1.8h-7.7Z" transform="translate(0)" fill="#bebebe"/>
        </g>
    </svg>
  );

  const ChangePasswordIcon = props => <Icon component={ChangePasswordSvg} {...props} />;

  export default ChangePasswordIcon;