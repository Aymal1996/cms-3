import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Spin, Form, Typography, Button, message } from 'antd';
import { useForm } from 'react-hook-form';
import { InputPassword } from '../../../../atoms/FormElement';
import { LoadingOutlined } from '@ant-design/icons';
import { changePassword } from '../../../../../services/dashboard';

const antIcon = <LoadingOutlined spin />;
const { Title } = Typography;

export default (props) => {
  const { title, onClose } = props;
  const [load, setLoad] = useState(false);
  const { control, errors, handleSubmit, watch, reset } = useForm();

  let checkPassword =  watch('password');

  const onSubmitHandler = (values) => {
    setLoad(true);
    const payload = {
      username: JSON.parse(localStorage.getItem('userdetails'))?.name,
      old: values?.current,
      new: values?.password,
    };
    changePassword(payload)
      .then((response) => {
        if (response?.data?.message?.success === true) {
          message.success(response?.data?.message?.message);
          setLoad(false);
          reset();
          onClose();
        } else {
          message.error(response?.data?.message?.message);
          setLoad(false);
        }
      })
      .catch((e) => {
        message.error('something went wrong');
        setLoad(false);
      });
  };

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onSubmitHandler)}>
        <Row gutter={[20, 20]} justify="center">
          <Col span={24}>
            <Row gutter={24} justify="center">
              <Col>
                <Title level={3} className="mb-0">
                  {title}
                </Title>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <InputPassword
              isRequired={true}
              fieldname="current"
              label="Current Password"
              control={control}
              initValue=""
              iProps={{
                size: 'large',
              }}
              rules={{
                required: 'Please enter password',
              }}
              validate={errors.current && 'error'}
              validMessage={errors.current && errors.current.message}
            />
          </Col>
          <Col span={24}>
            <InputPassword
              isRequired={true}
              fieldname="password"
              label="New Password"
              control={control}
              initValue=""
              iProps={{
                size: 'large',
              }}
              rules={{
                required: 'Please enter password',
              }}
              validate={errors.password && 'error'}
              validMessage={errors.password && errors.password.message}
            />
          </Col>
          <Col span={24}>
            <InputPassword
              isRequired={true}
              fieldname="confirm"
              label="Re-type Password"
              control={control}
              initValue=""
              iProps={{
                size: 'large',
              }}
              rules={{
                required: 'Please confirm your password',
                validate: (value) => value === checkPassword || "The Password does not match"
              }}
              validate={errors.confirm ? 'error' : ''}
              validMessage={errors.confirm && errors.confirm.message}
            />
          </Col>
          <Col span={24}>
            <Row gutter={24} align="middle">
              <Col span={12}>
                <Button type="primary" size="large" className="w-100 black-btn" htmlType="button" onClick={() => { reset(); onClose();}}>
                  Close
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="w-100 green-btn"
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
