import React from "react";
import Icon from '@ant-design/icons';

const RequestSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20.001" viewBox="0 0 18 20.001" fill="currentColor">
      <path d="M175.571,266.537a8.3,8.3,0,0,1,5.118-2.259,9.682,9.682,0,0,1,3.228.331,7.467,7.467,0,0,1,3.158,1.75,8.083,8.083,0,0,1,2.315,6,.177.177,0,0,0,.021.084l1.557,3.092a1.5,1.5,0,0,1-.051,1.445,1.454,1.454,0,0,1-1.249.7h-.352v1.926a2.121,2.121,0,0,1-2.092,2.149h-1.918v1.719a.772.772,0,0,1-.761.781h-7.371a.772.772,0,0,1-.761-.781v-3.648a9.149,9.149,0,0,1-3.283-7.28A8.109,8.109,0,0,1,175.571,266.537Z" transform="translate(-173.131 -264.258)"/>
    </svg>
  )

  const RequestIcon = props => <Icon component={RequestSVG} {...props} />;
  export default RequestIcon;