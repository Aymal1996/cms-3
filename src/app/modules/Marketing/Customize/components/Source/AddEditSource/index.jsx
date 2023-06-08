import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Form, Spin, Button, message } from 'antd';
import { useForm } from 'react-hook-form';
import { LoadingOutlined } from '@ant-design/icons';
import { InputField } from 'Atoms/FormElement';
import { deleteSource, sourceApi } from '../../../ducks/services';

const antIcon = <LoadingOutlined spin />;
const { Title } = Typography;

export default (props) => {

  const { title, onClose, data } = props;
  const [load, setLoad] = useState(false);
  const { control, errors, handleSubmit, setValue, reset } = useForm();

  const onFinish = (val) => {
    setLoad(true);
    
    const payload = {
        source_name: val.source_name,
        status: "Active"
    }

    if(data?.name) {
      payload['name'] = data.name;
      payload['status'] = data.status;
    }
    sourceApi(payload).then((res) => {
      message.success('Source Created Successfully');
      setLoad(false);
      props.updateApi();
      props.onClose();
    }).catch((error) => {
        setLoad(false);
        message.error('Something went worng');
    })
  };

  const onDeleteHandler = () => {
    setLoad(true);
    deleteSource(data?.name).then((res) => {
      message.success('Source Deleted Successfully');
      setLoad(false);
      props.updateApi();
      props.onClose();
    }).catch((error) => {
      setLoad(false);
      message.error('Something went worng');
    })
  };

  useEffect(() => {
    if (data?.name) {
      setValue('source_name', data.source_name);
    }
  }, [data]);

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
              <Title level={3} className="mb-0 text-center">{title}</Title>
          </Col>
          <Col span={24}>
            <InputField 
            isRequired={true}
            fieldname='source_name'
            label='Source Name'
            control={control}
            class='mb-0'
            iProps={{ size: 'large', placeholder: 'Type source name'}}
            rules={{required: 'required'}}
            initValue=''
            validate={errors.source_name && 'error'}
            // validMessage={errors.credit && errors.credit.message}
            />
          </Col>
          {!data.name ?
          <Col span={12}>
            <Button size="large" type="primary" htmlType="button" className="black-btn w-100" onClick={onClose}>
              Close
            </Button>
          </Col>
          :
          <Col span={12}>
            <Button
              size="large"
              type="primary"
              htmlType="button"
              className="red-btn w-100"
              onClick={onDeleteHandler}
            >
              Delete
            </Button>
          </Col>}
          <Col span={12}>
            <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};