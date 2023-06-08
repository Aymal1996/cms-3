import React from 'react';
import {Button, Form, Space, Typography } from 'antd';
import { InputField, SelectField, DateField } from '../../../../../../../atoms/FormElement';
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
                    fieldname='searchTag'
                    class='mb-0 w-100'
                    label=''
                    control={control}
                    iProps={{ placeholder: 'Tag', size: 'small'}}
                initValue=''
                />
                <InputField
                    fieldname='termName'
                    class='mb-0 w-100'
                    label=''
                    control={control}
                    iProps={{ placeholder: 'Term Name', size: 'middle'}}
                initValue=''
                />
                <SelectField
                    fieldname='courseGroup'
                    label=''
                    class='mb-0 w-100'
                    initValue={{label: 'Course Group', value: 1}}
                    control={control}
                    iProps={{ placeholder: 'Course Group'}}
                    selectOption={[{label: 'All Courses', value: 1}]}
                />
                <DateField 
                    fieldname='dateRange'
                    label=''
                    control={control}
                    class='mb-0 w-100'
                    iProps={{ placeholder: 'Date Range', size: 'large'}}
                    initValue=''
                />
                <Button size='large' type='primary' htmlType='submit'>Search</Button>
            </Form>
        </Space>
    )
}