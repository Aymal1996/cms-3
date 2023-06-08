import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Space, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import StepsIcons from '../StepsIcons';
import { prevDoc } from '../../modules/StudentFile/ducks/services';
import { baseUrl } from '../../../configs/constants';

const { Text, Title } = Typography;

export default (props) => {
  const { data, link, stage, type, comp, fullLink } = props;
  const [pimage, setPImage] = useState('');

  useEffect(async () => {
    if (data?.user_image && props?.s3 == true) {
      let yz = '';
      await prevDoc(data.name, 'Passport Photo with White Background', data?.user_image, true)
        .then((res) => {
          yz = res.data.message;
        })
        .catch((err) => {
          console.log('something went worng');
        });
        setPImage(yz);
    }
  }, [data]);

  return (
    <Card className="uni-card main-card-hover link-cursor h-auto" bordered={false}>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <Link to={{ pathname: `${link}`, state: { code: data.name } }}>
            <Row gutter={[20, 30]}>
              <Col span={24}>
                <Space size={20} className="w-100">
                  <Avatar size={70} src={pimage ? props.s3 == true ? pimage : `${baseUrl}${data?.user_image}` : ''} />
                  <Space direction="vertical" className="w-100" size={5}>
                    <Title level={4} className="mb-0 font-500">
                      {data?.applicant_name}
                    </Title>
                    <Text className="c-gray">{data?.name}</Text>
                  </Space>
                </Space>
              </Col>
              <Col span={24}>
                <StepsIcons stage={stage} type={type} noTitle={true} />
              </Col>
              {comp && fullLink && <Col span={24}>{comp}</Col>}
            </Row>
          </Link>
        </Col>
        {comp && !fullLink && <Col span={24}>{comp}</Col>}
      </Row>
    </Card>
  );
};
