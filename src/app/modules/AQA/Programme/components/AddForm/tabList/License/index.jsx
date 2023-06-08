import React from 'react';
import {Row, Col, Form, Upload, Input } from 'antd';
import {InputField, DateField } from '../../../../../../../atoms/FormElement';
import { dummyRequest } from '../../../../../../../../features/utility';
import {Controller} from 'react-hook-form';
import { PlusCircleFilled } from '@ant-design/icons';

export default (props) => {

    const { control, errors, t } = props;

    return (
        
        <Row gutter={[20, 30]}>
            <Col span={12}>
                <DateField 
                    fieldname=''
                    fieldname='kpt_application_date'
                    label='KPT Application Date'
                    control={control}
                    class='mb-0'
                    iProps={{ placeholder: 'Please state', size: 'large'}}
                    initValue=''
                    // rules={{ required: status == 'Active', message: 'Date required' }}
                    // validate={errors.kpt_application_date && 'error'}
                    // validMessage={errors.kpt_application_date && errors.kpt_application_date.message}
                />
            </Col>
            <Col span={12}>
                <DateField 
                    fieldname=''
                    fieldname='kpt_approval_date'
                    label='KPT Approval Date'
                    control={control}
                    class='mb-0'
                    iProps={{ placeholder: 'Please state', size: 'large'}}
                    initValue=''
                    // rules={{ required: status == 'Active', message: 'Date required' }}
                    // validate={errors.kpt_approval_date && 'error'}
                    // validMessage={errors.kpt_approval_date && errors.kpt_approval_date.message}
                />
            </Col>
            <Col span={12}>
                <DateField 
                    fieldname=''
                    fieldname='kpt_expiry_date'
                    label='KPT Expiry Date'
                    control={control}
                    class='mb-0'
                    iProps={{ placeholder: 'Please state', size: 'large'}}
                    initValue=''
                    // rules={{ required: status == 'Active', message: 'Date required' }}
                    // validate={errors.kpt_expiry_date && 'error'}
                    // validMessage={errors.kpt_expiry_date && errors.kpt_expiry_date.message}
                />
            </Col>

            <Col span={12}>
                <InputField 
                    fieldname='kpt_approval_code'
                    label='KPT Approval Code'
                    control={control}
                    class='mb-0'
                    iProps={{ placeholder: 'Please state', size: 'large'}}
                    initValue=''
                    // rules={{required: status == 'Active', message: 'Enter Code'}}
                    // validate={errors.kpt_approval_code && 'error'}
                    // validMessage={errors.kpt_approval_code && errors.kpt_approval_code.message}
                />
            </Col>
            <Col span={24}>
                <InputField 
                    isRequired={status == 'Active'}
                    fieldname='kpt_letter'
                    label='KPT Letter No.'
                    control={control}
                    class='mb-0'
                    iProps={{ placeholder: 'Please state', size: 'large'}}
                    initValue=''
                    // rules={{required: status == 'Active', message: 'Enter Letter No'}}
                    // validate={errors.kpt_letter && 'error'}
                    // validMessage={errors.kpt_letter && errors.kpt_letter.message}
                />
            </Col>
            <Col span={24}>
            <Form.Item label="Document" className='mb-0 w-100'>
                <Controller
                  name='kpt_document'
                  control={control}
                  defaultValue=""
                  render={({ value, onChange }) => (
                    <Upload
                      className="uploadWithbtn"
                      showUploadList={false}
                      accept="image/*,.pdf"
                      maxCount={1}
                      customRequest={dummyRequest}
                      onChange={(e) => onChange(e)}
                    >
                      <Input
                        size="large"
                        className="ag-upload-btn"
                        value={value ? value.fileList[0].name : "Please Upload File"}
                        addonAfter={<PlusCircleFilled />}
                      />
                    </Upload>
                  )}
                />
              </Form.Item>
            </Col>
        </Row>
    )
}