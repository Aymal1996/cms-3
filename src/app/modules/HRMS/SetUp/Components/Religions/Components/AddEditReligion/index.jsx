import React, { useState, useEffect, Fragment } from 'react';
import { Space, Button, Row, Col, Typography, Form, message, Spin } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { religionFields } from './FormFields.js';
import { addSingleReligion, updateSingleReligion, deleteSingleReligion } from '../../../../ducks/services';
import { LoadingOutlined } from '@ant-design/icons';
import Roles from '../../../../../../../../routing/config/Roles';
import { allowed } from '../../../../../../../../routing/config/utils';
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { title, onClose, religion } = props;
  const { Title, Text } = Typography;
  const [load, setLoad] = useState(false);
  const { control, errors, setValue, reset, handleSubmit } = useForm();

  const onFinish = (values) => {
    setLoad(true);
    const payload = {
      name1: values.religion_name,
    };
    religion.religion.length == 0
      ? addSingleReligion(payload)
          .then((response) => {
            setLoad(false);
            if (response.data.message.success == true) {
              onClose();
              message.success(response.data.message.message);
            } else {
              message.error(response.data.message.message);
            }
          })
          .catch((error) => {
            setLoad(false);
            message.error('Something went wrong')
          })
      : updateSingleReligion(religion.name, payload)
          .then((response) => {
            setLoad(false);
            if (response.data.message.success == true) {
              onClose();
              message.success(response.data.message.message);
            } else {
              message.error(response.data.message.message);
            }
          })
          .catch((error) => {
            setLoad(false);
            message.error('Something went wrong')
          })
  };
  const onDeleteNationality = () => {
    setLoad(true);
    deleteSingleReligion(religion.name)
      .then((response) => {
        setLoad(false);
        if (response.data.message.success == true) {
          onClose();
          message.success(response.data.message.message);
        } else {
          message.error(response.data.message.message);
        }
      })
      .catch((error) => {
        setLoad(false);
        message.error('Something went wrong')
      })
  };

  useEffect(() => {
    if (religion.name.length > 0) {
      setValue('religion_name', religion.religion);
    } else {
      reset();
    }
  }, [religion]);

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <Title level={3}>{title}</Title>
          </Col>

          <Col span={24}>
            <Row gutter={[20, 30]}>
              {religionFields.map((item, idx) => (
                <Fragment key={idx}>
                  <FormGroup item={item} control={control} errors={errors} />
                </Fragment>
              ))}
              {religion.religion.length == 0 ? (
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
                {allowed([Roles.SETUP], 'delete') && 
                  <Col span={12}>
                    <Button size="large" type="primary" className="red-btn w-100" onClick={onDeleteNationality}>
                      Delete
                    </Button>
                  </Col>}
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
      </Form>
    </Spin>
  );
};
