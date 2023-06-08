import React from 'react';
import { Card, Row, Col, Typography, Space, Dropdown, Button, Avatar, Divider } from 'antd';
import { SettingFilled } from "@ant-design/icons";
import StepsIcons from '../../atoms/StepsIcons';

const { Text, Title} = Typography;

export default (props) => {
    return (
        <Card bordered={false} className='uni-card'>
            {props.menu &&
            <Dropdown overlay={props.menu} placement="bottomRight" trigger={['click']}>
                <Button className="cardButton p-0"><Avatar icon={<SettingFilled />} /></Button>
            </Dropdown>}
            <Row gutter={[20,30]}>
                <Col span={24}><Title level={4} className='mb-0 c-default'>Application Status</Title></Col>
                <Col span={24}>
                    <Space size={0} direction='vertical'>
                        <Title level={4} className='mb-0 c-gray'>Stage {props.appStage}</Title>
                        <Title level={3} className='mb-0 c-default'>{props.title}</Title>
                    </Space>
                </Col>
                <Col span={24}>
                    <StepsIcons stage={props.stage} type={props.type} noTitle={props.noTitle} />
                </Col>
                <Divider className='m-0'/>
                {props.component && props.component}
            </Row>
        </Card>
    )
}