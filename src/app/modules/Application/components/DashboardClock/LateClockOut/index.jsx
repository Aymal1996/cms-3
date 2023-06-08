import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Spin, Form, Typography, Button, message } from 'antd';
import { useForm } from 'react-hook-form';
// import { formFields } from './FormFields';
// import FormGroup from 'Molecules/FormGroup';
import { LoadingOutlined } from '@ant-design/icons';
import { lateClockOutReason } from '../../../ducks/services';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { getCheckInData } from '../../../ducks/actions';
import { TextAreaField, SelectField, DateField, InputField } from 'Atoms/FormElement';
import { timelap } from '../../../../../../configs/constantData';

const antIcon = <LoadingOutlined spin />;

const LateclockOut = (props) => {
  const { title, onClose, lateData } = props;
  const { Title, Text } = Typography;
  const [load, setLoad] = useState(false);
  const { control, errors, setValue, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const company = JSON.parse(localStorage.getItem('userdetails'))?.user_employee_detail[0].company;

  const onFormSubmitHandler = (values) => {
    setLoad(true);
    let time = values?.hour.concat(':', values?.min, ' ', values.time_type.value);
    console.log({ time });
    const payload = {
      company: company,
      employee_id: lateData?.employee,
      attendance_id: lateData?.name,
      clock_in_date: moment(values?.clock_in_date, 'Do MMMM YYYY').format('YYYY-MM-DD'),
      clock_in_time: moment(values?.clock_in_time, 'hh:mm A').format('HH:mm:ss'),
      clock_out_date: moment(values?.clock_out_date, 'Do MMMM YYYY').format('YYYY-MM-DD'),
      clock_out_time: moment(time, 'hh:mm A').format('HH:mm:ss'),
      reason: values?.reason,
    };
    console.log('payload', payload);
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
        message.error('Something went wrong');
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

  const disableDate = (current) => {
    const startDate = moment(lateData?.attendance_date);
    if (startDate) {
      return (current && current < moment(startDate, 'YYYY-MM-DD')) || current > moment().endOf('day');
    }
  };
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
              {/* {formFields.map((item, idx) => (
                <Fragment key={idx}>
                  {item?.subheader && (
                    <Col span={24}>
                      <Text className="mb-0 c-gray">{item.subheader}</Text>
                    </Col>
                  )}
                  <FormGroup item={item} control={control} errors={errors} />
                </Fragment>
              ))} */}

              <Col span={24}>
                <InputField
                  fieldname="clock_in_date"
                  label="Clock in Date"
                  control={control}
                  class="mb-0"
                  iProps={{ placeholder: 'Clock in Date', size: 'large', format: 'Do MMMM YYYY', disabled: true }}
                  initValue=""
                />
              </Col>

              <Col span={24}>
                <InputField
                  fieldname="clock_in_time"
                  label="Clock in Time"
                  control={control}
                  class="mb-0"
                  iProps={{ placeholder: 'Clock in Time', size: 'large', disabled: true }}
                  initValue=""
                />
              </Col>

              <Col span={24}>
                <DateField
                  fieldname="clock_out_date"
                  label="Clock out date"
                  control={control}
                  class="mb-0"
                  iProps={{
                    placeholder: 'Clock out date',
                    size: 'large',
                    format: 'DD-MM-YYYY',
                    disabledDate: disableDate,
                  }}
                  initValue=""
                  isRequired={true}
                  rules={{
                    required: 'Clock out date required',
                  }}
                  validate={errors.clock_out_date && 'error'}
                  validMessage={errors.clock_out_date && errors.clock_out_date.message}
                />
              </Col>

              <Col span={24}>
                <div style={{ color: '#7C7C7C', fontSize: '12px' }}>Clock out Time</div>
                <Row gutter={[20, 30]}>
                  <Col flex="0 0 80px">
                    <InputField
                      fieldname="hour"
                      label=""
                      control={control}
                      class="mb-0"
                      iProps={{ placeholder: '', size: 'large', number: true, min: 1, max: 12 }}
                      initValue=""
                      isRequired={true}
                      rules={{
                        required: 'Hours required',
                      }}
                      validate={errors.hour && 'error'}
                      validMessage={errors.hour && errors.hour.message}
                    />
                  </Col>

                  <Col flex="0 0 80px">
                    <InputField
                      fieldname="min"
                      label=""
                      control={control}
                      class="mb-0"
                      iProps={{ placeholder: '', size: 'large', number: true, min: 0, max: 59 }}
                      initValue=""
                      isRequired={true}
                      rules={{
                        required: 'Minutes required',
                      }}
                      validate={errors.min && 'error'}
                      validMessage={errors.min && errors.min.message}
                    />
                  </Col>

                  <Col flex="1 0 auto">
                    <SelectField
                      fieldname="time_type"
                      label=""
                      class="mb-0 w-100"
                      initValue={{}}
                      control={control}
                      iProps={{ placeholder: 'Please select Type' }}
                      selectOption={timelap}
                      isRequired={true}
                      rules={{
                        required: 'Time Type required',
                      }}
                      validate={errors.time_type && 'error'}
                      validMessage={errors.time_type && errors.time_type.message}
                    />
                  </Col>
                </Row>
              </Col>

              <Col span={24}>
                <TextAreaField
                  fieldname="reason"
                  label="Reason"
                  control={control}
                  class="mb-0"
                  iProps={{ placeholder: 'Please specify reason...', size: 'large' }}
                  initValue=""
                  isRequired={true}
                  rules={{
                    required: 'Reason required',
                  }}
                  validate={errors.reason && 'error'}
                  validMessage={errors.reason && errors.reason.message}
                />
              </Col>
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
