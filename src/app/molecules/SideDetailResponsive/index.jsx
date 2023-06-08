import React, { Fragment } from 'react';
import { Row, Col, Typography, Layout, Card, Image } from 'antd';
import SideComponent from '../SideComponent';
import SideBottomButton from '../SideBottomButton';

const { Title, Text } = Typography;

export default (props) => {
  return (
    <Card bordered={false} className="uni-card">
      <Layout className="empty-card ">
        <Card bordered={false} className={`detail-cardtop ${props?.bottom?.length > 1 ? 'onebtn-height' : ''}`}>
          {props.cardType == 'empty' ? (
            <Row gutter={30} align='middle'>
              <Col flex='0 0 150px'>
                <Image src={props.data.image} preview={false} />
              </Col>
              <Col flex='1 0 400px'>
                <Text className="c-gray">{props.data.text}</Text>
              </Col>
              {props.bottom && (
                <Col span={24}>
                  <SideBottomButton bottom={props.bottom} type={props.type} />
                </Col>
              )}
            </Row>
          ) : (
            <Row gutter={[30, 20]} wrap={false}>
              <Col flex='0 0 208px'>
            <Card bordered={false} className='small-card8 b-black h-100 text-center'>
              <Row gutter={[20, 15]} justify="center">
                <>
                  {props.data.map((item, index) => (
                    item.highlight && (
                    <Fragment key={index}>
                      <SideComponent item={item} index={index} />
                    </Fragment>)
                  ))}
                </>
              </Row>
            </Card>
            </Col>
            <Col flex='1 1 420px'>
            <Card bordered={false} className='transparent-card landscape-card'>
              <Row gutter={[20, 15]} justify="center">
                <>
                  {props.data.map((item, index) => (
                    !item.highlight && (
                    <Fragment key={index}>
                      <SideComponent item={item} index={index} />
                    </Fragment>)
                  ))}
                  
                </>
              </Row>
              {props.bottom && (
                <SideBottomButton bottom={props.bottom} type={props.type} />
              )}
            </Card>
            </Col>
            </Row>
          )}
        </Card>
      </Layout>
    </Card>
  );
};
