import React, { useState, useEffect, Fragment } from 'react';
import { Button, Row, Col, Typography, Form, InputNumber, message, Spin } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { jobFields } from './FormFields';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import AddUser from '../../../Teams/Components/AddUser';
import { SliderField } from '../../../../../../../atoms/FormElement';
import { getSingleJob, addjobPosition, updatejobPosition, deletejobPosition } from '../../../../ducks/services';
import { LoadingOutlined } from '@ant-design/icons';
import { allowed } from '../../../../../../../../routing/config/utils';
import Roles from '../../../../../../../../routing/config/Roles';
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { title, onClose, jobPosition } = props;
  const [teamData, setTeamData] = useState('');
  const [userData, setUserData] = useState([]);
  const [load, setLoad] = useState(false);
  const { control, errors, setValue, watch, reset, handleSubmit } = useForm();
  const { Title, Text } = Typography;
  const employeeList = useSelector((state) => state.setup.employeeList);

  const skillSet = [
    { label: 'Work Quality', fieldname: 'work_quality', updateVal: watch('work_quality', 1) },
    { label: 'Work Speed', fieldname: 'work_speed', updateVal: watch('work_speed', 1) },
    { label: 'Leadership', fieldname: 'leadership', updateVal: watch('leadership', 1) },
    { label: 'Critical Thinking', fieldname: 'critical_thinking', updateVal: watch('critical_thinking', 1) },
    { label: 'Team Work', fieldname: 'team_work', updateVal: watch('team_work', 1) },
  ];
  useEffect(() => {
    if (jobPosition.name.length > 0) {
      setLoad(true);
      getSingleJob(jobPosition.name).then((response) => {
        setTeamData(response?.data?.data);
        setUserData(
          response?.data?.data?.user_staff.map((value) => ({
            employee_name: value.employee_full_name,
            name: value.employee,
          })),
        );
        setLoad(false);
      });
    } else {
      reset();
      setUserData([]);
    }
  }, [jobPosition]);

  useEffect(() => {
    if (Object.entries(teamData).length > 0) {
      setValue('job_position_name', teamData.job_position_name);
      setValue(
        'skills',
        teamData.skills.map((value) => ({ label: value.skill, value: value.skill_name })),
      );
      setValue('team_leader', { label: teamData.team_leader_name, value: teamData.team_leader_name });
      skillSet.map((value) => setValue(value.fieldname, teamData[value.fieldname]));
    }
  }, [teamData]);

  const onFinish = async (val) => {
    setLoad(true);
    const payload = {
      job_position_name: val.job_position_name,
      work_quality: val.work_quality,
      work_speed: val.work_speed,
      leadership: val.leadership,
      critical_thinking: val.critical_thinking,
      team_work: val.team_work,
      skills: val.skills.map((value) => ({ skill_name: value.value })),
      user_staff: userData.map((value) => ({ employee: value.name })),
    };
    jobPosition.name.length == 0
      ? addjobPosition(payload).then((response) => {
        setLoad(false);
          if (response.data.message.success == true) {
            message.success(response.data.message.message);
            onClose();
          } else {
            message.error(response.data.message.message);
          }
        }).catch((error) => {
          setLoad(false);
          message.error('Something went wrong')
        })
      : updatejobPosition(jobPosition.name, payload).then((response) => {
        setLoad(false);
          if (response.data.message.success == true) {
            message.success(response.data.message.message);
            onClose();
          } else {
            message.error(response.data.message.message);
          }
        }).catch((error) => {
          setLoad(false);
          message.error('Something went wrong')
        });
  };

  const onDeleteJobPosition = () => {
    setLoad(true);
    deletejobPosition(jobPosition.name)
      .then((response) => {
        setLoad(false);
        if (response.data.message.success == true) {
          message.success(response.data.message.message);
          onClose();
        } else {
          message.error(response.data.message.message);
        }
      })
      .catch((error) => {
        setLoad(false)
        message.error('Cant delete a Job')
      });
  };

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[24, 30]}>
          <Col span={24}>
            <Row gutter={24} justify="center">
              <Col>
                <Title level={3} className="mb-0">
                  {title}
                </Title>
              </Col>
            </Row>
          </Col>

          <Col span={8}>
            <Row gutter={[24, 30]}>
              {jobFields().map((item, idx) => (
                <Fragment key={idx}>
                  <FormGroup item={item} control={control} errors={errors} />
                </Fragment>
              ))}
            </Row>
          </Col>
          <Col span={8}>
            <Row gutter={[24, 20]} align="middle">
              {skillSet.map((value, index) => (
                <Fragment key={index}>
                  <Col span={20}>
                    <SliderField
                      fieldname={value.fieldname}
                      label={value.label}
                      control={control}
                      errors={errors}
                      iProps={{ min: 1, max: 5, marks: { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' } }}
                    />
                  </Col>
                  <Col span={4}>
                    <InputNumber value={value.updateVal} disabled={true} className="w-100" />
                  </Col>
                </Fragment>
              ))}
            </Row>
          </Col>
          <Col span={8}>
            <Row gutter={[24, 30]}>
              <Col span={24}>
                <AddUser userData={userData} setUserData={setUserData} title="Team Member" allListing={employeeList} />
              </Col>
              <Col span={24}>
                <Row gutter={24}>
                  {jobPosition.name ? (
                    <>
                      {allowed([Roles.SETUP], 'delete') && (
                        <Col span={12}>
                          <Button
                            size="large"
                            type="primary"
                            htmlType="button"
                            className="red-btn w-100"
                            onClick={onDeleteJobPosition}
                          >
                            Delete
                          </Button>
                        </Col>
                      )}
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
                          className="black-btn w-100"
                          onClick={onClose}
                        >
                          Close
                        </Button>
                      </Col>
                      <Col span={12}>
                        <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                          Add
                        </Button>
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
