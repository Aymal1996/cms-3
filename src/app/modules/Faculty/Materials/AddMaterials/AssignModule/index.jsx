import React, { Fragment, useState } from 'react';
import { Row, Col, Button, message } from 'antd';
import { useFieldArray } from 'react-hook-form';
import { CloseCircleFilled } from '@ant-design/icons';
import { SelectField, InputField } from '../../../../../atoms/FormElement';
import NestedArray from '../AllModules';
import StaffFilter from './StaffFilter';
const index = (props) => {
  const { control, errors, getValues, setValue, setRemoveMat, removeMat } = props;
  const [selected, setSelected] = useState('');

  const { fields, append, remove } = useFieldArray({
    control,
    name: `assigned_modules`,
  });

  const onAdd = () => {
    let modules = getValues().assigned_modules;
    let a = null;
    if (modules) {
      a = modules.find((y) => y.module_name == selected[0]);
    }
    if (!a) {
      append({
        module_name: selected[0],
        module: selected[1],
        module_code: selected[2],
      });
    } else {
      message.error('Already Added');
    }
  };

  const onChangeValue = (value) => {
    let str = value.split(',');
    setSelected(str);
  };

  const onRemoveMain = (index, item) => {
    let removeweek = [...removeMat];
    let removeAllWeek = item?.week.map((value) => ({
      ...value,
      code: item.module_code,
      modName: item.module_name,
      modUniq: item.module,
    }));
    setRemoveMat(removeAllWeek.concat(removeweek));
    remove(index);
  };
  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <Row gutter={20} align="bottom">
          <Col flex="auto">
            <StaffFilter control={control} title="Material" onChange={onChangeValue} />
          </Col>
          <Col flex="80px">
            <Button type="primary" htmlType="button" size="large" className="green-btn" onClick={onAdd}>
              Add
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[20, 20]}>
          {fields.map((item, index) => (
            <Fragment key={item.id}>
              <Col flex="0 0 1000px">
                <Row gutter={20} wrap={false} align="middle">
                  <Col flex="auto">
                    <InputField
                      fieldname={`assigned_modules[${index}.module_name`}
                      class="mb-0"
                      label=""
                      control={control}
                      iProps={{ size: 'large', readOnly: true }}
                      initValue={item.module_name}
                    />
                    <InputField
                      fieldname={`assigned_modules[${index}.module_code`}
                      class="mb-0 d-none"
                      label=""
                      control={control}
                      iProps={{ size: 'large', readOnly: true }}
                      initValue={item.module_code}
                    />
                    <InputField
                      fieldname={`assigned_modules[${index}.module`}
                      class="mb-0 d-none"
                      label=""
                      control={control}
                      iProps={{ size: 'large', readOnly: true }}
                      initValue={item.module}
                    />
                  </Col>
                  <Col flex="40px">
                    <Button
                      type="link"
                      size="large"
                      className="cross-iconbtn"
                      htmlType="button"
                      icon={<CloseCircleFilled />}
                      onClick={() => onRemoveMain(index, item)}
                    />
                  </Col>
                </Row>
              </Col>
              <Col flex="0 0 930px">
                <NestedArray
                  nestIndex={index}
                  removeMain={remove}
                  {...{ control }}
                  moduleName={item.module_code}
                  moduleCode={item.module_name}
                  moduleUniq={item.module}
                  materialName={getValues().material_type}
                  getAllValues={getValues}
                  setValue={setValue}
                  setRemoveMat={setRemoveMat}
                  removeMat={removeMat}
                />
              </Col>
            </Fragment>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default index;
