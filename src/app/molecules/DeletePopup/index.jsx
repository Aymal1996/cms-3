import React, {useState, useEffect} from 'react';
import {Space, Button, Row, Col, Typography } from 'antd';
import { WarningIcon } from '../../atoms/CustomIcons';

const { Title, Text } = Typography;

export default (props) => {

    const { onClose, onDelete, title } = props;

    return (
        <Space direction='vertical' size={50}>
            <Space direction='vertical' size={20}>
                <WarningIcon style={{fontSize: 50}} className='c-error' />
                <Title level={3} className='mb-0'>Delete {title}</Title>
                <Text>Are you sure you want to delete the {title}?</Text>
            </Space>
            <Row gutter={10}>
                <Col span={12}><Button size='large' type="primary" className='gray-btn w-100' onClick={onClose}>Cancel</Button></Col>
                <Col span={12}><Button size='large' type="primary" danger className='w-100' onClick={onDelete}>Delete</Button></Col>
            </Row>
        </Space>
    )
}