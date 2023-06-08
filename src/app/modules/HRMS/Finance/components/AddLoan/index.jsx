import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Form, Button, message, Spin } from 'antd';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import FormGroup from '../../../../../molecules/FormGroup';
import { addLoan } from './FormFileds';
import { SwitchField } from '../../../../../atoms/FormElement';
import { updateLoan, addNewLoan, deleteLoan } from '../../ducks/services';
import moment from 'moment';
import { LoadingOutlined } from '@ant-design/icons';
import { allowed } from '../../../../../../routing/config/utils';
import Roles from '../../../../../../routing/config/Roles';
const antIcon = <LoadingOutlined spin />;

const AddLoan = (props) => {
  const { data, onUpdateComplete } = props;
  const { id } = useParams();
  const [load, setLoad] = useState(false);
  const { control, errors, setValue, handleSubmit } = useForm();
  const { Title } = Typography;

  useEffect(() => {
    if (data?.name) {
      setValue('loan_type', { value: data.loan_type, label: data.loan_type });
      setValue('loan_ammount_type', { value: 'RM', label: 'RM' });
      setValue('amount', data.amount);
      setValue('loan_start_date', moment(data.loan_start_date, 'YYYY-MM-DD'));
      setValue('monthly_deduction', { value: 'RM', label: 'RM' });
      setValue('deduction_amount', data.deduction_amount);
      setValue('status', data.status === 'Completed' ? true : false);
    }
  }, [data]);

  const onSubmitHandler = (values) => {
    const payload = {
      amount: values?.amount,
      loan_start_date: moment(values?.loan_start_date).format('YYYY-MM-DD'),
      loan_type: values?.loan_type.label,
      deduction_amount: values?.deduction_amount,
      status: values?.status,
      loan_status: 'Active',
    };
    setLoad(true);
    data?.name
      ? updateLoan(data.name, payload).then((response) => {
          message.success(`${data.name} Updated Successfully`);
          setLoad(false);
          onUpdateComplete();
        })
      : addNewLoan({ employee_id: id, loan: { ...payload } }).then((response) => {
        setLoad(false);
          if (response.data.message.success === true) {
            message.success(`${response.data.message.message}`);
            onUpdateComplete();
          } else {
            message.error(`${response.data.message.message}`);
          }

        });
  };

  const onDeleteHandler = () => {
    setLoad(true);
    deleteLoan(data.name, { loan_status: 'Inactive' }).then((response) => {
      message.success(`Loan ${data.name} Deleted Seccussfully`);
      setLoad(false);
      onUpdateComplete();
    });
  };

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form layout="vertical" scrollToFirstError={true} onFinish={handleSubmit(onSubmitHandler)}>
        <Row gutter={[24, 30]} align="bottom">
          <Col span={24}>
            <Title level={4} className="mb-0">
              Loan Details
            </Title>
          </Col>
          {addLoan.map((value, key) => (
            <FormGroup key={key} item={value} control={control} errors={errors} />
          ))}
          <Col span={24}>
            <Row gutter={[20, 30]} justify="space-between">
              <Col>
                <Title level={5} className="c-gray">
                  Loan Completed
                </Title>
              </Col>
              <Col>
                <SwitchField
                  fieldname="status"
                  control={control}
                  iProps={{ size: 'large' }}
                  rules={{
                    setValueAs: (value) => (value == true ? 'Completed' : value != false ? value : 'Incomplete'),
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={24} justify="end">
              {data?.name ? (
                <>
                {allowed([Roles.HRMSFINANCE], 'delete') && 
                  <Col>
                    <Button onClick={onDeleteHandler} size="large" type="primary" className="red-btn">
                      Delete Loan
                    </Button>
                  </Col>}
                  {allowed([Roles.HRMSFINANCE], 'write') && 
                  <Col>
                    <Button size="large" type="primary" htmlType="submit" className="green-btn">
                      Save Changes
                    </Button>
                  </Col>}
                </>
              ) : (
                <Col>
                  <Button size="large" type="primary" htmlType="submit" className="green-btn">
                    Add Loan
                  </Button>
                </Col>
              )}
              {/* <Col>
              <Button size="large" type="primary" htmlType="submit" className="red-btn">
                Delete Loan
              </Button>
            </Col>
            <Col>
              <Button size="large" type="primary" htmlType="submit" className="green-btn">
                Save Changes
              </Button>
            </Col> */}
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default AddLoan;
