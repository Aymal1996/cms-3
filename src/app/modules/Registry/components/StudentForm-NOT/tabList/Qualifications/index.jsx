import React, {Fragment, useEffect, useState } from 'react';
import {Row, Col, Typography, Card, Button, Form } from 'antd';
import { useSelector } from 'react-redux';
import FormGroup from '../../../../../../molecules/FormGroup';
import { useFieldArray, useForm } from 'react-hook-form';
import { getFileName } from '../../../../../../../features/utility';
import { baseUrl } from '../../../../../../../configs/constants';

const {Title} = Typography;
const _ = require("lodash");

const educationList = [
    { value: "A-Levels", label: "A-Levels" },
    { value: "Associate Degree", label: "Associate Degree" },
  ]

export default (props) => {

    const appTypeList = useSelector(state => state.global.appTypeData);
    const progList = useSelector(state => state.global.progData);
    const qualificationList = useSelector(state => state.global.engQualificationData);
    const countryList = useSelector(state => state.global.countryData);   
    const [appHide, setAppHide] = useState(false);

    const { title, data, t, mode } = props;
    const { control, errors, setValue, handleSubmit } = useForm();
    const {fields, append, remove} = useFieldArray({
        control,
        name:'education'
    });
    

    const formFields = [
        {
            name: 'application_type',
            label: 'Application Type',
            req: false,
            placeholder: 'Please select',
            type: 'select',
            hidden: appHide,
            twocol: false,
            reqmessage: 'Please Select',
            options: _.map(appTypeList, e => ({label: e.name, value: e.name}))
        },
        {
            name: 'first_pref',
            label: '1st Preference',
            req: false,
            placeholder: 'Please select',
            type: 'select',
            twocol: false,
            reqmessage: 'Please Select',
            options: _.map(progList, e => ({label: e.program_name, value: e.program_name}))
        },
        {
            name: 'second_pref',
            label: '2nd Preference',
            req: false,
            placeholder: 'Please select',
            type: 'select',
            twocol: false,
            reqmessage: 'Please Select',
            options: _.map(progList, e => ({label: e.program_name, value: e.program_name}))
        },
        {
            name: 'third_pref',
            label: '3rd Preference',
            req: false,
            placeholder: 'Please select',
            type: 'select',
            twocol: false,
            reqmessage: 'Please Select',
            options: _.map(progList, e => ({label: e.program_name, value: e.program_name}))
        },
        {
            subheader: 'Education Level',
            type: 'array',
            name: 'education',
            twocol: false,
            child : [
                {
                    subheader: 'Academic Qualification',
                    name: 'education_name',
                    label: 'Academic Qualification',
                    req: false,
                    type: 'select',
                    placeholder: 'Please select',
                    twocol: true,
                    reqmessage: 'Please select',
                    options: educationList
                },
                {
                    name: 'country',
                    label: 'Country of Education',
                    req: true,
                    placeholder: 'Please select',
                    type: 'select',
                    twocol: true,
                    reqmessage: 'Please select',
                    options: _.map(countryList, e => ({label: e.name, value: e.name}))
                },
                {
                    name: 'academic_transcript',
                    label: 'Academic Transcript',
                    req: false,
                    placeholder: 'Upload',
                    type: 'upload',
                    twocol: true,
                    reqmessage: 'Transcript required',
                },
                {
                    name: 'academic_certificate',
                    label: 'Academic Certificate',
                    req: false,
                    placeholder: 'Upload',
                    type: 'upload',
                    twocol: true,
                    reqmessage: 'Certificate required',
                },
            ]
        },
        {
            subheader: 'English Language Qualification',
            name: 'english_language_qualification',
            label: 'English Proficiency',
            req: true,
            placeholder: 'Please select',
            type: 'select',
            twocol: true,
            reqmessage: 'Please Select',
            options: _.map(qualificationList, e => ({label: e.name, value: e.name}))
        },
        {
            name: 'score',
            label: 'Score',
            req: false,
            placeholder: 'Please state',
            type: 'input',
            number: true,
            twocol: true,
            reqmessage: 'Please state',
        },
        {
            name: 'certificate',
            label: 'English Proficiency Certificate',
            req: false,
            placeholder: 'Upload',
            type: 'upload',
            twocol: false,
            reqmessage: 'Certificate required',
        },
        {
            subheader: 'Additional Documents',
            name: 'resume_cv',
            label: 'Resume/CV',
            req: false,
            placeholder: 'Upload',
            type: 'upload',
            twocol: true,
            reqmessage: 'Resume required',
        },
        {
            name: 'portfolio',
            label: 'Portfolio',
            req: false,
            placeholder: 'Upload',
            type: 'upload',
            twocol: true,
            reqmessage: 'Portfolio required',
        },
        
    ]

    const initQ = {
        education_name: '',
        country: '',
        academic_transcript: '',
        academic_certificate: ''
    } 

    
    useEffect(() => {
        if (data && data.qualifications && data.qualifications.length) {
            let qdata = data.qualifications[0];
            if(data?.application_type) {
                setValue('application_type', {label: data.application_type, value: data.application_type});
            } else {
                setAppHide(true);
            }
            setValue('english_language_qualification', {label: qdata.english_language_qualification, value: qdata.english_language_qualification});
            setValue('score', 23);
            setValue('education', qdata.academic)
            setValue('certificate', {fileList: [{uid: '-1', name: getFileName(qdata.certificate), status: 'done', url: `${baseUrl}${qdata.certificate}`}]});
           
        }
        if (data && data.program_details && data.program_details.length) {
            let qdata = data.program_details[0];
            setValue('first_pref', {label: qdata.first_pref_name, value: qdata.first_pref});
            setValue('second_pref', {label: qdata.second_pref_name, value: qdata.second_pref});
            setValue('third_pref', {label: qdata.third_pref_name, value: qdata.third_pref});
        }
    }, [data]);

    const onFinish = () => {}

    return (
        <Form 
        scrollToFirstError
        layout='vertical'
        onFinish={handleSubmit(onFinish)}>
            <Row gutter={[20, 30]} align='bottom'>
                {props.title && (<Col span={24}>
                    <Title level={4} className='mb-0'>{props.title}</Title>
                </Col>)}
                {formFields.map((item, idx) => (
                    <Fragment key={idx}>
                        {item?.subheader && 
                        <Col span={24}><Title level={5} className='mb-0 c-default'>{item.subheader}</Title></Col>}
                        {item.type == 'array' ?
                        <Col span={24}>
                            {fields.map((elem, index) => (
                                <Card className='border-card' key={elem.id}>
                                    <Row gutter={[20,20]}>
                                    {item.child.map((x, i) => (
                                    <Fragment key={i}>
                                        {x?.subheader && (
                                        <Col span={24}>
                                            <Row gutter={20}>
                                                <Col flex={'auto'}><Title level={5} className='mb-0 c-default'>{`${x.subheader} ${index + 1}`}</Title></Col>
                                                {mode == 'edit' && 
                                                    <Col flex='80px'><Button type='link' htmlType='button' className='p-0 h-auto c-gray-linkbtn' onClick={() => remove(index)}>Remove</Button></Col>
                                                }
                                            </Row>
                                        </Col> 
                                        )}
                                        <FormGroup elem={elem} static={true} index={index} parent={item} item={x} control={control} errors={errors} />  
                                    </Fragment>
                                    ))}
                                    </Row>
                                </Card>
                            ))}
                            {mode == 'edit' && 
                                <Button htmlType='button'type="dashed" size='large' className='w-100' onClick={() => append(initQ)}>+ Add other qualifications</Button>
                            }
                        </Col>
                        : <FormGroup static={true} item={item} control={control} errors={errors} />
                        }
                    </Fragment>
                ))}
            </Row>
        </Form>
    )
}