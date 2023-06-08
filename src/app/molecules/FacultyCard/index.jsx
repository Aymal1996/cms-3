import React, { useState, useEffect } from 'react';
import { Typography, Space, Tag, Divider, Card } from 'antd';
import { useHistory } from 'react-router-dom';
import FacultyProgramStatusCard from '../../atoms/FacultyProgramStatusCard';
import { checkExpiry } from '../../modules/AQA/utils/dateCalc';

const { Title, Text } = Typography;

export default (props) => {
  const history = useHistory();
  const { data } = props;
  const [license, setLicense] = useState(null);
  const [accredetation, setAccredetation] = useState(null);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (data?.kpt_expiry_date) {
      let res = checkExpiry(data?.kpt_expiry_date);
      if (res != undefined) {
        let lic = {
          type: res == 0 ? 'expired' : res,
          title: 'License',
        };
        setLicense(lic);
      }
    }
    if (data?.mqa_expiry_date) {
      let res1 = checkExpiry(data?.mqa_expiry_date);
      if (res1 != undefined) {
        let acc = {
          type: res1 == 0 ? 'expired' : res1,
          title: 'Accreditation',
        };
        setAccredetation(acc);
      }
    }
    if (props.status) {
      let sum = {
        type: 'Inactive Programme',
        title: 'Summary',
      };
      setSummary(sum);
    }
  }, [data]);

  return (
    <Card
      bordered={false}
      className="uni-card"
      hoverable={true}
      onClick={() => history.push(`programme/edit/${data?.name.replace('PL-', '')}`)}
    >
      <Space size={15} direction="vertical" className="w-100">
        <Tag className="tag-code">{data?.faculty_code}</Tag>
        <Text className="c-gray">{data?.faculty_name}</Text>
        <Divider className="m-0" />
        <Space size={30} direction="vertical" className="w-100">
          <Title level={4} className="mb-0">
            {data?.program_name}
          </Title>
          {license && <FacultyProgramStatusCard data={license} />}
          {accredetation && <FacultyProgramStatusCard data={accredetation} />}
          {props.status && <FacultyProgramStatusCard data={summary} />}
        </Space>
      </Space>
    </Card>
  );
};
