import React, { useEffect, Fragment, useState } from 'react';
import { Row, Col, Typography, Button, Form, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FormGroup from '../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import {
  getScholarshipList,
  getScholarshipTypeDrop,
  getSingleScholorshipData,
} from '../../../../Scholarships/ducks/actions';
import { apiMethod, apiresource } from '../../../../../../../configs/constants';
import axios from '../../../../../../../services/axiosInterceptor';
import { getProgramSemesters } from '../../../../../Application/ducks/actions';
import { scholarPercent } from '../../../../../../../configs/constantData';

const { Title } = Typography;
const _ = require('lodash');

export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);
  const [schemes, setSchemes] = useState(null);
  const [schemeType, setSchemeType] = useState([]);
  const { control, errors, setValue, handleSubmit, watch, reset } = useForm();
  const scholarship = useSelector((state) => state.scholarship.scholarshipList);
  const scholarshipDrop = useSelector((state) => state.scholarship.scholarshipDropList);
  const scholorshipSingleData = useSelector((state) => state.scholarship.scholorshipSingleData);
  const semester = useSelector((state) => state.global.semesters);
  const selectProg = useSelector((state) => state.students.selected);

  const { title, data, t, updateParent } = props;

  const onScholarshipName = (e) => {
    dispatch(getSingleScholorshipData(e.value));
    setSchemes(e.value);
  };

  const onScholarshipScheme = (e, sch) => {
    dispatch(getScholarshipTypeDrop(sch || schemes, e.value));
  };

  useEffect(() => {
    if (scholarshipDrop && scholarshipDrop.length > 0) {
      setSchemeType(scholarshipDrop);
    }
  }, [scholarshipDrop]);

  const formFields = [
    {
      name: 'student_scholarship_row_name',
      label: '',
      req: false,
      placeholder: 'P',
      type: 'input',
      hidden: true,
      twocol: false,
      reqmessage: 'no',
    },
    {
      name: 'scholarship_name',
      label: 'Scholarship Name',
      req: false,
      placeholder: 'Please select',
      type: 'select',
      disabled: disable,
      twocol: false,
      onChange: onScholarshipName,
      reqmessage: 'Please Select',
      options: _.map(scholarship, (e) => ({ label: e.scholarship_name, value: e.scholarship_code })),
    },
    {
      name: 'scholarship_scheme',
      label: 'Scholarship Scheme',
      req: false,
      placeholder: 'Please select',
      type: 'select',
      twocol: true,
      onChange: onScholarshipScheme,
      reqmessage: 'Please Select',
      options: _.map(scholorshipSingleData?.schemes, (e) => ({ label: e.scheme_name, value: e.scheme_name })),
    },
    {
      name: 'scholarship_type',
      label: 'Scholarship Type',
      req: false,
      placeholder: 'Please select',
      type: 'select',
      twocol: true,
      reqmessage: 'Please Select',
      options: _.map(schemeType, (e) => scholarPercent.find((x) => x.value == e.scholarship_type)),
    },
    {
      name: 'assist_from',
      label: 'Assist From',
      req: false,
      placeholder: 'Please state',
      type: 'select',
      twocol: true,
      reqmessage: 'Please Select',
      options: _.map(semester, (e) => ({ label: e.structure_name, value: e.name })),
    },
    {
      name: 'assist_to',
      label: 'Assist To',
      req: false,
      placeholder: 'Please select',
      type: 'select',
      twocol: true,
      reqmessage: 'Please Select',
      options: _.map(semester, (e) => ({ label: e.structure_name, value: e.name })),
    },
  ];

  useEffect(() => {
    dispatch(getScholarshipList('Active'));
  }, []);

  useEffect(() => {
    if (Object.keys(data).length > 0 && data.scholarship && data.scholarship.length) {
      let qdata = data.scholarship[0];
      if (qdata.scholarship_code) {
        setDisable(true);
      }
      setValue('scholarship_scheme', { label: qdata?.scheme, value: qdata?.scheme });
      if (qdata?.scholarship_name) {
        onScholarshipName({ value: qdata?.scholarship_code });
        setValue('scholarship_name', { label: qdata?.scholarship_name, value: qdata?.scholarship_code });
      }
      if (qdata?.type) {
        onScholarshipScheme({ value: qdata?.scheme }, qdata?.scholarship_code);
        setValue(
          'scholarship_type',
          scholarPercent.find((x) => x.value == qdata?.type),
        );
      }
      setValue('assist_to', { label: qdata?.assist_to, value: qdata?.assist_to });
      setValue('assist_from', { label: qdata?.assist_from, value: qdata?.assist_from });
      setValue('student_scholarship_row_name', qdata?.student_scholarship_row_name);
    }
  }, [data, selectProg]);

  const onFinish = async (val) => {
    let url = `${apiMethod}/registry.api.update_student_scholarship`;
    let body = {
      scholarship_student_list: [
        {
          student_id: data.applicant_id,
          student_scheme: val.scholarship_scheme.label || '',
          scholarship_type: val.scholarship_type.value || '',
          parent: val.scholarship_name.value,
          parentfield: 'scholarship_student_list',
          parenttype: 'Scholarship',
          name: val.student_scholarship_row_name || '',
          assist_from: val.assist_from ? val.assist_from.label : '',
          assist_to: val.assist_to ? val.assist_to.label : '',
        },
      ],
    };

    try {
      await axios.post(url, body);
      setDisable(false);
      message.success('Scholarship Updated Scuccessfully');
      updateParent();
    } catch (e) {
      console.log('checking', e);
    }
  };

  const onRemove = async () => {
    let name = data?.scholarship[0]?.student_scholarship_row_name;
    if (name) {
      let url = `${apiresource}/Scholarship Student List/${name}`;
      try {
        await axios.delete(url);
        reset();
        message.success('Student removed from Scholarship');
        updateParent();
      } catch (e) {
        console.log('checking', e);
      }
    } else {
      reset();
    }
  };

  return (
    <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
      <Row gutter={[20, 30]} align="bottom">
        <Col flex="auto">
          <Title level={4} className="mb-0 c-default">
            {title}
          </Title>
        </Col>
        <Col>
          <Button type="link" htmlType="button" className="p-0 c-gray-linkbtn" onClick={onRemove}>
            Remove
          </Button>
        </Col>
        {formFields.map((item, index) => (
          <Fragment key={index}>
            {item?.subheader && (
              <Col span={24}>
                <Title level={5} className="mb-0 c-default">
                  {item.subheader}
                </Title>
              </Col>
            )}
            <FormGroup item={item} control={control} errors={errors} />
          </Fragment>
        ))}
        <Col span={24}>
          <Row gutter={20} justify="end">
            {data?.scholarship && data?.scholarship[0]?.scholarship_code && (
              <Col>
                <Button
                  size="large"
                  type="primary"
                  htmlType="button"
                  onClick={() => history.push(`/registry/scholarships/${data?.scholarship[0]?.scholarship_code}`)}
                >
                  View Scholarship
                </Button>
              </Col>
            )}
            <Col>
              <Button size="large" type="primary" htmlType="submit" className="green-btn">
                Save Changes
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
