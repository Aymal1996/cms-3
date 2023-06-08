import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Spin, message, Typography } from 'antd';
import { useForm } from 'react-hook-form';
import { LoadingOutlined } from '@ant-design/icons';
import AddAssignModule from '../../AddMaterials/AssignModule';
import { useParams } from 'react-router-dom';
import { assignModulesToSpecific, getMaterilContent } from '../../ducks/services';
import { SelectField } from '../../../../../atoms/FormElement';
import { useHistory } from 'react-router-dom';
const antIcon = <LoadingOutlined spin />;

const index = () => {
  const { id } = useParams();
  const { Title } = Typography;
  const { control, errors, getValues, setValue, handleSubmit } = useForm({ material_type: { label: '', value: '' } });
  const [matData, setMData] = useState();
  const [removeMat, setRemoveMat] = useState([]);
  const [load, setLoad] = useState(false);
  const history = useHistory();

  const onFinish = async (value) => {
    setLoad(true);
    let deletedModule = removeMat.map((value) => ({
      name: value.name,
      module_code: value.code,
      module_name: value.modName,
      module: value.modUniq,
      assigned_week: value.assigned_week,
      assigned_week_name: value.assigned_week_name,
      material_code: value.material_code,
    }));
    const payload = {
      assigned_modules: value?.assigned_modules,
      deleted_modules: deletedModule,
    };
    assignModulesToSpecific(payload, id, matData.mname, matData.mtype).then((response) => {
      console.log({ response });
      if (response?.data?.message.success) {
        message.success(response?.data?.message.message);
      } else {
        message.error(response?.data?.message.message);
      }
      setLoad(false);
    });
  };

  useEffect(() => {
    if (id) {
      getMaterilContent(id).then((response) => {
        if (response?.data?.message) {
          setValue('assigned_modules', response?.data?.message?.assigned_modules);
          setValue('material_type', {
            label: response?.data?.message?.material_type,
            value: response?.data?.message.material_type,
          });
          setMData({ mname: response?.data?.message?.material_name, mtype: response?.data?.message?.material_type });
        }
      });
    }
  }, [id]);

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[24, 12]}>
          <Col span={24}>
            <Title className="mb-0" level={4}>
              Assigned Modules
            </Title>
          </Col>
          <Col span={24}>
            <SelectField
              fieldname="material_type"
              control={control}
              class="mb- d-none"
              initValue=""
              selectOption={[{}]}
            />
          </Col>
          <Col span={24}>
            <AddAssignModule
              control={control}
              errors={errors}
              getValues={getValues}
              setValue={setValue}
              setRemoveMat={setRemoveMat}
              removeMat={removeMat}
            />
          </Col>
          <Col span={24}>
            <Row gutter={20} justify="end">
              <Col span={6}>
                <Button
                  type="primary"
                  htmlType="button"
                  size="large"
                  className="black-btn w-100"
                  onClick={() => {
                    history.push('/faculty/modules');
                  }}
                >
                  View Modules List
                </Button>
              </Col>
              <Col span={6}>
                <Button type="primary" htmlType="submit" size="large" className="green-btn w-100">
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

export default index;
