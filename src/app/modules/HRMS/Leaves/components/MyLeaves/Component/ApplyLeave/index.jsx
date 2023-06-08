import React, { useEffect, useState } from 'react';
import { Typography, Col, Button, Form, Row, message, Space, Spin, Tag, Upload, Input } from 'antd';
import { TextAreaField, SelectField, DateField, InputField } from 'Atoms/FormElement';
import { useForm, Controller } from 'react-hook-form';
import { LeftOutlined, LoadingOutlined, PlusCircleFilled } from '@ant-design/icons';
import { uniquiFileName, getSingleUpload, dummyRequest, getFileName } from '../../../../../../../../features/utility';
import moment from 'moment';
import { apiMethod } from '../../../../../../../../configs/constants';
import axios from '../../../../../../../../services/axiosInterceptor';
import {
  getLeaveType,
  getLeaveData,
  getLeaveApprovers,
  getHolidaysList,
  getAllEmployee,
} from '../../../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { CheckboxGroup, InputCheckbox } from '../../../../../../../atoms/FormElement';
import { allowed } from '../../../../../../../../routing/config/utils';
import Roles from '../../../../../../../../routing/config/Roles';

const { Title } = Typography;
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [medicalLeave, setMedicalLeave] = useState(false);
  const [applyingForOthers, setApplyingForOthers] = useState(false);
  const [label, setLabel] = useState();
  const { control, handleSubmit, setValue, errors } = useForm();
  const { setAddVisible, id, updateApi, fullName } = props;
  const leaveTypeData = useSelector((state) => state.leaves.leaveTypeData);
  const leaveInfoData = useSelector((state) => state.leaves.leaveInfoData);
  const leaveApproversData = useSelector((state) => state.leaves.leaveApproversData);
  const holidaysListData = useSelector((state) => state.leaves.holidaysListData);
  const employeeListData = useSelector((state) => state.leaves.employeeList);
  const [formDate, setFromDate] = useState(null);

  useEffect(() => {
    dispatch(getLeaveType());
    dispatch(getHolidaysList(id));
    dispatch(getAllEmployee());
  }, []);

  const onLeaveChange = (e) => {
    dispatch(getLeaveData(e.label, id));
    dispatch(getLeaveApprovers(e.label, id));
    setLabel(e.label);

    if (e?.label == 'Medical Leave') {
      setMedicalLeave(true);
    } else {
      setMedicalLeave(false);
    }
  };

  const onFinish = async (val) => {
    setLoad(true);
    let attachment = '';
    if (val.attachment?.file) {
      let modifiedName = uniquiFileName(val.attachment?.file?.originFileObj.name);
      let res = await getSingleUpload(
        modifiedName,
        'image',
        val.attachment?.file?.originFileObj,
        'HRMS Leave Application',
        id,
      );
      attachment = res?.file_url;
    }
    const startDate = moment(val?.leaveStart);
    const endDate = moment(val?.leaveEnd);
    const daysDiff = endDate.diff(startDate, 'days') + 1;
    var leaves_count = parseFloat(0);

    if (holidaysListData?.leaves_criteria?.length > 0) {
      for (
        var currentDate = new Date(startDate);
        currentDate <= endDate;
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        if (currentDate.getDay() == 0) {
          leaves_count =
            leaves_count +
            parseFloat(holidaysListData?.leaves_criteria?.find((resp) => 'Sunday' == resp?.week_days)?.leave_days);
        } else if (currentDate.getDay() == 6) {
          leaves_count =
            leaves_count +
            (holidaysListData?.work_hour_template_hours?.find((resp) => 'Saturday' == resp?.day)?.work_hour_type ==
            'Rest Day'
              ? 0
              : parseFloat(
                  holidaysListData?.leaves_criteria?.find((resp) => 'Saturday' == resp?.week_days)?.leave_days,
                ));
        } else if (currentDate.getDay() == 1) {
          leaves_count =
            leaves_count +
            parseFloat(holidaysListData?.leaves_criteria?.find((resp) => 'Monday' == resp?.week_days)?.leave_days);
        } else if (currentDate.getDay() == 2) {
          leaves_count =
            leaves_count +
            parseFloat(holidaysListData?.leaves_criteria?.find((resp) => 'Tuesday' == resp?.week_days)?.leave_days);
        } else if (currentDate.getDay() == 3) {
          leaves_count =
            leaves_count +
            parseFloat(holidaysListData?.leaves_criteria?.find((resp) => 'Wednesday' == resp?.week_days)?.leave_days);
        } else if (currentDate.getDay() == 4) {
          leaves_count =
            leaves_count +
            parseFloat(holidaysListData?.leaves_criteria?.find((resp) => 'Thursday' == resp?.week_days)?.leave_days);
        } else if (currentDate.getDay() == 5) {
          leaves_count =
            leaves_count +
            parseFloat(holidaysListData?.leaves_criteria?.find((resp) => 'Friday' == resp?.week_days)?.leave_days);
        } else {
          leaves_count = leaves_count + 1;
        }
      }
    } else {
      leaves_count = daysDiff;
    }

    if (holidaysListData?.holidays_list?.length > 0) {
      holidaysListData?.holidays_list?.map((e) => {
        var dateChecking = moment(e).isBetween(startDate, endDate, 'days', '[]');
        if (dateChecking) {
          leaves_count = leaves_count - 1;
        }
      });
    }

    if (val?.leavePeriod.value && val?.leavePeriod.value === 'Half Day') {
      leaves_count = leaves_count - 0.5;
    }
    let approvers = [];
    leaveApproversData?.map((resp) => {
      approvers.push({
        approver: resp?.approver,
        status: 'Pending',
        doctype: 'HRMS Leave Application Approver',
        approver_id: resp?.approver_id,
      });
    });

    let temp = {
      employee_id:
        applyingForOthers && applyingForOthers?.length > 0 && applyingForOthers[0] == 1 ? val?.applyer_id?.value : id,
      leave_type: val?.leaveType.label,
      total_leaves: leaveInfoData[0]?.total_leaves,
      available_leaves: leaveInfoData[0]?.available_leaves,
      leaves_taken: leaveInfoData[0]?.taken_leaves,
      role: '',
      job_title: '',
      leave_type_name: val?.leaveType.value,
      leave_period: val?.leavePeriod.value,
      start_date: val?.leaveStart ? moment(val?.leaveStart).format('YYYY-MM-DD') : '',
      end_date: val?.leaveEnd ? moment(val?.leaveEnd).format('YYYY-MM-DD') : '',
      total_leave_days: val?.leaveType?.label === 'Paternity Leave' ? daysDiff : leaves_count,
      application_status: 'Pending',
      reason: val?.reason,
      attachment: attachment ? attachment : '',
      doctype: 'HRMS Leave Application',
      employee_name: fullName,
      //date_of_joining: "2020-03-01",
      leave_approvers: approvers,
      applyer_id: id,
      apply_for_other: applyingForOthers && applyingForOthers?.length > 0 && applyingForOthers[0] == 1 ? 1 : 0,
    };

    //console.log('temp', daysDiff, temp);

    let url = `${apiMethod}/hrms.leaves_api.leave_create_with_validation`;
    try {
      const res = await axios.post(url, temp);
      if (res.data.message.success == false) {
        message.error(res.data.message.message);
        setLoad(false);
      } else {
        message.success('Leave Applied Successfully');
        setLoad(false);
        setTimeout(() => {
          setAddVisible(false);
          updateApi();
        }, 1000);
      }
    } catch (e) {
      const { response } = e;
      message.error(e);
      setLoad(false);
    }
  };

  const disableDate = (current) => {
    if (formDate) {
      return current && current < moment(formDate, 'YYYY-MM-DD');
    }
  };

  const applyForOther = (e) => {
    setApplyingForOthers(e);
  };

  const otherEmployee = (e) => {
    dispatch(getLeaveData(label, e?.value));
    dispatch(getLeaveApprovers(label, e?.value));
    dispatch(getHolidaysList(e?.value));
  };

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <Space direction="vertical" size={20}>
              <Button
                type="link"
                className="c-gray-linkbtn p-0 mt-1"
                onClick={() => setAddVisible(false)}
                htmlType="button"
              >
                <LeftOutlined /> Pending Leave Application
              </Button>
              <Title level={4} className="c-default mb-0">
                Apply Leave
              </Title>
            </Space>
          </Col>
          <Col span={8}>
            <SelectField
              fieldname="leaveType"
              label="Leave Type"
              control={control}
              class="mb-0"
              iProps={{ placeholder: 'Please select' }}
              initValue=""
              onChange={onLeaveChange}
              isRequired={true}
              rules={{
                required: 'Leave Type required',
              }}
              validate={errors.leaveType && 'error'}
              validMessage={errors.leaveType && errors.leaveType.message}
              selectOption={
                leaveTypeData &&
                leaveTypeData?.map((e) => {
                  return { value: e.name, label: e.leave_type };
                })
              }
            />
          </Col>

          {medicalLeave && (
            <Col span={8}>
              <Form.Item
                label="Medical Certificate"
                required={true}
                validateStatus={errors.attachment && 'error'}
                help={errors.attachment && errors.attachment.message}
              >
                <Controller
                  name="attachment"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'Leave Type required',
                  }}
                  render={({ value, onChange }) => (
                    <Upload
                      className="uploadWithbtn"
                      showUploadList={false}
                      accept="image/*,.pdf"
                      maxCount={1}
                      customRequest={dummyRequest}
                      onChange={(e) => onChange(e)}
                    >
                      <Input
                        size="large"
                        className="ag-upload-btn"
                        value={value ? value.fileList[0].name : 'Please Upload File'}
                        addonAfter={<PlusCircleFilled />}
                      />
                    </Upload>
                  )}
                />
              </Form.Item>
            </Col>
          )}

          <Col span={8}>
            <DateField
              fieldname="leaveStart"
              label="Leave Start"
              control={control}
              class="mb-0"
              iProps={{ placeholder: 'Please Select date', size: 'large', format: 'DD-MM-YYYY' }}
              initValue=""
              onChange={(e) => {
                setFromDate(e);
                setValue('leaveEnd', null);
              }}
              isRequired={true}
              rules={{
                required: 'Leave Start required',
              }}
              validate={errors.leaveStart && 'error'}
              validMessage={errors.leaveStart && errors.leaveStart.message}
            />
          </Col>

          <Col span={8}>
            <DateField
              fieldname="leaveEnd"
              label="Leave End"
              control={control}
              class="mb-0"
              iProps={{
                placeholder: 'Please Select date',
                size: 'large',
                format: 'DD-MM-YYYY',
                disabledDate: disableDate,
              }}
              initValue=""
              isRequired={true}
              rules={{
                required: 'Leave End required',
              }}
              validate={errors.leaveEnd && 'error'}
              validMessage={errors.leaveEnd && errors.leaveEnd.message}
            />
          </Col>

          <Col span={8}>
            <SelectField
              fieldname="leavePeriod"
              label="Leave Period"
              control={control}
              class="mb-0"
              iProps={{ placeholder: 'Please select' }}
              initValue=""
              selectOption={[
                { value: 'Full Day', label: 'Full Day' },
                { value: 'Half Day', label: 'Half Day' },
              ]}
              isRequired={true}
              rules={{
                required: 'Leave Period required',
              }}
              validate={errors.leavePeriod && 'error'}
              validMessage={errors.leavePeriod && errors.leavePeriod.message}
            />
          </Col>

          <Col span={8}>
            <InputField
              fieldname="reason"
              label="Reason"
              control={control}
              class="mb-0"
              iProps={{ placeholder: 'Please state', size: 'large' }}
              initValue=""
              isRequired={true}
              rules={{
                required: 'Reason required',
              }}
              validate={errors.reason && 'error'}
              validMessage={errors.reason && errors.reason.message}
            />
          </Col>

          {(allowed([Roles.LEAVES], 'read') || allowed([Roles.LEAVES_TEAMS], 'read')) && (
            <Col span={24}>
              <CheckboxGroup
                fieldname="apply_for_other"
                class="blue_square"
                label=""
                control={control}
                initValue={0}
                option={[{ label: 'Apply for others?', value: 1 }]}
                onChange={applyForOther}
              />

              {applyingForOthers && applyingForOthers?.length > 0 && applyingForOthers[0] == 1 && (
                <div className="w-100">
                  <SelectField
                    fieldname="applyer_id"
                    label="Staff Name"
                    control={control}
                    class="mb-0"
                    iProps={{ placeholder: 'Please select' }}
                    initValue=""
                    isRequired={true}
                    onChange={otherEmployee}
                    rules={{
                      required: 'Staff Name required',
                    }}
                    validate={errors.applyer_id && 'error'}
                    validMessage={errors.applyer_id && errors.applyer_id.message}
                    selectOption={
                      employeeListData &&
                      employeeListData?.map((e) => {
                        return { value: e.name, label: e.employee_name };
                      })
                    }
                  />
                </div>
              )}
            </Col>
          )}

          {leaveApproversData?.length > 0 && (
            <>
              <Col span={24}>
                <Title level={4} className="c-default mb-0">
                  Approvers
                </Title>
              </Col>
              {leaveApproversData?.map((e) => (
                <Col span={24}>
                  <Row>
                    <Col span={8}>
                      <Tag className="program-list">
                        <span className="p-name">{e?.approver}</span>
                      </Tag>
                    </Col>
                  </Row>
                </Col>
              ))}
            </>
          )}

          <Col span={24}>
            <Row gutter={[20, 20]} justify="end">
              <Col flex="0 1 200px">
                <Button
                  type="primary"
                  size="large"
                  htmlType="button"
                  className="w-100 black-btn"
                  onClick={() => setAddVisible(false)}
                >
                  Cancel
                </Button>
              </Col>
              <Col flex="0 1 200px">
                <Button type="primary" size="large" htmlType="submit" className="w-100 green-btn">
                  Apply
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
