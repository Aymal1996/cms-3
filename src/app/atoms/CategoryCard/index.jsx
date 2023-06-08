import React from 'react';
import { Card, Typography, Space } from 'antd';
import { useHistory } from 'react-router-dom';

const { Title, Text } = Typography;

export default ({data}) => {

    const history = useHistory();

    return (
        <Card bordered={false} className='small-card8 category-card' onClick={() => history.push(data.link)}>
            <Space size={30} direction='vertical' className='w-100'>
                <Space size={15} className='w-100'>
                    {data.icon}
                    <Title level={5} className='mb-0 c-default'>{data.title}</Title>
                </Space>
                <Text className={`${data.status ? data.status : ''}`}>{data.text}</Text>
            </Space>
        </Card>
    )
}