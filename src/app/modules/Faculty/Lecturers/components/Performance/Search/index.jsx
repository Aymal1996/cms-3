import React, { useState, useEffect } from 'react';
import { Button, Form, Space, Typography } from 'antd';
import { InputField, SelectField } from '../../../../../../atoms/FormElement';
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
        Search Criteria:
      </Title>
      <Form onFinish={handleSubmit(onSubmit)} layout="inline" className="w-100 inline-form">
        <InputField
          fieldname="program"
          class="mb-0 w-100"
          label=""
          control={control}
          iProps={{ placeholder: 'Programme', size: 'large' }}
          initValue=""
        />
        <SelectField
          fieldname="module"
          label=""
          class="mb-0 w-100"
          initValue={props?.field1?.length > 0 ? props.field1[0] : ''}
          control={control}
          iProps={{ placeholder: 'Module' }}
          selectOption={[
            {
              label: 'All',
              value: '',
            },
            {
              label: 'Faculty Coordinator',
              value: 'Faculty Coordinator',
            },
            {
              label: 'Programme Coordinator',
              value: 'Programme Coordinator',
            },
            {
              value: 'Lecturer',
              label: 'Lecturer',
            },
          ]}
        />
        <SelectField
          fieldname="grade"
          label=""
          class="mb-0 w-100"
          initValue={props?.field1?.length > 0 ? props.field1[0] : ''}
          control={control}
          iProps={{ placeholder: 'Grade' }}
          selectOption={[
            { label: 'All', value: '' },
            { label: 'A', value: 'A' },
            { label: 'B', vBlue: 'B' },
            { label: 'C', value: 'C' },
            { label: 'D', value: 'D' },
          ]}
        />

        <Button size="large" type="primary" htmlType="submit">
          Search
        </Button>
      </Form>
    </Space>
  );
};
