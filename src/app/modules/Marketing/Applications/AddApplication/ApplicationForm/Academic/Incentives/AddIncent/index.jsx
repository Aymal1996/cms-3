import React from 'react';
import { Row, Col, Typography, Form, Button } from 'antd';
import { useForm } from 'react-hook-form';
import { SelectField } from 'Atoms/FormElement';

const { Title } = Typography;

export default (props) => {

  const { data, onAdd } = props;
  const { control, errors, handleSubmit } = useForm();

  const onFinish = (val) => {
      console.log('val', val)
    onAdd(val.incentive.value);
  };

  return (
      <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[20, 30]} align='middle'>
          <Col span={24}>
              <Title level={3} className="mb-0 text-center">Add Incentive</Title>
          </Col>
          <Col span={24}>
            <SelectField 
            isRequired={true}
            fieldname='incentive'
            label='Incentive Name'
            control={control}
            class='mb-0'
            iProps={{ size: 'large', placeholder: 'Select one'}}
            rules={{required: 'required'}}
            initValue=''
            selectOption={data.map(x => ({label: x.incentive_name, value: x.name}))}
            validate={errors.incentive && 'error'}
            // validMessage={errors.credit && errors.credit.message}
            />
          </Col>
          <Col>
            <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
              Add
            </Button>
          </Col>
        </Row>
      </Form>
  );
};