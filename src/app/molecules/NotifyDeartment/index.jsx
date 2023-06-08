import React, {useState, useEffect} from 'react';
import {Space, Button, Row, Col, Typography } from 'antd';
import { BellIcon } from '../../atoms/CustomIcons';

const { Title, Text } = Typography;

export default (props) => {

    const { onClose, onDelete, title } = props;

    return (
        <Space direction='vertical' size={50}>
            <Space direction='vertical' size={20}>
                <BellIcon className='c-success' />
                <Title level={3} className='mb-0'>{title}</Title>
                <Text>The Eligibility Team has been notified. You may <br /> notify only once per day. </Text>
            </Space>
            <Row gutter={10}>
                <Col span={24}><Button size='large' type="primary" className='w-100' onClick={onClose}>Back</Button></Col>
            </Row>
        </Space>
    )
}