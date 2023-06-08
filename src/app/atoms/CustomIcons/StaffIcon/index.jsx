import React from "react";
import Icon from '@ant-design/icons';

const StaffSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M124.5,34.833a4.587,4.587,0,1,1-4.587-4.583A4.585,4.585,0,0,1,124.5,34.833Zm-4.585,7.084a10.157,10.157,0,0,0-10,8.333h20A10.163,10.163,0,0,0,119.91,41.917Z" transform="translate(-109.91 -30.25)" />
    </svg>
  );

  const StaffIcon = props => <Icon component={StaffSvg} {...props} />;

  export default StaffIcon;


