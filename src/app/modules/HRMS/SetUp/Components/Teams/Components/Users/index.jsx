import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Form, Button } from 'antd';
import { SelectField } from '../../../../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { getDepartmentList } from '../../../../ducks/services';

const Users = (props) => {
  const company = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company;
  const { title, addNewUser, onClose, department } = props;
  const { Title } = Typography;
  const [departmentData, setDepartmentData] = useState([]);
  const { control, handleSubmit } = useForm();
  const employeeList = useSelector((state) => state.setup.employeeList);
  const onFinish = (values) => {
    addNewUser(values);
    onClose();
  };

  useEffect(() => {
    if (department?.bool) {
      getDepartmentList(department.deptName).then((response) => {
        let data = response?.data?.message;
        setDepartmentData(data);
      });
    }
  }, [department]);
  return (
    <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
      <Row gutter={[24, 30]}>
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
          <SelectField
            label={`Select ${department ? 'Team' : 'Employee'}`}
            fieldname="employee"
            class="mb-0 w-100"
            control={control}
            iProps={{ placeholder: 'Select one' }}
            selectOption={
              department?.bool
                ? departmentData.map((value) => ({ label: value.team_name, value: value.name }))
                : employeeList.map((value) => ({ label: value.employee_name, value: value.name }))
            }
          />
        </Col>
        <Col span={24}>
          <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Users;
