import React, { Fragment, useEffect, useState } from 'react';
import { Button, Row, Col, Typography, Form, Spin, message } from 'antd';
import { useForm, useFieldArray } from 'react-hook-form';
import { SelectField, InputField } from '../../../../../../../atoms/FormElement';
import ApprovalFields from './ApprovalFields';
import { addRequest } from '../../../../ducks/services';
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from 'react-redux';

const initQ = {
  approvers: '',
  approver_detail: '',
};

const initF = {
  field_name: '',
};

const categoryList = [
  { label: 'Carry Forward Leave Extension', value: 'Carry Forward Leave Extension' },
  { label: 'Email Activation', value: 'Email Activation' },
  { label: 'Card Activation', value: 'Card Activation' },
  { label: 'Warning Letter Approval', value: 'Warning Letter Approval' },
  { label: 'Show Cause Letter', value: 'Show Cause Letter' },
]

const init = {
  form_name: '',
  sender: '',
  category: '',
}


const { Title, Text } = Typography;
const antIcon = <LoadingOutlined spin />;

export default (props) => {

  const { title, onClose, onUpdate, data } = props;
  const { control, errors, reset, setValue, handleSubmit, watch } = useForm({defaultValues: init});
  const [ load, setLoad ] = useState(false);
  const position = useSelector(state =>  state.global.roles);
  const fieldList = useSelector(state =>  state.hrmsrequests.fieldData);

  const { fields: fields1, append: append1, remove: remove1 } = useFieldArray({
    control,
    name: 'approvers_fields',
  });

  const { fields: fields2, append: append2, remove: remove2 } = useFieldArray({
    control,
    name: 'form_fields',
  });
  
  useEffect(() => {
    if (data) {
      setValue('form_name', data.form_name);
      setValue('sender', {label: data.sender, value: data.sender});
      setValue('category', data?.category ? {label: data.category, value: data.category } : '');
      setValue('approvers_fields', data?.approvers);
      setValue('form_fields', data?.form_fileds);
      console.log('checking', data)
    } else {
      append1(initQ);
    }
  }, [data]);
  
  const onFinish = (val) => {

    setLoad(true);
    
    let fields = [];
    val?.form_fields?.map(x => {
      fields.push({
        field_name: x?.field_name?.label,
        field_type: x?.field_name?.type
      })
    })

    let approver = [];
    val?.approvers_fields?.map(x => {
      approver.push({
        approvers: x?.approvers?.label,
        approver_detail: x?.approver_detail?.value ? x.approver_detail.value : x.approver_detail ? x.approver_detail : '' 
      })
    })

    const body = {
      form_name: val?.form_name,
      sender:val?.sender?.label,
      status: "Active",
      category: val?.category?.label ? val?.category?.label : '',
      approvers: approver,
      form_fields: fields
    }
    
    addRequest(body, data?.name).then(res => {
      message.success('Request Successfully Added');
      setLoad(false);
      reset();
      onUpdate();
    }).catch(e => {
      console.log(e);
      message.error('Something went wrong');
      setLoad(false);
    })
  };

  const onCategoryChange = (e) => {
    if (e.label == 'Carry Forward Leave Extension')  {
      setValue('sender', {label: 'Staff',value: 'Staff'})
    } else if (e.label == 'Card Activation')  {
      setValue('sender', {label: 'HR Admin',value: 'HR Admin'})
    } else if (e.label == 'Email Activation')  {
      setValue('sender', {label: 'HR Admin',value: 'HR Admin'})
    } else if (e.label == 'Warning Letter Approval')  {
      setValue('sender', {label: 'HR Admin',value: 'HR Admin'})
    } else if (e.label == 'Show Cause Letter')  {
      setValue('sender', {label: 'HR Admin',value: 'HR Admin'})
    }
  }

  

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
    <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
      <Row gutter={[24, 30]}>
        <Col span={24}><Title level={3} className='mb-0 text-center'>{title}</Title></Col>
        <Col span={24}>
          <InputField
            required={true}
            fieldname={'form_name'}
            label={'Type Form Name'}
            control={control}
            class={`mb-0`}
            iProps={{ placeholder: 'Please state', size: 'large' }}
            initValue={''}
            rules={{
              required: 'Required',
            }}
            validate={errors.form_name && 'error'}
            validMessage={errors.form_name && errors.form_name.message}
          />
        </Col>
        <Col span={24}>
          <SelectField
            required={true}
            fieldname={'sender'}
            label={'Sender'}
            control={control}
            class={`mb-0`}
            iProps={{ placeholder: 'Please select' }}
            initValue={''}
            selectOption={position?.map(x => ({label: x.role_name, value: x.name}))}
            rules={{ required: 'Required' }}
            validate={errors.sender && 'error'}
            validMessage={errors.sender && errors.sender.message}
          />
        </Col>
        <Col span={24}>
          <SelectField
            fieldname={'category'}
            label={'Category'}
            control={control}
            class={`mb-0`}
            iProps={{ placeholder: 'Please select' }}
            initValue={''}
            onChange={onCategoryChange}
            selectOption={categoryList}
            />
        </Col>
        <Col span={24}>
          <Title level={5} className='mb-0'>Approvers</Title>
        </Col>
        {fields1.map((item, index) => (
          <Fragment key={item.id}>
            <Col span={24}>
                <ApprovalFields remove={remove1} watch={watch} item={item} index={index} control={control} errors={errors} />
            </Col>
          </Fragment>
        ))}
        <Col span={24}>
          <Button htmlType="button" type="dashed" size="large" className="w-100" onClick={() => append1(initQ)}>
              + Add Approver
          </Button>
        </Col>
        <Col span={24}>
          <Title level={5} className='mb-0'>Form Fields</Title>
          {/* <Text>Form Fields</Text> */}
        </Col>
        <Col span={24}>
          <Row gutter={[20,10]}>
        {fields2.map((item, index) => (
          <Fragment key={item.id}>
            <Col span={24}>
              <SelectField
                fieldname={`form_fields[${index}].field_name`}
                label={`field`}
                control={control}
                class={`mb-0`}
                iProps={{ placeholder: 'Please select' }}
                initValue={item?.field_name ? { label: item?.field_name, value: item?.field_name, type: item?.field_type } : ''}
                selectOption={fieldList.map(x => ({label: x.field_label, value: x.name, type: x.type}))}
              />
              <Button
                type="link"
                htmlType="button"
                className="p-0 h-auto c-gray-linkbtn right-fixed smallFont12"
                onClick={() => remove2(index)}
              >
                Remove
              </Button>
              </Col>
          </Fragment>
        ))}
        </Row>
        </Col>
        <Col span={24}>
          <Button htmlType="button" type="dashed" size="large" className="w-100" onClick={() => append2(initF)}>
              + Add Field
          </Button>
        </Col>
        <Col span={12}><Button size="large" type="primary" htmlType="button" className="black-btn w-100" onClick={() => {reset();onClose()}}>Close</Button></Col>
        <Col span={12}><Button size="large" type="primary" htmlType="submit" className="green-btn w-100">Save</Button></Col>
      </Row>

    </Form>
    </Spin>
  );
};
