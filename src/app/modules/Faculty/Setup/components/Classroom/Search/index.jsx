import React from 'react';
import { Button, Form, Space, Typography } from 'antd';
import { InputField, SelectField } from '../../../../../../atoms/FormElement';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

export default (props) => {
  const { control, handleSubmit } = useForm();
  const classroomtype = useSelector((state) => state.custom.classroom_type);
  const facultyLevel = useSelector((state) => state.custom.faculty_type);
  const blocks = useSelector((state) => state.custom.blocks);

  const onSubmit = (val) => {
	  
    props.onSearch(val);
  };

  return (
    <Space size={15} direction="vertical" className="w-100">
      <Title level={5} className="c-gray mb-0">
        Filter List:
      </Title>
      <Form onFinish={handleSubmit(onSubmit)} layout="inline" className="w-100 inline-form">
        <SelectField
          fieldname="classroom_type"
          class="mb-0 w-100"
          label=""
          control={control}
          iProps={{ placeholder: 'Classroom Type' }}
          selectOption={classroomtype.map((value) => ({ label: value.name, value: value.name }))}
        />
        <SelectField
          fieldname="level"
          class="mb-0 w-100"
          label=""
          control={control}
          iProps={{ placeholder: 'Level' }}
          selectOption={facultyLevel.map((value) => ({ label: value.name, value: value.name }))}
        />
        <SelectField
          fieldname="block"
          class="mb-0 w-100"
          label=""
          control={control}
          iProps={{ placeholder: 'Block' }}
          selectOption={blocks.map((value) => ({ label: value.name, value: value.name }))}
        />
        <InputField
          fieldname="classroom_capacity"
          class="mb-0 w-100"
          label=""
          control={control}
          iProps={{ placeholder: 'Capacity' }}
        />
        <Button size="large" type="primary" htmlType="submit">
          Search
        </Button>
      </Form>
    </Space>
  );
};
