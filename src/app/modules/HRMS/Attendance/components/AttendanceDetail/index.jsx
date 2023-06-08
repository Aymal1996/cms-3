import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Form, Button, message, Spin } from 'antd';
import { DateField, InputField, SelectField, TextAreaField, TimeField } from '../../../../../atoms/FormElement';
import { useForm } from 'react-hook-form';
import { updateAttendance } from '../../ducks/services';
import moment from 'moment';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined spin />;

const AttendanceDetails = (props) => {
  const { attendanceData, onViewForm } = props;
  const { Title } = Typography;
  const [load, setLoad] = useState(false);
  const { control, errors, setValue, handleSubmit } = useForm();

  useEffect(() => {
    if (attendanceData) {
      setValue('attendance_date', attendanceData?.date ? moment(attendanceData?.date, 'YYYY-MM-DD') : '');
      setValue('attendance_date_out', attendanceData?.date ? moment(attendanceData?.date, 'YYYY-MM-DD') : '');
      setValue('total_job_hour', attendanceData?.total_work_hour);
      setValue('status', { value: attendanceData?.status, label: attendanceData.status });
      setValue('time_in', attendanceData?.time_in !== '0:00:00' ? moment(attendanceData?.time_in, 'h:mm:ss a') : '');
      setValue('time_out', attendanceData?.time_out !== '0:00:00' ? moment(attendanceData?.time_out, 'h:mm:ss a') : '');
      setValue('remarks', attendanceData?.remarks);
    }
  }, [attendanceData]);

  const onSubmitHandler = (values) => {
    const payload = {
      employee: attendanceData.employee_id,
      attendance_date: moment(values.attendance_date).format('YYYY-MM-DD'),
      attendance_date_out: moment(values.attendance_date_out).format('YYYY-MM-DD'),
      time_in: moment(values.time_in).format('HH:mm:ss'),
      time_out: values.time_out ? moment(values.time_out).format('HH:mm:ss') : '00:00:00',
      remarks: values.remarks,
    };
    setLoad(true);
    updateAttendance(attendanceData.name, payload).then((response) => {
      if (response.data.message.success == true) {
        message.success(response.data.message.message);
      } else {
        message.error(response.data.message.message);
      }
      setLoad(false);
      onViewForm(false);
    });
  };

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form layout="vertical" scrollToFirstError={true} onFinish={handleSubmit(onSubmitHandler)}>
        <Row gutter={[24, 30]} align="bottom">
          <Col span={24}>
            <Title level={4} className="mb-0">
              Attendance Details
            </Title>
          </Col>
          <Col span={12}>
            <DateField
              fieldname="attendance_date"
              label="Date In"
              control={control}
              class="mb-0"
              iProps={{ placeholder: 'Please Select date', size: 'large', format: 'DD-MM-YYYY', disabled: true }}
              initValue=""
              validate={errors.attendance_date && 'error'}
              validMessage={errors.attendance_date && errors.attendance_date.message}
            />
          </Col>
          <Col span={12}>
            <DateField
              fieldname="attendance_date_out"
              label="Date Out"
              control={control}
              class="mb-0"
              iProps={{ placeholder: 'Please Select date', size: 'large', format: 'DD-MM-YYYY', disabled: true }}
              initValue=""
              validate={errors.attendance_date_out && 'error'}
              validMessage={errors.attendance_date_out && errors.attendance_date_out.message}
            />
          </Col>
          <Col span={12}>
            <TimeField
              fieldname="time_in"
              label="Time In"
              control={control}
              class="mb-0"
              iProps={{ placeholder: 'Please Select time', size: 'large', format: 'h:mm:ss a' }}
              initValue=""
              validate={errors.time_in && 'error'}
              validMessage={errors.time_in && errors.time_in.message}
            />
          </Col>
          <Col span={12}>
            <TimeField
              fieldname="time_out"
              label="Time Out"
              control={control}
              class="mb-0"
              iProps={{ placeholder: 'Please Select time', size: 'large', format: 'h:mm:ss a' }}
              initValue=""
              validate={errors.time_out && 'error'}
              validMessage={errors.time_out && errors.time_out.message}
            />
          </Col>
          <Col span={12}>
            <InputField
              fieldname="total_job_hour"
              label="Total Hours"
              control={control}
              class="mb-0"
              iProps={{ placeholder: 'hours', size: 'large', disabled: true }}
              initValue=""
              validate={errors.total_job_hour && 'error'}
              validMessage={errors.total_job_hour && errors.total_job_hour.message}
            />
          </Col>
          <Col span={12}>
            <SelectField
              fieldname="status"
              label="Status"
              control={control}
              class="mb-0"
              iProps={{ placeholder: 'Please Select status', size: 'large', isDisabled: true }}
              initValue=""
              selectOption={[
                { value: 'On Duty', label: 'On Duty' },
                { value: 'Absent', label: 'Absent' },
                { value: 'Present', label: 'Present' },
              ]}
              validate={errors.date_out && 'error'}
              validMessage={errors.date_out && errors.date_out.message}
            />
          </Col>
          <Col span={24}>
            <TextAreaField
              fieldname="remarks"
              label="Remarks"
              control={control}
              class="mb-0"
              iProps={{ placeholder: 'Remarks', size: 'large' }}
              initValue=""
            />
          </Col>
          <Col span={24}>
            <Row gutter={24} justify="end">
              <Col>
                <Button size="large" type="primary" htmlType="submit" className="green-btn">
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default AttendanceDetails;
