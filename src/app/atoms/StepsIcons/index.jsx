import React, { Fragment } from 'react';
import { Steps } from 'antd';
import { StudentsIcon, DocumentIcon, RegistrationVisaIcon, TickIcon, HomeIcon } from "../CustomIcons";

const appSteps = [
    {
      icon:<DocumentIcon />,
      title: 'Incomplete Documents'
    },
    {
      icon:<TickIcon />,
      title: 'Eligibility Assessments'
    },
    {
      icon:<RegistrationVisaIcon />,
      title: 'Pending Registration & Visa'
    },
    {
      icon:<HomeIcon />,
      title: 'Pending Accommodations'
    },
    {
      icon:<StudentsIcon />,
      title: 'Pending Enrolment'
    },
  ];

  const { Step } = Steps;

export default (props) => {

    const { stage, type, noTitle } = props;

    return (
        <Steps className={`custom-steps ${noTitle ? 'notitle-step' : ''}`} current={stage}>
            {appSteps.map((item, index) => (
                <Fragment key={index}>
                    <Step description={!noTitle && item.title} icon={item.icon} />
                </Fragment>
            ))}
        </Steps>
    )
}