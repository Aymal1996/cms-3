import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Typography, Space, Form, Tag, Button, message, Spin } from 'antd';
import { useForm, useFieldArray } from 'react-hook-form';
import RateCard from '../RateCard';
import { PlusCircleFilled, LoadingOutlined } from '@ant-design/icons';
import { apiMethod } from '../../../../../../../../configs/constants';
import axios from '../../../../../../../../services/axiosInterceptor';
import moment from 'moment';

const antIcon = <LoadingOutlined spin />;

const { Title, Text } = Typography;

export default ({ data, id, updateApi }) => {
  const [tags, setTags] = useState([]);
  const [load, setLoad] = useState(false);
  const { control, handleSubmit, setValue } = useForm();
  const { append, remove, fields } = useFieldArray({
    control,
    name: `job_related_skills`,
  });

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      let temp1 = [];
      let temp2 = [];
      data?.job_related_skills?.length > 0 &&
        data?.job_related_skills.map((x) => {
          if (x.supervisor_assessment > 0 || x.self_staff_assessment > 0) {
            temp1.push({
              id: x.name,
              ...x,
            });
          } else {
            temp2.push(x);
          }
        });
      setValue('job_related_skills', temp1);
      setTags(temp2);
    }
  }, [data]);

  const onFinish = async (val) => {
    console.log('val', val);
    setLoad(true);

    let job_related = [];
    if (val.job_related_skills) {
      val.job_related_skills.map((x) => {
        job_related.push({
          name: x.name,
          skill_name: x.skill_name,
          //supervisor_assessment: 0,
          self_staff_assessment: x.self_staff_assessment,
        });
      });
    }

    tags.map((x) => {
      job_related.push({
        name: x.name,
        skill_name: x.skill_name,
        //supervisor_assessment: 0,
        self_staff_assessment: x.self_staff_assessment,
      });
    });

    const body = {
      employee_id: id,
      job_related_skills: job_related,
    };

    let url = `${apiMethod}/hrms.dashboard_api.hrms_job_related_skills`;
    try {
      await axios.post(url, body);
      message.success('Assessment updated');
      updateApi();
      setLoad(false);
    } catch (e) {
      const { response } = e;
      console.log(e);
      message.error('Something went wrong');
      setLoad(false);
    }
  };

  const onAdd = (item) => {
    append({
      name: item?.name,
      skill_name: item?.skill_name,
      skill: item.skill,
      //supervisor_assessment: item?.supervisor_assessment,
      self_staff_assessment: item?.self_staff_assessment,
    });
    let temp = tags.filter((x) => x.name != item.name);
    setTags(temp);
  };

  const onRemove = (index, item) => {
    remove(index);
    tags.push({
      name: item.name,
      skill_name: item.skill_name,
      skill: item.skill,
      //supervisor_assessment: 0,
      self_staff_assessment: 0,
    });
  };

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[20, 30]}>
          <Col flex="auto">
            <Space size={10} direction="vertical" className="w-100">
              <Title level={4} className="mb-0 c-default">
                Job Releated Skills
              </Title>
              <Text>{data?.job_title}</Text>
            </Space>
          </Col>
          <Col>
            <Text className="c-gray">Last Assessed : {moment(data?.modified, moment.defaultFormat).fromNow()}</Text>
          </Col>
          <Col span={24}>
            <Space size={20} direction="vertical" className="w-100">
              {fields.map((item, index) => (
                <RateCard
                  key={item.id}
                  array={'job_related_skills'}
                  item={item}
                  index={index}
                  control={control}
                  onRemove={onRemove}
                />
              ))}
            </Space>
          </Col>
          <Col span={24}>
            <Text>Other Job Related Skills</Text>
          </Col>
          <Col span={24}>
            <Row gutter={[15, 15]}>
              {tags.map((y, i) => (
                <Col key={i}>
                  <Tag className="info-tag info-black" onClick={() => onAdd(y)}>
                    <Space size={15}>
                      <span>{y.skill}</span>
                      <PlusCircleFilled />
                    </Space>
                  </Tag>
                </Col>
              ))}
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={24} justify="end">
              <Col>
                <Button size="large" type="primary" htmlType="submit" className="green-btn">
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
