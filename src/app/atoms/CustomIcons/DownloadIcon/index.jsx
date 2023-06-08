import React from "react";
import Icon from '@ant-design/icons';

const DownloadSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M517.93-40.67a9.991,9.991,0,0,0-10,10,10,10,0,0,0,10,10,10,10,0,0,0,10-10A10,10,0,0,0,517.93-40.67Zm6.16,10.92v.01l-.02-.01-4.76,5.02a1.953,1.953,0,0,1-2.75.02l-.02-.02-4.76-5.02a1.334,1.334,0,0,1,0-1.87,1.292,1.292,0,0,1,1.82-.03l.03.03,2.99,3.24v-7.5a1.3,1.3,0,0,1,1.31-1.3,1.31,1.31,0,0,1,1.3,1.3v7.5l2.99-3.24a1.3,1.3,0,0,1,1.83-.03l.02.03A1.325,1.325,0,0,1,524.09-29.75Z" transform="translate(-507.93 40.67)" />
    </svg>
  )

  const DownloadIcon = props => <Icon component={DownloadSvg} {...props} />;

  export default DownloadIcon;