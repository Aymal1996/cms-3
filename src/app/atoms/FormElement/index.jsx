import React, { useEffect } from 'react';
import { DatePicker, Button, Form, Input, Checkbox, TimePicker, Upload, Switch, Radio, Slider, Rate, message } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { dummyRequest } from '../../../features/utility';
import { DownloadIcon } from '../CustomIcons';
import { prevDoc } from '../../modules/StudentFile/ducks/services';

export const InputField = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage, readOnly } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, [props.valueGot]);

  return (
    <>
      <Form.Item
        required={isRequired ? isRequired : false}
        label={label}
        validateStatus={validate}
        help={validMessage}
        className={props.class}
      >
        <Controller
          name={fieldname}
          control={control}
          defaultValue={initValue || initValue == 0 ? initValue : ''}
          rules={rules}
          render={({ onBlur, value, onChange }) => (
            <Input
              value={value}
              onChange={(e) => {
                onChange(e);
                props.onChange && props.onChange(e);
              }}
              onBlur={(e) => {onBlur(e); props.onBlur && props.onBlur(e)}}
              {...iProps}
            />
          )}
        />
      </Form.Item>
    </>
  );
};

export const InputPassword = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, [props.valueGot]);

  return (
    <>
      <Form.Item required={isRequired ? isRequired : false} label={label} validateStatus={validate} help={validMessage}>
        <Controller
          name={fieldname}
          control={control}
          defaultValue={initValue || initValue == 0 ? initValue : ''}
          rules={rules}
          as={<Input.Password {...iProps} />}
        />
      </Form.Item>
    </>
  );
};

export const SelectField = (props) => {
  const {
    fieldname,
    label,
    control,
    iProps,
    rules,
    selectOption,
    isRequired,
    initValue,
    validate,
    validMessage,
    readOnly,
  } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, []);

  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      label={label}
      validateStatus={validate}
      help={validMessage}
      noStyle={props.noStyle}
      className={props.class}
    >
      <Controller
        name={fieldname}
        control={control}
        defaultValue={initValue ? initValue : ''}
        rules={rules}
        render={({ onBlur, value, onChange }) => (
          <Select
            value={value}
            className="customSelect"
            isDisabled={readOnly}
            styles={{
              control: (val) => ({ ...val, minHeight: 32 }),
              valueContainer: (vcontain) => ({
                ...vcontain,
                padding: '5px 15px',
                textTransform: 'capitalize',
              }),
              dropdownIndicator: (icontain) => ({ ...icontain, padding: 5 }),
              indicatorSeparator: (icontain) => ({
                ...icontain,
                backgroundColor: '#000',
              }),
              option: (vcontain, state) => ({
                ...vcontain,
                textTransform: 'capitalize',
                color: '#BEBEBE',
                backgroundColor: state.isFocused ? '#0077B6' : '#171717',
              }),
              multiValue: (styles, { data }) => {
                return {
                  ...styles,
                  backgroundColor: '#0e0e0e',
                  borderRadius: 8,
                  padding: '0 4px',
                };
              },
              multiValueLabel: (styles) => ({
                ...styles,
                color: '#fff',
              }),
              multiValueRemove: (styles) => ({
                ...styles,
                color: '#7c7c7c',
                ':hover': {
                  backgroundColor: '#0e0e0e',
                  color: 'white',
                },
              }),
              placeholder: (place) => ({ ...place, color: 'rgba(0,0,0,.3)' }),
            }}
            onChange={(e) => {
              onChange(e);
              props.onChange && props.onChange(e);
            }}
            onBlur={props.onBlur}
            {...iProps}
            options={selectOption}
            theme={(theme) => ({
              ...theme,
              borderRadius: 2,
              colors: { ...theme.colors, primary: '#767676' },
            })}
          />
        )}
      />
    </Form.Item>
  );
};

export const SelectFieldAsync = (props) => {
  const {
    fieldname,
    label,
    control,
    iProps,
    rules,
    loadOptions,
    isRequired,
    initValue,
    validate,
    validMessage,
    readOnly,
  } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, []);

  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      label={label}
      validateStatus={validate}
      help={validMessage}
      noStyle={props.noStyle}
      className={props.class}
    >
      <Controller
        name={fieldname}
        control={control}
        defaultValue={initValue ? initValue : ''}
        rules={rules}
        render={(field) => {
          return (
            <AsyncSelect
              {...field}
              className={'customSelect asyncSelect'}
              styles={{
                control: (val) => ({ ...val, minHeight: 32 }),
                valueContainer: (vcontain) => ({
                  ...vcontain,
                  padding: '5px 15px',
                  textTransform: 'capitalize',
                }),
                dropdownIndicator: (icontain) => ({ ...icontain, padding: 5 }),
                indicatorSeparator: (icontain) => ({
                  ...icontain,
                  backgroundColor: '#000',
                }),
                option: (vcontain, state) => ({
                  ...vcontain,
                  textTransform: 'capitalize',
                  color: '#BEBEBE',
                  backgroundColor: state.isFocused ? '#0077B6' : '#171717',
                }),
                multiValue: (styles, { data }) => {
                  return {
                    ...styles,
                    backgroundColor: '#0e0e0e',
                    borderRadius: 8,
                    padding: '0 4px',
                  };
                },
                multiValueLabel: (styles) => ({
                  ...styles,
                  color: '#fff',
                }),
                multiValueRemove: (styles) => ({
                  ...styles,
                  color: '#7c7c7c',
                  ':hover': {
                    backgroundColor: '#0e0e0e',
                    color: 'white',
                  },
                }),
                placeholder: (place) => ({ ...place, color: 'rgba(0,0,0,.3)' }),
              }}
              {...iProps}
              onChange={(e) => {
                field.onChange(e);
                props.onChange && props.onChange(e);
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 2,
                colors: { ...theme.colors, primary: '#767676' },
              })}
              defaultOptions={[]}
              loadOptions={loadOptions}
            />
          );
        }}
      />
    </Form.Item>
  );
};

export const DateField = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, [props.valueGot]);

  return (
    <>
      <Form.Item
        required={isRequired ? isRequired : false}
        label={label}
        validateStatus={validate}
        help={validMessage}
        className={props.class}
      >
        <Controller
          name={fieldname}
          control={control}
          defaultValue={initValue ? initValue : ''}
          rules={rules}
          render={({ value, onChange }) => (
            <DatePicker
              style={{ width: '100%' }}
              value={value}
              onChange={(e) => {
                onChange(e);
                props.onChange && props.onChange(e);
              }}
              {...iProps}
            />
          )}
        />
      </Form.Item>
    </>
  );
};

export const InputCheckbox = (props) => {
  const { fieldname, label, control, rules, initValue, isRequired, validate, validMessage } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, []);

  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      validateStatus={validate}
      help={validMessage}
      valuePropName="checked"
      className={props.class}
      // noStyle
    >
      <Controller
        name={fieldname}
        control={control}
        rules={rules}
        defaultValue={initValue ? initValue : ''}
        render={({ value, onChange }) => (
          <Checkbox
            checked={value}
            indeterminate={props.intr == true ? props.intr : false}
            onChange={(e) => {
              onChange(e.target.checked);
              props.onChange && props.onChange(e.target.checked);
            }}
          >
            {label}
          </Checkbox>
        )}
      />
    </Form.Item>
  );
};

export const CheckboxGroup = (props) => {
  const { fieldname, label, option, control, rules, initValue, isRequired, validate, validMessage, intr } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, []);

  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      validateStatus={validate}
      help={validMessage}
      label={label}
      className={props.class}
    >
      <Controller
        name={fieldname}
        control={control}
        rules={rules}
        defaultValue={initValue ? initValue : ''}
        render={({ value, onChange }) => (
          <Checkbox.Group
            value={value}
            indeterminate={intr}
            onChange={(e) => {
              onChange(e);
              props.onChange && props.onChange(e);
            }}
            disabled={props.disabled}
            className="w-100"
            options={option}
          />
        )}
      />
    </Form.Item>
  );
};

export const TimeField = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, []);

  return (
    <>
      <Form.Item required={isRequired ? isRequired : false} label={label} validateStatus={validate} help={validMessage}>
        <Controller
          name={fieldname}
          control={control}
          defaultValue={initValue ? initValue : ''}
          rules={rules}
          as={<TimePicker style={{ width: '100%' }} {...iProps} />}
        />
      </Form.Item>
    </>
  );
};

export const UploadField = (props) => {
  const {
    fieldname,
    label,
    control,
    rules,
    initValue,
    isRequired,
    validate,
    validMessage,
    filelist,
    fileProps,
    iProps,
  } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, []);

  const preview = (id, cat, url, app) => {
    prevDoc(id, cat, url, app).then(res => {
      window.open(res.data.message);
    }).catch(e => {
      const { response } = e;
      message.error('File not found or invalid request');

    })
  }

  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      label={label}
      validateStatus={validate}
      help={validMessage}
      className={props.class}
    >
      <Controller
        name={fieldname}
        control={control}
        rules={rules}
        defaultValue={initValue ? initValue : ''}
        render={({ value, fileList, onChange }) => (
          <>
          <Upload
            className="uploadWithbtn"
            showUploadList={false}
            accept="image/*,.pdf"
            maxCount={1}
            fileList={fileList}
            customRequest={dummyRequest}
            onChange={(e) => {
              onChange(e);
              props.onChange && props.onChange(e);
            }}
            {...iProps}
          >
            <Input
              size="large"
              className={`ag-upload-btn`}
              value={value ? value.fileList[0].name : 'Please Upload File'}
              addonAfter={<PlusCircleFilled />}
            />
            
          </Upload>
            {value && value?.fileList[0].uid == '-1' && (
              <Button
                type="link"
                htmlType="button"
                className={`download-inputbtn`}
                onClick={() => value.fileList[0].s3 ? preview(value.fileList[0]?.aid, value.fileList[0]?.s3,value.fileList[0]?.url, value.fileList[0]?.app) : window.open(value.fileList[0].url)}
                icon={<DownloadIcon className="c-success" />}
              />
            )}
          </>
        )}
      />
    </Form.Item>
  );
};

export const TextAreaField = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, [props.valueGot]);

  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      label={label}
      validateStatus={validate}
      help={validMessage}
      className={props.classes}
    >
      <Controller
        name={fieldname}
        control={control}
        defaultValue={initValue || initValue == 0 ? initValue : ''}
        rules={rules}
        as={<Input.TextArea {...iProps} />}
      />
    </Form.Item>
  );
};

export const InputRadio = (props) => {
  const { fieldname, label, control, rules, initValue, isRequired, validate, validMessage, noStyle } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, []);
  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      validateStatus={validate}
      help={validMessage}
      valuePropName="checked"
      noStyle={noStyle}
      className={props.class ? props.class : ''}
    >
      <Controller
        rules={rules}
        name={fieldname}
        control={control}
        defaultValue={initValue ? initValue : ''}
        render={({ value, onChange }) => (
          <Radio.Group
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              props.onChange(e);
            }}
          >
            {props.options}
          </Radio.Group>
        )}
      />
    </Form.Item>
  );
};

export const SwitchField = (props) => {
  const { fieldname, control, initValue, rules, iProps, label } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, []);
  return (
    <Form.Item className="mb-0">
      <Controller
        name={fieldname}
        control={control}
        rules={rules}
        defaultValue={initValue ? initValue : false}
        render={({ value, onChange }) => (
          <div>
            <Switch checked={value} onChange={(e) => onChange(e)} {...iProps} /> {label}
          </div>
        )}
      />
    </Form.Item>
  );
};

export const RateField = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage, valueGot } = props;
  useEffect(() => {
    valueGot && props.setValue(fieldname, valueGot);
  }, [valueGot]);
  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      label={label}
      validateStatus={validate}
      help={validMessage}
      className={props.class}
    >
      <Controller
        name={fieldname}
        control={control}
        defaultValue={initValue || initValue == 0 ? initValue : ''}
        rules={rules}
        render={({ onBlur, value, onChange }) => (
          <Rate value={value} onChange={onChange} onBlur={props.onBlur} {...iProps} />
        )}
      />
    </Form.Item>
  );
};

export const SliderField = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage, valueGot } = props;
  useEffect(() => {
    valueGot && props.setValue(fieldname, valueGot);
  }, [valueGot]);

  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      label={label}
      validateStatus={validate}
      help={validMessage}
      className={props.class}
    >
      <Controller
        name={fieldname}
        control={control}
        defaultValue={initValue || initValue == 0 ? initValue : ''}
        rules={rules}
        render={({ onBlur, value, onChange }) => (
          <Slider value={value} onChange={onChange} onBlur={props.onBlur} {...iProps} />
        )}
      />
    </Form.Item>
  );
};

export const DateRangeField = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, [props.valueGot]);

  return (
    <>
      <Form.Item
        required={isRequired ? isRequired : false}
        label={label}
        validateStatus={validate}
        help={validMessage}
        className={props.class}
      >
        <Controller
          name={fieldname}
          control={control}
          defaultValue={initValue ? initValue : ''}
          rules={rules}
          render={({ value, onChange }) => (
            <DatePicker.RangePicker
              showTime
              size="large"
              style={{ width: '100%' }}
              value={value}
              onChange={(e) => {
                onChange(e);
                props.onChange && props.onChange(e);
              }}
              {...iProps}
            />
          )}
        />
      </Form.Item>
    </>
  );
};
