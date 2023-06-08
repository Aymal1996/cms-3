import React, { Fragment } from 'react';
import { Row, Col, Descriptions, Button, Space, Form, Typography, message } from 'antd';
import { DownloadIcon } from 'Atoms/CustomIcons';
import { useForm } from 'react-hook-form';
import AssessmentForm from '../AssessmentForm';
import { baseUrl } from '../../../../../../configs/constants';
import { updateAssessment } from '../../ducks/services';

const { Title, Text } = Typography;

export default (props) => {

    const { data, updateApi } = props;
    const { handleSubmit, control } = useForm();

    const onSubmit = (val) => {
        console.log('checking', val);
        const body = {
            
        }
        updateAssessment(body).then(res => {
            message.success('Assessment Updated');
            updateApi();
        }).catch(e => {
            const { response } = e;
            message.error(e)
        })
    }

    return (
        <Space direction='vertical' size={50} className='w-100'>
            <Row gutter={[20,30]}>
                <Col span={24}>
                    <Title level={4} className='mb-0 c-default'>Thesis Details</Title>
                </Col>
                <Col span={24}>
                    <Descriptions className="reqData detailsData" bordered colon={false} column={1}>
                        <Descriptions.Item label="Thesis Title">{data?.thesis_title}</Descriptions.Item>
                        
                        <Descriptions.Item label="Supervisor">{data?.supervisor_name}</Descriptions.Item>
                        <Descriptions.Item label="Co-Supervisor">{data?.co_supervisor_name}</Descriptions.Item>
                        <Descriptions.Item label="Thesis Abstract">{data?.thesis_abstract}</Descriptions.Item>
                        {data.documents && data?.documents.map(x => (
                            <>
                            {x['document_name'].includes('Other Publisher') ?
                            <Descriptions.Item label={x?.document_name}><Button type="link" htmlType="button" className="p-0 downloadLink" onClick={() => x?.attachment ? window.open(`${baseUrl}${x.attachment}`, '_blank') : null}>{x?.attachment}</Button></Descriptions.Item>
                            :
                            <Descriptions.Item label={x?.document_name}><Button type="link" htmlType="button" className="p-0 downloadLink" onClick={() => x?.attachment ? window.open(`${baseUrl}${x.attachment}`, '_blank') : null}>Download file <DownloadIcon /></Button></Descriptions.Item>}
                            </>
                        ))}
                    </Descriptions>
                </Col>
            </Row>
            <Row gutter={[20,30]}>
                <Col span={24}>
                    <Title level={4} className='mb-0 c-default'>Student Assessment</Title>
                </Col>
                <Col span={24}>
                    <Form onFinish={handleSubmit(onSubmit)} className='w-100'>
                        <Space direction='vertical' size={20} className='w-100'>
                            {data?.phd_student_assessments && data?.phd_student_assessments.length > 0 && data?.phd_student_assessments.map((x,i) => (
                                <Fragment key={i}>
                                    <AssessmentForm control={control} data={x} />
                                </Fragment>
                            ))}
                            <div className='text-right'>
                                <Button className='green-btn' size='large' type='primary' htmlType='submit'>Save Changes</Button>
                            </div>
                        </Space>
                    </Form>
                </Col>
            </Row>
        </Space>
    )
}