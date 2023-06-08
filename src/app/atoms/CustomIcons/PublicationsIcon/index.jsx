import React from "react";
import Icon from '@ant-design/icons';

const PubSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path id="Path_28822" data-name="Path 28822" d="M269.62,312.544h11.686a.587.587,0,0,0,.479-.914,3.663,3.663,0,0,0-3-1.578v-.005h-.006c-6.855,0-1.467.005-3.325,0-3.8,0,1.143-.006-3.325-.006v.005a3.616,3.616,0,0,0-2.988,1.585A.587.587,0,0,0,269.62,312.544Zm5.843-5a2.605,2.605,0,1,0-2.605-2.605A2.608,2.608,0,0,0,275.463,307.544Zm10,14.789h-20v-6.015a1.274,1.274,0,0,1,1.274-1.274h17.452a1.274,1.274,0,0,1,1.274,1.274Z" transform="translate(-265.463 -302.333)" />
    </svg>
  )

  const PublicationsIcon = props => <Icon component={PubSVG} {...props} />;

  export default PublicationsIcon;