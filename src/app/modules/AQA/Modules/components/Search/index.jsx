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
                fieldname='module_name'
                class='mb-0 w-100'
                label=''
                control={control}
                iProps={{ placeholder: 'Module Name', size: 'large'}}
                initValue=''
                />
                {/* <SelectField
                fieldname='module'
                label=''
                class='mb-0 w-100'
                initValue={{label: 'All Modules', value: 1}}
                control={control}
                iProps={{ placeholder: 'Select Modules'}}
                selectOption={[{label: 'All Modules', value: 1}]}
                /> */}
                <Button size='large' type='primary' htmlType='submit'>Search</Button>
            </Form>
        </Space>
    )
}