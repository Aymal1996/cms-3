import React from 'react';
import { Card, Typography, Space } from "antd";
import {ProgressBar} from '../../atoms/ApplicationProgress';
import { useHistory } from "react-router";
import FigureChips from '../../atoms/FigureChips';

const { Title } = Typography;

export default (props) => {
  const history = useHistory();
  const { incompApplication, label, status, link } = props;
  const totalNumber = incompApplication[0]?.total || 0;
  const obj = {
      incomplete: incompApplication[1]?.incomplete || 0,
      eligibility: incompApplication[2]?.eligibility || 0,
      registration: incompApplication[3]?.registration || 0,
      accommodations: incompApplication[4]?.accommodations || 0,
      enrolment: incompApplication[5]?.enrolment || 0,
  }

  const countStatus = {
    value: totalNumber,
    title: label,
    status: status
  }

  return (
    <Card bordered={false} hoverable={true} style={{cursor: link ?'pointer' : 'default'}} className='uni-card b-error' onClick={() => history.push(link)}>
      <Space size={30} direction='vertical' className='w-100'>
        <FigureChips data={countStatus} link={link} />
        <Space size={20} direction='vertical' className='w-100'>
            {incompApplication.length > 0 && <ProgressBar heading="Incomplete Documents" totalNumber={totalNumber} totalPercent={obj?.incomplete} />}
            {incompApplication.length > 0 && <ProgressBar heading="Eligibility Assessments" totalNumber={totalNumber} totalPercent={obj?.eligibility} />}
            {incompApplication.length > 0 && <ProgressBar heading="Pending Registration &amp; Visa" totalNumber={totalNumber} totalPercent={obj?.registration} />}
            {incompApplication.length > 0 && <ProgressBar heading="Pending Accommodations" totalNumber={totalNumber} totalPercent={obj?.accommodations} />}
            {incompApplication.length > 0 && <ProgressBar heading="Pending Enrolment" totalNumber={totalNumber} totalPercent={obj?.enrolment} />}
        </Space>
      </Space>
    </Card>
  )
}