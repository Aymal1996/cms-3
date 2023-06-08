import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Form, message } from 'antd';
import { useForm } from 'react-hook-form';
import { employApi } from '../../../../ducks/services';
import Insurance from './Insurance';
import MedicalInfo from './MedicalInfo';

export default (props) => {

  const { mode, data, updateApi, id, setLoad, controlOut, errorsOut } = props;
  const { control: controlIn, errors: errorsIn, setValue: setValueIn, handleSubmit:handleSubmitIn } = useForm();
  const [visisble, setVisible] = useState(true);

  useEffect(() => {
    if (mode == 'edit' && data && Object.keys(data).length > 0) {
      refreshForm();
    }
  }, [data]);

  const refreshForm = () => {
    setTimeout(() => {
      setValueIn('weight', data?.weight);
      setValueIn('height', data?.height);
      setValueIn('blood_group', data?.blood_group ? {label: data?.blood_group, value: data?.blood_group} : "");
      setValueIn('health_details', data?.health_details);
    }, 1500)
  }
  
  const onFinish = async (val) => {
    setLoad(true);
    const body = {
        blood_group: val.blood_group.value,
        height: val.height,
        weight: val.weight,
        health_details: val.health_details
    }
    employApi(body, id).then(res => {
      setLoad(false);
      updateApi();
      message.success('Medical Record Successfully Saved')
    }).catch(e => {
      console.log(e);
      setLoad(false);
      message.error(e);
    })
  }

  return (
    <>
    {mode == 'edit' ?
      <Row gutter={[20,20]}>
        {props.data.status != 'Draft' && 
        <Col span={24}>
          <Insurance {...props} setVisible={setVisible} refresh={refreshForm} />
        </Col>}
        {visisble &&
        <Col span={24}>
          <Form layout='vertical' onFinish={handleSubmitIn(onFinish)} scrollToFirstError>
            <MedicalInfo control={controlIn} errors={errorsIn} mode={mode} />
          </Form>
        </Col>}
      </Row>
      :
      <MedicalInfo control={controlOut} errors={errorsOut}  mode={mode} />}
    </>
  );
};