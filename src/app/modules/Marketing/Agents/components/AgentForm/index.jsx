import React, { Fragment, useEffect } from 'react';
import { Row, Col, Typography, Card, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import FormGroup from 'Molecules/FormGroup';
import { getCountryDrop } from '../../../../Marketing/Applications/ducks/actions';

const _ = require('lodash');
const { Title } = Typography;

export default (props) => {
  const dispatch = useDispatch();
  const { control, errors, mode } = props;
  const country = useSelector((state) => state.applicationForm.countryData);

  useEffect(() => {
    dispatch(getCountryDrop());
  }, []);

  const agentFields = [
    {
      subheader: 'General Details',
      type: 'input',
      label: 'Full Name',
      name: 'first_name',
      twocol: false,
      colWidth: '0 1 33%',
      placeholder: 'Please state',
      req: true,
      reqmessage: 'Agent Name Required',
    },
    {
      type: 'input',
      name: 'email',
      label: 'Email',
      twocol: false,
      colWidth: '0 1 33%',
      placeholder: 'Please state',
      email: true,
      reqmessage: 'Valid Email Required',
    },
    {
      type: 'select',
      label: 'Nationality',
      name: 'nationality',
      twocol: true,
      req: true,
      colWidth: '0 1 33%',
      options: _.map(country.map((x) => ({label: x.name, value: x.name}))),
      placeholder: 'Please select',
      reqmessage: 'Nationality Required',
    },
    {
      name: 'enabled',
      label: '',
      req: false,
      type: 'checkbox',
      colWidth: '0 1 100%',
      twocol: false,
      reqmessage: '',
      options: [{ label: 'Enable Agent', value: 'enabled' }],
    },
    {
      subheader: 'Bank Details',
      type: 'input',
      label: 'Account Holder Name',
      name: 'account_title',
      twocol: false,
      colWidth: '0 1 50%',
      static: false,
      placeholder: 'Please state',
      req: true,
      reqmessage: 'Account Holder Name Required',
    },
    {
      type: 'input',
      label: 'Bank Name',
      name: 'bank_name',
      twocol: false,
      colWidth: '0 1 50%',
      static: false,
      placeholder: 'Please state',
      req: true,
      reqmessage: 'Bank Name Required',
    },
    {
      type: 'input',
      label: 'IBAN Number',
      name: 'iban_no',
      twocol: false,

      colWidth: '0 1 50%',
      static: false,
      placeholder: 'Please state',
      req: true,
      reqmessage: 'IBAN Number Required',
    },
    {
      type: 'input',
      label: 'Bank Address',
      name: 'address',
      twocol: false,

      colWidth: '0 1 50%',
      static: false,
      placeholder: 'Please state',
      req: true,
      reqmessage: 'Bank Address Required',
    },
    {
      type: 'select',
      label: 'Bank Country',
      name: 'country',
      twocol: false,

      colWidth: '0 1 50%',
      static: false,
      placeholder: 'Please state',
      req: true,
      reqmessage: 'Bank Country Required',
      options: _.map(country.map((x) => ({label: x.name, value: x.name}))),
    },
    {
      type: 'input',
      label: 'Bank State',
      name: 'state',
      twocol: false,

      colWidth: '0 1 50%',
      static: false,
      placeholder: 'Please state',
      req: true,
      reqmessage: 'Bank State Required',
    },
    {
      type: 'input',
      label: 'Bank Swift Code',
      name: 'swift_code',
      twocol: false,

      colWidth: '0 1 50%',
      static: false,
      placeholder: 'Please state',
      req: true,
      reqmessage: 'Bank Swift Code Required',
    },
    {
      type: 'input',
      label: 'Bank Postal Code',
      name: 'post_code',
      twocol: false,

      colWidth: '0 1 50%',
      static: false,
      placeholder: 'Please state',
      req: true,
      reqmessage: 'Bank Postal Code Required',
    },
  ];

  return (
    <Card bordered={false} className="uni-card h-auto">
      <Row gutter={[20, 30]} align="bottom">
        {agentFields.map((item, idx) => (
          <Fragment key={idx}>
            {item?.subheader && (
              <Col span={24}>
                <Title level={item?.subheadlevel ? item?.subheadlevel : 4} className="mb-0 c-default">
                  {item.subheader}
                </Title>
              </Col>
            )}
            <FormGroup item={item} control={control} errors={errors} />
          </Fragment>
        ))}

        <Col span={24}>
          <Row gutter={20} justify="center">
            <Col>
              <Button size="large" type="primary" htmlType="submit" className="green-btn">
                { mode == 'edit' ? 'Update' : 'Submit'}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};
