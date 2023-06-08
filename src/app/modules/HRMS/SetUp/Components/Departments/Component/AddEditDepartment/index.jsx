import React, { useState, useEffect, Fragment } from 'react';
import { Button, Row, Col, Typography, Form, message, Spin } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { departmentFields } from './FormFields';
import {
  addSingleDepartment,
  updateDepartment,
  deleteDepartment,
  getSingleDepartment,
} from '../../../../ducks/services';
import axios from '../../../../../../../../services/axiosInterceptor';
import { apiMethod } from '../../../../../../../../configs/constants';
import { LoadingOutlined } from '@ant-design/icons';
import AddUser from '../../../Teams/Components/AddUser';
import { allowed } from '../../../../../../../../routing/config/utils';
import Roles from '../../../../../../../../routing/config/Roles';
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { title, onClose, departmentField } = props;
  const { Title, Text } = Typography;
  const [load, setLoad] = useState(false);
  const [userData, setUserData] = useState([]);
  const { control, errors, setValue, reset, handleSubmit } = useForm();
  const [departments, setDepartments] = useState([]);

  const onFinish = (values) => {
    setLoad(true);
    const payload = {
      department_name: values?.department_name,
      employee_name: values?.employee_name.value,
      employee_id: values?.employee_name.id,
      status: 'Active',
      team: userData.map((value) => ({ team: value.name })),
    };
    departmentField.name.length == 0
      ? addSingleDepartment(payload)
          .then((response) => {
            setLoad(false);
            if (response.data.message.success == true) {
              message.success(response.data.message.message);
              onClose();
            } else {
              message.error(response.data.message.message);
            }
          })
          .catch((error) => {
            setLoad(false);
            message.error('Something went wrong')
          })
      : updateDepartment(departmentField.name, payload)
      .then((response) => {
            setLoad(false);
            if (response.data.message.success == true) {
              message.success(response.data.message.message);
              onClose();
            } else {
              message.error(response.data.message.message);
            }
          })
          .catch((error) => {
            setLoad(false);
            message.error('Something went wrong')
          });
  };

  const onDeleteHoliday = () => {
    setLoad(true);
    deleteDepartment(departmentField.name, { status: 'Inactive' })
      .then((response) => {
        setLoad(false);
        if (response.data.message.success == true) {
          message.success(response.data.message.message);
          onClose();
        } else {
          message.error(response.data.message.message);
        }
      })
      .catch((error) => {
        setLoad(false);
        message.error('Something went wrong');
      });
  };

  useEffect(() => {
    if (departmentField.name.length > 0) {
      getSingleDepartment(departmentField.name).then((response) => {
        setUserData(
          response?.data?.data?.team?.map((value) => ({
            employee_name: value.team_name,
            name: value.team,
          })),
        );
      });
      setValue('department_name', departmentField.department_name);
      setValue('employee_name', {
        label: departmentField.employee_name,
        value: departmentField.employee_name,
        id: departmentField.employee_id,
      });
    } else {
      reset();
      setUserData([]);
    }
  }, [departmentField]);

  useEffect(() => {
    axios.get(`${apiMethod}/hrms.setup.get_team_list_for_hrms_dpt`).then((response) => {
      setDepartments(response?.data?.message);
    });
  }, []);

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[20, 30]} justify="center">
          <Col span={24}>
            <Row gutter={24} justify="center">
              <Col>
                <Title level={3} className="mb-0">
                  {title}
                </Title>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row gutter={[20, 30]}>
              {departmentFields().map((item, idx) => (
                <Fragment key={idx}>
                  <FormGroup item={item} control={control} errors={errors} />
                </Fragment>
              ))}
            </Row>
          </Col>
          <Col span={12}>
            <Row gutter={[24, 30]}>
              <Col span={24}>
                <AddUser
                  userData={userData}
                  setUserData={setUserData}
                  title="Teams"
                  department={{ bool: true, deptName: departmentField.name ? departmentField.name : '' }}
                  control={control}
                  allListing={departments}
                />
              </Col>
              <Col span={24}>
                <Row gutter={24}>
                  {departmentField.company.length == 0 ? (
                    <>
                      <Col span={12}>
                        <Button
                          size="large"
                          type="primary"
                          htmlType="button"
                          className="black-btn w-100"
                          onClick={onClose}
                        >
                          Close
                        </Button>
                      </Col>
                      <Col span={12}>
                        <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                          Add
                        </Button>
                      </Col>
                    </>
                  ) : (
                    <>
                      {allowed([Roles.SETUP], 'delete') && (
                        <Col span={12}>
                          <Button size="large" type="primary" className="red-btn w-100" onClick={onDeleteHoliday}>
                            Delete
                          </Button>
                        </Col>
                      )}
                      <Col span={12}>
                        <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                          Save
                        </Button>
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
