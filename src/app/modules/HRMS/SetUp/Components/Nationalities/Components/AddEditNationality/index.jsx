import React, { useState, useEffect, Fragment } from 'react';
import { Button, Row, Col, Typography, Form, message, Spin } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { nationalityFields } from './FormFields';
import { addCountry, deleteSingleCountry, updateSingleCountry } from '../../../../ducks/services';
import { LoadingOutlined } from '@ant-design/icons';
import { allowed } from '../../../../../../../../routing/config/utils';
import Roles from '../../../../../../../../routing/config/Roles';
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { title, onClose, countryName } = props;
  console.log({ countryName });
  const { Title, Text } = Typography;
  const [load, setLoad] = useState(false);
  const { control, errors, setValue, reset, handleSubmit } = useForm();

  const onFinish = (values) => {
    setLoad(true);
    const payload = {
      country_name: values.country_name,
      // code: values.country_name.substring(0, 3),
    };
    countryName.name.length == 0
      ? addCountry(payload)
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
      : updateSingleCountry(countryName.name, payload)
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
            message.error('Update Failed');
          });
  };
  const onDeleteNationality = () => {
    setLoad(true);
    deleteSingleCountry(countryName.name)
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
        message.error('Update Failed');
      });
  };
  useEffect(() => {
    if (countryName.name.length > 0) {
      console.log({ countryName }, 'asdfasd');
      setValue('country_name', countryName.country_name);
    } else {
      reset();
    }
  }, [countryName]);
  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <Title level={3}>{title}</Title>
          </Col>
          <Col span={24}>
            <Row gutter={[20, 30]}>
              {nationalityFields.map((item, idx) => (
                <Fragment key={idx}>
                  <FormGroup item={item} control={control} errors={errors} />
                </Fragment>
              ))}
              {countryName.name.length == 0 ? (
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
                  {/* {allowed([Roles.SETUP], 'delete') && 
                  <Col span={12}>
                    <Button size="large" type="primary" className="red-btn w-100" onClick={onDeleteNationality}>
                      Delete
                    </Button>
                  </Col>} */}
                  <Col span={24}>
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
