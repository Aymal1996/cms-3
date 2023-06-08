import React, { useState } from 'react';
import HeadingChip from 'Molecules/HeadingChip';
import { Col, Button, Form, Row, message } from 'antd';
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { uniquiFileName, getSingleUpload } from '../../../../../features/utility';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { addUpdateGrant } from '../ducks/services';
import GrantForm from '../components/GrantForm';

const antIcon = <LoadingOutlined spin />; 

export default (props) => {
  const history = useHistory();
  const { control, errors, handleSubmit, getValues } = useForm();

  const saveDraft = () => {
    const value = getValues();
    if(value.grant_name) {
      onFinish(value, 'Draft');
    } else {
      message.error('Please Enter Grant Name')
    }
  }

  const onFinish = async (value,stats) => {
    props.setLoading(true);
    let fileurl='';
    if (value.attachments) {
      let modifiedName = uniquiFileName(value.attachments?.file?.originFileObj.name)
      let res = await getSingleUpload(modifiedName, 'image',  value.attachments?.file?.originFileObj);
      fileurl = res?.file_url;
    }

    const payload = {
      grants: [
        {
          grant_name: value?.grant_name,
          lecturer_id: value?.lecturer_id?.value,
          grant_date: value.grant_date,
          status: typeof(stats) == 'string' ? stats : 'Active',
          source: value?.source.value,
          duration: value?.duration.value,
          grant_amount: value?.grant_amount,
          attachment: fileurl,
          doctype: 'Grants',
        },
      ],
    };

    console.log('payload', payload)
  
    addUpdateGrant(payload).then(res => {
      props.setLoading(false);
      message.success('Grant Successfully Added');
      setTimeout(() => history.push('/faculty/grants'), 1000);
    }).catch(e => {
      const {response} = e;
      message.error('Something went wrong');
      props.setLoading(false);
    })
  }

    return (
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Button type="link" className="c-gray-linkbtn p-0 mt-1" onClick={() => history.goBack()} htmlType="button">
            <LeftOutlined /> Back
          </Button>		
        </Col>
        <Col span={24}>
          <HeadingChip title="Add New Research Grant"/>
        </Col>
        <Col span={24}>
          <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
            <GrantForm
              control={control}
              errors={errors}
              mode="add"
              onDraft={saveDraft}
            />
          </Form>
        </Col>
      </Row>
    )
}