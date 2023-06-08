import React, { Fragment } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import FormGroup from 'Molecules/FormGroup';
import { pStatus } from '../../../../../../../../../configs/constantData';
import { allowed } from '../../../../../../../../../routing/config/utils';
import Roles from '../../../../../../../../../routing/config/Roles';

const { Title } = Typography;

export default (props) => {

  const { control, errors, mode, idState } = props;

  const passportFields = [
    {
      type: 'input',
      label: 'Passport No.',
      name: 'passport_number',
      twocol: true,
      placeholder: 'Passport Number',
      req: idState,
      reqmessage: 'Please enter passport no',
    },
    {
      type: 'select',
      label: 'Passport Status',
      name: 'passport_status',
      twocol: true,
      options: pStatus,
      req: false,
      reqmessage: 'Please enter passport status',
    },
    {
      type: 'date',
      label: 'Issued Date',
      name: 'date_of_issue',
      twocol: true,
      req: idState,
      format: 'Do MMMM YYYY',
      reqmessage: 'Please enter issue date',
    },
    {
      type: 'date',
      label: 'Expiration Date',
      name: 'valid_upto',
      twocol: true,
      req: idState,
      reqmessage: 'Please enter expiration date',
      format: 'Do MMMM YYYY'
    },
    {
      type: 'input',
      label: 'Employment Pass No.',
      name: 'employment_pass_no',
      placeholder: 'Pass Number',
      twocol: true,
      req: false
    },
    {
      type: 'date',
      label: 'Expiration Date',
      name: 'emp_pass_expiration_date',
      twocol: true,
      req: false,
      format: 'Do MMMM YYYY'
    },
    {
      type: 'upload',
      name: 'attach_passport',
      label: 'Attach Passport (PDF 10MB max)',
      placeholder: 'Upload Passport',
      twocol: false,
      req: idState
    },
  ];

  return (
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <Title level={4} className="mb-0 c-default">Passport Information</Title>
        </Col>
        {passportFields.map((item, index) => (
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
        {mode == 'edit' && allowed([Roles.EMPLOYMENT], 'write') && <Col span={24}>
          <Row gutter={20} justify='end'>
            <Col><Button type='primary' htmlType='submit' size='large' className='green-btn'>Save Changes</Button></Col>
          </Row>
        </Col>}
      </Row>
  );
};