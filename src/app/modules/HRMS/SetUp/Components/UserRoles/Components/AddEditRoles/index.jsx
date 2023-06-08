import React, { useState, useEffect, Fragment } from 'react';
import { Button, Row, Col, Typography, Form, message, Spin } from 'antd';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import AddUser from '../../../Teams/Components/AddUser';
import { totalRoles } from './roleList';
import { getSingleRole, addUserRoles, updateUserRoles, deleteUserRoles } from '../../../../ducks/services';
import { LoadingOutlined } from '@ant-design/icons';
import { InputField } from 'Atoms/FormElement';
import { allowed } from '../../../../../../../../routing/config/utils';
import Roles from '../../../../../../../../routing/config/Roles';
import ModuleCheckbox from '../ModuleCheckbox';

const antIcon = <LoadingOutlined spin />;
const { Title, Text } = Typography;

export default (props) => {
  
  const { title, onClose, roleData } = props;
  const [teamData, setTeamData] = useState('');
  const [load, setLoad] = useState(false);
  const [userData, setUserData] = useState([]);
  const { control, errors, setValue, reset, handleSubmit, getValues } = useForm();
  const employeeList = useSelector((state) => state.setup.employeeList);
  const [seachPermission, setSearchPermission] = useState('');
  const modules = useSelector((state) => state.setup.accessModule);
  const [rolesSelected, setSelectedRoles] = useState([])

  useEffect(() => {
    if (roleData.name.length > 0) {
      setLoad(true);
      getSingleRole(roleData.name).then((response) => {
        setTeamData(response?.data?.message[0]);
        setUserData(
          response?.data?.message[0]?.user_staff.map((value) => ({
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
  }, [roleData]);

  useEffect(() => {
    if(modules) {
      let temp = [];
      let perm = Object.keys(modules)
      totalRoles.map(x => {
        let a = perm.find(y => y == x.module)
        if (a) {
          temp.push(x)
        }
      })
      setSelectedRoles(temp)
    }
  }, [modules]);

  useEffect(() => {
    if (Object.entries(teamData).length) {
      setValue('role_name', teamData.role_name);
      if (teamData.grand_permissions.length) {
        teamData.grand_permissions.map((value) => {
          setValue(`${value.permission_name}-read`, value.read == 1 ? [value.read] : []);
          setValue(`${value.permission_name}-write`, value.write == 1 ? [value.write] : []);
          setValue(`${value.permission_name}-delete`, value.delete == 1 ? [value.delete] : []);
          if ((value.read == 1 && value.write == 1 && value.delete == 1)) {
            setValue(`${value.permission_name}`, true);
          } else {
            setValue(`${value.permission_name}`, false);
          }
        });
        onMainCheck();
      } else {
        reset({ role_name: teamData.role_name });
      }
    }
  }, [teamData]);

  const onFinish = (values) => {
    setLoad(true);
    let permissions = [];
    rolesSelected.map((item) => {
      item.screens.map(value => {
        if (value.label == 'Is Manager' || value.label == 'Is Dean') {
          if(values[value.role] == true) {
            permissions.push({
              permission_name: value.role,
              read: 1,
              write: 1,
              delete: 1,
            });
          } else {
            permissions.push({
              permission_name: value.role,
              read: 0,
              write: 0,
              delete: 0,
            });
          }
          
        } else {
          permissions.push({
            permission_name: value.role,
            read: values[`${value.role}-read`] && values[`${value.role}-read`].length ? 1 : 0,
            write: values[`${value.role}-write`] && values[`${value.role}-write`].length ? 1 : 0,
            delete: values[`${value.role}-delete`] && values[`${value.role}-delete`].length ? 1 : 0,
          });
        }
      })
      
    });

    const payload = {
      role_name: values.role_name,
      grand_permissions: permissions,
      user_staff: userData.map((value) => ({ employee: value.name })),
    };
    
    console.log('payload', payload);

    !roleData.name
      ? addUserRoles(payload)
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
            message.error('Something went wrong');
          })
      : updateUserRoles(roleData.name, payload)
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
            message.error('Something went wrong');
          });
  };

  const onDeleteTeam = () => {
    setLoad(true);
    deleteUserRoles(roleData.name)
      .then((response) => {
        if (response.data.message.success == true) {
          message.success(response.data.message.message);
        } else {
          message.error(response.data.message.message);
        }
        setLoad(false);
        onClose();
      })
      .catch((error) => message.error('Cant delte a user role'));
  };

  const onCheckAll = (e, screen) => {
    if (e == true) {
      screen.map(x => {
        setValue(`${x.role}`, true);
        setValue(`${x.role}-read`, [1]);
        setValue(`${x.role}-write`, [1]);
        setValue(`${x.role}-delete`, [1]);  
      })
    } else {
      screen.map(x => {
        setValue(`${x.role}`, false);
        setValue(`${x.role}-read`, []);
        setValue(`${x.role}-write`, []);
        setValue(`${x.role}-delete`, []);  
      })
    }
  };

  const onMainCheck = () => {
    rolesSelected.map(x => {
      let a = true;
      x.screens.map(y => {
        if(getValues(`${y.role}`) == false) {
          a = false;
        }
      })
      setValue(`${x.module}`, a);
    })
  }

  // const onSearchRoleHandler = (e) => {
  //   console.log({ e });
  //   if (e.target.value.length) {
  //     setSearachRole(totalRoles.filter((value) => value.includes(e.target.value)));
  //   } else {
  //     setSearachRole(totalRoles);
  //   }
  // };

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
          <Col span={16}>
            <Row gutter={[24, 18]}>
              <Col span={24}>
                <InputField
                  fieldname="role_name"
                  class="mb-0 w-100"
                  label="User Role Name"
                  control={control}
                  iProps={{ placeholder: 'Type role name', size: 'large' }}
                  rules={{ required: 'Type role name' }}
                  initValue=""
                  validate={errors.role_name && 'error'}
                  validMessage={errors.role_name && errors.role_name.message}
                />
              </Col>
              <Col span={24}>
                <Text className="c-gray">User Role Access</Text>
              </Col>
              {/* <Col span={24}>
                <Input placeholder="Type permission name" onChange={(e) => setSearchPermission(e.target.value)} />
              </Col> */}
              {rolesSelected.map((item, index) => (
                <Fragment key={index}>
                  <ModuleCheckbox 
                  control={control} 
                  item={item} 
                  setValue={setValue} 
                  getValues={getValues} 
                  onCheckAll={onCheckAll} 
                  data={teamData?.grand_permissions}
                  />
                </Fragment>
              ))}
            </Row>
          </Col>
          <Col span={8}>
            <Row gutter={[24, 20]}>
              <Col span={24}>
                <AddUser
                  userData={userData}
                  setUserData={setUserData}
                  title="Team Member"
                  control={control}
                  allListing={employeeList}
                />
              </Col>
              <Col span={24}>
                <Row gutter={24}>
                  {roleData.name ? (
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
