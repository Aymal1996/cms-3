import React, { Fragment, useEffect, useState } from 'react';
import { Button, Row, Col, Typography, Form, message, Spin } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { institution } from './FormFields';
import { addInstitution, deleteSingleInstitution, updateSingleInstitution } from '../../../../ducks/services';
import { LoadingOutlined } from '@ant-design/icons';
import { allowed } from '../../../../../../../../routing/config/utils';
import Roles from '../../../../../../../../routing/config/Roles';
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { title, onClose, institutionName } = props;
  const { Title, Text } = Typography;
  const [load, setLoad] = useState(false);
  const { control, errors, reset, setValue, handleSubmit } = useForm();

  const onFinish = (values) => {
    setLoad(true);
    const payload = {
      name1: values.institution,
      code: values.institution,
      doctype: 'Institutions',
    };
    institutionName.Institution.length == 0
      ? addInstitution(payload).then((response) => {
        setLoad(false);
          if (response.data.message.success == true) {
            message.success(response.data.message.message);
            onClose();
          } else {
            message.error(response.data.message.message);
          }
        }).catch((error) => {
          setLoad(false);
          message.error('Something went wrong')
        })
      : updateSingleInstitution(institutionName.name, { name1: values.institution, doctype: 'Institutions' }).then(
          (response) => {
            setLoad(false);
            if (response.data.message.success == true) {
              message.success(response.data.message.message);
              onClose();
            } else {
              message.error(response.data.message.message);
            }
          }).catch((error) => {
          setLoad(false);
          message.error('Something went wrong')
        });
  };
  const onDeleteEducationField = () => {
    setLoad(true);
    deleteSingleInstitution(institutionName.name)
    .then((response) => {
      message.success('Institution Deleted Successfully');
      setLoad(false);
        onClose();
      })
      .catch((error) => {
        message.error('Institution Deleted Unsccessfully');
        setLoad(false)
      });
  };
  useEffect(() => {
    if (institutionName.Institution.length > 0) {
      setValue('institution', institutionName.Institution);
    } else {
      reset();
    }
  }, [institutionName]);

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <Title level={3}>{title}</Title>
          </Col>
          <Col span={24}>
            <Row gutter={[20, 30]}>
              {institution.map((item, idx) => (
                <Fragment key={idx}>
                  <FormGroup item={item} control={control} errors={errors} />
                </Fragment>
              ))}
              {institutionName.Institution.length == 0 ? (
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
