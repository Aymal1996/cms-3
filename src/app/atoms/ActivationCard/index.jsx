import React, {useState} from 'react';
import {Row, Col, Card, Typography, Space, Switch } from 'antd';
import { CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons'


const { Title, Text } = Typography;

export default ({ title, status, onChange }) => {

    return (
        <Card bordered={false} className='uni-card'>
            <Row gutter={20}>
                <Col flex='auto'>
                    <Space size={15} align='center'>
                        {status == 'Active' ? <CheckCircleFilled className="activeIcon c-success" /> : <CloseCircleFilled className='activeIcon c-error' />}
                        <Title className='mb-0' level={4}>{title}</Title>
                    </Space>
                </Col>
                <Col>
                    <Space size={15} align='center'>
                        <Text className='font-300 c-gray'>{status == 'Active' ? 'Deactivate' : 'Activate'}</Text>
                        <Switch checked={status == 'Active'} onChange={onChange} />
                    </Space>
                </Col>
            </Row>
        </Card>
    )
}