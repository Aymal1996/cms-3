import React from 'react';
import {Button, Form, Space, Typography } from 'antd';
import { DateField, SelectField } from '../../../../../atoms/FormElement';
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
                <DateField
                fieldname='date'
                class='mb-0 w-100'
                label=''
                type='range'
                control={control}
                iProps={{ size: 'large'}}
                initValue=''
                />
                <SelectField
                fieldname='project'
                label=''
                class='mb-0 w-100'
                initValue={''}
                control={control}
                iProps={{ placeholder: 'Project'}}
                selectOption={props?.field1}
                />
                <SelectField
                fieldname='status'
                label=''
                class='mb-0 w-100'
                initValue={''}
                control={control}
                iProps={{ placeholder: 'Status'}}
                selectOption={props?.field2}
                />
                <Button size='large' type='primary' htmlType='submit'>Search</Button>
            </Form>
        </Space>
    )
}