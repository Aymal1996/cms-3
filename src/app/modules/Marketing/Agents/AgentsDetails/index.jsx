import React, { useEffect } from 'react';
import { Row, Col, Form, message, Breadcrumb } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import { useForm } from 'react-hook-form';
import { useLocation, useHistory } from 'react-router-dom';
import { getProfile, profileUpdate } from '../ducks/services';
import AgentForm from '../components/AgentForm';

export default (props) => {
  const history = useHistory();
  const location = useLocation();
  const { control, errors, setValue, handleSubmit } = useForm();

  useEffect(() => {
    if (location?.state?.agentEmail) {
      getProfile(location?.state?.agentEmail)
        .then((res) => {
          let data = res.data.message;
          setValue('first_name', data?.first_name);
          setValue('email', data?.email);
          setValue('nationality', data?.nationality ? { value: data.nationality, label: data.nationality } : '');
          setValue('bank_name', data?.bank_name);
          setValue('account_title', data?.account_title);
          setValue('iban_no', data?.iban_no);
          setValue('address', data?.address);
          setValue('city', data?.city);
          setValue('post_code', data?.post_code);
          setValue('state', data?.state);
          setValue('enabled', data?.enabled ? ['enabled'] : []);
          setValue('country', data?.country ? { value: data.country, label: data.country } : '');
          setValue('swift_code', data?.swift_code);
        })
        .catch((e) => {
          const { response } = e;
          console.log('error', response);
          message.error('Something went wrong');
        });
    }
  }, []);

  const onFinish = (val) => {
    props.setLoading(true);
    const payLoad = {
      first_name: val?.first_name,
      email: val?.email,
      nationality: val?.nationality?.value,
      enabled: val?.enabled?.length > 0 ? 1 : 0,
      bank_details: [
        {
          bank_name: val?.bank_name,
          account_title: val?.account_title,
          iban_no: val?.iban_no,
          post_code: val?.post_code,
          address: val?.address,
          city: val?.city,
          state: val?.state,
          country: val?.country?.value,
          swift_code: val?.swift_code,
        },
      ],
    };

    profileUpdate(payLoad)
      .then((resp) => {
        message.success('Agent Successfully Updated');
        history.push('/marketing/agents');
        props.setLoading(false);
      })
      .catch((e) => {
        const { response } = e;
        props.setLoading(false);
        console.log('error', response);
        message.error('Something went wrong');
      });
  };

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/marketing/agents">Agents List</Breadcrumb.Item>
        <Breadcrumb.Item>Agent Details</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title={'Agent Details'} />
        </Col>
        <Col span={24}>
          <Form onFinish={handleSubmit(onFinish)} layout="vertical" scrollToFirstError={true}>
            <AgentForm control={control} errors={errors} setValue={setValue} mode='edit' />
          </Form>
        </Col>
      </Row>
    </>
  );
};
