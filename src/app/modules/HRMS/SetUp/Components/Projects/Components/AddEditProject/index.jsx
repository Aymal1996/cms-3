import React, { useState, useEffect, Fragment } from 'react';
import { Button, Row, Col, Typography, Form, message, Spin } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import AddUser from '../../../Teams/Components/AddUser';
import { getSingleProject, addProject, updateProjecat, deleteProject } from '../../../../ducks/services';
import { projectFields } from './FormFields';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { allowed } from '../../../../../../../../routing/config/utils';
import Roles from '../../../../../../../../routing/config/Roles';

const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { title, onClose, projectData } = props;
  const [load, setLoad] = useState(false);
  const [teamData, setTeamData] = useState('');
  const [userData, setUserData] = useState([]);
  const { control, errors, setValue, reset, handleSubmit } = useForm();
  const { Title, Text } = Typography;
  const employeeList = useSelector((state) => state.setup.employeeList);

  useEffect(() => {
    if (projectData.name.length > 0) {
      setLoad(true);
      getSingleProject(projectData.name).then((response) => {
        console.log({ response });
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
  }, [projectData]);

  useEffect(() => {
    if (Object.entries(teamData).length > 0) {
      setValue('project', teamData.project);
    }
  }, [teamData]);

  const onFinish = (values) => {
    setLoad(true);
    const payload = {
      project_code: values.project,
      project: values.project,
      user_staff: userData.map((value) => ({ employee: value.name })),
    };
    console.log({ userData });
    projectData.name.length == 0
      ? addProject(payload).then((response) => {
        setLoad(false);
          if (response.data.message.success == true) {
            onClose();
            message.success(response.data.message.message);
          } else {
            message.error(response.data.message.message);
          }
        }).catch((error) => {
          setLoad(false);
          message.error('Something went wrong')
        })
      : updateProjecat(projectData.name, {
          project: values.project,
          user_staff: userData.map((value) => ({ employee: value.name })),
        }).then((response) => {
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
  };
  const onDeleteTeam = () => {
    setLoad(true);
    deleteProject(projectData.name)
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
        setLoad(false);
        message.error('Something went wrong')
      })
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

          <Col span={24}>
            <Row gutter={[24, 18]}>
              {projectFields().map((item, idx) => (
                <Fragment key={idx}>
                  <FormGroup item={item} control={control} errors={errors} />
                </Fragment>
              ))}
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[24, 20]}>
              <Col span={24}>
                <AddUser userData={userData} setUserData={setUserData} title="Team Member" allListing={employeeList} />
              </Col>
              <Col span={24}>
                <Row gutter={24}>
                  {projectData.name ? (
                    <>
                      {allowed([Roles.SETUP], 'delete') && (
                        <Col span={12}>
                          <Button
                            size="large"
                            type="primary"
                            htmlType="button"
                            className="red-btn w-100"
                            onClick={onDeleteTeam}
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
