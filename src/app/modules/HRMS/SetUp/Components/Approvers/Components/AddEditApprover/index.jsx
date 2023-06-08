import React, { useState, useEffect, Fragment } from 'react';
import { Button, Row, Col, Typography, Form, message, Upload, Select, Spin } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { uniquiFileName, getSingleUpload, getFileName } from '../../../../../../../../features/utility';
import { InputField } from '../../../../../../../atoms/FormElement';
import { apiMethod, baseUrl } from '../../../../../../../../configs/constants';
import axios from '../../../../../../../../services/axiosInterceptor';
import { addSingleApprover, updateApprover, deleteApprover, getApproverDetail } from '../../../../ducks/services';
import { PlusCircleFilled } from '@ant-design/icons';
import { LoadingOutlined } from '@ant-design/icons';
import { allowed } from '../../../../../../../../routing/config/utils';
import Roles from '../../../../../../../../routing/config/Roles';

const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { title, onClose, approver, item } = props;
  console.log({ approver });
  const { Title, Text } = Typography;
  const { Option } = Select;
  const [load, setLoad] = useState(false);
  const [image, setImage] = useState({ loading: true, imageUrl: '', fileObj: {} });
  const [data, setData] = useState([]);
  const [value1, setValue1] = useState();
  const { control, errors, setValue, handleSubmit, reset } = useForm();

  const onFinish = async (values) => {
    setLoad(true);
    let res = '';
    if (image?.fileObj) {
      let modifiedName = uniquiFileName(image?.fileObj.name);
      res = await getSingleUpload(modifiedName, 'image', image?.fileObj, 'HRMS Approver', values.approver_name);
    }
    const payload = {
      approver_id: values?.approver_name,
      signature: res?.file_url ? res?.file_url : image?.imageUrl,
    };
    approver.name.length == 0
      ? addSingleApprover(payload).then((response) => {
        setLoad(false);
          if (response.data.message.success == true) {
            onClose();
            message.success(response.data.message.message);
          } else {
            message.error(response.data.message.message);
          }
        }).catch((error) => {
          setLoad(false);
          message.error('Something went wrong');
        })
      : updateApprover(approver.name, payload).then((response) => {
        setLoad(false);
          if (response.data.message.success == true) {
            message.success(response.data.message.message);
            onClose();
          } else {
            message.error(response.data.message.message);
          }
        }).catch((error) => {
          setLoad(false);
          message.error('Something went wrong');
        });
  };

  const onDeleteApprover = () => {
    setLoad(true);
    deleteApprover(approver.name)
    .then((response) => {
        setLoad(false);
        if (response.data.message.success == true) {
          onClose();
          message.success(response.data.message.message);
        } else {
          message.error(response.data.message.message);
        }
      })
      .catch((error) => {
        setLoad(false);
        message.error('Something went wrong');
      })
  };

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  // const handleChange = (info) => {
  //   getBase64(info.file.originFileObj, (imageUrl) => {
  //     console.log({ imageUrl });
  //     setImage({
  //       imageUrl: imageUrl,
  //       fileObj: info.file.originFileObj,
  //       loading: false,
  //     });
  //   });
  // };

  let timeout;
  let currentValue;

  function getData(value, callback) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = value;

    function callingFunc() {
      let url = `${apiMethod}/hrms.api.search_employee?&search=${value}`;
      axios.get(url).then((d) => {
        if (currentValue === value) {
          const {
            data: { message },
          } = d;
          const data = [];
          message.forEach((r) => {
            console.log('kkk', r);
            data.push({
              value: r.name,
              text: r.employee_name,
            });
          });
          callback(data);
        }
      });
    }

    timeout = setTimeout(callingFunc, 300);
  }

  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', (event) => {
      const _loadedImageUrl = event.target.result;
      const image = document.createElement('img');
      image.src = _loadedImageUrl;
      image.addEventListener('load', () => {
        const { width, height } = image;
        console.log({ width }, { height });
        if (width > 591 || height > 295) {
          message.error('Image size must 50mm x 25mm');
        } else {
          setImage({
            imageUrl: _loadedImageUrl,
            fileObj: file,
            loading: false,
          });
        }
      });
    });
  };

  const handleSearch = (value) => {
    console.log({ value });
    if (value) {
      getData(value, (data) => setData(data));
    } else {
      setData([]);
    }
  };
  useEffect(() => {
    if (approver.approver_name.length > 0) {
      setLoad(true);
      getApproverDetail(approver.name).then((response) => {
        let data = response?.data?.data;
        setValue1(data.approver_name);
        setImage({ loading: false, imageUrl: data?.signature ? data?.signature : '' });
        setValue('approver_name', data.approver_id);
        setLoad(false);
      });
    } else {
      setValue1('');
      setImage({ loading: true, imageUrl: '' });
      setValue('approver_name', '');
    }
  }, [approver]);

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[24, 30]}>
          <Col span={24}>
            <Row gutter={24} justify="center" align="middle">
              <Col>
                <Title className="mb-0" level={3}>
                  {title}
                </Title>
              </Col>
              <Col>
                <Text className="mb-0 c-gray">To ensure best fit. please use the dimensions50mmx25mm</Text>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[24, 30]}>
              <Col span={24}>
                <InputField
                  fieldname="approver_id"
                  label=""
                  class="readonly-transparent d-none"
                  initValue={item?.name ? item?.name : ''}
                  control={control}
                  iProps={{ readOnly: true }}
                />
                {item?.skill_name ? (
                  <InputField
                    fieldname="approver_name"
                    label=""
                    class="readonly-transparent"
                    initValue={item?.skill_name ? item?.skill_name : ''}
                    control={control}
                    iProps={{ readOnly: true }}
                  />
                ) : (
                  <Form.Item label="Aprover Name" className={'mb-0'}>
                    <Controller
                      name="approver_name"
                      control={control}
                      defaultValue={''}
                      render={({ value, onChange, onSearch }) => (
                        <Select
                          value={value1}
                          onChange={(e) => {
                            console.log({ e });
                            onChange(e);
                            setValue1(e);
                          }}
                          onSearch={(e) => handleSearch(e)}
                          placeholder={'Type staff name'}
                          defaultActiveFirstOption={false}
                          showArrow={false}
                          filterOption={false}
                          notFoundContent={null}
                          showSearch
                        >
                          {data.map((value) => (
                            <Option key={value.value}>{value.text}</Option>
                          ))}
                        </Select>
                      )}
                    />
                  </Form.Item>
                )}
              </Col>

              <Col span={24}>
                <Form.Item label="Signature">
                  <Controller
                    name="upload_file"
                    control={control}
                    render={({ value, fileList, onChange }) => (
                      <Upload
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        accept="image"
                        maxCount={1}
                        fileList={fileList}
                        // onChange={handleChange}
                        beforeUpload={beforeUpload}
                      >
                        {!image.loading ? (
                          <img
                            src={
                              image?.imageUrl.length < 100
                                ? `${baseUrl}${image.imageUrl}`
                                : image.imageUrl
                            }
                            alt={<PlusCircleFilled />}
                            style={{ width: '98%', height: '213px' }}
                          />
                        ) : (
                          <PlusCircleFilled style={{ fontSize: '30px' }} />
                        )}
                      </Upload>
                    )}
                  ></Controller>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Row gutter={24} justify="center">
                  {approver.name.length == 0 ? (
                    <>
                      <Col span={8}>
                        <Button
                          size="large"
                          type="primary"
                          htmlType="button"
                          className="black-btn w-100"
                          onClick={onClose}
                        >
                          Close
                        </Button>
                      </Col>
                      <Col span={8}>
                        <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                          Add
                        </Button>
                      </Col>
                    </>
                  ) : (
                    <>
                      {allowed([Roles.SETUP], 'delete') && (
                        <Col span={8}>
                          <Button size="large" type="primary" className="red-btn w-100" onClick={onDeleteApprover}>
                            Delete
                          </Button>
                        </Col>
                      )}
                      <Col span={8}>
                        <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                          Save
                        </Button>
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
