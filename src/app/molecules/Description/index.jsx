import React, { Fragment, useState } from 'react';
import { Row, Col, Skeleton, Descriptions, Button, Space } from 'antd';
import { TextAreaField } from '../../atoms/FormElement';

const AddModule = (props) => {
  const { stdReqData, pending, archieve, onClickRevert, onClickApprove, control, errors, docStatus } = props;
  const { Item } = Descriptions;
  const [reject, setReject] = useState(false);
  const facultyCheck = stdReqData.filter((value) => value.label === 'Faculty');
  console.log({ docStatus });
  return (
    <Fragment>
      <Row gutter={[24, 24]} align="bottom" className="delayedApplication">
        {/* <Skeleton active paragraph={{ rows: 3 }} loading={stdReqData.length == 0}> */}
        <Descriptions bordered={false} colon={false}>
          {stdReqData.map((value, key) => (
            <Item span={24} key={key} label={value.label}>
              <Space>
                {value.value}
                {value.icon}
              </Space>
            </Item>
          ))}
        </Descriptions>
        {/* </Skeleton> */}
      </Row>
      {pending && !reject && facultyCheck[0].value !== 'Pending' && (
        <Row gutter={24}>
          <Col span={12}>
            <Button onClick={() => onClickApprove('Archive')} size="large" type="primary" className="w-100 green-btn">
              Approve
            </Button>
          </Col>
          <Col span={12}>
            <Button onClick={() => setReject(true)} size="large" type="primary" className="w-100 red-btn">
              Reject
            </Button>
          </Col>
        </Row>
      )}
      {reject && (
        <Row gutter={20}>
          <Col span={24}>
            <TextAreaField
              fieldname="reject_reason"
              label=""
              control={control}
              class="mb-0"
              iProps={{ placeholder: 'Please state reason', size: 'large' }}
              rules={{
                required: 'Reject Reason Require',
              }}
              initValue=""
              validate={errors.reject_reason && 'error'}
              validMessage={errors.reject_reason && errors.reject_reason.message}
            />
          </Col>
          <Col span={12}>
            <Button size="large" type="primary" onClick={() => setReject(false)} className="w-100 black-btn">
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <Button size="large" type="primary" htmlType="submit" className="w-100 red-btn">
              Reject
            </Button>
          </Col>
        </Row>
      )}
      {archieve && docStatus.department_status !== 'Reject' && (
        <Row gutter={24} justify="end">
          <Col span={12}>
            <Button onClick={() => onClickRevert('Pending')} size="small" type="primary" className="w-100">
              Revert
            </Button>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default AddModule;
