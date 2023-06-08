import React from 'react';
import {Button, Form, Space, Typography } from 'antd';
import { DateField, InputField, SelectField } from '../../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';
import moment from 'moment';

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
                fieldname='incentive_name'
                class='mb-0 w-100'
                label=''
                control={control}
                iProps={{ placeholder: 'Incentive Name', size: 'large'}}
                initValue=''
                />
                <DateField
                fieldname='start_date'
                label=''
                class='mb-0 w-100'
                initValue={''}
                control={control}
                iProps={{ placeholder: 'Start Date', size: 'large'}}
                rules={{
                    setValueAs: (value) => value ? moment(value).format("YYYY-MM-DD") : '',
                }}
                />
                <DateField
                fieldname='end_date'
                label=''
                class='mb-0 w-100'
                initValue={''}
                control={control}
                iProps={{ placeholder: 'End Date', size: 'large'}}
                rules={{
                    setValueAs: (value) => value ? moment(value).format("YYYY-MM-DD") : '',
                }}
                />
                <Button size='large' type='primary' htmlType='submit'>Search</Button>
            </Form>
        </Space>
    )
}