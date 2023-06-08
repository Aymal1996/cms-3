import React from 'react';
import {Button, Form,Col,Space, Typography } from 'antd';
import { InputField,SelectField } from '../../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

export default (props) => {

    const { control, handleSubmit } = useForm();

     const source = [
        {label: 'Government',  value: 'Government'},
		{label: 'Private', value: 'Private'},  
	 ]

    const onSubmit = (val) => {
        props.onSearch(val);
    }

    return (
        <Space size={10} direction='vertical' className='w-100'>
            <Title level={5} className='c-gray mb-0'>Search Crateria:</Title>
            <Form onFinish={handleSubmit(onSubmit)} layout="inline" className='w-100 inline-form'>
			   <InputField
                    fieldname='grant_name'
                    class=''
                    label=''
                    control={control}
                    iProps={{ placeholder: 'Enter Grant Name'}}
                />
                                <SelectField 
                                    isRequired=''
                                    fieldname='source'
                                    control={control}
                                    selectOption={source}
                                    class=''
                                    iProps={{ placeholder: 'Select Grant Source'}}
                                />

                <Button size='large' type='primary' htmlType='submit'>Search</Button>
            </Form>
        </Space>
    )
}