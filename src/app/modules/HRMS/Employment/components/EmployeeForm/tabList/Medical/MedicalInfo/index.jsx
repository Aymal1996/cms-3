import React, { Fragment } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import FormGroup from 'Molecules/FormGroup';
import {bloodList} from '../../../../../../../../../configs/constantData';
import { allowed } from '../../../../../../../../../routing/config/utils';
import Roles from '../../../../../../../../../routing/config/Roles';

const { Title } = Typography;

const medicalFields = [
  {
    type: 'select',
    label: 'Blood Type',
    name: 'blood_group',
    twocol: false,
    colWidth: '1 0 200px',
    options: bloodList,
    req: true,
    reqmessage: 'Please enter blood type',
  },
  {
    type: 'input',
    label: 'Height (cm)',
    name: 'height',
    twocol: false,
    colWidth: '1 0 200px',
    number: true,
    req: true,
    reqmessage: 'Please enter height',
  },
  {
    type: 'input',
    label: 'Weight (kg)',
    name: 'weight',
    twocol: false,
    colWidth: '1 0 200px',
    number: true,
    req: true,
    reqmessage: 'Please enter weight',
  },
  {
    type: 'textarea',
    label: 'Additional Notes',
    name: 'health_details',
    twocol: false,
    req: false,
  },
];

export default (props) => {

  const { control, errors, mode } = props;

  return (
    <Row gutter={[20, 30]}>
        <Col span={24}>
        <Title level={4} className="mb-0 c-default">Medical Record</Title>
        </Col>
        {medicalFields.map((item, index) => (
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
        {mode == 'edit' && allowed([Roles.EMPLOYMENT], 'write') &&
        <Col span={24}>
        <Row gutter={20} justify='end'>
            <Col><Button type='primary' htmlType='submit' size='large' className='green-btn'>Save Changes</Button></Col>
        </Row>
        </Col>}
    </Row>
  );
};