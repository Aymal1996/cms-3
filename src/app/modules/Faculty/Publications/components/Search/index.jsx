import React from 'react';
import {Button, Form,Col,Space, Typography } from 'antd';
import { InputField,SelectField } from '../../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

export default (props) => {

    const { control, handleSubmit } = useForm();

     const publication_type = [
        {label: 'Journal Article',  value: 'Journal Article'},
		{label: 'Book', value: 'Book'},  
	 ]

     const publisher = [
        {label: 'SCOPUS',  value: 'SCOPUS'},
		{label: 'Google Scholar', value: 'Google Scholar'},  
	 ]

    const onSubmit = (val) => {
        props.onSearch(val);
    }

    return (
        <Space size={10} direction='vertical' className='w-100'>
           
            <Title level={5} className='c-gray mb-0'>Search Crateria:</Title>
           
            <Form onFinish={handleSubmit(onSubmit)} layout="inline" className='w-100 inline-form'>

			   <InputField
                    fieldname='publication_name'
                    class='w-100'
                    label=''
                    control={control}
                    iProps={{ placeholder: 'Enter Publication Name'}}
                />

                    <InputField
                    fieldname='author_name'
                    class='w-100'
                    label=''
                    control={control}
                    iProps={{ placeholder: 'Enter Author Name'}}
                />
                                <SelectField 
                                    isRequired=''
                                    fieldname='publication_type'
                                    control={control}
                                    selectOption={publication_type}
                                    class='w-100'
                                    iProps={{ placeholder: 'Publication Type'}}
                                />
                                   <SelectField 
                                    isRequired=''
                                    fieldname='publisher'
                                    control={control}
                                    selectOption={publisher}
                                    class='w-100'
                                    iProps={{ placeholder: 'Publisher'}}
                                />

                <Button size='large' type='primary' htmlType='submit'>Search</Button>
            </Form>
        </Space>
    )
}