import React from "react";
import { Col, Select, Row, Divider, Typography, Upload, Input, Form } from "antd";
import { InputField, SelectField } from '../../../../../atoms/FormElement';
import EducationLevel from "./EducationLevel/EducationLevel";
import { dummyRequest } from '../../../../../../features/utility';
import { Controller } from 'react-hook-form';
import { PlusCircleFilled } from '@ant-design/icons';

const DetailForm = (props) => {
  const { control, errors, progDropData, engDropData, appTypeDropData, countryDropData, mode, tags, setTags } = props;
  const { Option } = Select;
  const { Title, Text } = Typography;

  return (
    <>
      <Col span={24}>
        <SelectField
          label="Application Type"
          fieldname="type"
          initValue=""
          iProps={{ placeholder: "Please select" }}
          isRequired={true}
          control={control}
          rules={{
            required: "Application Type required",
          }}
          validate={errors.type && "error"}
          validMessage={errors.type && errors.type.message}
          selectOption={
            appTypeDropData &&
            appTypeDropData.map((e) => {
              return { value: e.name, label: e.name };
            })
          }
        />
      </Col>
      <Col span={24}>
        <SelectField
          label="1st Preference"
          fieldname="first_pref"
          initValue=""
          iProps={{ placeholder: "Please select" }}
          control={control}
          selectOption={
            progDropData &&
            progDropData.map((e) => {
              return { value: e.program_name, label: e.program_name };
            })
          }
          rules={{
            required: "1st Preference Required",
          }}
          isRequired={mode == 'edit' && true}
          validate={mode == 'edit' && errors.first_pref && "error"}
          validMessage={
            mode == 'edit' && errors.first_pref && errors.first_pref.message
          }
        />
      </Col>
      <Col span={24}>
        <SelectField
          label="2nd preference"
          fieldname="second_pref"
          initValue=""
          iProps={{ placeholder: "Please select" }}
          control={control}
          selectOption={
            progDropData &&
            progDropData.map((e) => {
              return { value: e.program_name, label: e.program_name };
            })
          }
          rules={{
            required: "2nd preference Required",
          }}
          isRequired={mode == 'edit' && true}
          validate={mode == 'edit' && errors.second_pref && "error"}
          validMessage={
            mode == 'edit' && errors.second_pref && errors.second_pref.message
          }
        />
      </Col>
      <Col span={24}>
        <SelectField
          label="3rd preference"
          fieldname="third_pref"
          initValue=""
          iProps={{ placeholder: "Please select" }}
          control={control}
          selectOption={
            progDropData &&
            progDropData.map((e) => {
              return { value: e.program_name, label: e.program_name };
            })
          }
        />
      </Col>
      <Col span={24} className="mb-2">
        <Row justify="space-between" align="middle" className="mt-1 mb-2">
          <Col>
            <Title level={4} className="text-offwhite RegularFont mb-0 font-400">
              Education Level
            </Title>
          </Col>
        </Row>
        <EducationLevel
          countryDropData={countryDropData}
          control={control}
          errors={errors}
          tags={tags}
          setTags={setTags}
        />
      </Col>
      <Divider style={{ margin: "12px 0" }} />
      <Col span={24}>
        <Row justify="space-between" align="middle" className="mt-1 mb-2">
          <Col>
            <Title level={4} className="text-offwhite RegularFont mb-0 font-400">
              English Proficiency
            </Title>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <SelectField
          label="English Language Qualification"
          fieldname="english_language_qualification"
          initValue=""
          iProps={{ placeholder: "Please select" }}
          control={control}
          selectOption={
            engDropData &&
            engDropData.map((e) => {
              return { value: e.name, label: e.name };
            })
          }
        />
      </Col>
      <Col span={24}>
        <InputField
          label="Score"
          fieldname="score"
          initValue=""
          iProps={{ placeholder: "Please state" }}
          control={control}
        />
      </Col>
      <Col span={24}>
        <Form.Item label="Certificate">
          <Controller
            name='certificate'
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
    </>
  );
};

export default DetailForm;
