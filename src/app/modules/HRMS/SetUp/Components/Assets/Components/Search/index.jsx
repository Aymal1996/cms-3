import React from 'react';
import { Button, Form, Space, Typography } from 'antd';
import { InputField } from '../../../../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

export default (props) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (val) => {
    props.onSearch(val);
  };

  return (
    <Space size={15} direction="vertical" className="w-100">
      <Title level={5} className="c-gray mb-0">
        Filter List:
      </Title>
      <Form onFinish={handleSubmit(onSubmit)} layout="inline" className="w-100 inline-form">
        <InputField
          fieldname="asset_name"
          class="mb-0 w-100"
          label=""
          control={control}
          iProps={{ placeholder: 'Type asset name' }}
          initValue=""
        />
        <Button size="large" type="primary" htmlType="submit">
          Search
        </Button>
      </Form>
    </Space>
  );
};
