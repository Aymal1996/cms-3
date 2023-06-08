import React from 'react';
import { Progress, Card, Typography } from "antd";
import FigureChips from '../../atoms/FigureChips';

const { Title } = Typography;

export default (props) => {

  const { totalStudent, label, link, status } = props;

  const totalNumber = totalStudent && totalStudent[0]?.total || 0;
  const studentEnrolled = totalStudent && totalStudent[1]?.enrolled || 0;
  const percentFormula = totalNumber && studentEnrolled && parseFloat((studentEnrolled/totalNumber) * 100).toFixed(2);

  console.log('percentFormula', studentEnrolled/totalNumber)

  const countStatus = {
    value: studentEnrolled,
    title: label,
    status: status
}

return (
    <Card bordered={false} className='uni-card main-card-hover'>
        <FigureChips data={countStatus} link={link} />
        <Progress 
          type="circle" 
          className="circleProgress" 
          width={200} 
          percent={percentFormula} 
          format={percent => <><div className="percent-text">{percent}<span>%</span></div> <div className="percent-numb">{studentEnrolled} / {totalNumber}</div></>} 
          />
    </Card>
)}