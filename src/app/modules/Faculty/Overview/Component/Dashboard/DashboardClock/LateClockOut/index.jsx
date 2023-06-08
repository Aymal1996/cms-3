import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Card, Spin, Form, Typography, Button, message } from 'antd';
import { useForm } from 'react-hook-form';
import { formFields } from './FormFields';
import FormGroup from '../../../../../molecules/FormGroup';
import { LoadingOutlined } from '@ant-design/icons';
import { lateClockOutReason } from '../../../ducks/services';
import { useDispatch } from 'react-redux';

const antIcon = <LoadingOutlined spin />;
import moment from 'moment';
import { getCheckInData } from '../../../ducks/actions';

const LateclockOut = (props) => {
  const { title, onClose, lateData } = props;
  const { Title, Text } = Typography;
  const [load, setLoad] = useState(false);
  const { control, errors, setValue, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onFormSubmitHandler = (values) => {
    setLoad(true);
    let time = values?.hour.concat(':', values?.min, ' ', values.time_type.value);
    console.log({ time });
    const payload = {
      company: 'Limkokwing University Creative Technology',
      employee_id: lateData?.employee,
      attendance_id: lateData?.name,
      clock_in_date: moment(values?.clock_in_date, 'Do MMMM YYYY').format('YYYY-MM-DD'),
      clock_in_time: moment(values?.clock_in_time, 'hh:mm A').format('HH:mm:ss'),
      clock_out_date: moment(values?.clock_out_date, 'Do MMMM YYYY').format('YYYY-MM-DD'),
      clock_out_time: moment(time, 'hh:mm A').format('HH:mm:ss'),
      reason: values?.reason,
    };
    lateClockOutReason(payload)
      .then((response) => {
        if (response.data.message.success == true) {
          message.success(response.data.message.message);
          dispatch(getCheckInData(lateData?.employee));
        } else {
          message.error(response.data.message.message);
        }
        setLoad(false);
        onClose();
      })
      .catch((e) => {
        message.error('Something went worong');
        setLoad(false);
        onClose();
      });
    // .catch(() => {
    //   message.error('Something went worong');
    //   setLoad(false);
    //   onClose();
    // });
  };

  useEffect(() => {
    console.log({ lateData });
    if (Object.entries(lateData).length) {
      setValue('clock_in_date', moment(lateData?.attendance_date).format('Do MMMM YYYY'));
      setValue('clock_in_time', moment(lateData?.time_in, 'hh:mm:ss').format('hh:mm A'));
    }
  }, [lateData]);
  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFormSubmitHandler)}>
        <Row gutter={[20, 30]} justify="center">
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
            <Row gutter={[20, 30]}>
              {formFields.map((item, idx) => (
                <Fragment key={idx}>
                  {item?.subheader && (
                    <Col span={24}>
                      <Text className="mb-0 c-gray">{item.subheader}</Text>
                    </Col>
                  )}
                  <FormGroup item={item} control={control} errors={errors} />
                </Fragment>
              ))}
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={24}>
              <Col span={12}>
                <Button size="large" type="primary" htmlType="button" className="black-btn w-100" onClick={onClose}>
                  Close
                </Button>
              </Col>
              <Col span={12}>
                <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                  Save
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default LateclockOut;
