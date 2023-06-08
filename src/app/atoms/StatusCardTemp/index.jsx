import React from 'react';
import { Row, Col, Card, Typography, Space } from 'antd';
import { calculateDays } from '../../modules/AQA/utils/dateCalc';
import { TickIcon } from '../CustomIcons';

const { Text, Title } = Typography

export default (props) => {

    const { status, title, text, data, extraClass, title2, text2, status2, data2, page, mainTitle } = props;

    return (
        <Row gutter={[20, 30]} className='mt-PX'>
        {mainTitle && <Col span={24}><Title level={4} className='mb-0'>{mainTitle}</Title></Col>}
        <Col flex='1 0 280px'>
            <Card bordered={false} className={`uni-card-small ${extraClass ? extraClass : ''} ${status == 'pending' ? 'b-error' : 'b-black'}`}>
                <Row gutter={[20,30]}>
                    <Col span={24}>
                        <Row gutter={20}>
                            <Col flex='auto'><Title level={5} className={status == 'done' ? 'mb-2' : 'mb-0'}>{status == 'pending' ? 'Pending' : 'Completed'}{" "}{title}</Title></Col>
                            {status != 'pending' && <Col span={24}>
                                {page ? 
                                <Space size={20} direction='vertical' className='w-100 text-center mt-2'>
                                    <span className='sole-icon b-success'><TickIcon /></span>
                                    <Title level={4} className='mb-0'>{data} Completed</Title>
                                </Space>
                                :
                                <span className='sole-icon-small b-success'><TickIcon /></span>}
                            </Col>}
                            {status == 'pending' && <Col span={24}><Title level={5} className='m-0 op-6'>{text}</Title></Col>}
                        </Row>
                    </Col>
                    {status == 'pending' && 
                    <Col span={24}>
                        <Title level={3} className='mb-0'>{data} days</Title>
                    </Col>}
                </Row>
            </Card>
        </Col>
        {title2 && 
        <Col flex='1 0 280px'>
            <Card bordered={false} className={`uni-card-small ${extraClass ? extraClass : ''} ${status2 == 'pending' ? 'b-error' : 'b-black'}`}>
                <Row gutter={[20,30]}>
                    <Col span={24}>
                        <Row gutter={20}>
                            <Col flex='auto'>
                                <Title level={5} className='m-0'>{status2 == 'pending' ? 'Pending' : 'Completed'}{" "}{title2}</Title>
                            </Col>
                            {status2 != 'pending' && <Col span={24}>
                                {page ? 
                                <Space size={20} direction='vertical' className='w-100 text-center mt-2'>
                                    <span className='sole-icon b-success'><TickIcon /></span>
                                    <Title level={4} className='mb-0'>Completed</Title>
                                </Space>
                                :
                                <span className='sole-icon-small b-success'><TickIcon /></span>}
                            </Col>}
                        {status2 == 'pending' && <Col span={24}><Title level={5} className='m-0 op-6'>{text2}</Title></Col>}
                        </Row>
                    </Col>
                    {status2 == 'pending' && 
                    <Col span={24}>
                        <Title level={3} className='mb-0'>{data2} days</Title>
                    </Col>}
                </Row>
            </Card>
        </Col>}
        </Row>
    )
}