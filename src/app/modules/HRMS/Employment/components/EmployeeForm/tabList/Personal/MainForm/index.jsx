import React, { Fragment } from 'react';
import { Row, Col, Typography, Button, message } from 'antd';
import FormGroup from 'Molecules/FormGroup';
import { useSelector } from 'react-redux';
import { useFieldArray } from 'react-hook-form';
import ArrayForm from '../ArrayForm';
import {
  relationList,
  positionList,
  degreeList,
  identificationList,
  titleList,
} from '../../../../../../../../../configs/constantData';
import { emailCheck } from '../../../../../ducks/services';
import { allowed } from '../../../../../../../../../routing/config/utils';
import Roles from '../../../../../../../../../routing/config/Roles';
import moment from 'moment';

const _ = require('lodash');
const { Title } = Typography;

export default (props) => {
  const { control, errors, mode, setValue, getValues, idState, setidState } = props;

  const genderList = useSelector((state) => state.global.genderData);
  const raceList = useSelector((state) => state.global.raceData);
  const maritalList = useSelector((state) => state.global.maritalData);
  const religionList = useSelector((state) => state.global.religionData);
  const countryList = useSelector((state) => state.global.countryData);
  const nationalityData = useSelector((state) => state.global.nationalityData);
  const instituteList = useSelector((state) => state.global.institutions);
  const educationList = useSelector((state) => state.global.educationType);

  const {
    fields: fieldsEd,
    append: appendEd,
    remove: removeEd,
  } = useFieldArray({
    control,
    name: 'education',
  });

  const {
    fields: fieldsWx,
    append: appendWx,
    remove: removeWx,
  } = useFieldArray({
    control,
    name: 'external_work_history',
  });

  const {
    fields: fieldsEm,
    append: appendEm,
    remove: removeEm,
  } = useFieldArray({
    control,
    name: 'emergency_contact',
  });

  const {
    fields: fieldsCh,
    append: appendCh,
    remove: removeCh,
  } = useFieldArray({
    control,
    name: 'employee_children',
  });

  const initEd = {
    school_univ: '',
    fields: '',
    year_of_passing: '',
    from_date: '',
    to_date: '',
    cgpa: '',
    level: '',
    country: '',
    transcript: '',
  };
  const initWx = {
    company_name: '',
    designation: '',
    from_date: '',
    to_date: '',
    description: '',
  };

  const initEm = {
    title: '',
    relation_name: '',
    relation: '',
    email: '',
    phone: '',
  };

  const initCh = {
    salutation: '',
    full_name: '',
    gender: '',
    dob: '',
    email: '',
    occupation: '',
  };

  const onSameAddress = (e) => {
    if (e[0] == 1) {
      setValue('current_address_1', getValues('permanent_address_1'));
      setValue('current_state', getValues('permanent_state'));
      setValue('current_post_code', getValues('permanent_post_code'));
      setValue('current_country', getValues('permanent_country'));
      setValue('current_city', getValues('permanent_city'));
    }
  };

  const onEmailCheck = (e) => {
    console.log('checking', e.target.value);
    emailCheck(e.target.value).then((res) => {
      if (res.data.message.status == false) {
        message.error(res.data.message.message);
      } else {
        console.log('check response', res.data.message.message);
      }
    });
  };

  const PPDates = (current) => {
    return current && current > moment().endOf('day').subtract(15, 'year');
  };

  const ontypeChange = (e) => {
    if (e.label == 'IC') {
      setidState(false);
    } else {
      setidState(true);
    }
  };

  const onBlurName = (e) => {
    if (e.target.value) {
      var emailset = e.target.value.replace(/\s/g, '.').toLowerCase();
      const domain = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company_domain;
      setValue('primary_email', `${emailset}@${domain}`);
    }
  };

  const personalFields = [
    {
      type: 'select',
      label: 'Title',
      name: 'salutation',
      twocol: false,
      colWidth: '0 1 120px',
      options: titleList,
      placeholder: 'Select',
      req: false,
    },
    {
      type: 'input',
      label: 'Name as per IC/Passport',
      name: 'first_name',
      twocol: false,
      colWidth: '1 0 auto',
      placeholder: 'Please state',
      req: true,
      reqmessage: 'Please enter name',
      onBlur: onBlurName,
    },
    {
      type: 'upload',
      name: 'image',
      label: 'Profile Picture',
      placeholder: 'Upload',
      twocol: false,
      colWidth: '1 0 100%',
      req: true,
      reqmessage: 'Please upload image',
    },
    {
      type: 'date',
      label: 'Joining Date',
      name: 'date_of_joining',
      twocol: true,
      req: true,
      reqmessage: 'Required',
    },
    {
      type: 'select',
      label: 'Gender',
      name: 'gender',
      twocol: true,
      options: genderList?.map((x) => ({ label: x.name, value: x.name })),
      req: true,
      placeholder: 'Please select',
      reqmessage: 'Required',
    },
    {
      type: 'select',
      label: 'Marital Status',
      name: 'marital_status',
      twocol: true,
      placeholder: 'Please select',
      options: maritalList?.map((x) => ({ label: x.name, value: x.name })),
      req: true,
      reqmessage: 'Required',
    },
    {
      type: 'select',
      label: 'Nationality',
      name: 'nationality',
      twocol: true,
      placeholder: 'Please select',
      options: nationalityData?.map((x) => ({ label: x.name, value: x.name })),
      req: true,
      reqmessage: 'Required',
    },
    {
      type: 'select',
      label: 'Identification Type',
      name: 'identification_type',
      twocol: true,
      onChange: ontypeChange,
      placeholder: 'Please select',
      options: identificationList,
      req: true,
    },
    {
      type: 'input',
      label: 'Identification No.',
      name: 'identification_no',
      placeholder: 'Please state',
      twocol: true,
      req: !idState,
    },
    {
      type: 'date',
      label: 'Date of Birth (Age Limit 15)',
      name: 'date_of_birth',
      twocol: true,
      req: true,
      reqmessage: 'Required',
      disabledDate: PPDates,
    },
    {
      type: 'select',
      label: 'Race',
      name: 'race',
      twocol: true,
      placeholder: 'Please select',
      options: raceList?.map((x) => ({ label: x.name1, value: x.name })),
      req: false,
    },
    {
      type: 'select',
      label: 'Religion',
      name: 'religious',
      placeholder: 'Please select',
      twocol: true,
      options: religionList?.map((x) => ({ label: x.name1, value: x.name })),
      req: false,
    },
    {
      subheader: 'Contact Details',
      type: 'input',
      name: 'primary_phone_no',
      label: 'Phone No.',
      placeholder: 'Please state',
      req: true,
      twocol: true,
      reqmessage: 'Required',
    },
    {
      type: 'input',
      name: 'secondary_phone_no',
      label: 'Second Phone No.',
      placeholder: 'Please state',
      req: false,
      twocol: true,
    },
    {
      type: 'input',
      name: 'primary_email',
      label: 'Email',
      placeholder: 'Please state',
      req: true,
      twocol: true,
      email: true,
      reqmessage: 'Required',
      onBlur: onEmailCheck,
    },
    {
      type: 'input',
      name: 'secondary_email',
      label: 'Personal Email',
      placeholder: 'Please state',
      req: false,
      email: true,
      twocol: true,
    },

    // Current Address

    {
      subheader: 'Current Address',
      subheadlevel: 5,
      name: 'current_address_1',
      label: 'Address',
      req: true,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
      reqmessage: 'Address required',
    },
    {
      name: 'current_state',
      label: 'State',
      req: true,
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
      req: true,
      placeholder: 'Please select',
      type: 'select',
      twocol: true,
      reqmessage: 'Please select',
      options: _.map(countryList, (e) => ({ label: e.name, value: e.name })),
    },
    {
      name: 'current_city',
      label: 'City',
      req: true,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
      reqmessage: 'City required',
    },
    {
      name: 'same_address',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      class: 'graycheckbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Same as permanent address', value: 1 }],
      onChange: onSameAddress,
    },
    {
      subheader: 'Permanent Address',
      subheadlevel: 5,
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
      colWidth: '1 0 100%',
      reqmessage: 'City required',
    },

    // Spouse Details

    {
      subheader: 'Spouse Details',
      type: 'select',
      name: 'spouse_salutation',
      label: 'Title',
      options: titleList,
      req: false,
      placeholder: 'Select',
      twocol: false,
      colWidth: '0 1 150px',
    },
    {
      type: 'input',
      name: 'spouse_name',
      label: 'Name as per IC/Passport',
      req: false,
      placeholder: 'Please state',
      twocol: false,
      colWidth: '1 0 60%',
    },

    {
      type: 'select',
      label: 'Gender',
      name: 'spouse_gender',
      twocol: true,
      placeholder: 'Please select',
      options: genderList?.map((x) => ({ label: x.name, value: x.name })),
      req: false,
      reqmessage: 'required',
    },
    {
      type: 'select',
      label: 'Marital Status',
      name: 'spouse_martial_status',
      twocol: true,
      placeholder: 'Please select',
      options: maritalList?.map((x) => ({ label: x.name, value: x.name })),
      req: false,
      reqmessage: 'required',
    },
    {
      type: 'select',
      label: 'Nationality',
      name: 'spouse_nationality',
      twocol: true,
      placeholder: 'Please select',
      options: nationalityData?.map((x) => ({ label: x.name, value: x.name })),
      req: false,
      reqmessage: 'required',
    },
    {
      type: 'select',
      label: 'Identification Type',
      name: 'spouse_identification_type',
      twocol: true,
      placeholder: 'Please select',
      options: identificationList,
      req: false,
    },
    {
      type: 'input',
      label: 'Identification No.',
      name: 'spouse_identification_no',
      twocol: true,
      placeholder: 'Please state',
      req: false,
    },
    {
      type: 'date',
      label: 'Date of Birth',
      name: 'spouse_dob',
      twocol: true,
      req: false,
      reqmessage: 'Required',
      disabledDate: PPDates,
    },
    {
      type: 'select',
      label: 'Race',
      name: 'spouse_race',
      twocol: true,
      placeholder: 'Please select',
      options: raceList?.map((x) => ({ label: x.name1, value: x.name })),
      req: false,
    },
    {
      type: 'select',
      label: 'Religion',
      name: 'spouse_religious',
      twocol: true,
      placeholder: 'Please select',
      options: religionList?.map((x) => ({ label: x.name1, value: x.name })),
      req: false,
    },
    {
      type: 'input',
      label: 'Employer Name',
      name: 'spouse_employee_name',
      twocol: true,
      placeholder: 'Please state',
      req: false,
    },
    {
      type: 'input',
      label: 'Employer Email',
      name: 'spouse_employee_email',
      twocol: true,
      email: true,
      placeholder: 'Please state',
      req: false,
    },
    {
      type: 'input',
      label: 'Phone no.',
      name: 'spouse_phone_no',
      twocol: true,
      placeholder: 'Please state',
      req: false,
    },
    {
      type: 'input',
      label: 'Income Tax No.',
      name: 'spouse_income_tax_no',
      twocol: true,
      number: true,
      placeholder: 'Please state',
      req: false,
    },
    {
      type: 'switch',
      label: 'Emergency contact',
      name: 'spouse_emergency_contact',
      twocol: false,
      colWidth: '1 0 100%',
      req: false,
    },

    // Childrens details

    {
      type: 'array',
      name: 'employee_children',
      subheader: 'Children Details',
      twocol: false,
      field: fieldsCh,
      remov: removeCh,
      adding: () => appendCh(initCh),
      appendText: '+ Add children',
      single: false,
      child: [
        {
          subheader: 'Child',
          type: 'select',
          name: 'salutation',
          label: 'Title',
          options: titleList,
          req: false,
          placeholder: 'Please Select',
          twocol: false,
          colWidth: '0 1 150px',
        },
        {
          type: 'input',
          name: 'full_name',
          label: 'Name as per IC/Passport',
          req: false,
          placeholder: 'Please state',
          twocol: false,
          colWidth: '1 0 60%',
        },

        {
          type: 'select',
          name: 'gender',
          label: 'Gender',
          placeholder: 'Please Select',
          options: genderList.map((x) => ({ label: x.name, value: x.name })),
          req: false,
          twocol: true,
        },
        {
          type: 'date',
          name: 'dob',
          label: 'Date of Birth',
          req: false,
          format: 'Do MMMM YYYY',
          twocol: true,
        },
        {
          type: 'input',
          name: 'email',
          label: 'Email',
          req: false,
          email: true,
          placeholder: 'Please state',
          twocol: true,
        },
        {
          type: 'input',
          name: 'occupation',
          label: 'Occupation',
          req: false,
          placeholder: 'Please state',
          twocol: true,
        },
      ],
    },

    // Emergency details
    {
      type: 'array',
      name: 'emergency_contact',
      subheader: 'Emergency Details',
      twocol: false,
      field: fieldsEm,
      remov: removeEm,
      adding: () => appendEm(initEm),
      appendText: '+ Add other emergency details',
      single: false,
      child: [
        {
          subheader: 'Emergency Contact',
          type: 'select',
          name: 'title',
          label: 'Title',
          options: titleList,
          req: false,
          placeholder: 'Please Select',
          twocol: false,
          colWidth: '0 1 150px',
        },
        {
          type: 'input',
          name: 'relation_name',
          label: 'Name as per IC/Passport',
          req: false,
          placeholder: 'Please state',
          twocol: false,
          colWidth: '1 0 auto',
        },

        {
          type: 'select',
          name: 'relation',
          label: 'Relationship',
          placeholder: 'Please Select',
          options: relationList,
          req: false,
          twocol: false,
          colWidth: '1 0 100%',
        },
        {
          type: 'input',
          name: 'email',
          label: 'Email',
          req: false,
          email: true,
          placeholder: 'Please state',
          twocol: true,
        },
        {
          type: 'input',
          name: 'phone',
          label: 'Phone',
          req: false,
          placeholder: 'Please state',
          twocol: true,
        },
      ],
    },

    // Education details
    {
      type: 'array',
      name: 'education',
      twocol: false,
      subheader: 'Education Level',
      field: fieldsEd,
      remov: removeEd,
      adding: () => appendEd(initEd),
      appendText: '+ Add other educaiton level',
      single: false,
      child: [
        {
          subheader: 'Education Level',
          type: 'select',
          name: 'school_univ',
          label: 'Institution',
          req: false,
          options: instituteList?.map((x) => ({ label: x.institution, value: x.name })),
          colWidth: '1 0 100%',
          placeholder: 'Please Select',
          twocol: false,
        },
        {
          type: 'select',
          name: 'fields',
          label: 'Field',
          options: educationList.map((x) => ({ label: x.education_field, value: x.name })),
          req: false,
          colWidth: '1 0 100%',
          placeholder: 'Please Select',
          twocol: false,
        },
        {
          type: 'date',
          name: 'year_of_passing',
          label: 'Graduation Year',
          dateType: 'year',
          format: 'YYYY',
          req: false,
          colWidth: '1 0 100%',
          twocol: false,
        },
        {
          type: 'date',
          name: 'from_date',
          label: 'From Date',
          req: false,
          twocol: true,
        },
        {
          type: 'date',
          name: 'to_date',
          label: 'To Date',
          req: false,
          twocol: true,
        },
        {
          type: 'input',
          name: 'cgpa',
          label: 'CGPA',
          req: false,
          placeholder: 'Please state',
          twocol: true,
        },
        {
          type: 'select',
          name: 'level',
          label: 'Education Type',
          options: degreeList,
          req: false,
          placeholder: 'Please Select',
          twocol: true,
        },
        {
          type: 'select',
          name: 'country',
          label: 'Country of Graduation',
          options: countryList?.map((x) => ({ label: x.name, value: x.name })),
          req: false,
          placeholder: 'Please Select',
          twocol: true,
        },
        {
          name: 'transcript',
          label: 'Attach Transcript',
          req: false,
          placeholder: 'Upload',
          type: 'upload',
          twocol: true,
          reqmessage: 'required',
        },
      ],
    },
    // Work Experience details
    {
      type: 'array',
      name: 'external_work_history',
      twocol: false,
      subheader: 'Work Experience',
      field: fieldsWx,
      remov: removeWx,
      adding: () => appendWx(initWx),
      appendText: '+ Add other work experience',
      single: false,
      child: [
        {
          subheader: 'Work Experience',
          type: 'input',
          name: 'company_name',
          label: 'Employer',
          req: false,
          placeholder: 'Please state',
          twocol: true,
        },
        {
          type: 'select',
          name: 'designation',
          label: 'Position',
          options: positionList,
          req: false,
          placeholder: 'Please Select',
          twocol: true,
        },
        {
          type: 'date',
          name: 'from_date',
          label: 'From Date',
          req: false,
          twocol: true,
        },
        {
          type: 'date',
          name: 'to_date',
          label: 'To Date',
          req: false,
          twocol: true,
        },
        {
          type: 'textarea',
          name: 'description',
          label: 'Description',
          req: false,
          placeholder: 'Please state',
          twocol: false,
          colWidth: '1 0 100%',
        },
      ],
    },
  ];

  return (
    <Row gutter={[24, 30]} align="bottom">
      <Col span={24}>
        <Title level={4} className="mb-0 c-default">
          Personal Information
        </Title>
      </Col>
      {personalFields.map((item, idx) => (
        <Fragment key={idx}>
          {item?.subheader && (
            <Col span={24}>
              <Title level={item?.subheadlevel ? item?.subheadlevel : 4} className="mb-0 c-default">
                {item.subheader}
              </Title>
            </Col>
          )}
          {item.type == 'array' ? (
            <Col span={item.twocol ? 12 : 24}>
              <Row gutter={[20, 30]}>
                <Col span={24}>
                  <ArrayForm fields={item.field} remove={item.remov} item={item} control={control} errors={errors} />
                </Col>
                <Col span={24}>
                  <Button htmlType="button" type="dashed" size="large" className="w-100" onClick={item.adding}>
                    {item.appendText}
                  </Button>
                </Col>
              </Row>
            </Col>
          ) : (
            <FormGroup item={item} control={control} errors={errors} />
          )}
        </Fragment>
      ))}
      {mode == 'edit' && allowed([Roles.EMPLOYMENT], 'write') && (
        <Col span={24}>
          <Row gutter={20} justify="end">
            <Col>
              <Button type="primary" htmlType="submit" size="large" className="green-btn">
                Save Changes
              </Button>
            </Col>
          </Row>
        </Col>
      )}
    </Row>
  );
};
