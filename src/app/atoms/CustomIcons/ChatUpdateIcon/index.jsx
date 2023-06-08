import React from "react";
import Icon from '@ant-design/icons';

const ChatUpdateSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
        <rect id="Rectangle_245" data-name="Rectangle 245" width="30" height="30" rx="15" fill="#0077b6"/>
        <path id="Path_28341" data-name="Path 28341" d="M30.161,184.987l-12.883-6.394c-.551-.274-.841-.022-.64.554l1.816,5.287a.6.6,0,0,1,.03.125h4.16a.923.923,0,1,1,0,1.846h-4.16a.6.6,0,0,1-.03.125l-1.816,5.287c-.2.576.09.827.64.554l12.883-6.394C30.712,185.7,30.712,185.26,30.161,184.987Z"  fill="#fff" transform="translate(-8.574 -170.482)" />
    </svg>
  )

  const ChatUpdateIcon = props => <Icon component={ChatUpdateSVG} {...props} />;

  export default ChatUpdateIcon;
