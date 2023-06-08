import React from 'react';
import {Row, Col } from 'antd';
import {InputField, DateField, SelectField } from '../../../../../../../atoms/FormElement';

export default (props) => {

    const { control, errors, t } = props;

    return (
        
        <Row gutter={[20, 30]}>
            <Col span={12}>
                <SelectField
                    label="MQA Status"
                    fieldname="mqa_status"
                    initValue=""
                    iProps={{ placeholder: "Please Select" }}
                    control={control}
                    selectOption={[
                        { value: "Active", label: "Active" },
                        { value: "Inactive", label: "Inactive" },
                    ]}
                />
            </Col>
            <Col span={12}>
                <InputField 
                    fieldname='mqa_serial_no'
                    label='MQA Serial No'
                    control={control}
                    class='mb-0'
                    iProps={{ placeholder: 'Please state', size: 'large'}}
                    initValue=''
                    // rules={{ required: 'Serial No. required' }}
                    // validate={errors.mqa_serial_no && 'error'}
                    // validMessage={errors.mqa_serial_no && errors.mqa_serial_no.message}
                />
            </Col>
            <Col span={12}>
                <InputField 
                    fieldname='mqa_reference_no'
                    label='MQA Reference No'
                    control={control}
                    class='mb-0'
                    iProps={{ placeholder: 'Please state', size: 'large'}}
                    initValue=''
                    // rules={{ required: 'Reference No. required' }}
                    // validate={errors.mqa_reference_no && 'error'}
                    // validMessage={errors.mqa_reference_no && errors.mqa_reference_no.message}
                />
            </Col>
            <Col span={12}>
                <InputField 
                    fieldname='mqa_accreditation'
                    label='MQA Accreditation'
                    control={control}
                    class='mb-0'
                    iProps={{ placeholder: 'Please state', size: 'large'}}
                    initValue=''
                    // rules={{ required: 'Accreditation required' }}
                    // validate={errors.mqa_accreditation && 'error'}
                    // validMessage={errors.mqa_accreditation && errors.mqa_accreditation.message}
                />
            </Col>

            <Col span={12}>
                <DateField 
                    fieldname='mqa_application_date'
                    label='MQA Application Date'
                    control={control}
                    class='mb-0'
                    iProps={{ placeholder: 'Please state', size: 'large'}}
                    initValue=''
                    // rules={{ required: 'Date required' }}
                    // validate={errors.mqa_application_date && 'error'}
                    // validMessage={errors.mqa_application_date && errors.mqa_application_date.message}
                />
            </Col>
            <Col span={12}>
                <DateField 
                    fieldname='mqa_validity_start_date'
                    label='MQA Validity Start Date'
                    control={control}
                    class='mb-0'
                    iProps={{ placeholder: 'Please state', size: 'large'}}
                    initValue=''
                    // rules={{ required: 'Date required' }}
                    // validate={errors.mqa_validity_start_date && 'error'}
                    // validMessage={errors.mqa_validity_start_date && errors.mqa_validity_start_date.message}
                />
            </Col>
            <Col span={12}>
                <DateField 
                    fieldname='mqa_expiry_date'
                    label='MQA Expiry Date'
                    control={control}
                    class='mb-0'
                    iProps={{ placeholder: 'Please state', size: 'large'}}
                    initValue=''
                    // rules={{ required: 'Date required' }}
                    // validate={errors.mqa_validity_start_date && 'error'}
                    // validMessage={errors.mqa_validity_start_date && errors.mqa_validity_start_date.message}
                />
            </Col>
            
        </Row>
    )
}