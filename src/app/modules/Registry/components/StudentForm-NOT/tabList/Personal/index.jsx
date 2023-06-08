import React, {Fragment, useEffect} from 'react';
import {Row, Col, Typography, Form } from 'antd';
import { useSelector } from 'react-redux';
import FormGroup from '../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { getFileName } from '../../../../../../../features/utility';
import { baseUrl } from '../../../../../../../configs/constants';

const {Title} = Typography;
const _ = require("lodash");

export default (props) => {

    const countryList = useSelector(state => state.global.countryData);
    const raceList = useSelector(state => state.global.raceData);
    const genderList = useSelector(state => state.global.genderData);  
    const maritalList = useSelector(state => state.global.maritalData);

    const { control, errors, setValue, handleSubmit } = useForm();

    const { title, data, t } = props;

    const formFields = [
        {
            name: 'applicant_name',
            label: 'Name as per IC/Passport',
            req: false,
            placeholder: 'Please state',
            type: 'input',
            twocol: true,
            reqmessage: 'Name required',
        },
        {
            name: 'nationality',
            label: 'Nationality',
            req: false,
            placeholder: 'Please select',
            type: 'select',
            twocol: true,
            reqmessage: 'Please Select',
            options: _.map(countryList, e => ({label: e.name, value: e.name}))
        },
        {
            name: 'gender',
            label: 'Gender',
            req: false,
            placeholder: 'Please select',
            type: 'select',
            twocol: true,
            reqmessage: 'Please Select',
            options: _.map(genderList, e => ({label: e.name, value: e.name}))
        },
        {
            name: 'race',
            label: 'Race',
            req: false,
            placeholder: 'Please select',
            type: 'select',
            twocol: true,
            reqmessage: 'Please Select',
            options: _.map(raceList, e => ({label: e.name, value: e.name}))
        },
        {
            name: 'contact_no',
            label: 'Contact Number',
            req: false,
            placeholder: 'Please state',
            type: 'input',
            twocol: true,
            reqmessage: 'Contact Number required',
        },
        {
            name: 'marital_status',
            label: 'Marital Status',
            req: false,
            placeholder: 'Please select',
            type: 'select',
            twocol: true,
            reqmessage: 'Please Select',
            options: _.map(maritalList, e => ({label: e.name, value: e.name}))
        },
        {
            name: 'email',
            label: 'Email',
            req: false,
            placeholder: 'Please state',
            email: true,
            type: 'input',
            twocol: true,
            reqmessage: 'Contact Number required',
        },
        {
            name: 'icpassport',
            label: 'IC/Passport Number',
            req: false,
            placeholder: 'Please state',
            type: 'input',
            twocol: true,
            reqmessage: 'Passport Number required',
        },
        {
            name: 'passport_background',
            label: 'Passport Photo with White Background',
            req: false,
            placeholder: 'Upload',
            type: 'upload',
            twocol: true,
            reqmessage: 'Passport photo required',
        },
        {
            name: 'ic_scanned',
            label: 'IC/Passport (Scanned)',
            req: false,
            placeholder: 'Upload',
            type: 'upload',
            twocol: true,
            reqmessage: 'Passport scanned required',
        },
        {
            name: 'date_of_birth',
            label: 'Date of Birth',
            req: false,
            placeholder: '',
            type: 'date',
            twocol: true,
            reqmessage: 'Date required',
        },
        {
            name: 'passport_expiry',
            label: 'Passport Expiry Date',
            req: false,
            placeholder: '',
            type: 'date',
            twocol: true,
            reqmessage: 'Date required',
        },
        {
            name: 'place_of_birth',
            label: 'Place of Birth',
            req: false,
            placeholder: 'please state',
            type: 'input',
            twocol: true,
            reqmessage: 'Place required',
        },
        {
            name: 'issuing_country',
            label: 'Passport Issuing Country',
            req: false,
            placeholder: 'Please select',
            type: 'select',
            twocol: true,
            reqmessage: 'Please select',
            options: _.map(countryList, e => ({label: e.name, value: e.name}))
        },
        {
            subheader: 'Current Address',
            name: 'current_address_1',
            label: 'Address',
            req: false,
            placeholder: 'Please state',
            type: 'input',
            twocol: true,
            reqmessage: 'Address required',
        },
        {
            name: 'current_state',
            label: 'State',
            req: false,
            placeholder: 'Please state',
            type: 'input',
            twocol: true,
            reqmessage: 'State required',
        },
        {
            name: 'current_post_code',
            label: 'Postcode',
            req: false,
            number: true,
            placeholder: 'Please state',
            type: 'input',
            twocol: true,
            reqmessage: 'Postcode required',
        },
        {
            name: 'current_country',
            label: 'Country',
            req: false,
            placeholder: 'Please select',
            type: 'select',
            twocol: true,
            reqmessage: 'Please select',
            options: _.map(countryList, e => ({label: e.name, value: e.name}))
        },
        {
            name: 'current_city',
            label: 'City',
            req: false,
            placeholder: 'Please state',
            type: 'input',
            twocol: true,
            reqmessage: 'City required',
        },
        // {
        //     name: 'same_address',
        //     label: '',
        //     req: false,
        //     placeholder: '',
        //     type: 'checkbox',
        //     class: 'graycheckbox',
        //     twocol: true,
        //     reqmessage: '',
        //     options: [{label: 'Same as permanent address', value: 1}]
        // },
        {
            subheader: 'Permanent Address',
            name: 'permanent_address_1',
            label: 'Address',
            req: false,
            placeholder: 'Please state',
            type: 'input',
            twocol: true,
            reqmessage: 'Address required',
        },
        {
            name: 'permanent_state',
            label: 'State',
            req: false,
            placeholder: 'Please state',
            type: 'input',
            twocol: true,
            reqmessage: 'State required',
        },
        {
            name: 'permanent_post_code',
            label: 'Postcode',
            req: false,
            number: true,
            placeholder: 'Please state',
            type: 'input',
            twocol: true,
            reqmessage: 'Postcode required',
        },
        {
            name: 'permanent_country',
            label: 'Country',
            req: false,
            placeholder: 'Please select',
            type: 'select',
            twocol: true,
            reqmessage: 'Please select',
            options: _.map(countryList, e => ({label: e.name, value: e.name}))
        },
        {
            name: 'permanent_city',
            label: 'City',
            req: false,
            placeholder: 'Please state',
            type: 'input',
            twocol: false,
            reqmessage: 'City required',
        },
        {
            subheader: 'Emergency Contact',
            name: 'emergency_contact_name',
            label: 'Name',
            req: false,
            placeholder: 'Please state',
            type: 'input',
            twocol: true,
            reqmessage: 'Name required',
        },
        {
            name: 'emergency_contact_number',
            label: 'Contact Number',
            req: false,
            number: true,
            placeholder: 'Please state',
            type: 'input',
            twocol: true,
            reqmessage: 'Contact required',
        },
        {
            name: 'emergency_contact_email',
            label: 'Email',
            req: false,
            email: true,
            placeholder: 'Please state',
            type: 'input',
            twocol: false,
            reqmessage: 'Email required',
        },
    ]

    useEffect(() => {
        if (data) {
            setValue('applicant_name', data.applicant_name);
            setValue('nationality', {label: data.nationality, value: data.nationality });
            setValue('gender', {label: data.gender, value: data.gender });
            setValue('race', {label: data.race_name, value: data.race });
            setValue('contact_no', data.contact_no);
            setValue('marital_status', {label: data.marital_status, value: data.marital_status });
            setValue('email', data.email);
            setValue('icpassport', data.icpassport);
            setValue('date_of_birth', data.date_of_birth ? moment(data.date_of_birth, 'YYYY-MM-DD'): '');
            setValue('passport_expiry', data.passport_expiry ? moment(data.passport_expiry, 'YYYY-MM-DD'): '');
            setValue('place_of_birth', data.place_of_birth);
            setValue('issuing_country', data.issuing_country ? {label: data.issuing_country, value: data.issuing_country } : '');

            setValue('current_address_1', data.current_address_1);
            setValue('current_city', data.current_city);
            setValue('current_post_code', data.current_post_code);
            setValue('current_country', {label: data.current_country, value: data.current_country });
            setValue('current_state', data.current_state);
            setValue('same_address', [data.same_address]);

            setValue('permanent_address_1', data.permanent_address_1);
            setValue('permanent_city', data.permanent_city);
            setValue('permanent_post_code', data.permanent_post_code);
            setValue('permanent_country', {label: data.permanent_country, value: data.permanent_country });
            setValue('permanent_state', data.permanent_state);
            
            setValue('passport_background', data?.passport_background ? {fileList: [{uid: '-1', name: getFileName(data?.passport_background), status: 'done', url: `${baseUrl}${data.passport_background}`}]} : '');
            setValue('ic_scanned', data.ic_scanned ? {fileList: [{uid: '-1', name: getFileName(data?.ic_scanned), status: 'done', url: `${baseUrl}${data.ic_scanned}`}]}: '');

            setValue('emergency_contact_name', data.emergency_contact_name);
            setValue('emergency_contact_number', data.emergency_contact_number);
            setValue('emergency_contact_email', data.emergency_contact_email);
        }
    }, [data]);

    const onFinish = () => {

    }

    return (
        <Form 
        scrollToFirstError
        layout='vertical'
        onFinish={handleSubmit(onFinish)}>
            <Row gutter={[20, 30]} align='bottom'>
                <Col span={24}>
                    <Title level={4} className='mb-0'>{title}</Title>
                </Col>
                {formFields.map((item, index) => (
                    <Fragment key={index}>
                        {item?.subheader && 
                        <Col span={24}><Title level={5} className='mb-0 c-default'>{item.subheader}</Title></Col>}
                        <FormGroup item={item} static={true} control={control} errors={errors} />
                    </Fragment>
                ))}
            </Row>
        </Form>
    )
}