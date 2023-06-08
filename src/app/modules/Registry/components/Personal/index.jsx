import React, { Fragment, useEffect } from 'react';
import { Row, Col, Typography, Form, Button } from 'antd';
import { useSelector } from 'react-redux';
import FormGroup from 'Molecules/FormGroup';
import { useForm, useFieldArray } from 'react-hook-form';
import moment from 'moment';
import { getFileName } from '../../../../../features/utility';
import { baseUrl } from '../../../../../configs/constants';
import StudentTemp from '../../Students/StudentTemp';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import ArrayForm from '../../../Marketing/Applications/AddApplication/ApplicationForm/ArrayForm';

const { Title } = Typography;
const _ = require('lodash');

export default (props) => {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  let url = location.pathname.split('/')[1];
  const data = useSelector((state) => state.students.studentAppData);
  const countryList = useSelector((state) => state.global.countryData);
  const raceList = useSelector((state) => state.global.raceData);
  const genderList = useSelector((state) => state.global.genderData);
  const maritalList = useSelector((state) => state.global.maritalData);
  const { control, errors, setValue, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'parent_info',
  });

  const formFields = [
    {
      name: 'applicant_name',
      label: 'Name as per IC/Passport',
      req: false,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
      reqmessage: 'Name required',
    },
    {
      name: 'nationality',
      label: 'Nationality',
      req: false,
      placeholder: 'Please select',
      type: 'select',
      twocol: true,
      reqmessage: 'Please Select',
      options: _.map(countryList, (e) => ({ label: e.name, value: e.name })),
    },
    {
      name: 'gender',
      label: 'Gender',
      req: false,
      placeholder: 'Please select',
      type: 'select',
      twocol: true,
      reqmessage: 'Please Select',
      options: _.map(genderList, (e) => ({ label: e.name, value: e.name })),
    },
    {
      name: 'race',
      label: 'Race',
      req: false,
      placeholder: 'Please select',
      type: 'select',
      twocol: true,
      reqmessage: 'Please Select',
      options: _.map(raceList, (e) => ({ label: e.name, value: e.name })),
    },
    {
      name: 'contact_no',
      label: 'Contact Number',
      req: false,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
      reqmessage: 'Contact Number required',
    },
    {
      name: 'marital_status',
      label: 'Marital Status',
      req: false,
      placeholder: 'Please select',
      type: 'select',
      twocol: true,
      reqmessage: 'Please Select',
      options: _.map(maritalList, (e) => ({ label: e.name, value: e.name })),
    },
    {
      name: 'email',
      label: 'Email',
      req: false,
      placeholder: 'Please state',
      email: true,
      type: 'input',
      twocol: true,
      reqmessage: 'Contact Number required',
    },
    {
      name: 'icpassport',
      label: 'IC/Passport Number',
      req: false,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
      reqmessage: 'Passport Number required',
    },
    {
      name: 'passport_background',
      label: 'Passport Photo with White Background',
      req: false,
      placeholder: 'Upload',
      type: 'upload',
      twocol: true,
      reqmessage: 'Passport photo required',
    },
    {
      name: 'ic_scanned',
      label: 'IC/Passport (Scanned)',
      req: false,
      placeholder: 'Upload',
      type: 'upload',
      twocol: true,
      reqmessage: 'Passport scanned required',
    },
    {
      name: 'date_of_birth',
      label: 'Date of Birth',
      req: false,
      placeholder: '',
      type: 'date',
      twocol: true,
      reqmessage: 'Date required',
    },
    {
      name: 'passport_expiry',
      label: 'Passport Expiry Date',
      req: false,
      placeholder: '',
      type: 'date',
      twocol: true,
      reqmessage: 'Date required',
    },
    {
      name: 'place_of_birth',
      label: 'Place of Birth',
      req: false,
      placeholder: 'please state',
      type: 'input',
      twocol: true,
      reqmessage: 'Place required',
    },
    {
      name: 'issuing_country',
      label: 'Passport Issuing Country',
      req: false,
      placeholder: 'Please select',
      type: 'select',
      twocol: true,
      reqmessage: 'Please select',
      options: _.map(countryList, (e) => ({ label: e.name, value: e.name })),
    },
    {
      subheader: 'Current Address',
      name: 'current_address_1',
      label: 'Address',
      req: false,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
      reqmessage: 'Address required',
    },
    {
      name: 'current_state',
      label: 'State',
      req: false,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
      reqmessage: 'State required',
    },
    {
      name: 'current_post_code',
      label: 'Postcode',
      req: false,
      number: true,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
      reqmessage: 'Postcode required',
    },
    {
      name: 'current_country',
      label: 'Country',
      req: false,
      placeholder: 'Please select',
      type: 'select',
      twocol: true,
      reqmessage: 'Please select',
      options: _.map(countryList, (e) => ({ label: e.name, value: e.name })),
    },
    {
      name: 'current_city',
      label: 'City',
      req: false,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
      reqmessage: 'City required',
    },
    // {
    //     name: 'same_address',
    //     label: '',
    //     req: false,
    //     placeholder: '',
    //     type: 'checkbox',
    //     class: 'graycheckbox',
    //     twocol: true,
    //     reqmessage: '',
    //     options: [{label: 'Same as permanent address', value: 1}]
    // },
    {
      subheader: 'Permanent Address',
      name: 'permanent_address_1',
      label: 'Address',
      req: false,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
      reqmessage: 'Address required',
    },
    {
      name: 'permanent_state',
      label: 'State',
      req: false,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
      reqmessage: 'State required',
    },
    {
      name: 'permanent_post_code',
      label: 'Postcode',
      req: false,
      number: true,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
      reqmessage: 'Postcode required',
    },
    {
      name: 'permanent_country',
      label: 'Country',
      req: false,
      placeholder: 'Please select',
      type: 'select',
      twocol: true,
      reqmessage: 'Please select',
      options: _.map(countryList, (e) => ({ label: e.name, value: e.name })),
    },
    {
      name: 'permanent_city',
      label: 'City',
      req: false,
      placeholder: 'Please state',
      type: 'input',
      twocol: false,
      reqmessage: 'City required',
    },
    {
      type: 'array',
      name: 'parent_info',
      twocol: false,
      subheader: 'Emergency Contact / Parent Info',
      child: [
        {
          subheader: '',
          type: 'select',
          name: 'relation_type',
          label: 'Relation',
          placeholder: 'Please Select',
          static: true,
          req: false,
          options: [
            { value: 'Father', label: 'Father' },
            { value: 'Mother', label: 'Mother' },
            { value: 'Siblings', label: 'Siblings' },
            { value: 'Guardian', label: 'Guardian' },
          ],
          twocol: true,
        },
        {
          type: 'input',
          label: 'Name',
          name: 'father_name',
          twocol: true,
          static: true,
          placeholder: 'Please state',
          req: false,
          reqmessage: 'Name Required',
        },
        {
          type: 'input',
          name: 'father_contact',
          label: 'Contact Number',
          twocol: true,
          placeholder: 'Please state',
          static: true,
          req: false,
          reqmessage: 'Contact Number Required',
        },
        {
          type: 'input',
          name: 'father_email',
          label: 'Email',
          twocol: true,
          placeholder: 'Please state',
          static: true,
          req: false,
          email: true,
          reqmessage: 'Valid Email Required',
        },
      ],
    },
    // {
    //   subheader: 'Emergency Contact',
    //   name: 'emergency_contact_name',
    //   label: 'Name',
    //   req: false,
    //   placeholder: 'Please state',
    //   type: 'input',
    //   twocol: true,
    //   reqmessage: 'Name required',
    // },
    // {
    //   name: 'emergency_contact_number',
    //   label: 'Contact Number',
    //   req: false,
    //   number: true,
    //   placeholder: 'Please state',
    //   type: 'input',
    //   twocol: true,
    //   reqmessage: 'Contact required',
    // },
    // {
    //   name: 'emergency_contact_email',
    //   label: 'Email',
    //   req: false,
    //   email: true,
    //   placeholder: 'Please state',
    //   type: 'input',
    //   twocol: false,
    //   reqmessage: 'Email required',
    // },
  ];

  useEffect(() => {
    if (data) {
      setValue('applicant_name', data.applicant_name);
      setValue('nationality', { label: data.nationality, value: data.nationality });
      setValue('gender', { label: data.gender, value: data.gender });
      setValue('race', { label: data.race_name, value: data.race });
      setValue('contact_no', data.contact_no);
      setValue('marital_status', { label: data.marital_status, value: data.marital_status });
      setValue('email', data.email);
      setValue('icpassport', data.icpassport);
      setValue('date_of_birth', data.date_of_birth ? moment(data.date_of_birth, 'YYYY-MM-DD') : '');
      setValue('passport_expiry', data.passport_expiry ? moment(data.passport_expiry, 'YYYY-MM-DD') : '');
      setValue('place_of_birth', data.place_of_birth);
      setValue(
        'issuing_country',
        data.issuing_country ? { label: data.issuing_country, value: data.issuing_country } : '',
      );

      setValue('current_address_1', data.current_address_1);
      setValue('current_city', data.current_city);
      setValue('current_post_code', data.current_post_code);
      setValue('current_country', { label: data.current_country, value: data.current_country });
      setValue('current_state', data.current_state);
      setValue('same_address', [data.same_address]);

      setValue('permanent_address_1', data.permanent_address_1);
      setValue('permanent_city', data.permanent_city);
      setValue('permanent_post_code', data.permanent_post_code);
      setValue('permanent_country', { label: data.permanent_country, value: data.permanent_country });
      setValue('permanent_state', data.permanent_state);

      setValue(
        'passport_background',
        data?.passport_background
          ? {
              fileList: [
                {
                  uid: '-1',
                  name: getFileName(data?.passport_background),
                  status: 'done',
                  url: data.passport_background,
                  s3: 'Passport Photo with White Background',
                  aid: data?.applicant_id,
                },
              ],
            }
          : '',
      );
      setValue(
        'ic_scanned',
        data.ic_scanned
          ? {
              fileList: [
                {
                  uid: '-1',
                  name: getFileName(data?.ic_scanned),
                  status: 'done',
                  url: data.ic_scanned,
                  s3: 'IC/Passport (Scanned)',
                  aid: data?.applicant_id,
                },
              ],
            }
          : '',
      );

      if (data?.parent_info && data?.parent_info.length > 0) {
        setValue('parent_info', data?.parent_info);
      }

      // setValue('emergency_contact_name', data.emergency_contact_name);
      // setValue('emergency_contact_number', data.emergency_contact_number);
      // setValue('emergency_contact_email', data.emergency_contact_email);
    }
  }, [data]);

  const onFinish = () => {};

  return (
    <StudentTemp id={id} request={false} setLoading={props.setLoading}>
      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[20, 30]} align="bottom">
          <Col span={24}>
            <Row gutter={[20, 30]}>
              <Col flex="auto">
                <Title level={4} className="mb-0">
                  Personal Information
                </Title>
              </Col>
              <Col>
                <Button
                  icon={<LeftOutlined />}
                  size="middle"
                  className="c-graybtn small-btn"
                  onClick={() => history.goBack()}
                >
                  Categories
                </Button>
              </Col>
            </Row>
          </Col>
          {formFields.map((item, idx) => (
          <Fragment key={idx}>
            {item?.subheader && (
              <Col span={24}>
                <Title level={5} className="mb-0 c-default">
                  {item.subheader}
                </Title>
              </Col>
            )}
            {item.type == 'array' && !item.hidden ? (
            <Col span={item.twocol ? 12 : 24}>
              <Row gutter={[20, 30]}>
                <Col span={24}>
                  <ArrayForm fields={fields} remove={remove} item={item} control={control} errors={errors} />
                </Col>
                {/* {item.static != true && append && (
                  <Col span={24}>
                    <Button
                      htmlType="button"
                      type="dashed"
                      size="large"
                      className="w-100"
                      onClick={() => append(initEd)}
                    >
                      + Add Contact
                    </Button>
                  </Col>
                )} */}
              </Row>
            </Col>
          ) : (
            <FormGroup item={item} control={control} errors={errors} />
          )}
          </Fragment>
        ))}

        </Row>
      </Form>
    </StudentTemp>
  );
};
