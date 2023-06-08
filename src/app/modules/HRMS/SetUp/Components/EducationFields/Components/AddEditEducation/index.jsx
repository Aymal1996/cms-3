import React, { Fragment, useEffect, useState } from 'react';
import { Button, Row, Col, Typography, Form, message, Spin } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { educationFields } from './FormFields';
import { addEducationField, deleteSingleEducation, updateSingleEducation } from '../../../../ducks/services';
import { LoadingOutlined } from '@ant-design/icons';
import { allowed } from '../../../../../../../../routing/config/utils';
import Roles from '../../../../../../../../routing/config/Roles';
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { title, onClose, educationField } = props;
  const { Title, Text } = Typography;
  const [load, setLoad] = useState(false);
  const { control, errors, reset, setValue, handleSubmit } = useForm();

  const onFinish = (values) => {
    setLoad(true);
    educationField.education_field.length == 0
      ? addEducationField(values).then((response) => {
          if (response.data.message.success == true) {
            message.success(response.data.message.message);
          } else {
            message.error(response.data.message.message);
          }
          setLoad(false);
          onClose();
        })
      : updateSingleEducation(educationField.name, values).then((response) => {
          if (response.data.message.success == true) {
            message.success(response.data.message.message);
          } else {
            message.error(response.data.message.message);
          }
          setLoad(false);
          onClose();
        });
  };
  const onDeleteEducationField = () => {
    setLoad(true);
    deleteSingleEducation(educationField.name)
      .then((response) => {
        if (response.data.message.success == true) {
          message.success(response.data.message.message);
        } else {
          message.error(response.data.message.message);
        }
        setLoad(false);
        onClose();
      })
      .catch((error) => {
        message.error('Education Field Deleted Unsccessfully');
        onClose();
      });
  };
  useEffect(() => {
    if (educationField.education_field.length > 0) {
      setValue('education_field', educationField.education_field);
    } else {
      reset();
    }
  }, [educationField]);

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <Title level={3}>{title}</Title>
          </Col>
          <Col span={24}>
            <Row gutter={[20, 30]}>
              {educationFields.map((item, idx) => (
                <Fragment key={idx}>
                  <FormGroup item={item} control={control} errors={errors} />
                </Fragment>
              ))}
              {educationField.education_field.length == 0 ? (
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
                    <Button size="large" type="primary" className="red-btn w-100" onClick={onDeleteEducationField}>
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
