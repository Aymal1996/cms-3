import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Form, Spin, Button, message } from 'antd';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import FormGroup from '../../../../../../molecules/FormGroup';
import { createClassroom, deleteClassroom } from '../../../ducks/services';
import { addEditClassroomForm } from './FormFields';
import { getAllClassrooms } from '../../../ducks/actions';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined spin />;

const AddEditClassroom = (props) => {
  const { title, onClose, data, page, limit } = props;
  const { Title } = Typography;
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const { control, errors, handleSubmit, setValue, reset } = useForm();

  const onFinish = (value) => {
    setLoad(true);
    const payload = {
      classroom: [
        {
          classroom_capacity: value?.classroom_capacity,
          classroom_name: value?.classroom_name,
          classroom_type: value?.classroom_type.value,
          level: value?.level,
          block: value?.block,
          doctype: 'Classroom',
        },
      ],
    };

    !data.name
      ? createClassroom(payload)
          .then((response) => {
            if (response?.data?.message.success == true) {
              message.success(response?.data?.message.message);
            } else {
              message.error(response?.data?.message.message);
            }
            setLoad(false);
            dispatch(getAllClassrooms(page, limit));
            onClose();
          })
          .catch((error) => {
            setLoad(false);
            message.error('Something went worng');
          })
      : createClassroom({ classroom: [{ ...payload.classroom[0], name: data?.name }] })
          .then((response) => {
            if (response?.data?.message.success == true) {
              message.success(response?.data?.message.message);
            } else {
              message.error(response?.data?.message.message);
            }
            setLoad(false);
            dispatch(getAllClassrooms(page, limit));
            onClose();
          })
          .catch((error) => {
            setLoad(false);
            message.error('Something went worng');
          });
  };
  const onDeleteHandler = () => {
    setLoad(true);
    deleteClassroom(data?.name).then((response) => {
      if (response?.data?.message.success == true) {
        message.success(response?.data?.message.message);
      } else {
        message.error(response?.data?.message.message);
      }
      setLoad(false);
      dispatch(getAllClassrooms(page, limit));
      onClose();
    });
  };
  useEffect(() => {
    if (data?.name) {
      setValue('classroom_capacity', data.classroom_capacity);
      setValue('classroom_name', data.classroom_name);
      setValue('classroom_type', { label: data.classroom_type, value: data.classroom_type });
      setValue('level', data.level);
      setValue('block', data.block);
    } else {
      reset();
    }
  }, [data]);

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[24, 30]}>
          <Col span={24}>
            <Row a={24} justify="center">
              <Col>
                <Title level={3} className="mb-0">
                  {title}
                </Title>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[24, 30]}>
              {addEditClassroomForm().map((filed, index) => (
                <Col span={24} key={index}>
                  <FormGroup item={filed} control={control} errors={errors} />
                </Col>
              ))}
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={24}>
              {!data.name ? (
                <>
                  <Col span={12}>
                    <Button size="large" type="primary" htmlType="button" className="black-btn w-100" onClick={onClose}>
                      Close
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                      Save
                    </Button>
                  </Col>
                </>
              ) : (
                <>
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
                  </Col>
                  <Col span={12}>
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

export default AddEditClassroom;
