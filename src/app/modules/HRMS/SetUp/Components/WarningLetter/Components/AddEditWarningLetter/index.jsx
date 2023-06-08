import React, { useState, useEffect, Fragment } from 'react';
import { Button, Row, Col, Form, Card, Breadcrumb, message, Spin } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { warningLetterFilds } from './FormFields';
import HeadingChip from '../../../../../../../molecules/HeadingChip';
import { QuestionCircleFilled } from '@ant-design/icons';
import { TextAreaField } from '../../../../../../../atoms/FormElement';
import { showWarningLetter } from '../../../../ducks/actions';
import PreviewWarningLetter from '../PreviewWarningLetter';
import {
  getWarningLetterDetail,
  addSingleWarningLetter,
  updateWarningLetter,
  deleteWarningLetter,
} from '../../../../ducks/services';
import { Popup } from '../../../../../../../atoms/Popup';
import TagList from '../Tags';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { letterData } = props;
  const [visible, setVisible] = useState(false);
  const [perview, setPreview] = useState(false);
  const [load, setLoad] = useState(false);
  const { control, errors, setValue, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const popup = {
    closable: true,
    visibility: visible,
    content: <TagList onClose={() => setVisible(false)} />,
    width: 400,
    onCancel: () => setVisible(false),
  };

  const previewWarningLetter = {
    visibility: perview,
    content: <PreviewWarningLetter letterID={letterData.name} />,
    width: 964,
    class: 'white-modal',
    onCancel: () => setPreview(false),
  };

  const closeForn = () => {
    dispatch(showWarningLetter({ name: '', warning_letter_tempalte: '', visible: false }));
  };

  const onFinish = (values) => {
    console.log({ values });
    setLoad(true);
    const payload = {
      writing_letter_name: values?.writing_letter_name,
      letter_template: values?.letter_template.value,
      signiture: values?.signiture.length ? 1 : 0,
      signee: values?.signee.value,
      detail: values.detail,
    };
    letterData.name.length == 0
      ? addSingleWarningLetter(payload)
          .then((response) => {
            if (response.data.message.success == true) {
              message.success(response.data.message.message);
            } else {
              message.error(response.data.message.message);
            }
            setLoad(false);
            closeForn();
          })
          .catch((error) => message.error('Race exists'))
      : updateWarningLetter(letterData.name, payload)
          .then((response) => {
            if (response.data.message.success == true) {
              message.success(response.data.message.message);
            } else {
              message.error(response.data.message.message);
            }
            setLoad(false);
            closeForn();
          })
          .catch((error) => message.error('Update Failed'));
  };

  const onDeleteNationality = () => {
    setLoad(true);
    deleteWarningLetter(letterData.name)
      .then((response) => {
        if (response.data.message.success == true) {
          message.success(response.data.message.message);
        } else {
          message.error(response.data.message.message);
        }
        setLoad(false);
        closeForn();
      })
      .catch((error) => {
        message.error('Race Deleted Unsccessfully');
        closeForn();
      });
  };

  const onTagViewHandler = () => {
    setVisible(true);
  };

  useEffect(() => {
    if (letterData.name.length > 0) {
      setLoad(true);
      getWarningLetterDetail(letterData.name).then((response) => {
        let data = response?.data?.data;
        setValue('writing_letter_name', data.writing_letter_name);
        setValue('letter_template', { label: data.letter_template_name, value: data.letter_template });
        setValue('signiture', data.signiture === 1 ? [1] : [0]);
        setValue('signee', { label: data.signee, value: data.signee });
        setValue('detail', data.detail);
        setLoad(false);
      });
    }
  }, [letterData]);

  return (
    <>
      <Spin indicator={antIcon} size="large" spinning={load}>
        <Breadcrumb separator=">" className="mb-1">
          <Breadcrumb.Item onClick={closeForn}>Setup</Breadcrumb.Item>
          <Breadcrumb.Item>
            {letterData.name.length == 0 ? 'Add New Warning Letter' : 'Warning Letter Detail'}
          </Breadcrumb.Item>
        </Breadcrumb>

        <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
          <Row gutter={[24, 30]}>
            <Col span={24}>
              <HeadingChip title={letterData.name.length == 0 ? 'Add New Warning Letter' : 'Warning Letter Detail'} />
            </Col>
            <Col span={24}>
              <Card bordered={false} className="uni-card">
                <Row gutter={[24, 30]}>
                  {warningLetterFilds().map((item, idx) => (
                    <Fragment key={idx}>
                      <FormGroup item={item} control={control} errors={errors} />
                    </Fragment>
                  ))}

                  <Col span={24}>
                    <Card
                      className="small-card8 b-dark-gray"
                      extra={
                        <a onClick={onTagViewHandler}>
                          List of tags <QuestionCircleFilled />
                        </a>
                      }
                    >
                      <Row gutter={24}>
                        <Col span={24}>
                          <TextAreaField
                            fieldname="detail"
                            label=""
                            control={control}
                            class="mb-0"
                            rules={{
                              required: 'detail required',
                            }}
                            iProps={{
                              placeholder: 'Type your letter...',
                              size: 'large',
                              autoSize: { minRows: 2, maxRows: 6 },
                            }}
                            initValue=""
                          />
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col span={24}>
                    <Row gutter={24} justify="end">
                      {letterData.name.length == 0 ? (
                        <>
                          <Col span={4}>
                            <Button
                              size="large"
                              type="primary"
                              htmlType="button"
                              className="black-btn w-100"
                              onClick={closeForn}
                            >
                              Close
                            </Button>
                          </Col>
                          <Col span={4}>
                            <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                              Save
                            </Button>
                          </Col>
                        </>
                      ) : (
                        <>
                          <Col span={4}>
                            <Button
                              size="large"
                              type="primary"
                              className="black-btn w-100"
                              onClick={() => setPreview(true)}
                            >
                              Preview
                            </Button>
                          </Col>
                          <Col span={4}>
                            <Button size="large" type="primary" className="red-btn w-100" onClick={onDeleteNationality}>
                              Delete
                            </Button>
                          </Col>
                          <Col span={4}>
                            <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                              Save
                            </Button>
                          </Col>
                        </>
                      )}
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
      </Spin>
      <Popup {...popup} />
      <Popup {...previewWarningLetter} />
    </>
  );
};
