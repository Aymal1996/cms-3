import React, { useState, useEffect, Fragment } from 'react';
import { Space, Button, Row, Col, Typography, Form, message, Spin } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { addTerminatedEmployee, deleteTerminatedEmployee } from '../../../../ducks/services';
import { LoadingOutlined } from '@ant-design/icons';
import { allowed } from '../../../../../../../../routing/config/utils';
import Roles from '../../../../../../../../routing/config/Roles';
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { title, onClose, skill, employeeList } = props;
  const { Title, Text } = Typography;
  const [load, setLoad] = useState(false);
  const { control, errors, setValue, reset, handleSubmit } = useForm();
  console.log('skill', skill)
  const raceFields = [
    {
      type: 'select',
      name: 'employee',
      label: 'Terminated Employee',
      placeholder: 'Please Select',
      twocol: true,
      req: true,
      reqmessage: 'Please select',
      options: employeeList.map((value) => ({ label: value.employee_name, value: value.name })),
    },
  ];

  const onFinish = (values) => {
    console.log('values', values)
    setLoad(true);
    const employee_id = values.employee?.value

    addTerminatedEmployee(employee_id)
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
      })
  };

  const onDeleteNationality = () => {
    setLoad(true);
    deleteTerminatedEmployee(skill.employee_id)
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
    if (skill.employee_name.length > 0) {
      setValue('employee', { label: skill.employee_name, value: skill.employee_id });
    } else {
      reset();
    }
  }, [skill]);

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <Title level={3}>{title}</Title>
          </Col>

          <Col span={24}>
            <Row gutter={[20, 30]}>
              {raceFields.map((item, idx) => (
                <Fragment key={idx}>
                  <FormGroup item={item} control={control} errors={errors} />
                </Fragment>
              ))}
              {skill.employee_name.length == 0 ? (
                <>
                  <Col span={12}>
                    <Button size="large" type="primary" htmlType="button" className="black-btn w-100" onClick={onClose}>
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
                      <Button size="large" type="primary" className="red-btn w-100" onClick={onDeleteNationality}>
                        Delete
                      </Button>
                    </Col>
                  )}
                  {/* <Col span={12}>
                    <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                      Save
                    </Button>
                  </Col> */}
                </>
              )}
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
