import React, { useState, useEffect, Fragment } from 'react';
import { Button, Row, Col, Typography, Form, message, Spin } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { holidayInputFields } from './FormFields';
import { addSingleHoliday, updateSingleHoliday, deleteSingleHoliday } from '../../../../ducks/services';
import moment from 'moment';
import { LoadingOutlined } from '@ant-design/icons';
import { allowed } from '../../../../../../../../routing/config/utils';
import Roles from '../../../../../../../../routing/config/Roles';
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { title, onClose, holidayFields } = props;
  console.log({ holidayFields });
  const { Title, Text } = Typography;
  const [load, setLoad] = useState(false);
  const { control, errors, setValue, reset, handleSubmit } = useForm();

  const onFinish = (values) => {
    setLoad(true);
    const payload = {
      holiday_name: values.holiday_name,
      holiday_date: moment(values.holiday_date).format('YYYY-MM-DD'),
      note: values.note,
    };
    holidayFields.holiday.length == 0
      ? addSingleHoliday(payload)
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
      : updateSingleHoliday(holidayFields.name, {
          holiday_name: values.holiday_name,
          holiday_date: moment(values.holiday_date).format('YYYY-MM-DD'),
          note: values.note,
        })
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

  const onDeleteHoliday = () => {
    setLoad(true);
    deleteSingleHoliday(holidayFields.name)
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
  };

  useEffect(() => {
    if (holidayFields.holiday.length > 0) {
      setValue('holiday_name', holidayFields.holiday);
      console.log(holidayFields?.date);
      setValue('holiday_date', holidayFields?.date ? moment(holidayFields?.date, 'YYYY-MM-DD') : '');
      setValue('note', holidayFields.note);
    } else {
      reset();
    }
  }, [holidayFields]);

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <Title level={3}>{title}</Title>
          </Col>
          <Col span={24}>
            <Row gutter={[20, 30]}>
              {holidayInputFields.map((item, idx) => (
                <Fragment key={idx}>
                  <FormGroup item={item} control={control} errors={errors} />
                </Fragment>
              ))}
              {holidayFields.holiday.length == 0 ? (
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
      </Form>
    </Spin>
  );
};
