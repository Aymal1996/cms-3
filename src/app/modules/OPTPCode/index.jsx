import React, { useState } from 'react';
import { Row, Col, Typography, Form, Button, message, Spin } from 'antd';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { InputField } from '../../atoms/FormElement';
import { useTranslate } from 'Translate';
import axios from '../../../services/axiosInterceptor';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined spin />;

const { Title } = Typography;

export default (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, errors, setValue } = useForm();

  const i18n = useTranslate();
  const { t } = i18n;

  const onFinish = (values) => {
    setLoading(true);
    const payload = {
      pin: values.code,
      old_password: '',
      logout_all_sessions: 1,
      cmd: 'frappe.core.doctype.user.user.update_password_pincode',
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}`, payload)
      .then((response) => {
        console.log({ response });
        if (response?.data?.home_page) {
          message.success(response?.data?.message);
          history.push('/login');
          setLoading(false);
        } else {
          message.error(response?.message);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log({ e });
        message.error(e?.response?.data?.message);
        setLoading(false);
      });
  };
  return (
    <Spin indicator={antIcon} size="large" spinning={loading}>
      <Row gutter={[30, 24]}>
        <Col span={24}>
          <Title level={3} className="text-center mb-0">
            Enter an OTP-Code.
          </Title>
        </Col>
        <Col span={24}>
          <Form name="normal_forget" onFinish={handleSubmit(onFinish)}>
            <InputField
              fieldname="code"
              control={control}
              initValue=""
              iProps={{
                size: 'large',
                placeholder: 'Enter Code',
              }}
              rules={{
                required: 'Code required',
              }}
              validate={errors.code && 'error'}
              validMessage={errors.code && errors.code.message}
            />
            <Button type="primary" htmlType="submit" className="w-100" size="large">
              Send Code
            </Button>
          </Form>
        </Col>
      </Row>
    </Spin>
  );
};
