import React, { useState, Fragment } from "react";
import { Row, Col, Card, Button, Typography, Upload, Input, Form } from "antd";
import { useForm } from "react-hook-form";
import { SelectField } from '../../../../../../atoms/FormElement';
import { dummyRequest } from '../../../../../../../features/utility';
import {Controller} from 'react-hook-form';
import { PlusCircleFilled } from '@ant-design/icons';

const { Title } = Typography;
const AddMoreAcadic = (countryDropData,tags, setTags) => {
  const { control, errors } = useForm();
  const [counter, setCounter] = useState(1);
  const [filelist, setfilelist] = useState([]);
  const FilePorps = {
    className: "file-upload",
    name: "file",
    multiple: false,
    showUploadList: false,
    onRemove: (file) => {
      setfilelist([]);
    },
    beforeUpload: (file) => {
      console.log({ file });
      setfilelist(file);
      return false;
    },
  };
  const addAcademic = () => {
    setTags((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const removeAcademic = (index) => () => {
    setTags((prevIndexes) => [
      ...prevIndexes.filter((item) => item !== index),
    ]);
    setCounter((prevCounter) => prevCounter + 1);
  };
  return (
    <Fragment>
      {tags.map((index, key) => {
        return (
          <>
            <Card style={{ backgroundColor: "transparent", padding:'0' }} className="mb-2">
              <Row gutter={36}>
                <Col span={24}>
                  <Row justify="space-between" align="middle" className="mt-1 mb-1">
                    <Col>
                      <Title level={4} className="text-offwhite RegularFont mb-1 font-400">
                      Academic Qualification {index + 1}
                      </Title>
                    </Col>
                    <Col>
                      <Button type="link" className="text-white p-0" onClick={removeAcademic(index)}>
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <SelectField
                    label="Academic Qualification"
                    fieldname="education_name"
                    initValue=""
                    iProps={{ placeholder: "Please select" }}
                    control={control}
                    selectOption={[
                      { value: "A-Levels", label: "A-Levels" },
                      { value: "Associate Degree", label: "Associate Degree" },
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <SelectField
                    label="Country of Education"
                    fieldname="country"
                    initValue=""
                    iProps={{ placeholder: "Please select" }}
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
                  <Form.Item label="Academic Transcript">
                    <Controller
                      name='academic_transcript'
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
                <Col span={12}>
                  <Form.Item label="Academic Certificate">
                    <Controller
                      name='academic_certificate'
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
            </Card>
          </>
        );
      })}
      <Button htmlType='button' type="dashed" size='large' className='w-100' onClick={addAcademic}>
        Add other academic qualification
      </Button>
    </Fragment>
  );
};

const EducationLevel = (props) => {
  const { control, errors, countryDropData, tags, setTags } = props;
  const [filelist, setfilelist] = useState([]);
  const FilePorps = {
    className: "file-upload",
    name: "file",
    multiple: false,
    showUploadList: false,
    onRemove: (file) => {
      setfilelist([]);
    },
    beforeUpload: (file) => {
      console.log({ file });
      setfilelist(file);
      return false;
    },
  };
  return (
    <>
      <Card style={{ backgroundColor: "transparent", padding:'0' }} className="mb-2">
        <Row gutter={36}>
          <Col span={24}>
            <Row justify="space-between" align="middle" className="mt-1 mb-1">
              <Col>
                <Title level={4} className="text-offwhite RegularFont mb-1 font-400">
                Academic Qualification 1
                </Title>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <SelectField
              label="Academic Qualification"
              fieldname="education_name"
              initValue=""
              iProps={{ placeholder: "Please select" }}
              control={control}
              selectOption={[
                { value: "A-Levels", label: "A-Levels" },
                { value: "Associate Degree", label: "Associate Degree" },
              ]}
            />
          </Col>
          <Col span={12}>
            <SelectField
              label="Country of Education"
              fieldname="country"
              initValue=""
              iProps={{ placeholder: "Please select" }}
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
            <Form.Item label="Academic Transcript">
              <Controller
                name='academic_transcript'
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
          <Col span={12}>
            <Form.Item label="Academic Certificate">
              <Controller
                name='academic_certificate'
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
      </Card>
      {AddMoreAcadic(countryDropData, tags, setTags)}
    </>
  );
};

export default EducationLevel;
