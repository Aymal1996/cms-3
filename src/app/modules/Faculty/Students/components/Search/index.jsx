import React from 'react';
import {Button, Form, Space, Typography } from 'antd';
import { InputField, SelectField } from '../../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

export default (props) => {

    const { control, handleSubmit } = useForm()

    const onSubmit = (val) => {
        props.onSearch(val);
    }

    return (
        <Space size={15} direction='vertical' className='w-100'>
            <Title level={5} className='c-gray mb-0'>Search Criteria:</Title>
            <Form onFinish={handleSubmit(onSubmit)} layout="inline" className='w-100 inline-form'>
                <InputField
                fieldname='student_name'
                class='mb-0 w-100'
                label=''
                control={control}
                iProps={{ placeholder: 'Student Name', size: 'large'}}
                initValue=''
                />
                <SelectField
                fieldname='faculty'
                label=''
                class='mb-0 w-100'
                initValue={props?.field1?.length > 0 ? props.field1[0] : ''}
                control={control}
                iProps={{ placeholder: 'Select Faculty'}}
                selectOption={props.field1}
                />
                <SelectField
                fieldname='program'
                label=''
                class='mb-0 w-100'
                initValue={props?.field2?.length > 0 ? props.field2[0] : ''}
                control={control}
                iProps={{ placeholder: 'Select Programmes'}}
                selectOption={props.field2}
                />
                <Button size='large' type='primary' htmlType='submit'>Search</Button>
            </Form>
        </Space>
    )
}