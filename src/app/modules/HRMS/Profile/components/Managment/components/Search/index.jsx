import React from 'react';
import { Button, Form, Space, Typography } from 'antd';
import { InputField, SelectField } from '../../../../../atoms/FormElement';
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
        Filter list:
      </Title>
      <Form onFinish={handleSubmit(onSubmit)} layout="inline" className="w-100 inline-form">
        <InputField
          fieldname="staffname"
          class="mb-0 w-100"
          label=""
          control={control}
          iProps={{ placeholder: 'Staff Name', size: 'large' }}
          initValue=""
        />
        <SelectField
          fieldname="country"
          label=""
          class="mb-0 w-100"
          initValue={props?.field2?.length > 0 ? props.field2[0] : ''}
          control={control}
          iProps={{ placeholder: 'Country' }}
          selectOption={props.field2}
        />
        <SelectField
          fieldname="team"
          label=""
          class="mb-0 w-100"
          initValue={props?.field1?.length > 0 ? props.field1[0] : ''}
          control={control}
          iProps={{ placeholder: 'Team' }}
          selectOption={props.field1}
        />
        <SelectField
          fieldname="contract_type"
          label=""
          class="mb-0 w-100"
          initValue={props?.field3?.length > 0 ? props.field3[0] : ''}
          control={control}
          iProps={{ placeholder: 'Contract Type' }}
          selectOption={props.field1}
        />
        <Button size="large" type="primary" htmlType="submit">
          Search
        </Button>
      </Form>
    </Space>
  );
};
