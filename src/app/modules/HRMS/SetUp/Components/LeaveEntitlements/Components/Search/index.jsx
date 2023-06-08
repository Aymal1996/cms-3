import React, { useEffect, useState } from 'react';
import { Button, Form, Space, Typography } from 'antd';
import { InputField, SelectField, DateField } from '../../../../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { filterLeaveType, filterLeaveEntitlementName } from '../../../../ducks/actions';

const { Title } = Typography;

export default (props) => {
  const company = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company;
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterLeaveType(company));
    dispatch(filterLeaveEntitlementName(company));
  }, []);

  const filterLeaveName = useSelector((state) => state.setup.filterLeaveType);
  const filterLeaveEntitlemnt = useSelector((state) => state.setup.filterEntitlmentName);

  const onSubmit = (val) => {
    props.onSearch(val);
  };

  return (
    <Space size={15} direction="vertical" className="w-100">
      <Title level={5} className="c-gray mb-0">
        Search Criteria:
      </Title>
      <Form onFinish={handleSubmit(onSubmit)} layout="inline" className="w-100 inline-form">
        <SelectField
          fieldname="leave_type"
          label=""
          class="mb-0 w-100"
          initValue=""
          control={control}
          iProps={{ placeholder: 'Leave Type' }}
          selectOption={filterLeaveName?.map((value) => ({ label: value.leave_type, value: value.leave_type }))}
        />
        <SelectField
          fieldname="leave_entitlement_name"
          label=""
          class="mb-0 w-100"
          initValue=""
          control={control}
          iProps={{ placeholder: 'Entitlement Name' }}
          selectOption={filterLeaveEntitlemnt?.map((value) => ({
            label: value.leave_entitlement_name,
            value: value.name,
          }))}
        />
        <InputField
          fieldname="entitlement_days"
          label=""
          class="mb-0 w-100"
          initValue=""
          control={control}
          iProps={{ placeholder: 'Entilement Days' }}
        />
        <InputField
          fieldname="min_years"
          label=""
          class="mb-0 w-100"
          initValue=""
          control={control}
          iProps={{ placeholder: 'Minimum Year' }}
        />
        <Button size="large" type="primary" htmlType="submit">
          Search
        </Button>
      </Form>
    </Space>
  );
};
