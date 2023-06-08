import React from "react";
import Icon from '@ant-design/icons';

const UserSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
        <path id="User_Icon" data-name="User Icon" d="M120.12,33.458a3.211,3.211,0,1,1-3.211-3.208A3.21,3.21,0,0,1,120.12,33.458Zm-3.21,4.959a7.11,7.11,0,0,0-7,5.833h14A7.114,7.114,0,0,0,116.91,38.417Z" transform="translate(-109.91 -30.25)" fill="#bebebe"/>
    </svg>
  );

  const UserIcon = props => <Icon component={UserSvg} {...props} />;

  export default UserIcon;