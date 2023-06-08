import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Typography, Space, Form, Button, message, Spin } from 'antd';
import { useForm, useFieldArray } from 'react-hook-form';
import RateCard from '../RateCard';
import { LoadingOutlined } from '@ant-design/icons';
import { apiMethod } from '../../../../../../../../configs/constants';
import axios from '../../../../../../../../services/axiosInterceptor';

const antIcon = <LoadingOutlined spin />;
const { Title, Text } = Typography;

export default ({ data, id, updateApi }) => {
  const [load, setLoad] = useState(false);
  const { control, handleSubmit, setValue } = useForm();
  const { append, remove, fields } = useFieldArray({
    control,
    name: `other_skills`,
  });

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      let temp = [];
      data.other_skills?.length > 0 &&
        data.other_skills.map((x) => {
          temp.push({
            id: x.name,
            ...x,
          });
        });
      setValue('other_skills', temp);
    }
  }, [data]);

  const onFinish = async (val) => {
    console.log('chkk', val);
    setLoad(true);

    let skills = [];
    let duplicate = false;
    val?.other_skills?.map((x) => {
      let a = skills?.find((y) => y.skill_name == x.skill_name);
      if (a) {
        message.error('Skill Already Exist');
        duplicate = true;
        return false;
      }
      if (x.name == '') {
        skills.push({
          skill_name: x.skill_name,
          supervisor_assessment: 0,
          self_staff_assessment: x.self_staff_assessment,
        });
      } else {
        skills.push({
          name: x.name,
          // skill_name: x.skill_name,
          // supervisor_assessment: x.supervisor_assessment,
          self_staff_assessment: x.self_staff_assessment,
        });
      }
    });

    const body = {
      employee_id: id,
      other_skills: skills,
    };

    console.log('noth', body);

    if (!duplicate) {
      let url = `${apiMethod}/hrms.dashboard_api.hrms_other_skills`;
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
    } else {
      setLoad(false);
    }
  };

  const onAdd = (item) => {
    append({
      name: '',
      skill_name: '',
      supervisor_assessment: 0,
      self_staff_assessment: 0,
    });
  };

  const onRemove = (index, item) => {
    remove(index);
  };

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[20, 30]}>
          <Col flex="auto">
            <Space size={10} direction="vertical" className="w-100">
              <Title level={4} className="mb-0 c-default">
                Other Skills
              </Title>
            </Space>
          </Col>
          <Col>
            <Text className="c-gray">Last Assessed : 3 Months Ago</Text>
          </Col>
          <Col span={24}>
            <Space size={20} direction="vertical" className="w-100">
              {fields.map((item, index) => (
                <RateCard
                  key={item.id}
                  array={'other_skills'}
                  item={item}
                  index={index}
                  control={control}
                  onRemove={onRemove}
                  job={data.job_opening}
                />
              ))}
            </Space>
          </Col>
          <Col span={24}>
            <Button htmlType="button" type="dashed" size="large" className="w-100" onClick={onAdd}>
              + Add other skills
            </Button>
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
