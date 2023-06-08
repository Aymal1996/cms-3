import React, { useState } from "react";
import { Card, Typography, Space, Avatar, List, Steps, Button } from "antd";
import { UserOutlined, HomeFilled  } from '@ant-design/icons';
import {
  StudentsIcon,
  DocumentIcon,
  DollerIcon,
  TickIcon,
} from "../CustomIcons";
import { useHistory } from "react-router";

const { Title, Text } = Typography;


const ApplicationStagesCard = (props) => {
  const { Meta } = Card;
  const { Step } = Steps;
  const history = useHistory();

  const steps = [
    {
      title: 'First',
      icon:<DocumentIcon />,
      status: props?.stage == 1 && 'process'
    },
    {
      title: 'Second',
      icon:<TickIcon />,
      status: props?.stage == 2 && 'process'
    },
    {
      title: 'Third',
      icon:<DollerIcon />,
      status: props?.stage == 3 && 'process'
    },
    {
      title: 'Fifth',
      icon:<HomeFilled />,
      status: props?.stage == 4 && 'process'
    },
    {
      title: 'Last',
      icon:<StudentsIcon />,
      status: props?.stage == 5 && 'process'
    },
  ];

  return (
    <Card className="delayedApplication" bordered={false}>
        <Space 
          size={20} 
          style={{width:'100%', marginBottom: '30px'}}
          onClick={() => history.push({pathname: props?.link, state: { modified: props?.data?.modified }})}
        >
            <Avatar size={60} icon={<UserOutlined />} />
            <List>
                <Title level={5} className="text-offwhite mb-0 font-500">{props?.data?.applicant_name}</Title>
                <Text>{props?.data?.name}</Text>
            </List>
        </Space>

        <Steps className="customSteps mb-2" current={props.stage}>
            {steps.map(item => (
                <Step status={item.status} key={item.title} icon={item.icon} />
            ))}
        </Steps>
        {props.children}
    </Card>
  );
};

export default ApplicationStagesCard;
