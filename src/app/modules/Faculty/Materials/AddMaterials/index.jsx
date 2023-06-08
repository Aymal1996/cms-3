import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Form, Button, Upload, Input, Spin, message, Breadcrumb } from 'antd';
import axios from '../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../configs/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import FormGroup from '../../../../molecules/FormGroup';
import { PlusCircleFilled, LoadingOutlined } from '@ant-design/icons';
import AddAssignModule from './AssignModule';
import { getSingleUpload, uniquiFileName, getFileName } from '../../../../../features/utility';
import { addMaterial, editMaterial, reviseMaterial } from '../ducks/services';
import { editMaterialType, showMaterialForm } from '../ducks/actions';
import HeadingChip from '../../../../molecules/HeadingChip';
import { materialType } from '../../../../../configs/constantData';
import PDFViewer from '../../../../molecules/PDFViewer';
import { Popup } from '../../../../atoms/Popup';
import { containsImg } from '@utils/generic';

const antIcon = <LoadingOutlined spin />;

const index = ({ mode }) => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const { id } = useParams();
  const { errors, control, setValue, getValues, handleSubmit, setError, clearErrors } = useForm();
  const [tags, setTags] = useState([]);
  const [load, setLoad] = useState(false);
  const [visible, setVisible] = useState(false);
  const [removeMat, setRemoveMat] = useState([]);
  const [pdfFile, setPdfFile] = useState('');
  const addMaterialState = useSelector((state) => state.material.materialForm);
  // setValue('author', JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].full_name);
  setValue('university_name', JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company);
  setValue('author', JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].full_name);
  // const { fieldErrors } = errors;
  const assetFields = [
    {
      name: 'material_name',
      label: 'Material Name',
      placeholder: 'Type material name',
      type: 'input',
      twocol: false,
      req: true,
      reqmessage: 'Name required',
    },
    {
      name: 'author',
      label: 'Author Name',
      placeholder: 'Type author name',
      type: 'input',
      twocol: false,
      req: true,
      disabled: true,
      reqmessage: 'Name required',
    },
    {
      name: 'university_name',
      label: 'University',
      placeholder: 'Select name',
      type: 'input',
      twocol: true,
      disabled: true,
      req: true,
      reqmessage: 'University required',
    },
    {
      name: 'material_type',
      label: 'Material Type ',
      placeholder: 'Material type',
      type: 'select',
      twocol: true,
      req: true,
      reqmessage: 'Type required',
      options: materialType,
    },

    {
      name: 'tags',
      label: 'Tags',
      placeholder: 'tags',
      type: 'select',
      multiple: true,
      twocol: false,
      options: tags,
      req: true,
      reqmessage: 'Tags required',
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    class: 'white-modal',
    content: <PDFViewer pdf={pdfFile} />,
    width: 950,
    onCancel: () => setVisible(false),
  };

  const onFinish = async (value, status) => {
    status == 'Draft' ? setVisible(false) : setVisible(true);
    setLoad(true);
    const authID = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;
    let fileurl = '';
    if (value.content.type) {
      let modifiedName = uniquiFileName(value.content?.name);
      let res = await getSingleUpload(modifiedName, 'pdf', value.content, 'Materials');
      fileurl = res?.file_url;
    }
    let deletedModule = removeMat.map((value) => ({
      name: value.name,
      module_code: value.code,
      module_name: value.modName,
      module: value.modUniq,
      assigned_week: value.assigned_week,
      assigned_week_name: value.assigned_week_name,
      material_code: value.material_code,
    }));
    const payload = {
      materials: [
        {
          material_name: value?.material_name,
          author: value?.author,
          author_id: authID,
          status: typeof status == 'string' ? status : 'Active',
          material_document: fileurl
            ? fileurl
            : getValues().content?.fileList?.length
            ? getValues().content?.fileList[0].name
            : '',
          university: value?.university_name,
          material_type: value?.material_type.value,
          doctype: 'Materials',
          tags: value?.tags.length
            ? value.tags.map((value) => ({ tag_name: value.value, doctype: 'Material Tags List' }))
            : '',
          assigned_modules: value?.assigned_modules,
        },
      ],
      deleted_modules: deletedModule,
    };
    addMaterialState == 'add'
      ? addMaterial(payload)
          .then((response) => {
            if (response?.data?.message.success) {
              message.success(response?.data?.message.message);
            } else {
              message.error(response?.data?.message.message);
            }
            setLoad(false);
          })
          .catch((error) => {
            setLoad(false);
            message.error('Something went worng');
          })
      : addMaterialState == 'edit'
      ? editMaterial(payload, id)
          .then((response) => {
            if (response?.data?.message.success) {
              message.success(response?.data?.message.message);
            } else {
              message.error(response?.data?.message.message);
            }
            setLoad(false);
          })
          .catch((error) => {
            setLoad(false);
            message.error('Something went worng');
          })
      : addMaterialState == 'revised'
      ? reviseMaterial(payload, id)
          .then((response) => {
            if (response?.data?.message.success) {
              message.success(response?.data?.message.message);
            } else {
              message.error(response?.data?.message.message);
            }
            setLoad(false);
          })
          .catch((error) => {
            setLoad(false);
            message.error('Something went worng');
          })
      : null;
  };
  const saveDraft = () => {
    const value = getValues();
    setLoad(true);
    onFinish(value, 'Draft');
  };
  useEffect(() => {
    axios
      .get(`${apiresource}/Material Tags`)
      .then((response) => setTags(response?.data?.data.map((value) => ({ label: value.name, value: value.name }))));
  }, []);

  const onBeforeUploadFile = (file) => {
    if (file.type === 'application/pdf' && file.size / 1024 / 1024 < 10) {
      clearErrors('content');
      setValue('content', file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setPdfFile(reader.result);
    } else {
      setValue('content', '');
      setError('content', { type: 'validate', message: 'Only pdf with max 10MB size file accepted' });
    }
  };

  useEffect(() => {
    if (id) {
      axios.get(`${apiMethod}/faculty.materials.getting_single_material?name=${id}`).then((response) => {
        if (response?.data?.message) {
          let data = response?.data?.message;
          setValue('material_name', data?.material_name);
          setValue('author', data?.author);
          setValue('university_name', data?.university);
          setValue('material_type', { label: data?.material_type, value: data?.material_type });
          setValue(
            'tags',
            data?.tags.map((value) => ({ label: value.tag_name, value: value.tag_name })),
          );
          setValue('assigned_modules', data?.assigned_modules);
          setValue('content', {
            fileList: [
              {
                uid: '-1',
                name: data?.material_document,
                status: 'done',
                url: `${process.env.REACT_APP_BASE_URL + data?.material_document}`,
              },
            ],
          });
          setPdfFile(process.env.DOC_URL + data?.material_document);
        }
      });
    }
  }, [id]);

  return (
    <>
      <Spin indicator={antIcon} size="large" spinning={load}>
        <Row gutter={[24, 30]}>
          <Col span={24}>
            <Row gutter={[20, 10]}>
              <Col span={24}>
                <Breadcrumb separator=">" className="mb-1">
                  <Breadcrumb.Item href={`/faculty/materials`}>Materials</Breadcrumb.Item>

                  {addMaterialState === 'revised' || addMaterialState === 'edit' ? (
                    <Breadcrumb.Item
                      onClick={() => {
                        dispatch(showMaterialForm(''));
                        dispatch(editMaterialType(addMaterialState === 'revised' ? 'rev' : ''));
                      }}
                    >
                      Material Detail
                    </Breadcrumb.Item>
                  ) : null}

                  <Breadcrumb.Item>
                    {addMaterialState === 'revised'
                      ? 'Revise Material'
                      : addMaterialState === 'add'
                      ? 'Add Material'
                      : addMaterialState === 'edit'
                      ? 'Edit Materail'
                      : ''}
                  </Breadcrumb.Item>
                </Breadcrumb>
              </Col>
              <Col span={24}>
                <HeadingChip
                  title={
                    addMaterialState === 'revised'
                      ? 'Revise Material'
                      : addMaterialState === 'add'
                      ? 'Add Material'
                      : addMaterialState === 'edit'
                      ? 'Edit Materail'
                      : ''
                  }
                />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Card bordered={false}>
              <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
                <Row gutter={[24, 30]}>
                  <Col span={24}>
                    <Row gutter={[24, 20]}>
                      <Col span={24}>
                        <Title className="mb-0" level={4}>
                          Material Summary
                        </Title>
                      </Col>
                      <Col span={24}>
                        <Row gutter={[24, 30]}>
                          {assetFields.map((item, idx) => (
                            <Fragment key={idx}>
                              <FormGroup item={item} control={control} errors={errors} />
                            </Fragment>
                          ))}
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Row gutter={[24, 20]}>
                      <Col span={24}>
                        <Title className="mb-0" level={4}>
                          Assign Module
                        </Title>
                      </Col>
                      <Col span={24}>
                        <AddAssignModule
                          control={control}
                          errors={errors}
                          getValues={getValues}
                          setValue={setValue}
                          setRemoveMat={setRemoveMat}
                          removeMat={removeMat}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Row gutter={[24, 20]}>
                      <Col span={24}>
                        <Title className="mb-0" level={4}>
                          Materil Content
                        </Title>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          required={true}
                          label="Document"
                          className="mb-0 w-100"
                          validateStatus={errors.content && 'error'}
                          help={errors.content && errors.content.message}
                        >
                          <Controller
                            name="content"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Material Content Required' }}
                            render={({ value }) => {
                              return (
                                <Upload
                                  className="uploadWithbtn"
                                  showUploadList={false}
                                  accept=".pdf"
                                  maxCount={1}
                                  customRequest=""
                                  beforeUpload={onBeforeUploadFile}
                                >
                                  <Input
                                    size="large"
                                    className="ag-upload-btn w-100"
                                    value={
                                      value.name
                                        ? value.name
                                        : value.fileList?.length
                                        ? value.fileList[0].name
                                        : 'Please Upload PDF File with Max 10MB Size'
                                    }
                                    addonAfter={<PlusCircleFilled />}
                                  />
                                </Upload>
                              );
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Row gutter={20} justify="end">
                      <Col span={4}>
                        <Button
                          type="primary"
                          htmlType="button"
                          size="large"
                          className="black-btn w-100"
                          onClick={saveDraft}
                        >
                          Save Draft
                        </Button>
                      </Col>
                      <Col span={4}>
                        <Button type="primary" htmlType="submit" size="large" className="green-btn w-100">
                          {`Preview & Publish`}
                        </Button>
                      </Col>
                      {/* <Col span={4}>
                        <Button
                          type="primary"
                          htmlType="button"
                          size="large"
                          className="green-btn w-100"
                          onClick={() => setVisible(true)}
                        >
                          Preview
                        </Button>
                      </Col> */}
                    </Row>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </Spin>
      <Popup {...popup} />
    </>
  );
};

export default index;
