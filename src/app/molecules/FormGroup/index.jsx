import React from 'react';
import {
  InputField,
  DateField,
  SelectField,
  CheckboxGroup,
  UploadField,
  TextAreaField,
  SwitchField,
  SliderField,
} from 'Atoms/FormElement';
import { Row, Col, InputNumber, Form, Button, Avatar, Typography, Space } from 'antd';
import moment from 'moment';
import { getFileName } from '../../../features/utility';
import { baseUrl } from '../../../configs/constants';
import { TimeField } from '../../atoms/FormElement';

const { Text } = Typography;

export default (props) => {
  const { item, control, errors, parent, index, elem } = props;

  const setValidate = (mess) => {
    if (parent && errors[`${parent.name}`]) {
      let ret = null;
      errors[`${parent.name}`].map((x, i) => {
        if (Object.keys(x).find(y => y == item.name) && index == i) {
          if (mess) {
            ret = Object.values(x)[0].message;
          } else {
            ret = 'error';
          }
        }
      });
      return ret;
    } else {
      if (errors[`${item.name}`]) {
        if (mess) {
          return errors[`${item.name}`].message;
        } else {
          return 'error';
        }
      }
    }
  };

  return (
    <Col
      className={item.hidden ? 'd-none' : ''}
      flex={`${item.twocol ? '1 0 300px' : item.colWidth ? item.colWidth : '100%'}`}
    >
      {item.type == 'input' && (
        <InputField
          isRequired={item.req}
          fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
          label={parent ? parent.noLabel ? index == 0 ? item.label : '' : item.label : item.label}
          control={control}
          onBlur={item?.onBlur}
          class={`mb-0 ${item.hidden ? 'd-none' : ''} ${item.arrow == false ? 'no-arrow' : ''}`}
          iProps={{
            readOnly: props.static ? props.static : item.static ? true : false,
            placeholder: item.placeholder,
            size: 'large',
            type: item.number && 'number',
            min: item.min && item.min,
            max: item.max && item.max,
            addonAfter: item?.addOnButton ? <Button htmlType='button' type='primary' className='green-btn' onClick={item?.onBtnClick}>{item?.addOnButton}</Button> : null
          }}
          initValue={elem && elem[item.name] ? elem[item.name] : item.number ? 0 : ''}
          rules={{
            required: { value: item.req, message: item.reqmessage },
            pattern: item.email
              ? { value: /(?=^.{1,50}$)^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Enter valid Email Address' }
              : item.string ? 
              { value: /^[A-Za-z ]+$/, message: "Enter only Alphabets" }
              : item.phone ? 
              {value: /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d*)\)?)[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/igm, message: 'Not a valid phone number'} 
              : item.nospecial ? 
              {value: /^([a-zA-Z0-9 _-]+)$/, message: 'Special Characters not allowed'} :
              {value: /^[^\s]+(\s+[^\s]+)*$/, message: 'Space not allowed in start and end'},
          }}
          validate={setValidate(false)}
          validMessage={setValidate(true)}
          
        />
      )}
      {item.type == 'select' && (
        <SelectField
          isRequired={item.req}
          fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
          label={parent ? parent.noLabel ? index == 0 ? item.label : '' : item.label : item.label}
          class={`mb-0 w-100 ${item.hidden ? 'd-none' : ''}`}
          initValue={
            elem ? 
              elem[item.name] ? item.customVal ? elem[item.name] : { label: elem[item.name], value: elem[item.name] } : '' : ''}
          control={control}
          onChange={item.onChange && item.onChange}
          
          iProps={{
            placeholder: item.placeholder,
            isMulti: item.multiple ? item.multiple : false,
            isDisabled: item.disabled ? item.disabled : props.static ? props.static : item.static ? item.static : false,
          }}
          selectOption={item.options}
          rules={{ required: { value: item.req, message: item.reqmessage } }}
          validate={setValidate(false)}
          validMessage={setValidate(true)}
        />
      )}
      {item.type == 'date' && (
        <DateField
          isRequired={item.req}
          fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
          label={parent ? parent.noLabel ? index == 0 ? item.label : '' : item.label : item.label}
          control={control}
          class="mb-0"
          onChange={item.onChange && item.onChange}
          iProps={{
            picker: item?.dateType ? item?.dateType : 'date',
            size: 'large',
            format: item?.format ? item?.format : '',
            disabledDate: item?.disabledDate,
            disabled: props.static ? props.static : item.static ? true : false,
          }}
          initValue={elem && elem[item.name] ? moment(elem[item.name], 'YYYY-MM-DD') : ''}
          rules={{
            required: { value: item.req, message: item.reqmessage },
            setValueAs: (value) =>
              value
                ? item.dateType == 'year'
                  ? moment(value).format('YYYY')
                  : moment(value).format('YYYY-MM-DD')
                : '',
          }}
          validate={setValidate(false)}
          validMessage={setValidate(true)}
        />
      )}
      {item.type == 'checkbox' && (
        <CheckboxGroup
          fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
          label={parent ? parent.noLabel ? index == 0 ? item.label : '' : item.label : item.label}
          class={`mb-0 fullWidth-checbox ${item.class ? item.class : ''}`}
          control={control}
          initValue={elem && elem[item.name] ? elem[item.name] : []}
          option={item.options}
          disabled={item.static}
          onChange={item.onChange && item.onChange}
          rules={{ required: { value: item.req, message: item.reqmessage } }}
          validate={setValidate(false)}
          validMessage={setValidate(true)}
        />
      )}
      {item.type == 'upload' && (
        <>
        <UploadField
          isRequired={item.req}
          fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
          label={parent ? parent.noLabel ? index == 0 ? item.label : '' : item.label : item.label}
          class={`mb-0`}
          iProps={{ disabled: props.static ? props.static : item.static ? item.static: false }}
          control={control}
          onChange={parent ? (e) => item.onChange(e ,index) : item.onChange}
          initValue={
            elem && elem[item.name] && typeof elem[item.name] == 'string'
              ? {
                  fileList: [
                    {
                      uid: '-1',
                      name: getFileName(elem[item.name]),
                      status: 'done',
                      url: elem[item.name],
                      s3: item?.docdetail?.item,
                      aid: item?.docdetail?.id,
                      app: item?.docdetail?.app
                    },
                  ],
                }
              : ''
          }
          rules={{ required: { value: item.req, message: item.reqmessage } }}
          validate={setValidate(false)}
          validMessage={setValidate(true)}
        />
        </>
      )}
      {item.type == 'textarea' && (
        <TextAreaField
          fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
          label={item.label}
          control={control}
          class={`mb-0 ${item.hidden ? 'd-none' : ''}`}
          iProps={{
            readOnly: props.static ? props.static : false,
            placeholder: item.placeholder,
            size: 'large',
          }}
          initValue={elem && elem[item.name] ? elem[item.name] : ''}
        />
      )}
      {item.type == 'switch' && (
        <SwitchField
          fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
          label={item.label}
          control={control}
          iProps={{ size: 'large' }}
          initValue={elem && elem[item.name] ? elem[item.name] : ''}
        />
      )}
      {item.type == 'slider' && (
        <Row gutter={[20,20]} align='middle'>
          <Col flex='auto'>
          <SliderField
            isRequired={item.req}
            fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
            label={item.label}
            control={control}
            iProps={item.iProps}
            class={`mb-0`}
            initValue={elem && elem[item.name] ? elem[item.name] : ''}
            rules={{ required: { value: item.req, message: item.reqmessage } }}
            validate={setValidate(false)}
            validMessage={setValidate(true)}
          />
        </Col>
          <Col flex='70px'>
            <Form.Item initValue={0} className='mb-0'>
              <InputNumber 
              size='large' 
              value={item.value} 
              disabled={true} 
              style={{border: 0, width: '70px'}}
              formatter={value => value ? `${value}%` : ''}
              // parser={value => value.replace('%', '')} 
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      {item.type == 'time' && (
        <TimeField
          isRequired={item.req}
          fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
          label={item.label}
          control={control}
          class="mb-0"
          onChange={item.onChange && item.onChange}
          iProps={{
            size: 'large',
            format: item?.format ? item?.format : '',
          }}
          initValue={elem && elem[item.name] ? moment(elem[item.name], 'h:mm') : ''}
          rules={{
            required: { value: item.req, message: item.reqmessage },
            // setValueAs: (value) =>
            //   value
            //     ? item.dateType == 'year'
            //       ? moment(value).format('YYYY')
            //       : moment(value).format('YYYY-MM-DD')
            //     : '',
          }}
          validate={setValidate(false)}
          validMessage={setValidate(true)}
        />
      )}
      {item.type == 'avatar' && (
        <Space direction='vertical' size={8} className='w-100'>
          <Text className='smallFont12 c-gray'>{item.label}</Text>
          <Space size={10} align='center'>
          <SelectField
            fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
            label=''
            class={`mb-0 w-100 d-none`}
            initValue={ elem ? elem[item.name] ? elem[item.name] : [] : ''}
            control={control}
            iProps={{ placeholder: item.placeholder, isMulti: true}}
            selectOption={item.options}
          />
          {elem[item.name].length > 0 &&
            <Avatar.Group maxCount={5} size="large" maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
              {elem[item.name].map(x => (
                x?.image ? <Avatar src={`${baseUrl}${x?.image}`} /> : <Avatar style={{ backgroundColor: '#0077B6' }}>{x['label'].charAt(0)}</Avatar>
              ))}
            </Avatar.Group>}
          <Button htmlType='button' type='link' className='c-gray-linkbtn' onClick={() => item.addFunc(elem, index)}>{item.addLabel}</Button>
        </Space>
        </Space>
      )}
    </Col>
  );

  
};