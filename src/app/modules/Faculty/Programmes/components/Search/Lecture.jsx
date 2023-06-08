import React, {useEffect} from 'react';
import { Button, Form, Space, Typography } from 'antd';
import { SelectField } from '../../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

export default (props) => {
  const { control, handleSubmit, setValue } = useForm();

  const onSubmit = (val) => {
    props.onSearch(val);
  };

  useEffect(() => {
    if (Object.keys(props?.field1)) {
      if (props?.field1?.employee_name) {
        setValue('staff_name', {
          label: props?.field1.employee_name, 
          value: props?.field1.employee_name
        });
      }
    }
  }, [props?.field1]);

  return (
    <Space size={15} direction="vertical" className="w-100">
      <Title level={5} className="c-gray mb-0">
        Staff Name:
      </Title>
      <Form onFinish={handleSubmit(onSubmit)} layout="inline" className="w-100 inline-form">
        <SelectField
          fieldname="staff_name"
          label=""
          class="mb-0 w-100"
          initValue=''
          control={control}
          iProps={{ placeholder: 'Select Staff Name' }}
          selectOption={[{ label: props?.field1.employee_name, value: props?.field1.employee_name }]}
        />

        <Button size="large" type="primary" htmlType="submit">Save Changes</Button>
      </Form>
    </Space>
  );
};
