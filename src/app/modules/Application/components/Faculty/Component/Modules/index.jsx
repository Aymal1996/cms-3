import React, { Fragment } from 'react';
import { Row, Typography, Col, Card, Empty, Avatar, Divider } from 'antd';
import { baseUrl } from '../../../../../../../configs/constants';

const { Title } = Typography;

// const moduleData = [
//   {
//     heading: 'seo service',
//     data: [
//       {
//         images: 'files/14.jpg'
//       },
//       {
//         images: 'files/14.jpg'
//       },
//       {
//         images: 'files/14.jpg'
//       },
//       {
//         images: 'files/14.jpg'
//       }
//     ]
//   }
// ]

export default (props) => {
  const { moduleData } = props;
  return (
    <Card bordered={false} className="uni-card main-card-hover" style={{ height: '450px' }}>
      <Title level={4} className="c-default mb-1">
        Modules
      </Title>
      <Row gutter={[20, 20]} className="modules-height">
        {moduleData &&
          moduleData?.length > 0 &&
          moduleData.map((resp, i) => (
            <Col span={24} key={i}>
              <Card bordered={false} className="inner-card" style={{ background: '#202020' }}>
                <Title level={5} className="smallFont14">
                  {resp?.heading}
                </Title>
                <Avatar.Group maxCount={10}>
                  {resp?.data &&
                    resp?.data.map((e, ind) => (
                      <Fragment key={ind}>
                        <Avatar size={32} src={`${baseUrl}/${e?.images}`} />
                      </Fragment>
                    ))}
                </Avatar.Group>
              </Card>
            </Col>
          ))}
        <Col span={24}>{moduleData && moduleData?.length == 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}</Col>
      </Row>
    </Card>
  );
};
