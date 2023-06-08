import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Button, Space, message, Typography, Avatar } from 'antd';
import { InputField, SelectField } from 'Atoms/FormElement';
import { useFieldArray } from 'react-hook-form';
import { CloseCircleFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getModuleList, getProgramAssigned } from '../../../ducks/actions';
import { baseUrl } from '../../../../../../../configs/constants';

export default (props) => {

  const dispatch = useDispatch();
  const { id, control, getValues, addDeleteMod, deltedMod, setValue } = props;
  const { Text } = Typography;
  const [selected, setSelected] = useState();
  const [progList, setProgList] = useState([]);
  const [modList, setModList] = useState([]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: `module_list`,
  });
  const intakeList = useSelector(state => state.lecturers.intake)
  const programList = useSelector(state => state.lecturers.programM)
  const moduleList = useSelector(state => state.lecturers.moduel_list);

  useEffect(() => {
    if(moduleList.length > 0) {
      let temp = [];
      moduleList.map(e => {
        temp.push({
          label: e.module_name,
          value: e.module,
          module: e.module,
          module_name: e.module_name,
          students: e.students,
          intake: e.intake,
          intake_name: e.intake_name,
          program_name: e.program_name,
          program: e.program,
        })
      })
      setModList(temp)
    }
  }, [moduleList]);

  useEffect(() => {
    if (programList.length > 0) {
      let temp = [];
      programList.map(e => {
        temp.push({
          label: e?.program_name,
          value: e?.program,
          intake: e.intake
        })
      })
      setProgList(temp)
    }
    
  }, [programList]);

  const onAdd = () => {
    let modules = getValues().module_list;
    let a = null;
    if (modules) {
      a = modules.find((y) => y.module == selected.module);
    }
    if (!a) {
      append({
        module: selected.module,
        module_name: selected.module_name,
        program: selected.program,
        program_name: selected.program_name,
        intake: selected.intake,
        intake_name: selected.intake_name,
        students: selected.students,
      });
    } else {
      message.error('Already Added');
    }
  };

  const onRemoveModule = (index, value) => {

    let temp = [];
    temp = [...addDeleteMod];
    if (value?.name) {
        let delMod = []
        delMod= [...addDeleteMod];
        delMod.push(value);
        deltedMod(delMod);
      }
    remove(index);
  };

  const onIntakeSelect = (e) => {
    dispatch(getProgramAssigned(id, e.value));
    setValue('programselect', '')
    setValue('facultyselect', '')
  }

  const onProgram = (e) => {
    dispatch(getModuleList(id, e.value, e.intake))
    setValue('facultyselect', '')
  } 

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <Row gutter={[20, 20]} align="">
          <Col span={12}>
            <SelectField
              class="mb-0 w-100"
              fieldname="intake"
              label=""
              control={control}
              iProps={{ placeholder: 'Select Intake' }}
              selectOption={
                intakeList && intakeList.length &&
                intakeList.map((e) => ({
                  label: e?.term_name,
                  value: e?.name,
                }))
              }
              onChange={(e) => onIntakeSelect(e)}
            />
          </Col>
          <Col span={12}>
            <SelectField
              class="mb-0 w-100"
              fieldname="programselect"
              label=""
              control={control}
              iProps={{ placeholder: 'Select Program' }}
              selectOption={progList}
              onChange={(e) => onProgram(e)}
            />
          </Col>
          <Col flex="auto">
            
            <SelectField
              class="mb-0 w-100"
              fieldname="facultyselect"
              label=""
              control={control}
              iProps={{ placeholder: 'Select Module' }}
              selectOption={modList}
              onChange={(e) => setSelected(e)}
            />
          </Col>
          <Col flex="80px">
            <Button type="primary" htmlType="button" size="large" className="green-btn" onClick={onAdd}>
              Add
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Space className="w-100" direction="vertical" size={20}>
          {fields.length ? (
            <Row gutter={24}>
              <Col span={6}>
                <Text className="font-300 mb-0 c-gray">Module Name</Text>
              </Col>
              <Col span={6}>
                <Text className="font-300 mb-0 c-gray">Intake</Text>
              </Col>
              <Col span={6}>
                <Text className="font-300 mb-0 c-gray">Programme</Text>
              </Col>
              <Col span={6}>
                <Text className="font-300 mb-0 c-gray">Students</Text>
              </Col>
            </Row>
          ) : null}
          {fields.map((item, index) => (
            <Row gutter={24} wrap={false} align="middle" key={item.id}>
              <Col flex="auto">
                <Row gutter={24}>
                  <Col span={10} className="d-none">
                    <InputField
                      fieldname={`module_list[${index}.module`}
                      class="d-none mb-0"
                      label=""
                      control={control}
                      iProps={{ size: 'large', readOnly: true }}
                      initValue={item.module}
                    />
                    <InputField
                      fieldname={`module_list[${index}.name`}
                      class="d-none mb-0"
                      label=""
                      control={control}
                      iProps={{ size: 'large', readOnly: true }}
                      initValue={item.name}
                    />
                    <InputField
                      fieldname={`module_list[${index}.tt_id`}
                      class="d-none mb-0"
                      label=""
                      control={control}
                      iProps={{ size: 'large', readOnly: true }}
                      initValue={item.tt_id}
                    />
                  </Col>
                  <Col span={10} className="d-none">
                    <SelectField
                      fieldname={`module_list[${index}.students`}
                      class="d-none mb-0"
                      label=""
                      control={control}
                      iProps={{ size: 'large', readOnly: true }}
                      initValue={item.students.map(x => ({label: x.student_name, value: x.student_id, image: x.image, student_name: x.student_name, student_id: x.student_id}))}
                      selectOption={[]}
                    />
                  </Col>

                  <Col span={6}>
                    <InputField
                      fieldname={`module_list[${index}.module_name`}
                      class="mb-0"
                      label=""
                      control={control}
                      iProps={{ size: 'large', readOnly: true }}
                      initValue={item.module_name}
                    />
                  </Col>
                  <Col span={6}>
                    <InputField
                      fieldname={`module_list[${index}.intake`}
                      class="mb-0 d-none"
                      label=""
                      control={control}
                      iProps={{ size: 'large', readOnly: true }}
                      initValue={item.intake}
                    />
                    <InputField
                      fieldname={`module_list[${index}.intake_name`}
                      class="mb-0"
                      label=""
                      control={control}
                      iProps={{ size: 'large', readOnly: true }}
                      initValue={item.intake_name}
                    />
                  </Col>
                  <Col span={6}>
                    <InputField
                      fieldname={`module_list[${index}.program`}
                      class="mb-0 d-none"
                      label=""
                      control={control}
                      iProps={{ readOnly: true, size: 'large' }}
                      initValue={item.program}
                    />
                    <InputField
                      fieldname={`module_list[${index}.program_name`}
                      class="mb-0"
                      label=""
                      control={control}
                      iProps={{ readOnly: true, size: 'large' }}
                      initValue={item.program_name}
                    />
                  </Col>
                  <Col span={6}>
                    {item.students.length > 0 &&
                    <Avatar.Group
                      maxCount={3}
                      size="large"
                      maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                    >
                      {item.students.map((x, i) => (
                        <Fragment key={i}>
                          {x?.image ? <Avatar src={`${baseUrl}${x?.image}`} /> : <Avatar style={{ backgroundColor: '#0077B6' }}>{x['student_name'].charAt(0)}</Avatar>}
                        </Fragment>
                      ))}
                    </Avatar.Group>}
                  </Col>
                </Row>
              </Col>
              <Col flex="40px">
                <Button
                  type="link"
                  size="large"
                  className="cross-iconbtn"
                  htmlType="button"
                  icon={<CloseCircleFilled />}
                  onClick={() => onRemoveModule(index, item)}
                />
              </Col>
            </Row>
          ))}
        </Space>
      </Col>
    </Row>
  );
};
 