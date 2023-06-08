import React, { useState, useEffect, Fragment } from 'react';
import { Button, Row, Col, Typography, Form, Radio, message, Spin } from 'antd';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { leaveFields } from './FormFields';
import { InputRadio } from '../../../../../../../atoms/FormElement';
import { createLeave, updateSingleLeave, deleteSingleLeave } from '../../../../ducks/services';
import { getSingleLeave } from '../../../../ducks/actions';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { SelectField } from '../../../../../../../atoms/FormElement';
import { LoadingOutlined } from '@ant-design/icons';
import Roles from '../../../../../../../../routing/config/Roles';
import { allowed } from '../../../../../../../../routing/config/utils';
const antIcon = <LoadingOutlined spin />;
const initQ = {
  approver_level: '',
};
export default (props) => {
  const { title, onClose, leaveType } = props;
  const { Title, Text } = Typography;
  const [load, setLoad] = useState(false);
  const { control, errors, reset, setValue, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const singleLeaveValues = useSelector((state) => state.setup.singleLeave);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'approvers',
  });

  useEffect(() => {
    if (leaveType.name.length > 0) {
      dispatch(getSingleLeave(leaveType.name));
    } else {
      reset();
    }
  }, [leaveType]);

  useEffect(() => {
    if (Object.entries(singleLeaveValues).length > 0) {
      setLoad(true);
      setValue('leave_type', { label: singleLeaveValues?.leave_type, value: singleLeaveValues?.leave_type });
      setValue('contract_type', { label: singleLeaveValues?.contract_type, value: singleLeaveValues?.contract_type });
      setValue('gender', { label: singleLeaveValues?.gender, value: singleLeaveValues?.gender });
      setValue('marital_status', {
        label: singleLeaveValues?.marital_status,
        value: singleLeaveValues?.marital_status,
      });
      setValue('add_leave_statistics', singleLeaveValues?.add_leave_statistics);
      setValue('approvers', singleLeaveValues?.approvers);
      setLoad(false);
    } else {
      reset();
    }
  }, [singleLeaveValues]);

  const onFinish = (values) => {
    setLoad(true);
    const payload = {
      leave_type: values?.leave_type?.value,
      contract_type: values?.contract_type.label,
      gender: values?.gender.label,
      marital_status: values?.marital_status.label,
      add_leave_statistics: values?.add_leave_statistics,
      doctype: 'HRMS Leave Type',
      approvers: values?.approvers?.map((value) => ({
        approver_level: value.approver_level.value,
        doctype: 'HRMS Leave Type Approvers',
      })),
    };
    leaveType.leave_type.length == 0
      ? createLeave(payload)
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
            message.error('something went wrong');
            setLoad(false);
          })
      : updateSingleLeave(leaveType.name, payload)
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
            message.error('something went wrong');
            setLoad(false);
          });
  };
  const onDeleteEducationField = () => {
    setLoad(true);
    deleteSingleLeave(leaveType.name).then((response) => {
      if (response.data.message.success == true) {
        message.success(response.data.message.message);
      } else {
        message.error(response.data.message.message);
      }
      setLoad(false);
      onClose();
    });
  };

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[24, 30]}>
          <Col span={24}>
            <Row gutter={24} justify="center">
              <Col>
                <Title level={3}>{title}</Title>
              </Col>
            </Row>
          </Col>
          {leaveFields().map((item, idx) => (
            <Fragment key={idx}>
              {item.title && (
                <Col span={24}>
                  <Title className="mb-0 " level={4}>
                    {item.title}
                  </Title>
                </Col>
              )}
              <FormGroup item={item} control={control} errors={errors} />
            </Fragment>
          ))}
          <Col span={24}>
            <Title level={5} className="mb-0">
              Approvers
            </Title>
          </Col>
          {fields.map((item, index) => (
            <Fragment key={item.id}>
              <Col span={24}>
                <Row gutter={[10, 10]}>
                  <Col span={24}>
                    <SelectField
                      fieldname={`approvers[${index}].approver_level`}
                      label={'Approvers'}
                      control={control}
                      class={`mb-0`}
                      iProps={{ placeholder: 'Please select' }}
                      initValue={
                        item?.approver_level ? { label: item?.approver_level, value: item?.approver_level } : ''
                      }
                      selectOption={[
                        { label: 'Manager', value: 'Manager' },
                        { label: 'Team Lead', value: 'Team Lead' },
                        { label: 'Supervisor', value: 'Supervisor' },
                      ]}
                    />
                    <Button
                      type="link"
                      htmlType="button"
                      className="p-0 h-auto c-gray-linkbtn right-fixed smallFont12"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Fragment>
          ))}
          <Col span={24}>
            <Button htmlType="button" type="dashed" size="large" className="w-100" onClick={() => append(initQ)}>
              + Add Approver
            </Button>
          </Col>
          <Col span={24}>
            <Row gutter={[24, 4]} justify="start">
              <Col span={24}>
                <Text className="mb-0 c-gray">Add Leave Statistics?</Text>
              </Col>
              <Col span={24}>
                <InputRadio
                  fieldname="add_leave_statistics"
                  control={control}
                  errors={errors}
                  initValue={'No'}
                  options={
                    <Row gutter={24}>
                      <Col span={24}>
                        <Radio value="Yes">Yes</Radio>
                      </Col>
                      <Col span={24}>
                        <Radio value="No">No</Radio>
                      </Col>
                    </Row>
                  }
                />
              </Col>
            </Row>
          </Col>

          {leaveType.leave_type.length == 0 ? (
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
              {/* {allowed([Roles.SETUP], 'delete') && (
                <Col span={12}>
                  <Button size="large" type="primary" className="red-btn w-100" onClick={onDeleteEducationField}>
                    Delete
                  </Button>
                </Col>
              )} */}
              <Col span={24}>
                <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                  Save
                </Button>
              </Col>
            </>
          )}
        </Row>
      </Form>
    </Spin>
  );
};
