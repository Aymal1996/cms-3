import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Tabs, Button, Spin, Upload, Input, Form } from 'antd';
import { InputField, SelectField, DateField, CheckboxGroup } from '../../../../../atoms/FormElement';
import AttachProgram from '../../../../components/AttachProgram';
import { LoadingOutlined } from '@ant-design/icons';
import DetailForm from './DetailForm';
// import { getProgrmList } from '../../ducks/actions';
import moment from 'moment';
import { dummyRequest } from '../../../../../../features/utility';
import { Controller } from 'react-hook-form';
import { PlusCircleFilled } from '@ant-design/icons';
import {
  getCountryDrop,
  getNationalityDrop,
  getRaceDrop,
  getReligionDrop,
  getApplicationTypeDrop,
  getGenderDrop,
  getEnglishQualificationDrop,
  getProgNameDrop,
} from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

const { TabPane } = Tabs;
const { Title } = Typography;
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const [tabkey, setTabkey] = useState('1');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(props.loading);
  const { control, errors, tags, setTags, mode, deleted, setDeleted, t } = props;
  const countryDropData = useSelector((state) => state.applicationForm.countryData);
  const nationalityDropData = useSelector((state) => state.applicationForm.nationalityData);
  const religionDropData = useSelector((state) => state.applicationForm.religionData);
  const raceDropData = useSelector((state) => state.applicationForm.raceData);
  const appTypeDropData = useSelector((state) => state.applicationForm.appTypeData);
  const genderDropData = useSelector((state) => state.applicationForm.genderData);
  const engDropData = useSelector((state) => state.applicationForm.engQualificationData);
  const progDropData = useSelector((state) => state.applicationForm.progData);

  const PPDates = (current) => {
    return current && current < moment().endOf('day');
  };
  useEffect(() => {
    dispatch(getCountryDrop());
    dispatch(getNationalityDrop());
    dispatch(getRaceDrop());
    dispatch(getReligionDrop());
    dispatch(getApplicationTypeDrop());
    dispatch(getGenderDrop());
    dispatch(getEnglishQualificationDrop());
    dispatch(getProgNameDrop());
  }, []);

  return (
    <Card bordered={false} className="uni-card h-auto">
      <Row gutter={[30, 20]}>
        <Col span={24}>
          <Tabs activeKey={tabkey} onChange={(e) => setTabkey(e)} type="card" className="custom-tabs -space30">
            <TabPane tab="Personal Details" key="1" forceRender={true}>
              <Row gutter={36}>
                <Col span={12}>
                  <InputField
                    label="Name as per IC/Passport"
                    fieldname="applicant_name"
                    initValue=""
                    iProps={{ placeholder: 'Please state' }}
                    isRequired={true}
                    control={control}
                    rules={{
                      required: 'Applicant Name Required',
                      pattern: {
                        value: /^[A-Za-z ]+$/,
                        message: 'Enter only Alphabets',
                      },
                    }}
                    validate={errors.applicant_name && 'error'}
                    validMessage={errors.applicant_name && errors.applicant_name.message}
                  />
                </Col>
                <Col span={12}>
                  <SelectField
                    label="Nationality"
                    fieldname="nationality"
                    initValue=""
                    iProps={{ placeholder: 'Please Select' }}
                    control={control}
                    selectOption={
                      nationalityDropData &&
                      nationalityDropData.map((e) => {
                        return { value: e.name, label: e.name };
                      })
                    }
                    rules={{
                      required: 'Nationality Required',
                    }}
                    isRequired={mode == 'edit' && true}
                    validate={mode == 'edit' && errors.nationality && 'error'}
                    validMessage={mode == 'edit' && errors.nationality && errors.nationality.message}
                  />
                </Col>
                <Col span={12}>
                  <SelectField
                    label="Gender"
                    fieldname="gender"
                    initValue=""
                    iProps={{
                      placeholder: 'Please Select',
                    }}
                    control={control}
                    selectOption={
                      genderDropData &&
                      genderDropData.map((e) => {
                        return { value: e.name, label: e.name };
                      })
                    }
                    rules={{
                      required: 'Gender Required',
                    }}
                    isRequired={mode == 'edit' && true}
                    validate={mode == 'edit' && errors.gender && 'error'}
                    validMessage={mode == 'edit' && errors.gender && errors.gender.message}
                  />
                </Col>
                <Col span={12}>
                  <SelectField
                    label="Race"
                    fieldname="race"
                    initValue=""
                    iProps={{ placeholder: 'Please Select' }}
                    control={control}
                    selectOption={
                      raceDropData &&
                      raceDropData.map((e) => {
                        return { value: e.name, label: e.name };
                      })
                    }
                  />
                </Col>
                <Col span={12}>
                  <InputField
                    label="Contact Number"
                    fieldname="contact_no"
                    initValue=""
                    iProps={{ placeholder: 'Please state' }}
                    isRequired={true}
                    control={control}
                    rules={{ required: 'Contact number required' }}
                    validate={errors.contact_no && 'error'}
                    validMessage={errors.contact_no && errors.contact_no.message}
                  />
                </Col>
                <Col span={12}>
                  <SelectField
                    label="Maritial Status"
                    fieldname="marital_satus"
                    initValue=""
                    iProps={{ placeholder: 'Please Select' }}
                    control={control}
                    selectOption={[
                      { value: 'Married', label: 'Married' },
                      { value: 'Single', label: 'Single' },
                    ]}
                    rules={{
                      required: 'Maritial Status Required',
                    }}
                    isRequired={mode == 'edit' && true}
                    validate={mode == 'edit' && errors.marital_satus && 'error'}
                    validMessage={mode == 'edit' && errors.marital_satus && errors.marital_satus.message}
                  />
                </Col>
                <Col span={12}>
                  <InputField
                    label="Email"
                    fieldname="email"
                    initValue=""
                    iProps={{ placeholder: 'Please state' }}
                    isRequired={true}
                    control={control}
                    rules={{
                      required: 'Email Required',
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: 'Enter valid Email Address',
                      },
                    }}
                    validate={errors.email && 'error'}
                    validMessage={errors.email && errors.email.message}
                  />
                </Col>
                <Col span={12}>
                  <InputField
                    label="IC/Passport Number"
                    fieldname="icpassport"
                    initValue=""
                    iProps={{ placeholder: 'Please state' }}
                    isRequired={true}
                    control={control}
                    rules={{
                      required: 'IC/Passport Number Required',
                      pattern: {
                        message: 'Enter valid IC/Passport Number',
                      },
                    }}
                    validate={errors.icpassport && 'error'}
                    validMessage={errors.icpassport && errors.icpassport.message}
                  />
                </Col>
                <Col span={12}>
                  <Form.Item label="Passport Photo with White Background">
                    <Controller
                      name="attached_document_bg"
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
                            value={value ? value.fileList[0].name : 'Please Upload File'}
                            addonAfter={<PlusCircleFilled />}
                          />
                        </Upload>
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="IC/Passport(Scanned)">
                    <Controller
                      name="attached_document_scanned"
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
                            value={value ? value.fileList[0].name : 'Please Upload File'}
                            addonAfter={<PlusCircleFilled />}
                          />
                        </Upload>
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <DateField
                    label="Date of Birth"
                    fieldname="date_of_birth"
                    initValue=""
                    iProps={{
                      placeholder: 'Please select date',
                      format: 'DD-MM-YYYY',
                    }}
                    control={control}
                    rules={{
                      setValueAs: (value) => moment(value).format('YYYY-MM-DD'),
                      required: 'Date of Birth Required',
                    }}
                    isRequired={mode == 'edit' && true}
                    validate={mode == 'edit' && errors.date_of_birth && 'error'}
                    validMessage={mode == 'edit' && errors.date_of_birth && errors.date_of_birth.message}
                  />
                </Col>
                <Col span={12}>
                  <DateField
                    label="Passport Expiry Date"
                    fieldname="passport_expiry"
                    initValue=""
                    iProps={{
                      placeholder: 'Please select date',
                      format: 'DD-MM-YYYY',
                      disabledDate: PPDates,
                    }}
                    control={control}
                    rules={{
                      setValueAs: (value) => moment(value).format('YYYY-MM-DD'),
                      required: 'Passport Expiry Required',
                    }}
                    isRequired={mode == 'edit' && true}
                    validate={mode == 'edit' && errors.passport_expiry && 'error'}
                    validMessage={mode == 'edit' && errors.passport_expiry && errors.passport_expiry.message}
                  />
                </Col>
                <Col span={12}>
                  <InputField
                    label="Place of Birth"
                    fieldname="place_of_birth"
                    initValue=""
                    iProps={{ placeholder: 'Please state' }}
                    control={control}
                    rules={{
                      required: 'Place of Birth Required',
                    }}
                    isRequired={mode == 'edit' && true}
                    validate={mode == 'edit' && errors.place_of_birth && 'error'}
                    validMessage={mode == 'edit' && errors.place_of_birth && errors.place_of_birth.message}
                  />
                </Col>
                <Col span={12}>
                  <SelectField
                    label="Passport Issuing Country"
                    fieldname="issuing_country"
                    initValue=""
                    iProps={{
                      placeholder: 'Please select',
                    }}
                    control={control}
                    selectOption={
                      countryDropData &&
                      countryDropData.map((e) => {
                        return { value: e.name, label: e.name };
                      })
                    }
                    rules={{
                      required: 'Passport Issuing Country Required',
                    }}
                    isRequired={mode == 'edit' && true}
                    validate={mode == 'edit' && errors.issuing_country && 'error'}
                    validMessage={mode == 'edit' && errors.issuing_country && errors.issuing_country.message}
                  />
                </Col>

                <Col span={24}>
                  <Row justify="space-between" align="middle" className="mt-1 mb-1">
                    <Col>
                      <Title level={4} className="text-offwhite RegularFont mb-1 font-400">
                        Current Address
                      </Title>
                    </Col>
                  </Row>
                </Col>

                <Col span={12}>
                  <InputField
                    label="Address"
                    fieldname="current_address_1"
                    initValue=""
                    iProps={{ placeholder: 'Please state' }}
                    control={control}
                  />
                </Col>
                <Col span={12}>
                  <InputField
                    label="State"
                    fieldname="permanent_state"
                    initValue=""
                    iProps={{ placeholder: 'Please state' }}
                    control={control}
                  />
                </Col>
                <Col span={12}>
                  <InputField
                    label="Postcode"
                    fieldname="current_post_code"
                    initValue=""
                    iProps={{ placeholder: 'Please state' }}
                    control={control}
                  />
                </Col>
                <Col span={12}>
                  <SelectField
                    label="Country"
                    fieldname="current_country"
                    initValue=""
                    iProps={{ placeholder: 'Please select' }}
                    control={control}
                    selectOption={
                      countryDropData &&
                      countryDropData.map((e) => {
                        return { value: e.name, label: e.name };
                      })
                    }
                  />
                </Col>
                <Col span={24}>
                  <InputField
                    label="City"
                    fieldname="current_city"
                    initValue=""
                    iProps={{ placeholder: 'Please state' }}
                    control={control}
                  />
                </Col>

                <Col span={24}>
                  <Row justify="space-between" align="middle" className="mt-1 mb-1">
                    <Col>
                      <Title level={4} className="text-offwhite RegularFont mb-1 font-400">
                        Permanent Address
                      </Title>
                    </Col>
                  </Row>
                </Col>

                <Col span={12}>
                  <InputField
                    label="Address"
                    fieldname="current_address_2"
                    initValue=""
                    iProps={{ placeholder: 'Please state' }}
                    control={control}
                  />
                </Col>
                <Col span={12}>
                  <InputField
                    label="State"
                    fieldname="permanent_state2"
                    initValue=""
                    iProps={{ placeholder: 'Please state' }}
                    control={control}
                  />
                </Col>
                <Col span={12}>
                  <InputField
                    label="Postcode"
                    fieldname="current_post_code2"
                    initValue=""
                    iProps={{ placeholder: 'Please state' }}
                    control={control}
                  />
                </Col>
                <Col span={12}>
                  <SelectField
                    label="Country"
                    fieldname="current_country2"
                    initValue=""
                    iProps={{ placeholder: 'Please select' }}
                    control={control}
                    selectOption={
                      countryDropData &&
                      countryDropData.map((e) => {
                        return { value: e.name, label: e.name };
                      })
                    }
                  />
                </Col>
                <Col span={12}>
                  <InputField
                    label="City"
                    fieldname="current_city2"
                    initValue=""
                    iProps={{ placeholder: 'Please state' }}
                    control={control}
                  />
                </Col>
                <Col span={12} style={{ marginTop: '32px' }}>
                  <CheckboxGroup
                    fieldname="permenent_address"
                    label=""
                    class="fullWidth-checbox"
                    control={control}
                    initValue=""
                    option={[{ label: 'Same as current address', value: 'Same as current address' }]}
                  />
                </Col>

                <Col span={24}>
                  <Row justify="space-between" align="middle" className="mt-1 mb-1">
                    <Col>
                      <Title level={4} className="text-offwhite RegularFont mb-1 font-400">
                        Emergency Contact
                      </Title>
                    </Col>
                  </Row>
                </Col>

                <Col span={12}>
                  <InputField
                    label="Name"
                    fieldname="emergency_contact_name"
                    initValue=""
                    iProps={{ placeholder: 'Please state' }}
                    control={control}
                  />
                </Col>
                <Col span={12}>
                  <InputField
                    label="Contact Number"
                    fieldname="emergency_contact_number"
                    initValue=""
                    iProps={{ placeholder: 'Please state' }}
                    control={control}
                  />
                </Col>
                <Col span={24}>
                  <InputField
                    label="Email"
                    fieldname="emergency_contact_email"
                    initValue=""
                    iProps={{ placeholder: 'Please state' }}
                    control={control}
                    // rules={{
                    //     pattern: {
                    //         value: /(?=^.{1,50}$)^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    //         message: "Enter valid Email Address",
                    //     },
                    // }}
                  />
                </Col>
                <Col span={24} className="text-center">
                  <Button type="primary" onClick={() => setTabkey('2')} className="mt-1 green-btn">
                    Proceed to Academic Details
                  </Button>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Academic Details" key="2" forceRender={true}>
              <Row gutter={36}>
                <DetailForm
                  tags={tags}
                  setTags={setTags}
                  control={control}
                  errors={errors}
                  engDropData={engDropData}
                  progDropData={progDropData}
                  appTypeDropData={appTypeDropData}
                  countryDropData={countryDropData}
                  mode={mode}
                />
                <Col span={24} className="text-center">
                  <Button className="mt-1 green-btn" type="primary" htmlType="submit">
                    Submit Application
                  </Button>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Card>
  );
};
