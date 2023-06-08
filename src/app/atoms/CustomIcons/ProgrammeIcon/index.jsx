import React from "react";
import Icon from '@ant-design/icons';

const ProgrammeSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20.001" height="20.001" viewBox="0 0 20.001 20.001" fill="currentColor">
      <g id="Programme_Icon" data-name="Programme Icon" transform="translate(0.001)">
        <path d="M52.685,303.837v11.79h-5v-11.79a1.507,1.507,0,0,1,1.5-1.5h2A1.5,1.5,0,0,1,52.685,303.837Zm-5,16.993a1.512,1.512,0,0,0,1.5,1.5h2a1.506,1.506,0,0,0,1.5-1.5v-2.7h-5Zm11-18.5h-2a1.507,1.507,0,0,0-1.5,1.5v11.79h5v-11.79A1.5,1.5,0,0,0,58.685,302.333Zm-3.5,18.5a1.512,1.512,0,0,0,1.5,1.5h2a1.506,1.506,0,0,0,1.5-1.5v-2.7h-5Zm11-18.5h-2a1.507,1.507,0,0,0-1.5,1.5v11.79h5v-11.79A1.5,1.5,0,0,0,66.185,302.333Zm-3.5,18.5a1.512,1.512,0,0,0,1.5,1.5h2a1.506,1.506,0,0,0,1.5-1.5v-2.7h-5Z" transform="translate(-47.686 -302.332)" />
      </g>
    </svg>
  )

  const ProgrammeIcon = props => <Icon component={ProgrammeSVG} {...props} />;

  export default ProgrammeIcon;