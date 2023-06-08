import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Typography, Form, Button, message, Spin } from 'antd';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { updateSalaryInformation } from '../../../ducks/services';
import FormGroup from '../../../../../../molecules/FormGroup';
import { salaryInformation } from './FormFields';
import { LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';
import { allowed } from '../../../../../../../routing/config/utils';
import Roles from '../../../../../../../routing/config/Roles';
const antIcon = <LoadingOutlined spin />;

const SalaryInformation = (props) => {
  const { id } = props;
  const { Title } = Typography;
  const [load, setLoad] = useState(false);
  const { control, errors, setValue, handleSubmit } = useForm();
  const financeDetails = useSelector((state) => state.hrmsfinance.financeDetailData);

  useEffect(() => {
    if (financeDetails) {
      setValue('currency_typeSalary', { value: 'RM', label: 'RM' });
      setValue('tax_currency_type', { value: 'RM', label: 'RM' });
      setValue('tax_amount', financeDetails?.tax_amount);
      setValue('salary_amount', financeDetails?.salary_amount);
      setValue('payment_method', { value: financeDetails?.payment_method, label: financeDetails?.payment_method });
      setValue('payment_frequency', {
        value: financeDetails?.payment_frequency,
        label: financeDetails?.payment_frequency,
      });
      setValue('payment_type', { value: financeDetails?.payment_type, label: financeDetails?.payment_type });
      setValue(
        'effective_date',
        financeDetails?.effective_date ? moment(financeDetails?.effective_date, 'YYYY-MM-DD') : '',
      );
    }
  }, [financeDetails]);

  const onSubmitHandler = (values) => {
    const payload = {
      salary_amount: values.salary_amount,
      payment_method: values.payment_method.label,
      payment_frequency: values.payment_frequency.label,
      payment_type: values.payment_type.label,
      effective_date: moment(values.effective_date).format('YYYY-MM-DD'),
      tax_amount: values.tax_amount,
    };
    setLoad(true);
    updateSalaryInformation(id, payload).then((response) => {
      message.success('Salary Information Update Successfully');
      setLoad(false);
    });
  };

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form layout="vertical" scrollToFirstError={true} onFinish={handleSubmit(onSubmitHandler)}>
        <Row gutter={[24, 30]} align="bottom">
          <Col span={24}>
            <Title level={4} className="mb-0">
              Salary Information
            </Title>
          </Col>
          {salaryInformation.map((item, index) => (
            <Fragment key={index}>
              {item?.subheader && (
                <Col span={24}>
                  <Title level={5} className="mb-0 c-default">
                    {item.subheader}
                  </Title>
                </Col>
              )}
              <FormGroup item={item} control={control} errors={errors} />
            </Fragment>
          ))}
          {allowed([Roles.HRMSFINANCE], 'write') && 
          <Col span={24}>
            <Row gutter={24} justify="end">
              <Col>
                <Button size="large" type="primary" htmlType="submit" className="green-btn save-btn">
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Col>}
        </Row>
      </Form>
    </Spin>
  );
};

export default SalaryInformation;
