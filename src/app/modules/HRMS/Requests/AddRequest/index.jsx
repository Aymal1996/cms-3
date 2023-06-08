import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, message, Breadcrumb } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslate } from 'Translate';
import { useForm } from 'react-hook-form';
import SideDetails from '../../../../molecules/SideDetails';
import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../configs/constantData';
import RequestForm from './RequestForm';
import moment from 'moment';
import { createRequest, getApproverLead, getRequest } from '../ducks/services';

const defVal = {
  formName: '',
  form_fields: [],
};

export default (props) => {
  const history = useHistory();
  const location = useLocation();
  const uid = location?.state;
  const { control, errors, setValue, handleSubmit, reset } = useForm(defVal);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  const id = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;

  const i18n = useTranslate();
  const { t } = i18n;

  const sideData = [
    {
      type: 'image',
      imgurl: '',
      size: 120,
      highlight: true,
    },
    {
      type: 'tag',
      title: 'Request',
      noDivider: true,
      highlight: true,
    },
    {
      type: 'simpletext',
      title: 'Please select the form and attach the staff on the right.',
      noDivider: true,
    },
  ];

  const onFinish = async (data) => {
    props.setLoading(true);
    getApproverLead(id)
      .then((appr) => {
        let approvetemp = [];
        console.log('checkin app', data);
        let approverVar = [];
        if (data.formName.category != '') {
          approverVar = data?.formName?.approvers;
        } else {
          approverVar = data?.formName?.approver;
        }
        approverVar.map((x) => {
          let aid = '';
          if (x.approvers == 'Manager') {
            aid = appr?.data?.message[0]?.manager_id;
          } else if (x.approvers == 'Supervisor') {
            aid = appr?.data?.message[0]?.supervisor_id;
          } else if (x.approvers == 'Team Leader') {
            aid = appr?.data?.message[0]?.team_leader;
          } else if (x.approvers == 'Individual') {
            aid = data['Staff ID'];
          }
          approvetemp.push({
            approvers: x.approvers,
            approver_detail: x.approver_detail || '',
            approver_id: aid,
            Status: 'Pending',
            remarks: '',
          });
        });

        let fields = [];
        Object.entries(data).map(([key, val]) => {
          if (key != 'formName') {
            if (key == 'Date') {
              fields.push({ field_label: key, field_type: 'date', field_value: moment(val).format('YYYY MM DD') });
            } else if (key == 'Warning Letter Type') {
              fields.push({ field_label: 'Warning Letter Type', field_type: 'text', field_value: val.label });
              fields.push({ field_label: 'Warning Letter ID', field_type: 'text', field_value: val.value });
            } else {
              fields.push({ field_label: key, field_type: 'text', field_value: val });
            }
          }
        });
        // fields.push({field_label: 'Requester ID', field_type: 'text', field_value : id});
        const body1 = {
          form_name: data.formName.value,
          sender: data.formName.sender,
          category: data.formName.label == 'Show Cause Letter' ? data.formName.label : '',
          approvers: approvetemp,
          status: 'Pending',
          form_fields: fields,
        };
        console.log('bodd', body1);
        createRequest(body1)
          .then((resi) => {
            props.setLoading(false);
            message.success('Request Created');
            history.push('/hrms/requests');
          })
          .catch((e) => {
            const { response } = e;
            console.log('error', response);
            props.setLoading(false);
            message.error('Request Created Failed');
          });
      })
      .catch((e) => {
        const { response } = e;
        console.log('error', response);
        props.setLoading(false);
        message.error('Request Created Failed');
      });
  };

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href={`/hrms/requests`}>Requests</Breadcrumb.Item>
        <Breadcrumb.Item>Add New Request</Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title={'Add New Request'} />
        </Col>
        <Col span={24}>
          <div className="twocol-3070">
            <div className="side-detail">
              {isHDScreen ? <SideDetails data={sideData} /> : <SideDetailResponsive data={sideData} />}
            </div>
            <div className="side-form">
              <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
                <Form
                  scrollToFirstError={true}
                  onFinish={handleSubmit(onFinish)}
                  labelCol={{ flex: '0 1 162px' }}
                  wrapperCol={{ flex: 'auto' }}
                  layout="horizontal"
                  labelAlign="left"
                >
                  <RequestForm title="Requests" setValue={setValue} control={control} errors={errors} dvalue={uid} />
                </Form>
              </Card>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
