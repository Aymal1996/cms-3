import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import { useFieldArray } from 'react-hook-form';
import { InputField, SelectField } from '../../../../../atoms/FormElement';
import { CloseCircleFilled } from '@ant-design/icons';
import { getMaterialWeeks } from '../../ducks/services';
const initQ = {
  assigned_week: '',
  assigned_week_name: '',
  assigned_material_code: '',
  assigned_material_name: '',
};

const index = ({
  nestIndex,
  control,
  moduleName,
  materialName,
  setValue,
  setRemoveMat,
  removeMat,
  moduleCode,
  moduleUniq,
  removeMain,
}) => {
  const [select, setSelect] = useState([]);
  const { fields, remove, append } = useFieldArray({
    control,
    name: `assigned_modules[${nestIndex}].week`,
  });

  const onAdd = () => {
    append(initQ);
  };

  const onSelectWeek = (value, index) => {
    setValue(`assigned_modules[${nestIndex}].week[${index}.assigned_material_name`, value.assigned_material_name);
    setValue(`assigned_modules[${nestIndex}].week[${index}.assigned_week`, value.assigned_week);
  };

  useEffect(() => {
    if (moduleUniq && materialName.value) {
      getMaterialWeeks(moduleUniq, materialName.value).then((response) => setSelect(response?.data?.message));
    }
  }, [moduleUniq, materialName]);

  const onRemoveWeek = (index, item) => {
    remove(index);
    if (fields.length == 1) {
      removeMain(nestIndex);
    }
    if (item.assigned_week) {
      let removeweek = [...removeMat];
      removeweek.push({ ...item, code: moduleName, modName: moduleCode, modUniq: moduleUniq });
      setRemoveMat(removeweek);
    }
  };

  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <Row gutter={[20, 20]}>
          {fields.map((item, index) => {
            return (
              <Col span={24} key={item.id}>
                <Row gutter={20} wrap={false}>
                  <Col flex="1 1 180px">
                    <SelectField
                      fieldname={`assigned_modules[${nestIndex}].week[${index}`}
                      label=""
                      class="mb-0"
                      initValue={item ? item : ''}
                      iProps={''}
                      control={control}
                      selectOption={select.map((value) => ({
                        label: value.week_name,
                        value: value.week_name,
                        assigned_week: value.week,
                        assigned_week_name: value.week_name,
                        assigned_material_code: value.module_material ? value.module_material : '',
                        assigned_material_name: value.material_name ? value.material_name : '',
                      }))}
                      onChange={(value) => onSelectWeek(value, index)}
                    />
                  </Col>
                  <Col flex="1 1 180px">
                    <InputField
                      fieldname={`assigned_modules[${nestIndex}].week[${index}.assigned_material_name`}
                      class="mb-0"
                      label=""
                      control={control}
                      initValue={item.assigned_material_name}
                      iProps={{ size: 'large', readOnly: true }}
                    />
                  </Col>
                  <Col flex="1 0 20px">
                    <InputField
                      fieldname={`assigned_modules[${nestIndex}].week[${index}.assigned_week`}
                      class="mb-0"
                      label=""
                      control={control}
                      initValue={item.assigned_week}
                      iProps={{ size: 'large', readOnly: true }}
                    />
                  </Col>
                  <Col flex="40px">
                    <Button
                      type="link"
                      size="large"
                      className="cross-iconbtn"
                      htmlType="button"
                      icon={<CloseCircleFilled />}
                      onClick={() => onRemoveWeek(index, item)}
                    />
                  </Col>
                </Row>
              </Col>
            );
          })}
        </Row>
      </Col>
      <Col span={24}>
        <Button htmlType="button" type="dashed" size="large" className="w-100" onClick={onAdd}>
          + Add field
        </Button>
      </Col>
    </Row>
  );
};

export default index;
