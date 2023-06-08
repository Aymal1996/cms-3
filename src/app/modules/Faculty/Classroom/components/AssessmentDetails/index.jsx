import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Button, Avatar, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import Thesis from '../Thesis';
import AssessmentForm2 from '../AssessmentForm2';
import { getModuleAssessmentDetails, getModuleAssessmentDetailsPHD, getModuleAssessmentPHD } from '../../ducks/actions';

const { Title, Text } = Typography;

export default (props) => {

    const dispatch = useDispatch();
    const { type, setVisible, id, updateApi } = props;
    const data = useSelector(state => state.classroom.assessmentDetails);
    const data2 = useSelector(state => state.classroom.assessmentDetailsPHD);

    useEffect(() => {
        if(type == 2) {
            dispatch(getModuleAssessmentDetails(id))
        } else {
            dispatch(getModuleAssessmentDetailsPHD(id))
        }
    }, []);

    return (
        
            <Row gutter={[20,30]}>
                <Col span={24}><Button type='link' className='c-gray-linkbtn p-0' onClick={() => setVisible(false)}>{'< Back'}</Button></Col>
                <Col span={24}>
                    <Title level={4} className='mb-0 c-default'>Student Assessment</Title>
                </Col>
                <Col span={24}>
                    <Card bordered={false} className='uni-card-small b-black'>
                        <Row gutter={[0, 30]}>
                            <Col span={7}>
                            <Card bordered={false} className='statistic-card statistic-card-first'>
                                <Space size={20}>
                                    <div className='position-relative'>
                                        <Avatar size={90} icon={<UserOutlined />} />
                                        <Avatar size={40} className='inAvatar' src='https://joeschmoe.io/api/v1/random' />
                                    </div>
                                    <div>
                                        <Title level={3} className='ag-fontSize24 mb-0 c-default'>{type == 2 ? data?.student_name : data2?.student_name}</Title>
                                        <Text className='c-gray'>{type == 2 ? data?.student_id : data2?.student_id}</Text>
                                    </div>
                                </Space>
                            </Card>
                            </Col>
                            <Col span={6}>
                            <Card bordered={false} className='statistic-card'>
                                <Text className='c-gray'>Faculty</Text>
                                <Title level={5} className='m-0 c-default'>{type == 2 ? data?.faculty_name : data2?.faculty_name}</Title>
                            </Card>
                            </Col>
                            <Col span={6}>
                            <Card bordered={false} className='statistic-card'>
                                <Text className='c-gray'>Programme</Text>
                                <Title level={5} className='m-0 c-default'>{type == 2 ? data?.program_name : data2.program_name} </Title>
                            </Card>
                            </Col>
                            <Col span={5}>
                            <Card bordered={false} className='statistic-card'>
                                <Text className='c-gray'>Semester</Text>
                                <Title level={5} className='m-0 c-default'>{type == 2 ? data?.semester : data2?.semester}</Title>
                            </Card>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={24}>
                    {type ==  1 ?
                        <Thesis data={data2} />
                    :
                        <AssessmentForm2 updateApi={updateApi} cdata={data} setVisible={setVisible} />
                    }
                </Col>
            </Row>
                    
    )
}