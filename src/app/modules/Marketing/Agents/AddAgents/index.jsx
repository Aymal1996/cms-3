import React from 'react';
import { Row, Col, Form, message, Breadcrumb } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import { useForm } from 'react-hook-form';
import { profileUpdate } from '../ducks/services';
import { useHistory } from 'react-router-dom';
import AgentForm from '../components/AgentForm';

export default (props) => {
  const history = useHistory();
  const { control, errors, setValue, handleSubmit } = useForm({});

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
    <Form layout="vertical" scrollToFirstError={true} onFinish={handleSubmit(onFinish)}>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/marketing/agents/">Agents List</Breadcrumb.Item>
        <Breadcrumb.Item>New Agent</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title={'New Agent'} />
        </Col>
        <Col span={24}>
            <AgentForm
              control={control}
              errors={errors}
              setValue={setValue}
              mode='add'
            />
        </Col>
      </Row>
    </Form>
  );
};
