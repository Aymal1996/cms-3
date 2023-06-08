import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Typography, Form, Button, Popover, message } from 'antd';
import { useForm } from 'react-hook-form';
import { InputField, InputPassword } from '../../atoms/FormElement';
import { authentications } from '../../../services/services';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../features/userSlice';
import { useTranslate } from 'Translate';
import { GoogleLogin } from 'react-google-login';
import axios from '../../../services/axiosInterceptor';
import { apiMethod, loginID } from '../../../configs/constants';
import googleLoginImage from '../../../assets/img/google-login.svg';

const { Title } = Typography;

export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { control, handleSubmit, errors } = useForm();

  const i18n = useTranslate();
  const { t } = i18n;

  const responseGoogle = (value) => {
    localStorage.clear();
    axios
      .get(`${apiMethod}/frappe.www.login.login_via_gooogle?email=${value?.profileObj?.email}&client_id=${loginID}`)
      .then((response) => {
        let res = {
          access_token: response.data.message.access_token,
          expires_in: response.data.message.expires_in,
          refresh_token: response.data.message.refresh_token,
        };
        if (res) {
          localStorage.setItem('userdetails', JSON.stringify(response.data.message.user_detail_role[0]));
          localStorage.setItem('userImage', response.data.message.user_detail_role[0].user_image);
          localStorage.setItem('access', JSON.stringify(response.data.message.user_screen_acces_role_list_test));
          localStorage.setItem('user', value?.profileObj?.name);
          localStorage.setItem('token', JSON.stringify(res));
          response.data.message.switch_accounts &&
            localStorage.setItem('switch_accounts', JSON.stringify(response.data.message.switch_accounts));
          dispatch(
            login({
              username: value?.profileObj?.email,
            }),
          );
          setTimeout(() => {
            history.push('/dashboard');
          }, 1000);
        }
      })
      .catch((error) => {
        props.setLoading(false);
        console.log('error', error?.response);
        message.error(error?.response?.data?.status?.message);
      });
  };

  const responseGoogle1 = (response) => {
    console.log({ response });
  };

  const onFinish = (values) => {
    props.setLoading(true);
    localStorage.clear();
    authentications(values.username, values.password)
      .then((response) => {
        console.log('respon', response.data);
        let res = {
          access_token: response.data.access_token,
          expires_in: response.data.expires_in,
          refresh_token: response.data.refresh_token,
        };

        if (res) {
          localStorage.setItem('userdetails', JSON.stringify(response.data.user_detail_role[0]));
          localStorage.setItem('userImage', response.data.user_detail_role[0].user_image);
          localStorage.setItem('access', JSON.stringify(response.data.user_screen_acces_role_list_test));
          localStorage.setItem('user', values.username);
          localStorage.setItem('token', JSON.stringify(res));
          response.data.switch_accounts &&
            localStorage.setItem('switch_accounts', JSON.stringify(response.data.switch_accounts));
          dispatch(
            login({
              username: values.username,
            }),
          );
          setTimeout(() => {
            history.push('/dashboard');
          }, 1000);
        }
      })
      .catch((error) => {
        props.setLoading(false);
        message.error(error?.response?.data?.message);
      });
  };
  return (
    <Row gutter={[30, 24]}>
      <Col span={24}>
        <Title level={3} className="text-center mb-0">
          {t('Login.title')}
        </Title>
      </Col>
      <Col span={24}>
        <Form name="normal_login" onFinish={handleSubmit(onFinish)}>
          <InputField
            fieldname="username"
            control={control}
            initValue=""
            iProps={{
              size: 'large',
              placeholder: t('Login.username'),
            }}
            rules={{
              required: 'Please input username',
              pattern: {
                value: /(?=^.{1,50}$)^\S*$/,
                message: 'Input username without space!',
              },
            }}
            validate={errors.username && 'error'}
            validMessage={errors.username && errors.username.message}
          />
          <InputPassword
            fieldname="password"
            control={control}
            initValue=""
            iProps={{
              size: 'large',
              placeholder: t('Login.password'),
            }}
            rules={{
              // pattern: {
              //   value: /(?=^.{1,50}$)^\S*$/,
              //   message: 'Please enter correct password',
              // },
              required: 'Please enter password',
            }}
            validate={errors.password && 'error'}
            validMessage={errors.password && errors.password.message}
          />
          <Button type="primary" htmlType="submit" className="w-100" size="large">
            {t('Login.button')}
          </Button>
        </Form>
      </Col>
      <Col span={24} className="text-center">
        <Link to="/forgot-password" className="login-form-forgot">
          {t('Login.forget')}
        </Link>
      </Col>

      {/* <Col span={24} className="login_social">
        <h4>Or sign in with your social account</h4>
      </Col>
      <Col span={24} className="text-center custom-google-login">
        <GoogleLogin
          //clientId="326819665650-nds956mfn8225t63794e49dc559ldde7.apps.googleusercontent.com"
          clientId="348875383967-9jj1deive2a6gde8hln3q4n9h58b69r5.apps.googleusercontent.com"
          render={(renderProps) => (
            <button onClick={renderProps.onClick} className="p-0 m-0">
              <img src={googleLoginImage} />
            </button>
          )}
          buttonText=""
          onSuccess={responseGoogle}
          onFailure={responseGoogle1}
          cookiePolicy={'single_host_origin'}
        />
      </Col> */}
    </Row>
  );
};
