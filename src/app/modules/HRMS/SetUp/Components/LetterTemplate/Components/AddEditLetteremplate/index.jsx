import React, { useState, useEffect } from 'react';
import { Space, Button, Row, Col, Typography, Form, message, Upload, Spin } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { uniquiFileName, getSingleUpload } from '../../../../../../../../features/utility';
import { PlusCircleFilled } from '@ant-design/icons';
import {
  addSingleLetterTemp,
  updateletterTemp,
  deleteletterTemp,
  getLetterTempDetail,
} from '../../../../ducks/services';
import { LoadingOutlined } from '@ant-design/icons';
import { InputField } from '../../../../../../../atoms/FormElement';
import { baseUrl } from '../../../../../../../../configs/constants';
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { title, onClose, templateData } = props;
  const { Title, Text } = Typography;
  const [load, setLoad] = useState(false);
  const [header, setHeader] = useState({
    headerloading: true,
    footerloading: true,
    imageUrlHeader: '',
    imageUrlFooter: '',
    fileObj: {},
  });

  const { control, errors, setValue, handleSubmit, reset } = useForm();

  const beforeUpload = (file, fileType) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', (event) => {
      const _loadedImageUrl = event.target.result;
      const image = document.createElement('img');
      image.src = _loadedImageUrl;
      image.addEventListener('load', () => {
        const { width, height } = image;
        console.log({ width, height });
        if (width > 595 || height > 91) {
          message.error('Image size must 210mm x 32mm');
        } else {
          if (fileType === 'header') {
            let tempsHeadandFoot = { ...header, headerloading: false, imageUrlHeader: _loadedImageUrl };
            setHeader(tempsHeadandFoot);
          } else if (fileType === 'footer') {
            let tempsHeadandFoot = { ...header, footerloading: false, imageUrlFooter: _loadedImageUrl };
            setHeader(tempsHeadandFoot);
          }
        }
      });
    });
  };

  const uploadImage = async (file) => {
    let res = '';
    if (file?.file.originFileObj) {
      let modifiedName = uniquiFileName(file?.file.originFileObj.name);
      res = await getSingleUpload(
        modifiedName,
        'image',
        file?.file.originFileObj,
        'Letter Template',
        'CCC Letter Template A',
      );
    }
    return res;
  };
  const onDeleteTemplate = () => {
    setLoad(true);
    deleteletterTemp(templateData.name)
      .then((response) => {
        if (response.data.message.success == true) {
          message.success(response.data.message.message);
        } else {
          message.error(response.data.message.message);
        }
        setLoad(false);
        onClose();
      })
      .catch((error) => {
        message.error('Country Deleted Unsccessfully');
        onClose();
      });
  };
  const onFinish = async (val) => {
    console.log({ val });
    setLoad(true);
    let letter_head = '';
    let letter_footer = '';
    if (val.header.file) {
      letter_head = await uploadImage(val.header);
    }
    if (val.footer.file) {
      letter_footer = await uploadImage(val.footer);
    }
    console.log({ val, letter_footer, letter_head });
    const payload = {
      template_name: val?.template_name,
      letter_head: letter_head?.file_url ? letter_head?.file_url : val.header,
      letter_footer: letter_footer?.file_url ? letter_footer?.file_url : val.footer,
    };
    templateData?.name.length == 0
      ? addSingleLetterTemp(payload).then((response) => {
          if (response.data.message.success == true) {
            message.success(response.data.message.message);
          } else {
            message.error(response.data.message.message);
          }
          setLoad(false);
          onClose();
        })
      : updateletterTemp(templateData.name, { ...payload, template_name: templateData.template_name }).then(
          (response) => {
            if (response.data.message.success == true) {
              message.success(response.data.message.message);
            } else {
              message.error(response.data.message.message);
            }
            setLoad(false);
            onClose();
          },
        );
  };

  const onRemovePicture = (tempPart) => {
    console.log({ tempPart });
    if (tempPart === 'header') {
      let tempsHeadandFoot = { ...header, headerloading: true, imageUrlHeader: '' };
      setHeader(tempsHeadandFoot);
      setValue('header', '');
    } else if (tempPart === 'footer') {
      let tempsHeadandFoot = { ...header, footerloading: true, imageUrlFooter: '' };
      setHeader(tempsHeadandFoot);
      setValue('footer', '');
    }
  };

  useEffect(() => {
    if (templateData.name.length > 0) {
      setLoad(true);
      getLetterTempDetail(templateData.name).then((response) => {
        let data = response?.data?.data;
        let tempsHeadandFoot = {
          ...header,
          headerloading: data.letter_head.length > 0 ? false : true,
          footerloading: data.letter_footer.length > 0 ? false : true,
          imageUrlHeader: data.letter_head,
          imageUrlFooter: data.letter_footer,
        };
        setHeader(tempsHeadandFoot);
        setValue('header', data.letter_head);
        setValue('footer', data.letter_footer);
        setValue('template_name', data.template_name);
        setLoad(false);
      });
    } else {
      let tempsHeadandFoot = {
        ...header,
        headerloading: true,
        footerloading: true,
        imageUrlFooter: '',
        imageUrlHeader: '',
      };
      setHeader(tempsHeadandFoot);
      reset();
    }
  }, [templateData]);
  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[24, 30]}>
          <Col span={24}>
            <Row gugutter={24} justify="center" align="middle">
              <Col>
                <Title level={3} className="mb-0">
                  {title}
                </Title>
              </Col>
              <Col>
                <Text className="mb-0 c-gray">
                  To ensure best fit please use the dimensions 210mm x 32mm for both header & footer with 15mm margin on
                  the side
                </Text>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <InputField
              fieldname="template_name"
              label="Temmplate Name"
              control={control}
              iProps={{ placeholder: 'Type template name', size: 'large' }}
              rules={{ required: 'Enter tempalte name' }}
              initValue=""
              validate={errors.template_name && 'error'}
              validMessage={errors.template_name && errors.template_name.message}
            />
          </Col>

          <Col span={24}>
            <Row gutter={24} justify="space-between">
              <Col>
                <Text className="mb-0 c-gray">Letter Header</Text>
              </Col>
              {templateData.name.length > 0 && (
                <Col>
                  <Button
                    type="link"
                    htmlType="button"
                    className="p-0 h-auto c-gray-linkbtn"
                    onClick={() => onRemovePicture('header')}
                  >
                    Remove
                  </Button>
                </Col>
              )}
            </Row>
            <Controller
              name="header"
              control={control}
              render={({ value, fileList, onChange }) => (
                <Upload
                  listType="picture-card"
                  className="uploadTemplate"
                  showUploadList={false}
                  accept="image"
                  maxCount={1}
                  fileList={fileList}
                  onChange={(e) => {
                    onChange(e);
                  }}
                  beforeUpload={(e) => beforeUpload(e, 'header')}
                >
                  {!header.headerloading ? (
                    <img
                      src={
                        header?.imageUrlHeader.length < 100
                          ? `${baseUrl}${header.imageUrlHeader}`
                          : header.imageUrlHeader
                      }
                      alt={<PlusCircleFilled />}
                      style={{ width: '100%' }}
                    />
                  ) : (
                    <PlusCircleFilled style={{ fontSize: '30px' }} />
                  )}
                </Upload>
              )}
            ></Controller>
          </Col>
          <Col span={24}>
            <Row gutter={24} justify="space-between">
              <Col>
                <Text className="mb-0 c-gray">Letter Footer</Text>
              </Col>
              {templateData.name.length > 0 && (
                <Col>
                  <Button
                    type="link"
                    htmlType="button"
                    className="p-0 h-auto c-gray-linkbtn"
                    onClick={() => onRemovePicture('footer')}
                  >
                    Remove
                  </Button>
                </Col>
              )}
            </Row>
            <Controller
              name="footer"
              control={control}
              render={({ value, fileList, onChange }) => (
                <Upload
                  listType="picture-card"
                  className="uploadTemplate"
                  showUploadList={false}
                  accept="image"
                  maxCount={1}
                  fileList={fileList}
                  onChange={(e) => {
                    onChange(e);
                  }}
                  beforeUpload={(e) => beforeUpload(e, 'footer')}
                >
                  {!header.footerloading ? (
                    <img
                      src={
                        header?.imageUrlFooter.length < 100
                          ? `${baseUrl}${header.imageUrlFooter}`
                          : header.imageUrlFooter
                      }
                      alt={<PlusCircleFilled />}
                      style={{ width: '100%' }}
                    />
                  ) : (
                    <PlusCircleFilled style={{ fontSize: '30px' }} />
                  )}
                </Upload>
              )}
            ></Controller>
          </Col>
          <Col span={24}>
            <Row gutter={24} justify="center">
              {templateData.name.length == 0 ? (
                <>
                  <Col span={8}>
                    <Button size="large" type="primary" htmlType="button" className="black-btn w-100" onClick={onClose}>
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
                  <Col span={8}>
                    <Button size="large" type="primary" className="red-btn w-100" onClick={onDeleteTemplate}>
                      Delete
                    </Button>
                  </Col>
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
      </Form>
    </Spin>
  );
};
