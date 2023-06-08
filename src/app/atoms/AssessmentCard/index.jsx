import React from 'react';
import { Card, Space, Typography, Row, Col, Button } from 'antd';
import { CloseCircleFilled } from "@ant-design/icons";
import { ClockIcon, PendingIcon, TickIcon, UploadDoneIcon } from '../../atoms/CustomIcons';
import { calculateDays } from '../../../utils/dateCalc';

const { Text, Title } = Typography;

export default (props) => {

    const { title, title2, title3, status, data, action, btnTitle, action2, type} = props;

    return (
        <Space size={30} direction='vertical' className='w-100'>
            {title && <Title level={4} className='mb-0'>{title}</Title>}
            <Card bordered={false} className={`uni-card-small ${status == 'pending' ? 'b-pending' : status == 'Rejected' ? 'b-error' : 'b-black'}`}>
                <Row gutter={type == 'card' ? [20,10] : [20,30]} align='middle'>
                    <Col flex='auto'>
                        {type == 'card' ?
                        <Row gutter={[20,20]} justify='space-between'>
                            <Col><Title level={5} className='mb-0 text-center'>{title2}</Title></Col>
                            <Col>{status == 'Approved' ? <span className='sole-icon-small b-success'><TickIcon /></span> : status == 'Rejected' ? <CloseCircleFilled /> : <ClockIcon />}</Col>
                        </Row>
                        :
                        <Space size={10} direction='vertical' className='w-100'>
                            <Title level={4} className='mb-0 text-center'>{title2}</Title>
                            <Title level={5} className={`mb-0 text-center ${status == 'Approved' ? 'c-gray' : 'c-white op-8'}`}>{title3}</Title>
                        </Space>}
                    </Col>
                    {status == 'pending' && (
                        <>
                        {type == 'card' ?
                            <Col span={24}><Title level={3} className='mb-0'>{`${data?.days ? data?.days : 0} Days`}</Title></Col>
                        :
                        <>
                            <Col span={24} className='text-center'><PendingIcon /></Col>
                            <Col span={24}>
                                <Space direction='vertical' size={30} className='w-100'>
                                    <Title level={3} className='mb-0 text-center'>{`${Array.isArray(data) ? data[0]?.days : data?.days ? data?.days : 0} Days`}</Title>
                                    <Button htmlType='button' className='btnoutline-white w-100' onClick={action} size='large'>{btnTitle}</Button>
                                </Space>
                            </Col>
                        </>}
                        </>
                    )}
                    {status == 'Approved' && (
                    <>
                        {type == 'card' ? 
                        <Col span={24}><Title level={3} className='mb-0'>Eligible</Title></Col>
                        :
                        <>
                            <Col span={24}>
                                <Space size={10} direction='vertical' className='w-100 text-center'>
                                    <UploadDoneIcon />
                                    <Title level={3} className='mb-0'>Eligible</Title>
                                </Space>
                            </Col>
                        </>}
                    </>
                    )}
                    {status == 'Rejected' && (
                    <>
                        {type == 'card' ? 
                        <Col span={24}><Title level={3} className='mb-0'>Not Eligible</Title></Col>
                        :
                        <>
                            <Col span={24}>
                                <Space size={10} direction='vertical' className='w-100 text-center'>
                                    <CloseCircleFilled className='c-error' />
                                    <Title level={3} className='mb-0'>Not Eligible</Title>
                                </Space>
                            </Col>
                            <Col span={24}><Title level={5} className='mb-0'>The applicant's academic level is not qualified to enter</Title></Col>
                            <Col span={24}><Button htmlType='button' className='btnoutline-white w-100' onClick={action2} size='large'>Move to Leads</Button></Col>
                        </>}
                    </>
                    )}
                </Row>
            </Card>
        </Space>
    )
}