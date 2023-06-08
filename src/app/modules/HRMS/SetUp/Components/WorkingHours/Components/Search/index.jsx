import React, { useEffect, useState } from 'react';
import { Button, Form, Space, Typography } from 'antd';
import { InputField, SelectField, DateField } from '../../../../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { getCompany } from '../../../../../../Application/ducks/actions';
const { Title } = Typography;

export default (props) => {
  const { control, handleSubmit } = useForm();
  const [allCompany, setAllCompany] = useState([]);
  const dispatch = useDispatch();
  const company = useSelector((state) => state.global.companies);
  console.log({ company });
  useEffect(() => {
    dispatch(getCompany());
  }, []);
  useEffect(() => {
    if (Object.keys(company).length > 0) {
      let temp = [];
      company.map((x, i) => {
        if (i == 0) {
          temp.push({ label: x.name, value: x.name });
        } else {
          temp.push({ label: x.name, value: x.name });
        }
      });
      setAllCompany(temp);
    }
  }, [company]);
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
          fieldname="template_name"
          class="mb-0 w-100"
          label=""
          control={control}
          iProps={{ placeholder: 'Type template name', size: 'small' }}
          initValue=""
        />
        <Button size="large" type="primary" htmlType="submit">
          Search
        </Button>
      </Form>
    </Space>
  );
};
