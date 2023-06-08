import React, { useState, useEffect, Fragment } from 'react';
import { Button, Row, Col, Typography, Form, message, Spin } from 'antd';
import { useSelector } from 'react-redux';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import {
  addSingleLeaveEntitlement,
  updateSingleLeaveEntitlement,
  deleteSingleLeaveEntitlement,
  leaveEntititlementSec,
} from '../../../../ducks/services';
import { LoadingOutlined } from '@ant-design/icons';
import { allowed } from '../../../../../../../../routing/config/utils';
import Roles from '../../../../../../../../routing/config/Roles';
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { title, onClose, leaveEtitlement } = props;
  const { Title } = Typography;
  const [load, setLoad] = useState(false);
  const { control, errors, reset, setValue, watch, handleSubmit } = useForm();
  const [leave, leaveType] = useState(false);
  const leaveList = useSelector((state) => state.setup.leaveList);

  const onChnageLeaveType = (val) => {
    if (val.label === 'Annual Leave') {
      leaveType(true);
    } else {
      leaveType(false);
      setValue('carries_forward', [0]);
      setValue('carry_forward_days', 0);
    }
  };

  const leaveEntitlementLeaves = [
    {
      label: 'Leave Entilement Name',
      name: 'leave_entitlement_name',
      type: 'input',
      twocol: true,
      placeholder: 'Type leave entitlement name',
      req: true,
      reqmessage: 'Leave Entitlment required',
    },
    {
      label: 'Leave Type',
      name: 'leave_type',
      type: 'select',
      twocol: true,
      placeholder: 'Select leave type',
      req: true,
      reqmessage: 'Leave Type required',
      options: leaveList.map((value) => ({ label: value.leave_type, value: value.name })),
      onChange: onChnageLeaveType,
    },
    {
      label: 'Entitlement',
      name: 'entitlement',
      type: 'input',
      twocol: true,
      placeholder: 'Input numaber of days',
      req: true,
      reqmessage: 'Entitlment required',
      number: true,
      arrow: false,
    },
    {
      label: 'Min Years of Service',
      name: 'min_years',
      type: 'input',
      colWidth: '0 1 180px',
      placeholder: 'Min number of years',
      req: true,
      reqmessage: 'Years required',
      number: true,
      arrow: false,
    },
    {
      label: 'Max Years of Service',
      name: 'max_years',
      type: 'input',
      colWidth: '0 1 180px',
      placeholder: 'Max number of years',
      req: true,
      reqmessage: 'Years required',
      number: true,
      arrow: false,
    },
    {
      subheading: 'Options',
      name: 'is_limit',
      label: '',
      // class:hid===true?`d-none`:'',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Is limited', value: 1 }],
    },
    {
      name: 'overdraft',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Can overdraft', value: 1 }],
    },
    {
      name: 'apply_before_current_date',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Can apply before current date', value: 1 }],
    },
    {
      name: 'carries_forward',
      class: !leave ? 'd-none' : '',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Carries forward', value: 1 }],
    },
    {
      name: 'is_prorate',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      colWidth: '0 1 365px',
      reqmessage: '',
      options: [{ label: 'Is prorate', value: 1 }],
    },
    {
      label: 'Carry Forward Days',
      name: 'carry_forward_days',
      type: 'input',
      twocol: false,
      hidden: !leave,
      number: true,
      arrow: false,
    },
  ];

  const onFinish = (values) => {
    setLoad(true);
    const payload = {
      leave_entitlement_name: values.leave_entitlement_name,
      leave_type_name: values.leave_type.value,
      entitlement: values.entitlement,
      max_years: values.max_years,
      min_years: values.min_years,
      is_limit: values?.is_limit.length ? 1 : 0,
      overdraft: values?.overdraft.length ? 1 : 0,
      apply_before_current_date: values?.apply_before_current_date.length ? 1 : 0,
      carries_forward: values?.carries_forward.length ? 1 : 0,
      is_prorate: values?.is_prorate.length ? 1 : 0,
      carry_forward_days: values.carry_forward_days,
    };
    leaveEtitlement.leave_entitlement_name.length == 0
      ? addSingleLeaveEntitlement(payload)
          .then((response) => {
            if (response.data.message.success == true) {
              leaveEntititlementSec(response.data.message.name).then((res) => {
                message.success(response.data.message.message);
              });
            } else {
              message.error(response.data.message.message);
            }
            setLoad(false);
            onClose();
          })
          .catch((error) => message.error('Leave Entitlemen exists'))
      : updateSingleLeaveEntitlement(leaveEtitlement.name, payload)
          .then((response) => {
            if (response.data.message.success == true) {
              message.success(response.data.message.message);
            } else {
              message.error(response.data.message.message);
            }
            setLoad(false);
            onClose();
          })
          .catch((error) => message.error('Update Failed'));
  };

  const onDeleteHoliday = () => {
    setLoad(true);
    deleteSingleLeaveEntitlement(leaveEtitlement.name)
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
        message.error('Leave Etitlement Deleted Unsccessfully');
        onClose();
      });
  };

  useEffect(() => {
    if (leaveEtitlement.leave_entitlement_name.length > 0) {
      console.log({ leaveEtitlement });
      if (leaveEtitlement.leave_type == 'Annual Leave') {
        leaveType(true);
      } else {
        leaveType(false);
      }
      setValue('leave_entitlement_name', leaveEtitlement.leave_entitlement_name);
      setValue('leave_type', { label: leaveEtitlement.leave_type, value: leaveEtitlement.leave_type_name });
      setValue('entitlement', leaveEtitlement.entitlement);
      setValue('min_years', leaveEtitlement.min_years);
      setValue('max_years', leaveEtitlement.max_years);
      setValue('is_limit', leaveEtitlement.is_limit == 'Yes' ? [1] : []);
      setValue('overdraft', leaveEtitlement.overdraft == 'Yes' ? [1] : []);
      setValue('apply_before_current_date', leaveEtitlement.apply_before_current_date == 'Yes' ? [1] : []);
      setValue('carries_forward', leaveEtitlement.carries_forward == 'Yes' ? [1] : []);
      setValue('is_prorate', leaveEtitlement.is_prorate == 'Yes' ? [1] : []);
      setValue('carry_forward_days', leaveEtitlement.carry_forward_day);
    } else {
      reset();
    }
  }, [leaveEtitlement]);

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[24, 30]}>
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
            <Row gutter={[24, 30]}>
              {leaveEntitlementLeaves.map((item, idx) => (
                <Fragment key={idx}>
                  {item.subheading && (
                    <Col span={24}>
                      <Title className="mb-0" level={4}>
                        {item.subheading}
                      </Title>
                    </Col>
                  )}
                  <FormGroup item={item} control={control} errors={errors} />
                </Fragment>
              ))}
              <Col span={24}>
                <Row gutter={24} justify="end">
                  {leaveEtitlement.leave_entitlement_name.length == 0 ? (
                    <>
                      <Col span={6}>
                        <Button
                          size="large"
                          type="primary"
                          htmlType="button"
                          className="black-btn w-100"
                          onClick={onClose}
                        >
                          Close
                        </Button>
                      </Col>
                      <Col span={6}>
                        <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                          Add
                        </Button>
                      </Col>
                    </>
                  ) : (
                    <>
                      {/* {allowed([Roles.SETUP], 'delete') && (
                        <Col span={6}>
                          <Button size="large" type="primary" className="red-btn w-100" onClick={onDeleteHoliday}>
                            Delete
                          </Button>
                        </Col>
                      )} */}
                      <Col span={6}>
                        <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                          Save
                        </Button>
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
