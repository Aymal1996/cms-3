import React, { Fragment } from 'react';
import { Row, Col, Typography } from 'antd';
import { useSelector } from 'react-redux';
import FormGroup from 'Molecules/FormGroup';

const { Title } = Typography;
const _ = require('lodash');

export default (props) => {
  const countryList = useSelector((state) => state.global.countryData);
  const { control, errors, t } = props;
  const formFields = [
    {
      name: 'scholarship_code',
      label: 'Scholarship Code',
      req: true,
      placeholder: 'Please state',
      type: 'input',
      twocol: false,
      reqmessage: 'Scholarship Code required',
    },
    {
      name: 'scholarship_name',
      label: 'Scholarship Name',
      req: true,
      placeholder: 'Please State',
      type: 'input',
      twocol: false,
      reqmessage: 'Scholarship Name required',
    },
    
    {
      name: 'contact_person',
      label: 'Contact Person',
      req: true,
      placeholder: 'Please State',
      type: 'input',
      twocol: false,
      reqmessage: 'Contact Person required',
    },
    {
      name: 'address',
      label: 'Address',
      req: false,
      placeholder: 'Please select',
      type: 'input',
      twocol: true,
      reqmessage: 'Address required',
    },
    {
      name: 'state',
      label: 'State',
      req: false,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
      reqmessage: 'State required',
    },
    {
      name: 'postcode',
      label: 'Postcode',
      req: false,
      number: true,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
      reqmessage: 'Postcode required',
    },
    {
      name: 'country',
      label: 'Country',
      req: false,
      placeholder: 'Please select',
      type: 'select',
      twocol: true,
      reqmessage: 'Please select',
      options: _.map(countryList, (e) => ({ label: e.name, value: e.name })),
    },
    {
      name: 'city',
      label: 'City',
      req: false,
      placeholder: 'Please state',
      type: 'input',
      twocol: false,
      reqmessage: 'City required',
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
      name: 'contact_number',
      label: 'Contact Number',
      req: false,
      placeholder: 'Please state',
      number: true,
      type: 'input',
      twocol: true,
      reqmessage: 'Contact Number required',
    },
  ];

  return (
    <Row gutter={[20, 30]} align="bottom">
      <Col span={24}>
        <Title level={4} className="mb-0">
          Personal Details
        </Title>
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
    </Row>
  );
};
