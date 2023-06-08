import React from 'react';
import {Button, Form, Space, Typography } from 'antd';
import { DateField, InputField, SelectField } from '../../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

export default (props) => {

    const { control, handleSubmit } = useForm()

    const onSubmit = (val) => {
        props.onSearch(val);
    }

    return (
        <Space size={15} direction='vertical' className='w-100'>
            <Title level={5} className='c-gray mb-0'>Filter list:</Title>
            <Form onFinish={handleSubmit(onSubmit)} layout="inline" className='w-100 inline-form'>
                <InputField
                fieldname='id'
                class='mb-0 w-100'
                label=''
                control={control}
                iProps={{ placeholder: 'ID', size: 'large'}}
                initValue=''
                />
                <InputField
                fieldname='name'
                class='mb-0 w-100'
                label=''
                control={control}
                iProps={{ placeholder: 'Staff Name', size: 'large'}}
                initValue=''
                />
                <DateField
                fieldname='date'
                class='mb-0 w-100'
                label=''
                control={control}
                iProps={{ placeholder: 'Date', size: 'large'}}
                initValue=''
                />
                <SelectField
                fieldname='project'
                label=''
                class='mb-0 w-100'
                initValue={props?.field1?.length > 0 ? props.field1[0] : ''}
                control={control}
                iProps={{ placeholder: 'Project'}}
                selectOption={props?.field1}
                />
                <Button size='large' type='primary' htmlType='submit'>Search</Button>
            </Form>
        </Space>
    )
}