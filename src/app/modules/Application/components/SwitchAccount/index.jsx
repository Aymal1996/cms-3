import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Spin, Divider, Typography, Button, message, Space, Avatar } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { switchAuthentications } from '../../../../../services/services';
import { login } from '../../../../../features/userSlice';
import { baseUrl } from '../../../../../configs/constants';
import userImage from '../../../../../assets/img/dummy-profile.png';

const antIcon = <LoadingOutlined spin />;
const { Title, Text } = Typography;

export default (props) => {
  const { title, onClose, data } = props;
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem('token')).access_token;
  const employeeEmail = JSON.parse(localStorage.getItem('userdetails')).email;
  const employeeName = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].full_name;
  const employeeCompany = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company;
  const userProfile = localStorage.getItem('userImage');

  const switchAccount = (values) => {
    setLoad(true);
    const payload = {
      employee_id: values?.employee_id,
      token: token,
    };

    switchAuthentications(payload)
      .then((response) => {
        localStorage.clear();
        let res = {
          access_token: response.data.message.access_token,
          expires_in: response.data.message.expires_in,
          refresh_token: response.data.message.refresh_token,
        };

        if (res) {
          localStorage.setItem('userdetails', JSON.stringify(response.data.message.user_detail_role[0]));
          localStorage.setItem('userImage', response.data.message.user_detail_role[0].user_image);
          localStorage.setItem('access', JSON.stringify(response.data.message.user_screen_acces_role_list_test));
          localStorage.setItem('user', values?.employee_name);
          localStorage.setItem('token', JSON.stringify(res));
          response.data.message.switch_accounts &&
            localStorage.setItem('switch_accounts', JSON.stringify(response.data.message.switch_accounts));
          dispatch(
            login({
              username: values?.employee_email,
            }),
          );
          setLoad(false);
          window.location.assign('/dashboard');
        }
      })
      .catch((error) => {
        message.error(error?.response?.data?.message);
      });
  };

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Row gutter={[20, 20]} justify="center">
        <Col span={24}>
          <Space direction="vertical" className="text-center w-100" size={0}>
            <Avatar className="userImage" size={80} src={userProfile ? `${baseUrl}${userProfile}` : userImage} />
            <Title level={4} className="mb-0">
              {employeeName ? employeeName : ''}
            </Title>
            <Text style={{ fontSize: '12px' }}>{employeeEmail ? employeeEmail : ''}</Text>
            <Text style={{ fontSize: '12px' }}>{employeeCompany ? employeeCompany : ''}</Text>
          </Space>
        </Col>
        <Col span={24}>
          <Divider>{title}</Divider>
        </Col>
        {data &&
          data.map((item, i) => (
            <Fragment key={i}>
              <Col span={24}>
                <Button type="link" className="list-links w-100" onClick={() => switchAccount(item)}>
                  <Space size={20}>
                    <Avatar
                      className="userImage"
                      size={60}
                      src={userProfile ? `${baseUrl}${item?.employee_image}` : userImage}
                    />

                    <Space direction="vertical" size={0}>
                      <Title level={4} className="mb-0">
                        {item?.employee_name}
                      </Title>
                      <Text style={{ fontSize: '12px' }}>{item?.employee_email}</Text>
                      <Text style={{ fontSize: '12px' }}>{item?.company}</Text>
                    </Space>
                  </Space>
                </Button>
              </Col>
            </Fragment>
          ))}
      </Row>
    </Spin>
  );
};
