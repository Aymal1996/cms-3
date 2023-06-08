import React from 'react';
import {Button, Form, Space, Typography } from 'antd';
import { InputField, SelectField } from '../../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';

const { Text } = Typography;

export default (props) => {

    const { control, errors, handleSubmit } = useForm()

    const onSubmit = (val) => {
        props.onSearch(val);
    }

    return (
        <Space size={15} direction='vertical' className='w-100'>
            <Text className='c-gray smallFont12'>Search Criteria:</Text>
            <Form onFinish={handleSubmit(onSubmit)} layout="inline" className='w-100 inline-form'>
                <SelectField
                fieldname='category'
                label=''
                class='mb-0 w-100'
                initValue={''}
                control={control}
                iProps={{ placeholder: 'Select Category'}}
                rules={{required: true}}
                selectOption={props.field1}
                validate={errors.category && 'error'}
                />
                <InputField
                fieldname='search'
                class='mb-0 w-100'
                label=''
                control={control}
                iProps={{ placeholder: 'Module Code', size: 'large'}}
                initValue=''
                />
                <Button size='large' type='primary' htmlType='submit'>Search</Button>
            </Form>
        </Space>
    )
}