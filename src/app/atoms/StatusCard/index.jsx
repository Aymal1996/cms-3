import React from 'react';
import { Card, Row, Col, Space, Typography, Button, Form } from 'antd';
import { ClockIcon, PendingIcon, TickIcon, UploadDoneIcon } from '../CustomIcons';
import { DateField, InputField, UploadField } from '../FormElement';
import { useForm } from 'react-hook-form';

const { Text, Title } = Typography;

export default (props) => {
  const {
    status,
    title,
    text1,
    text2,
    date,
    extraClass,
    page,
    index,
    open,
    numb,
    pending,
    btnText,
    btnText2,
    onAction,
    onFinish,
    field,
    forminfo,
  } = props;

  const { control, errors, handleSubmit } = useForm();

  return (
    <Card
      bordered={false}
      className={`uni-card-small ${extraClass ? extraClass : ''} ${
        status == 0 ? 'b-pending' : status == 1 ? 'b-black' : page ? 'b-dark-gray' : 'b-black'
      }`}
    >
      <Row gutter={page ? (field && status == 0 ? [20, 10] : [20, 30]) : [20, 10]}>
        <Col span={24}>
          <Row gutter={[20, 30]}>
            <Col flex="auto">
              <Space direction="vertical" size={20} className={`w-100 ${page ? 'text-center' : ''}`}>
                {page && numb > 1 && (
                  <span className={`sole-icon ${status == 1 ? 'b-dark-gray' : 'b-black'}`}>{index}</span>
                )}
                <Title
                  level={page ? 4 : 5}
                  className={`mb-0 ${page ? 'text-center' : ''} ${status == 2 ? 'c-gray' : ''}`}
                >
                  {title}
                </Title>
                {page && (status != 2 || numb < 3) && open == 'true' && (
                  <Title level={5} className={`m-0 text-center ${status == 0 ? 'op-8' : 'c-gray'}`}>
                    {status == 1 ? text2 : text1}
                  </Title>
                )}
              </Space>
            </Col>

            {page ? (
              open == 'false' ? (
                <Col span={24} className="text-center">
                  {status == 1 ? (
                    <span className="sole-icon b-success">
                      <TickIcon />
                    </span>
                  ) : (
                    <ClockIcon className={`fontSize40 ${status == 0 ? 'c-white' : 'c-gray'}`} />
                  )}
                </Col>
              ) : status == 1 ? (
                <Col span={24} className="text-center">
                  <UploadDoneIcon />
                </Col>
              ) : status == 2 && numb > 2 ? (
                <Col span={24} className="text-center">
                  <ClockIcon className="c-gray fontSize40" />
                </Col>
              ) : (
                !forminfo && (
                  <Col span={24} className="text-center">
                    <PendingIcon />
                  </Col>
                )
              )
            ) : (
              <>
                {status != 2 && (
                  <Col>
                    <span className={status == 1 ? 'sole-icon-small b-success' : ''}>
                      {status == 1 ? <TickIcon /> : <ClockIcon className="c-white" />}
                    </span>
                  </Col>
                )}
              </>
            )}
          </Row>
        </Col>
        {page ? (
          <>
            {(status != 2 || numb < 3) && open == 'true' && (
              <Col span={24}>
                <Space direction="vertical" size={10} className="w-100 text-center">
                  {!forminfo && (
                    <Title level={3} className={`mb-0 text-center ${status == 2 ? 'c-gray' : ''}`}>
                      {status == 1 ? 'Completed' : `${pending ? pending : date ? date + 'days' : '0 days'}`}
                    </Title>
                  )}
                  {field && status != 2 ? (
                    <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
                      <Space direction="vertical" size={10} className="w-100">
                        {field.string && (
                          <InputField
                            isRequired={field?.stirngreq ? field?.stirngreq : false}
                            fieldname={'name'}
                            label={field.stringname ? field.stringname : ''}
                            control={control}
                            class={`mb-0 ${status == 0 ? 'white-input': ''}`}
                            iProps={{
                              placeholder: field?.stringplace ? field?.stringplace : '',
                              readOnly: status == 0 ? false : true,
                              size: 'large',
                            }}
                            initValue={field?.stringvalue || ''}
                            rules={{
                              required: { value: field?.stirngreq ? field?.stirngreq : false, message: '' },
                              pattern: { value: /^[^\s]+(\s+[^\s]+)*$/, message: 'Space not allowed in start and end' },
                            }}
                            validate={errors.stringname && 'error'}
                          />
                        )}
                        {field?.upload && status != 1 && (
                          <UploadField
                            isRequired={field?.uploadreq ? field?.uploadreq : false}
                            fieldname={'uploadfile'}
                            label={''}
                            class={`mb-0 white-input`}
                            iProps={{ disabled: status == 0 ? false : true }}
                            control={control}
                            initValue={''}
                            rules={{ required: field?.uploadreq ? field?.uploadreq : false }}
                            validate={errors && errors.uploadfile && 'error'}
                          />
                        )}

                        {field.date && (
                          <DateField
                            isRequired={field?.datereq ? field?.datereq : false}
                            fieldname={'date'}
                            label={field.datename ? field.datename : ''}
                            control={control}
                            class={`mb-0 ${status == 0 ? 'white-input': ''}`}
                            iProps={{
                              placeholder: field.dateplace ? field.dateplace : '',
                              picker: 'date',
                              size: 'large',
                              format: 'Do MMMM YYYY',
                              disabledDate: field?.disabledDate,
                              disabled: status == 1 ? true : false,
                            }}
                            initValue={field?.datevalue || ''}
                            rules={{ required: field?.datereq ? field?.datereq : false }}
                            validate={errors && errors.uploadfile && 'error'}
                          />
                        )}
                        {field.date1 && (
                          <DateField
                            isRequired={field?.date1req ? field?.date1req : false}
                            fieldname={'date1'}
                            label={field.date1name ? field.date1name : ''}
                            control={control}
                            class={`mb-0 ${status == 0 ? 'white-input': ''}`}
                            iProps={{
                              placeholder: field.date1place ? field.date1place : '',
                              picker: 'date',
                              size: 'large',
                              format: 'Do MMMM YYYY',
                              disabledDate: field?.disabledDate,
                              disabled: status == 1 ? true : false,
                            }}
                            initValue={field?.date1value || ''}
                            rules={{ required: { value: field?.date1req ? field?.date1req : false, message: '' } }}
                            validate={errors && errors.date1 && 'error'}
                          />
                        )}
                        {status == 0 && (
                          <Button type="primary" size="large" htmlType="submit" className="w-100 btnoutline-white">
                            {btnText}
                          </Button>
                        )}
                      </Space>
                    </Form>
                  ) : null}
                  {((field && status == 1) || (!field && status != 2)) && (btnText2 || btnText) && (
                    <Button
                      type="primary"
                      size="large"
                      htmlType={'button'}
                      className="w-100 btnoutline-white"
                      onClick={onAction}
                    >
                      {status == 1 ? btnText2 : btnText}
                    </Button>
                  )}
                </Space>
              </Col>
            )}
          </>
        ) : (
          <>
            {status == 0 && (
              <Col span={24}>
                <Space direction="vertical" size={6}>
                  <Title level={3} className="mb-0">
                    {pending ? pending : date ? date + 'days' : '0 days'}
                  </Title>
                </Space>
              </Col>
            )}
          </>
        )}
      </Row>
    </Card>
  );
};
