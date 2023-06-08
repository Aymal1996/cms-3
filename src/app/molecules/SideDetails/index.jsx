import React, { Fragment } from 'react';
import { Row, Typography, Space, Layout, Card, Image } from 'antd';
import SideComponent from '../SideComponent';
import SideBottomButton from '../SideBottomButton';

const { Text, Title } = Typography;

export default (props) => {
  return (
    <Card bordered={false} className={`uni-card side-panel ${props?.classes ? props?.classes : ''}`}>
      <Layout className="empty-card text-center">
        <Card bordered={false} className={`detail-cardtop ${props?.bottom?.length > 1 ? 'onebtn-height' : ''}`}>
          <Space size={20} direction='vertical' className='w-100'>
          {props.cardType == 'empty' ? (
            <Space size={50} direction="vertical" className="text-center pt-1">
              <Image src={props.data.image} preview={false} />
              <Text className="c-gray">{props.data.text}</Text>
            </Space>
            
          ) : (
            <Row gutter={[20, 20]} justify="center">
              <>
                {props.data.map((item, index) => (
                  <Fragment key={index}>
                    <SideComponent item={item} index={index} />
                  </Fragment>
                ))}
              </>
            </Row>
          )}
          {props.extendcomp && props.extendcomp.permit && (
            <Space size={20} direction="vertical" className="w-100">
              <Title level={4} className="mb-0">{props?.extendcomp?.title}</Title>
              {props?.extendcomp?.comp}
          </Space>
          )}
          </Space>
        </Card>
        {props.bottom && (
          <SideBottomButton bottom={props.bottom} type={props.type} />
        )}
        
      </Layout>
    </Card>
  );
};
