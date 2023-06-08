import React, { Fragment, useEffect, useState } from 'react';
import { Button, Row, Col, Typography, Form, Spin, message } from 'antd';
import { useForm, useFieldArray } from 'react-hook-form';
import { SelectField, InputField } from 'Atoms/FormElement';
import ApprovalFields from './ApprovalFields';
import { CloseCircleFilled, LoadingOutlined } from "@ant-design/icons";
import { useSelector } from 'react-redux';
import { createForm, updateForm } from '../../../../ducks/services';


const initQ1 = {
  approvers: '',
  approver_detail: '',
};

const initQ = {
  sender: '',
  sender_detail: '',
};

const initF = {
  field_name: '',
};

const categoryList = [
  { label: 'Incentive', value: 'Incentive' },
  { label: 'Grant', value: 'Grant' },
  { label: 'Scholarship', value: 'Scholarship' },
]

const init = {
  form_name: '',
  category: '',
}


const { Title, Text } = Typography;
const antIcon = <LoadingOutlined spin />;

export default (props) => {

  const { title, onClose, onUpdate, data } = props;
  const { control, errors, reset, setValue, handleSubmit, watch } = useForm({defaultValues: init});
  const [ load, setLoad ] = useState(false);
  // const position = useSelector(state =>  state.global.roles);
  const fieldList = useSelector(state => state.forms.fieldsData);

  const { fields: fields1, append: append1, remove: remove1 } = useFieldArray({
    control,
    name: 'sender_fields',
  });

  const { fields: fields2, append: append2, remove: remove2 } = useFieldArray({
    control,
    name: 'approvers_fields',
  });

  const { fields: fields3, append: append3, remove: remove3 } = useFieldArray({
    control,
    name: 'form_fields',
  });
  
  useEffect(() => {
    if (data) {
      setValue('form_name', data?.form_name);
      setValue('sender_fields', data?.sender);
      setValue('category', data?.category ? {label: data.category, value: data.category } : '');
      setValue('approvers_fields', data?.approvers);
      setValue('form_fields', data?.form_fileds);
    } else {
      append1(initQ);
      append2(initQ1);
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

    let sender = [];
    val?.sender_fields?.map(x => {
      sender.push({
        sender: x?.sender?.label,
        sender_detail: x?.sender_detail?.value ? x.sender_detail.value : x.sender_detail ? x.sender_detail : '' 
      })
    })

    const body = {
      form_name: val?.form_name,
      sender:sender,
      status: "Active",
      category: val?.category?.label ? val?.category?.label : '',
      approvers: approver,
      form_fields: fields
    }

    if (data?.name) {
      updateForm(data.name, body).then(res => {
        message.success('Request Successfully Added');
        setLoad(false);
        reset();
        onUpdate();
      }).catch(e => {
        console.log(e);
        message.error('Something went wrong');
        setLoad(false);
      })
    } else {
      createForm(body).then(res => {
        message.success('Request Successfully Added');
        setLoad(false);
        reset();
        onUpdate();
      }).catch(e => {
        console.log(e);
        message.error('Something went wrong');
        setLoad(false);
      })
    }
    
  };

  const onCategoryChange = (e) => {
    if (e.label == 'Incentive')  {
      setValue('form_name', 'Incentive')
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
          <Title level={5} className='mb-0'>Sender</Title>
        </Col>
        <Col span={24}>
        <Row gutter={[20,10]}>
        {fields1.map((item, index) => (
          <Fragment key={item.id}>
            <Col span={24}>
                <ApprovalFields parent={'sender_fields'} field1={'sender'} field2={'sender_detail'} remove={remove1} watch={watch} item={item} index={index} control={control} errors={errors} />
            </Col>
          </Fragment>
        ))}
        </Row>
        </Col>
        <Col span={24}>
          <Button htmlType="button" type="dashed" size="large" className="w-100" onClick={() => append1(initQ)}>
              + Add Sender
          </Button>
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
        <Col span={24}>
        <Row gutter={[20,10]}>
        {fields2.map((item, index) => (
          <Fragment key={item.id}>
            <Col span={24}>
                <ApprovalFields parent={'approvers_fields'} field1={'approvers'} field2={'approver_detail'} remove={remove2} watch={watch} item={item} index={index} control={control} errors={errors} />
            </Col>
          </Fragment>
        ))}
        </Row>
        </Col>
        <Col span={24}>
          <Button htmlType="button" type="dashed" size="large" className="w-100" onClick={() => append2(initQ1)}>
              + Add Approver
          </Button>
        </Col>
        <Col span={24}>
          <Title level={5} className='mb-0'>Form Fields</Title>
          {/* <Text>Form Fields</Text> */}
        </Col>
        <Col span={24}>
          <Row gutter={[20,10]}>
        {fields3.map((item, index) => (
          <Fragment key={item.id}>
            <Col span={24}>
              <Row gutter={[10,10]}>
                <Col flex='auto'>
              <SelectField
                fieldname={`form_fields[${index}].field_name`}
                label={''}
                control={control}
                class={`mb-0`}
                iProps={{ placeholder: 'Please select' }}
                initValue={item?.field_name ? { label: item?.field_name, value: item?.field_name, type: item?.field_type } : ''}
                selectOption={fieldList.map(x => ({label: x.name, value: x.name, type: x.type}))}
              />
              </Col>
              <Col flex='40px'>
              <Button type='link' size="large" className='cross-iconbtn' htmlType='button' icon={<CloseCircleFilled className='fontSize20'/>} onClick={() => remove3(index)} />
              </Col>
              </Row>
              </Col>
          </Fragment>
        ))}
        </Row>
        </Col>
        <Col span={24}>
          <Button htmlType="button" type="dashed" size="large" className="w-100" onClick={() => append3(initF)}>
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
