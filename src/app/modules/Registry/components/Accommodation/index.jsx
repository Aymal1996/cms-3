import React, {Fragment, useEffect} from 'react';
import {Row, Col, Typography, Form, Button } from 'antd';
import { useSelector } from 'react-redux';
import FormGroup from 'Molecules/FormGroup';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import StudentTemp from '../../Students/StudentTemp';
import { useHistory, useParams } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

const {Title} = Typography;
const _ = require("lodash");

export default (props) => {

    const {id} = useParams();
    const history = useHistory();
    const data = useSelector((state) => state.students.studentAppData);
    const propertyList = ['Property A', 'Property A-1', 'Property B',];
    const blockList = ['A', 'B', 'C', 'D'];
    const rtypeList = ['Single Rome with One Bed', 'Single Rome with Double Bed'];
    const levelList = ['1', '2', '3', '4', '5', '6']
    const unitList = ['A-06-05', 'A-06-04']
    const { control, errors, setValue, handleSubmit } = useForm();

    const formFields = [
        {
            subheader: 'Tenant Information',
            name: 'property_name',
            label: 'Property',
            req: false,
            placeholder: 'Please select',
            type: 'select',
            twocol: false,
            reqmessage: 'Please Select',
            options: _.map(propertyList, e => ({label: e, value: e}))
        },
        {
            name: 'property_block',
            label: 'Block',
            req: false,
            placeholder: 'Please select',
            type: 'select',
            twocol: true,
            reqmessage: 'Please Select',
            options: _.map(blockList, e => ({label: e, value: e}))
        },
        {
            name: 'rome_type',
            label: 'Room Type',
            req: false,
            placeholder: 'Please select',
            type: 'select',
            twocol: true,
            reqmessage: 'Please Select',
            options: _.map(rtypeList, e => ({label: e, value: e}))
        },
        {
            name: 'level',
            label: 'Level',
            req: false,
            placeholder: 'Please state',
            type: 'select',
            twocol: true,
            reqmessage: 'Please Select',
            options: _.map(levelList, e => ({label: e, value: e}))
        },
        {
            name: 'property_unit',
            label: 'Unit',
            req: false,
            placeholder: 'Please select',
            type: 'select',
            twocol: true,
            reqmessage: 'Please Select',
            options: _.map(unitList, e => ({label: e, value: e}))
        },
        {
            name: 'start_date',
            label: 'Start Date',
            req: false,
            placeholder: '',
            type: 'date',
            twocol: true,
            reqmessage: 'Date required',
            format: 'Do MMMM YYYY' 
        },
        {
            name: 'end_date',
            label: 'End Date',
            req: false,
            placeholder: '',
            type: 'date',
            twocol: true,
            reqmessage: 'Date required',
            format: 'Do MMMM YYYY' 
        },
    ]

    useEffect(() => {
        if (data && data?.accomodation) {
            setValue('property_name', data.accomodation.property_name ? {label: data.accomodation.property_name, value: data.accomodation.property_name} : '');
            setValue('property_block', data.accomodation.property_block ? {label: data.accomodation.property_block, value: data.accomodation.property_block} : '');
            setValue('rome_type', data.accomodation.rome_type ? {label: data.accomodation.rome_type, value: data.accomodation.rome_type} : '');
            setValue('level', data.accomodation.level ? {label: data.accomodation.level, value: data.accomodation.level} : '');
            setValue('property_unit', data.accomodation.property_unit ? {label: data.accomodation.property_unit, value: data.accomodation.property_unit} : '');
            setValue('start_date', data.accomodation.start_date ? moment(data.accomodation.start_date, 'YYYY-MM-DD'): '');
            setValue('end_date', data.accomodation.end_date ? moment(data.accomodation.end_date, 'YYYY-MM-DD'): '');
        }
    }, [data]);

    const onFinish = () => {

    }

    return (
        <StudentTemp id={id} request={false} setLoading={props.setLoading}>
        <Form 
        scrollToFirstError
        layout='vertical'
        onFinish={handleSubmit(onFinish)}>
            <Row gutter={[20, 30]} align='bottom'>
                <Col span={24}>
                    <Row gutter={[20, 30]}>
                        <Col flex='auto'>
                            <Title level={4} className='mb-0'>Accommodation</Title>
                        </Col>
                        <Col>
                            <Button icon={<LeftOutlined />} size='middle' className="c-graybtn small-btn" onClick={() => history.push(`/registry/students/${id}`)}>Categories</Button>
                        </Col>
                    </Row>
                </Col>
                {formFields.map((item, index) => (
                    <Fragment key={index}>
                        {item?.subheader && 
                        <Col span={24}><Title level={5} className='mb-0 c-default'>{item.subheader}</Title></Col>}
                        <FormGroup item={item} control={control} errors={errors} />
                    </Fragment>
                ))}
            </Row>
        </Form>
        </StudentTemp>
    )
}