import React from 'react';
import { Row, Col, Space, Typography, Card, Button } from 'antd';
import { TickIcon } from 'Atoms/CustomIcons';
import moment from 'moment';

const { Title, Text } = Typography;

export default (props) => {

    const { onAction, date } = props;

    const stepping1 = [
        {
            title: 'Registration Fee',
            status: 'Completed',
        },
        // {
        //     title: 'Visa Sticker',
        //     status: 'Verified',
        // },
        {
            title: 'Offer Letter Release',
            status: 'pending',
            depart: 'Registry Department',
            pending: date ? moment(date).fromNow() : '',
        },
    ]

    return (
        <>            
            {/* <Col span={24}>
                <Space size={3} direction='vertical' className='w-100'>
                    <Text className='c-gray'>Stage 3</Text>
                    <Title level={4} className='c-default mb-0'>Pending Registration & Visa</Title>
                </Space>
            </Col> */}
            {stepping1.map((item,index) => (
                <>
                {item.status == 'pending' ? (
                <Col span={12}>
                    <Card bordered={false} className='red-card h-100'>
                        <Space direction='vertical' size={50} className='w-100'>
                            <Space direction='vertical' className='w-100' size={3}>
                                <Title level={5} className='mb-0'>{item.title}</Title>
                                <Text className='op-6'>{item.depart}</Text>
                            </Space>
                            <Title level={3} className='mb-0'>{item.pending}</Title>
                        </Space>
                    </Card>
                </Col>)
                :
                <Col span={12}>
                    <Card bordered={false} className='uni-card-small b-black'>
                        <Space direction='vertical' size={30} className='w-100'>
                            <Title level={5} className='mb-0'>{item.title}</Title>
                            <Space direction='vertical' className='w-100' size={20} align='center'>
                                <span className='sole-icon b-success'><TickIcon /></span>
                                <Title level={4} className='mb-0'>{item.status}</Title>
                            </Space>
                        </Space>
                    </Card>
                </Col>
                }
            </>))}
            <Col span={24}>
                <Space size={20} direction='vertical' className='w-100'>
                    <Card bordered={false} className='uni-card-small b-black'>
                        <Row gutter={[20,20]}>
                            <Col flex='auto'>
                                <Title level={5} className='mb-0 lineHeight40'>Offer Letter Release</Title>
                            </Col>
                            <Col>
                                <Button type='primary' size='large' htmlType='button' className='green-btn' onClick={onAction}>Release Offer Letter</Button>
                            </Col>
                        </Row>
                    </Card>
                    <Text className='c-gray'>Please verify the programme offered before releasing the offer letter</Text>
                </Space>
            </Col>

            {/* <Col span={24}>
                <Space size={3} direction='vertical' className='w-100'>
                    <Text className='c-gray'>Step 2</Text>
                    <Title level={4} className='c-gray mb-0'>Pending Visa Processing Fee</Title>
                </Space>
            </Col> */}
        </>
    )
}