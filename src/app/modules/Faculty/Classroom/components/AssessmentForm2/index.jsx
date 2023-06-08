import React, { useEffect } from 'react';
import { Row, Col, Space, Typography, Card, Form, Button, message, Tag } from 'antd';
import { InputField } from 'Atoms/FormElement';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { updateAssessment } from '../../ducks/services';

const { Text, Title } = Typography;

export default (props) => {

    const { cdata, setVisible, updateApi } = props;
    const data = cdata?.students_assessment_result;
    const id = cdata?.assessment_name;

    const { handleSubmit, control, watch, setValue } = useForm();

    let watchForm = watch();

    useEffect(() => {
        if (cdata && cdata.overall_grade) {
            setValue('overall', Number(cdata['overall_grade'].replace('%', '')))
        }
    }, [cdata]);

    const onChange = (val) => {
        let count = 0;
        Object.entries(watchForm).map(([KEY,VAL]) => {
            if(KEY != 'overall') {
                count += Number(VAL);
            }
        })
        setValue('overall', count);
    }

    const onSubmit = (val) => {
        let body = {
            name: id,
            students_assessment_result : []
        };
        Object.entries(val).map(([KEY,VAL]) => {
            if (KEY != 'overall') {
                body.students_assessment_result.push({
                    name: KEY,
                    assigned_weight: VAL + '%',
                })
            }
        })
        
        console.log('checking', body);
        updateAssessment(body).then(res => {
            message.success('Assessment Successfully Updated');
            setTimeout(() => {updateApi(); setVisible(false)}, 1500);
        }).catch(e => {
            const { response } = e;
            console.log('error', e);
        })
    }

    return (
        <Form onFinish={handleSubmit(onSubmit)} className='w-100'>
            <Space direction='vertical' size={20} className='w-100'>
                <Row gutter={[20, 20]}>
                {data?.map((x,i) => (
                    <Col span={24} key={i}>
                        <Card bordered={false} className='field-card'>
                            <Row gutter={20} align='middle'>
                                <Col flex='1 0 auto'>
                                    <Space direction='vertical' size={0}>
                                        <Title level={5} className='mb-0 c-default'>{`${x?.type} (${x?.weight})`}</Title>
                                        <Text className='c-gray smallFont12'>Due: {moment(x?.intake).format('Do MMMM YYYY')}</Text>
                                    </Space>
                                </Col>
                                <Col flex='0 1 200px'>
                                    {x.type == 'Midterm Exam' || x.type == 'Final Exam' ?
                                    <Tag className='assessment-tag w-100'>Not Available</Tag>
                                    :
                                    <>
                                    {x.submission_status == 1
                                    ? <Button size='large' htmlType='button'>View Submission</Button>
                                    : <Tag className='assessment-tag b-error w-100'>Not Submitted</Tag>}
                                    </>}
                                </Col>
                                <Col flex='0 1 200px'>
                                    <InputField 
                                    fieldname={x?.name}
                                    label=''
                                    control={control}
                                    class='mb-0 gray-input'
                                    onChange={onChange}
                                    iProps={{ type: 'number',placeholder: '', size: 'large', min: 0, max: Number(x['weight'].replace('%', ''))}}
                                    initValue={x?.assigned_weight ? Number(x['assigned_weight'].replace('%', '')) : null}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}

                    <Col span={24}>
                        <Card bordered={false} className='field-card'>
                            <Row gutter={20} align='middle'>
                                <Col flex='1 0 auto'>
                                    <Space direction='vertical' size={0}>
                                        <Title level={4} className='mb-0 c-white'>Overall Grade</Title>
                                    </Space>
                                </Col>
                                <Col flex='0 1 200px'>
                                    <InputField 
                                    fieldname={'overall'}
                                    label=''
                                    control={control}
                                    class='mb-0 gray-input'
                                    iProps={{ type: 'number', size: 'large'}}
                                    initValue={''}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <div className='text-right'>
                    <Button className='green-btn' size='large' type='primary' htmlType='submit'>Save Changes</Button>
                </div>
            </Space>
        </Form>
    )
}