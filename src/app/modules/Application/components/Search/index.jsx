import React from 'react';
import { Button, Form, Space, Typography, Row, Col } from 'antd';
import { SelectField } from '../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

export default (props) => {

    const { control, handleSubmit } = useForm()

    const onSubmit = (val) => {
        props.onSearch(val);
    }

    return (
        <Space size={15} direction='vertical' className='w-100'>
            <Title level={5} className='c-gray mb-0'>Category:</Title>
            <Form onFinish={handleSubmit(onSubmit)} layout="inline" className='w-100 inline-form'>
                <Row className='w-100' gutter={20}>
                    <Col span={4}>
                        <SelectField
                            fieldname='category'
                            label=''
                            class='mb-0 w-100'
                            initValue={{}}
                            control={control}
                            iProps={{ placeholder: 'Category' }}
                            selectOption={[{ label: 'Grade', value: 1 }]}
                        />
                    </Col>
                    <Col span={16}>
                        <SelectField
                            fieldname='categoryType'
                            label=''
                            class='mb-0 w-100'
                            initValue={{}}
                            control={control}
                            iProps={{ placeholder: 'Please select Grade' }}
                            selectOption={[{ label: 'Grade A', value: 1 }]}
                        />
                    </Col>
                    <Col span={4}>
                        <Button className='w-100' size='large' type='primary' htmlType='submit'>Search</Button>
                    </Col>
                </Row>
            </Form>
        </Space>
    )
}