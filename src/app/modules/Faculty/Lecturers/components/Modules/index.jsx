import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Spin, Form, Button, message } from 'antd';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import WorkLoadComp from '../../../../../molecules/WorkLoadComp';
import AddModules from './AddModules';
import { getStaffWorkload } from '../../ducks/services';
import { useForm } from 'react-hook-form';
import { assignModules, updateAssignModule } from '../../ducks/services';
import { useSelector, useDispatch } from 'react-redux';
import { getIntakeAssigned } from '../../ducks/actions';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined spin />;

export default () => {
  const { Title, Text } = Typography;
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { control, setValue, getValues, handleSubmit } = useForm();
  const [load, setLoad] = useState(false);
  const [deleteModule, setDeleteModule] = useState([]);
  const [workLoad, setWorkLoad] = useState({ total_hour_count: 0, total_module_count: 0 });

  useEffect(() => {
    setLoad(true);
    dispatch(getIntakeAssigned(id));
    getStaffWorkload(id).then((response) => setWorkLoad(response?.data?.message));
    assignModules(id).then((response) => {
      if (response?.data?.message.length) {
        setValue('module_list', response?.data?.message);
      }
    });
    setLoad(false);
  }, [id]);

  const onFinish = (values) => {
    setLoad(true);
    let modList = [];
    values.module_list && values.module_list.map(x => {
      modList.push({
        module: x.module,
        module_name: x.module_name,
        program: x.program,
        intake: x.intake,
        tt_id: x.tt_id,
      })
    })
    const payload = {
      employee: id,
      module_list: modList,
      deleted_module: deleteModule,
    };
    console.log('chec', payload)
    updateAssignModule(payload)
      .then((response) => {
        if (response?.data?.message.success) {
          message.success(response?.data?.message.message);
        } else {
          message.error(response?.data?.message.message);
        }
        setLoad(false);
        getStaffWorkload(id).then((response) => setWorkLoad(response?.data?.message));
      })
      .catch((error) => {
        message.error('Something went wrong');
        setLoad(false);
      });
  };
  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Row gutter={[24, 30]}>
        <Col span={24}>
          <Row gutter={24}>
            <Col span={24}>
              <Title level={4}>Staff Workload</Title>
            </Col>
            <Col span={24}>
              <Card bordered={false} className="small-card8 b-black">
                <Row gutter={[24, 20]}>
                  <Col span={24}>
                    <WorkLoadComp
                      steps={5}
                      assign={workLoad.total_credit_count}
                      total={20}
                      type="Credits"
                      text="Total Credits Assigned"
                    />
                  </Col>
                  <Col span={24}>
                    <WorkLoadComp
                      steps={5}
                      assign={workLoad.total_module_count}
                      total={10}
                      type="Modules"
                      text="Total Modules Assigned"
                    />
                  </Col>
                  <Col span={24}>
                    <WorkLoadComp
                      steps={5}
                      assign={workLoad?.student_count}
                      total={50}
                      type="Studnets"
                      text="Total Students Assigned"
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Form layout="vertical" scrollToFirstError={true} onFinish={handleSubmit(onFinish)}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Title level={4}>Assigned Module</Title>
              </Col>
              <Col span={24}>
                <AddModules
                  control={control}
                  getValues={getValues}
                  setValue={setValue}
                  id={id}
                  // moduleList={moduleApi}
                  addDeleteMod={deleteModule}
                  deltedMod={setDeleteModule}
                />
              </Col>
              <Col span={24}>
                <Row gutter={24} align="middle" justify="end">
                  <Col span={8}>
                    <Button
                      size="large"
                      type="primary"
                      htmlType="button"
                      onClick={() => {
                        history.push('/faculty/modules');
                      }}
                      className="black-btn w-100"
                    >
                      View Modules List
                    </Button>
                  </Col>
                  <Col span={8}>
                    <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                      Save Changes
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Spin>
  );
};
