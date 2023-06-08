import React, { useState } from 'react';
import {Row, Col, Form, message } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useHistory } from 'react-router';
import { useTranslate } from 'Translate';
import { useForm } from 'react-hook-form';
import Information from './Information';
import { apiMethod, apiresource } from '../../../../../configs/constants';
import axios from '../../../../../services/axiosInterceptor';
import { uniquiFileName, getSingleUpload } from '../../../../../features/utility';

export default (props) => {

    const history = useHistory();
    const { control, errors, handleSubmit, reset } = useForm();
    const [ tags, setTags ] = useState([])
    const i18n = useTranslate();
    const { t } = i18n;

    const onFinish = async (value) => {
        console.log('value', value)
        props.setLoading(true);
        
        const firstPay = {
            type: value?.type?.value,
            applicant_name: value?.applicant_name,
            icpassport: value?.icpassport,
            contact_no: value?.contact_no,
            email: value?.email,
        }

        const url = `${apiresource}/Application`;
        try {
          const resp = await axios.post(url, firstPay);
            console.log('resp', resp)
            if(resp?.status == 200) {                
                const appName = resp['data']?.data.name
                let certificateIMG = '';
                let AcademicTranscript = '';
                let AcademicCertificate = '';
                let passportbg = '';
                let passportscanned = '';

                if (value.certificate) {
                    let modifiedName = uniquiFileName(value.certificate?.file?.originFileObj.name)
                    let res = await getSingleUpload(modifiedName, 'image',  value.certificate?.file?.originFileObj, 'Application', appName);
                    certificateIMG = res?.file_url;
                }

                if (value.academic_certificate) {
                    let modifiedName = uniquiFileName(value.academic_certificate?.file?.originFileObj.name)
                    let res = await getSingleUpload(modifiedName, 'image',  value.academic_certificate?.file?.originFileObj, 'Application', appName);
                    AcademicCertificate = res?.file_url;
                }

                if (value.academic_transcript) {
                    let modifiedName = uniquiFileName(value.academic_transcript?.file?.originFileObj.name)
                    let res = await getSingleUpload(modifiedName, 'image',  value.academic_transcript?.file?.originFileObj, 'Application', appName);
                    AcademicTranscript = res?.file_url;
                }

                if (value.attached_document_bg) {
                    let modifiedName = uniquiFileName(value.attached_document_bg?.file?.originFileObj.name)
                    let res = await getSingleUpload(modifiedName, 'image',  value.attached_document_bg?.file?.originFileObj, 'Application', appName);
                    passportbg = res?.file_url;
                }

                if (value.attached_document_scanned) {
                    let modifiedName = uniquiFileName(value.attached_document_scanned?.file?.originFileObj.name)
                    let res = await getSingleUpload(modifiedName, 'image',  value.attached_document_scanned?.file?.originFileObj, 'Application', appName);
                    passportscanned = res?.file_url;
                }

                const payLoad = {
                    status: 'Active',
                    workflow_state: 'Incomplete document',
                    type: value?.type?.value,
                    applicant_name: value?.applicant_name.trim(),
                    icpassport: value?.icpassport,
                    contact_no: value?.contact_no,
                    email: value?.email,
                    emergency_contact_name: value?.emergency_contact_name,
                    emergency_contact_email: value?.emergency_contact_email,
                    emergency_contact_number: value?.emergency_contact_number,
                    english_language_qualification: value?.english_language_qualification?.value,
                    score: value?.score,
                    certificate: certificateIMG,
                    race: value?.race?.value,
                    marital_satus: value?.marital_satus?.value,
                    gender: value?.gender?.value,
                    religion: '',
                    age_joined: '',
                    //date_of_birth: value?.date_of_birth ? value?.date_of_birth : '',
                    nationality: value?.nationality?.value,
                    place_of_birth: value?.place_of_birth,
                    //passport_expiry: value?.passport_expiry ? value?.passport_expiry : '',                    
                    remarks: '',
                    find_us: 'Social network',
                    first_pref: value?.first_pref?.value,
                    second_pref: value?.second_pref?.value,
                    third_pref: value?.third_pref?.value,
                    intake: '',
                    documents: [
                        {
                            attached_document: passportbg
                        },
                        {
                            attached_document: passportscanned
                        }
                    ],
                    education: [
                        {
                            education_name: value?.education_name?.value,
                            country: value?.country?.value,
                            academic_certificate: AcademicCertificate,
                            academic_transcript: AcademicTranscript
                        },
                    ],
                    address: [
                        {
                            current_address_1: value?.current_address_1,
                            current_post_code: value?.current_post_code,
                            current_city: value?.current_city,
                            current_country: value?.current_country?.value,
                            permanent_state: value?.permanent_state,
                        },
                        {
                            current_address_1: value?.permenent_address ? value?.current_address_1 : value?.current_address_2,
                            current_post_code: value?.permenent_address ? value?.current_post_code : value?.current_post_code2,
                            current_city: value?.permenent_address ? value?.current_city : value?.current_city2,
                            current_country: value?.permenent_address ? value?.current_country?.value : value?.current_country2?.value,
                            permanent_state: value?.permenent_address ? value?.permanent_state : value?.permanent_state2,
                        },
                    ],
                }

                try {
                    const url2 = `${apiresource}/Application/${appName}`;
                    await axios.put(url2, payLoad);
                    message.success('Application Successfully Created');
                    reset();
                    setTimeout(() => history.push('/marketing/applications'), 1000);
                } catch (e) {
                    props.setLoading(false);
                    const {response} = e;
                    message.error(response); 
                }
            }
        } catch (e) {
            props.setLoading(false);
            const {response} = e;
            message.error('Please Try Agian Later'); 
        }
    };

    return (
        <Form 
        layout="vertical" 
        scrollToFirstError={true}
        onFinish={handleSubmit(onFinish)}
        >
            <Row gutter={[20, 30]}>
                <Col span={24}>
                    <HeadingChip title='Add New Application'  />
                </Col>
                <Col span={24}>
                    <Information 
                        control={control} 
                        errors={errors}
                        tags={tags}
                        setTags={setTags}
                        mode='add'
                        t={t}
                    />
                </Col>
            </Row>
        </Form>
        
    )
    
}