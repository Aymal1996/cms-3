import React from "react";
import Icon from '@ant-design/icons';

const CricleSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <circle cx="6" cy="6" r="6" />
    </svg>
  )

  const CircleIcon = props => <Icon component={CricleSvg} {...props} />;

  export default CircleIcon;