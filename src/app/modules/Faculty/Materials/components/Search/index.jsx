import React, { useEffect, useState } from 'react';
import { Button, Form, Col, Space, Typography } from 'antd';
import { InputField, SelectField } from '../../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';
import axios from '../../../../../../services/axiosInterceptor';
import { apiMethod } from '../../../../../../configs/constants';
import { getModuleNames } from '../../ducks/services';
const { Title } = Typography;

const material_type = [
  { label: 'Assignment', value: 'Assignment' },
  { label: 'Lecture', value: 'Lecture' },
  { label: 'Quiz', value: 'Quiz' },
  { label: 'Exam', value: 'Exam' },
  { label: 'All', value: '' },
];

export default (props) => {
  const { control, handleSubmit } = useForm();
  const [modules, setModules] = useState([]);

  useEffect(() => {
    getModuleNames().then((response) => {
      if (response?.data?.message) {
        let data = response?.data?.message;
        data.push({ name: '', module_name: 'All' });
        setModules(data.map((value) => ({ label: value.module_name, value: value.name })));
      }
    });
  }, []);

  const onSubmit = (val) => {
    props.onSearch(val);
  };

  return (
    <Space size={10} direction="vertical" className="w-100">
      <Title level={5} className="c-gray mb-0">
        Search Crateria:
      </Title>

      <Form onFinish={handleSubmit(onSubmit)} layout="inline" className="w-100 inline-form">
        <InputField
          fieldname="material_name"
          class="w-100"
          label=""
          control={control}
          iProps={{ placeholder: 'Material Name' }}
        />

        <InputField
          fieldname="author"
          class="w-100"
          label=""
          control={control}
          iProps={{ placeholder: 'Author Name' }}
        />
        <SelectField
          isRequired=""
          fieldname="material_type"
          control={control}
          selectOption={material_type}
          class="w-100"
          iProps={{ placeholder: 'Material Type' }}
        />
        <SelectField
          isRequired=""
          fieldname="module_name"
          control={control}
          selectOption={modules}
          class="w-100"
          iProps={{ placeholder: 'Module Name' }}
        />

        <Button size="large" type="primary" htmlType="submit">
          Search
        </Button>
      </Form>
    </Space>
  );
};
