import React from 'react';
import { Row, Col, Space, Typography, Card, Button } from 'antd';
import { TickIcon } from 'Atoms/CustomIcons';
import { CloseCircleFilled } from "@ant-design/icons";
import moment from 'moment';

const { Title, Text } = Typography;

export default (props) => {

    const { data, date, onAction } = props;

    const stepping = [
        {
            title: 'Medical Checkup',
            status: data?.medical_checkup == 1 ? 'done' : 'pending',
            pending: date ? moment(date).fromNow() : '',
        },
        {
            title: 'Visa Sticker',
            status: data?.visa_collection == 1 ? 'done' : 'pending',
            pending: date ? moment(date).fromNow() : '',
        },
        {
            title: 'Tuition Fee',
            status: data?.tution_fee == 1 ? 'done' : 'pending',
            pending: date ? moment(date).fromNow() : '',
        },
        {
            title: 'Student Registration',
            status: 'pending',
            reason: 'The applicant need to verify their course structure and semester in the Student Portal. Please contact Marketing Department to notify the applicant.',
            pending: date ? moment(date).fromNow() : '',
            button: 'Enrolled Student',
            action: onAction
        },
    ]

    return (
        <>  
            {stepping.map((item,index) => (
                <Col span={24} key={index}>
                    <Card bordered={false} className={`uni-card-small ${item.status == 'done' ? 'b-black' : 'b-error'}`}>
                        <Row gutter={[20,20]} align='middle'>
                            <Col flex='auto'>
                                <Space size={3} direction='vertical' className='w-100'>
                                    <Text className={`${item.status == 'done' ? 'c-gray' : 'c-white'}`}>Step {index + 1}</Text>
                                    <Title level={4} className={`mb-0 ${item.status == 'done' ? 'c-default' : 'c-white'}`}>{item.title}</Title>
                                </Space>
                            </Col>
                            <Col>
                                <span className={`sole-icon-small ${item.status == 'done' ? 'b-success' : 'fontSize20'}`}>{item.status == 'pending' ? <CloseCircleFilled className='c-white' /> : <TickIcon />}</span>
                            </Col>
                            {item.status == 'pending' && (
                                <>
                                    <Col span={24}>
                                        <Text className='op-6'>The applicant need to verify their course structure and semester in the Student Portal. Please contact Marketing Department to notify the applicant.</Text>
                                    </Col>
                                    <Col span={24}>
                                        <Title level={3} className='mb-0'>{`${item.pending}`}</Title>
                                    </Col>
                                    <Col span={24}>
                                        <Button type='button' className='btnoutline-white w-100' onClick={item.action} size='large'>{item.button}</Button>
                                    </Col>
                                </>
                            )}
                        </Row>
                    </Card>
                </Col>
            ))}
            {/* <Button type='primary' htmlType='button' className='green-btn' onClick={() => onAction()} size='large'>Finished</Button> */}
        </>
    )
}