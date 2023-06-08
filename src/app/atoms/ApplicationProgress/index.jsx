import React from 'react';
import { Typography, Progress } from "antd";

const { Title } = Typography;

export const ProgressBar = (props) => {
    const {totalNumber, heading, totalPercent} = props;
    const percentFormula = parseFloat((totalPercent/totalNumber) * 100).toFixed(2);
    return (
        <>
            <Title level={5} className="mb-0">{heading}</Title>
            <Progress 
                percent={percentFormula} 
                format={percent => `${totalPercent}/${totalNumber}`} 
            />
        </>
    )
}