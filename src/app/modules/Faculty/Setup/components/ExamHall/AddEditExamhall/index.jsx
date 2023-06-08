import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Form, Spin, Button, message } from 'antd';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import FormGroup from '../../../../../../molecules/FormGroup';
import { createExamHall, deleteExamHall } from '../../../ducks/services';
import { getAllExamsHall } from '../../../ducks/actions';
import { addEditExamHallForm } from './FormFields';
import {} from './';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined spin />;

const AddEditExamhall = (props) => {
  const { title, onClose, data, page, limit } = props;
  const { Title } = Typography;
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const { control, errors, handleSubmit, setValue, reset } = useForm();

  const onFinish = (value) => {
    setLoad(true);
    const payload = {
      exam_hall: [
        {
          exam_hall_capacity: value?.exam_hall_capacity,
          exam_hall_name: value?.exam_hall_name,
          level: value?.level,
          block: value?.block,
          doctype: 'Exam Hall',
        },
      ],
    };
    !data.name
      ? createExamHall(payload)
          .then((response) => {
            if (response?.data?.message.success == true) {
              message.success(response?.data?.message.message);
            } else {
              message.error(response?.data?.message.message);
            }
            setLoad(false);
            dispatch(getAllExamsHall(page, limit));
            onClose();
          })
          .catch((error) => {
            setLoad(false);
            message.error('Something went worng');
          })
      : createExamHall({ exam_hall: [{ ...payload.exam_hall[0], name: data?.name }] })
          .then((response) => {
            if (response?.data?.message.success == true) {
              message.success(response?.data?.message.message);
            } else {
              message.error(response?.data?.message.message);
            }
            setLoad(false);
            dispatch(getAllExamsHall(page, limit));
            onClose();
          })
          .catch((error) => {
            setLoad(false);
            message.error('Something went worng');
          });
  };
  const onDeleteHandler = () => {
    setLoad(true);
    deleteExamHall(data?.name)
      .then((response) => {
        if (response?.data?.message.success == true) {
          message.success(response?.data?.message.message);
        } else {
          message.error(response?.data?.message.message);
        }
        setLoad(false);
        dispatch(getAllExamsHall(page, limit));
        onClose();
      })
      .catch((error) => {
        setLoad(false);
        message.error('Something went worng');
      });
  };
  useEffect(() => {
    if (data?.name) {
      setValue('exam_hall_capacity', data.exam_hall_capacity);
      setValue('exam_hall_name', data.exam_hall_name);
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
              {addEditExamHallForm().map((filed, index) => (
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

export default AddEditExamhall;
