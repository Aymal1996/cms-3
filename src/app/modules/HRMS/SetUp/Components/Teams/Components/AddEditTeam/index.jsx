import React, { useState, useEffect, Fragment } from 'react';
import { Button, Row, Col, Typography, Form, message, Spin } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { addNewTeamFields } from './FormFields';
import AddUser from '../AddUser';
import { addSingleTeam, updateSingleTeam, deleteSingleTeam, getSingleTeam } from '../../../../ducks/services';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { allowed } from '../../../../../../../../routing/config/utils';
import Roles from '../../../../../../../../routing/config/Roles';

const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { title, onClose, team } = props;
  const { Title, Text } = Typography;
  const [teamData, setTeamData] = useState('');
  const [userData, setUserData] = useState([]);
  const { control, errors, setValue, reset, handleSubmit } = useForm();
  const [load, setLoad] = useState(false);
  const employeeList = useSelector((state) => state.setup.employeeList);
  console.log({ employeeList });
  useEffect(() => {
    if (team.name.length > 0) {
      setLoad(true);
      getSingleTeam(team.name).then((response) => {
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
  }, [team]);

  useEffect(() => {
    console.log({ teamData });
    if (Object.entries(teamData).length > 0) {
      setValue('team_name', teamData.team_name);
      setValue('team_leader', { label: teamData.team_leader_name, value: teamData.team_leader_name });
      setValue('department', { label: teamData.department_name, value: teamData.department });
    }
  }, [teamData]);

  const onFinish = (values) => {
    setLoad(true);
    const payload = {
      team_name: values.team_name,
      team_leader: values.team_leader.value,
      user_staff: userData.map((value) => ({ employee: value.name })),
      department: values.department.value,
    };
    team.name.length == 0
      ? addSingleTeam(payload)
          .then((response) => {
            if (response.data.message.success == true) {
              message.success(response.data.message.message);
            } else {
              message.error(response.data.message.message);
            }
            setLoad(false);
            onClose();
          })
          .catch((error) => {
            setLoad(false);
          })
      : updateSingleTeam(team.name, payload).then((response) => {
          if (response.data.message.success == true) {
            message.success(response.data.message.message);
          } else {
            message.error(response.data.message.message);
          }
          setLoad(false);
          onClose();
        });
  };

  const onDeleteTeam = () => {
    setLoad(true);
    deleteSingleTeam(team.name)
      .then((response) => {
        if (response.data.message.success == true) {
          message.success(response.data.message.message);
        } else {
          message.error(response.data.message.message);
        }
        setLoad(false);
        onClose();
      })
      .catch((error) => message.error('Cant delte a team'));
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

          <Col span={12}>
            <Row gutter={[24, 30]}>
              {addNewTeamFields().map((item, idx) => (
                <Fragment key={idx}>
                  <FormGroup item={item} control={control} errors={errors} />
                </Fragment>
              ))}
            </Row>
          </Col>
          <Col span={12}>
            <Row gutter={[24, 30]}>
              <Col span={24}>
                <AddUser userData={userData} setUserData={setUserData} title="Team Member" allListing={employeeList} />
              </Col>
              <Col span={24}>
                <Row gutter={24}>
                  {team.name ? (
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
