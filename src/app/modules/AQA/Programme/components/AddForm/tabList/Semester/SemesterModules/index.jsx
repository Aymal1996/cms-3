import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { Row, Col, Button, Space, message } from 'antd';
import { InputField, SelectFieldAsync, SelectField } from 'Atoms/FormElement';
import { useFieldArray } from 'react-hook-form';
import { CloseCircleFilled } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
import debounce from "lodash/debounce";
import { moduleGet } from '../../../../../../Modules/ducks/services';

const initQ = {
  name: '',
  module_name: '',
  credit: '',
  type: '',
  module_fees: '',
  module_prerequisites: []
};


export default (props) => {
  const { control, getValues, aitem, pIndex, mode, t, delSub, setDelSub } = props;
  // const moduleApi = useSelector((state) => state.programme.module);
  const [selected, setSelected] = useState();

  const { fields, append: append1, remove: remove1 } = useFieldArray({
    control,
    name: `semester_structure[${pIndex}.semester`,
  });

  const onAdd = () => {
    let semesters = getValues().semester_structure;
    let a = null;
    if (semesters[pIndex].semester) {
      a = semesters[pIndex].semester.find((y) => y.name == selected.name);
    }
    let c = false;
    console.log('preq', selected.module_prerequisites)
    selected.module_prerequisites.length > 0 && selected.module_prerequisites.map(x => {
      let b = semesters.find(y => {
        return y?.semester && y?.semester.find(z => z.name === x.module)
      });
      if(!b) {
        c = true;
      }
    })
    
    if (!a) {
      if (!c) {
        append1({
          name: selected.value,
          module_name: selected.module_name,
          credit: selected.credit,
          type: selected.type,
          module_fees: selected.module_fees,
          module_prerequisites: selected.module_prerequisites
        });
      } else {
        let ax = []
        selected.module_prerequisites.map(x => {
          ax.push(x.module_name)
        })
        let ay = ax.toString();
        message.error(`Add Prerequisite of this Module ${ay}`); 
      }
    } else {
      message.error('Already Added');
    }
  };

  const onRemove = (item, index) => {
    if(aitem.name) {
      let sub = [...delSub];
      sub.push({
        sem: aitem.structure_code,
        name: item.name
      })
      setDelSub(Object.assign([], sub))
    }
    remove1(index);
  }

  const getAsyncOptions = (inputText) => {
    return moduleGet(inputText)
    .then((response) => {
        return response.data.message.map((x) => (
        {
            label: x.module_name,
            value: x.name,
            name: x.name,
            module_name: x.module_name,
            type: x.type,
            credit: x.credit,
            module_fees: x.module_fee,
            module_prerequisites: x.module_prerequisites
        }
        ));
    })
    .catch((error) => {
        console.log(JSON.stringify(error));
    });
  };
    

  const loadOptions = useCallback(
      debounce((inputText, callback) => {
        getAsyncOptions(inputText).then((options) => callback(options));
      }, 2000),
      []
  );

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <Row gutter={20}>
          <Col flex="auto">
            <SelectFieldAsync 
                isRequired={false}
                fieldname='prequel'
                label=''
                control={control}
                class='mb-0'
                iProps={{ placeholder: 'Type Module Name'}}
                initValue={[]}
                loadOptions={loadOptions}
                onChange={(e) => setSelected(e)}
            />
            {/* <SelectField
              class="mb-0 w-100"
              fieldname="facultyselect"
              label=""
              control={control}
              iProps={{ placeholder: 'Type Program name' }}
              selectOption={moduleApi?.map((e) => ({
                label: e.module_name,
                value: e.name,
                name: e.name,
                module_name: e.module_name,
                type: e.type,
                credit: e.credit,
                module_fees: e.module_fee,
                prequel: e.module_prerequisites
              }))}
              onChange={(e) => setSelected(e)}
            /> */}
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
          {fields.map((item, index) => (
            <Row gutter={20} wrap={false} key={item.id}>
              <Col flex="auto">
                <Row gutter={20}>
                  <InputField
                    fieldname={`semester_structure[${pIndex}.semester[${index}.name`}
                    class="d-none mb-0"
                    label=""
                    control={control}
                    iProps={{ size: 'large', readOnly: true }}
                    initValue={item.name}
                  />
                  <Col span={8}>
                    <InputField
                      fieldname={`semester_structure[${pIndex}.semester[${index}.module_name`}
                      class="mb-0"
                      label=""
                      control={control}
                      iProps={{ size: 'large', readOnly: true }}
                      initValue={item.module_name}
                    />
                  </Col>
                  <Col span={6}>
                    <InputField
                      fieldname={`semester_structure[${pIndex}.semester[${index}.type`}
                      label=""
                      class="mb-0"
                      initValue={item.type}
                      control={control}
                      iProps={{ readOnly: true }}
                    />
                  </Col>
                  <Col span={4}>
                    <InputField
                      fieldname={`semester_structure[${pIndex}.semester[${index}.credit`}
                      class="mb-0"
                      label=""
                      control={control}
                      iProps={{ readOnly: true, size: 'large' }}
                      initValue={item.credit}
                    />
                  </Col>
                  <Col span={6}>
                    <InputField
                      fieldname={`semester_structure[${pIndex}.semester[${index}.module_fees`}
                      class="mb-0"
                      label=""
                      control={control}
                      iProps={{ readOnly: true, size: 'large' }}
                      initValue={item.module_fees}
                    />
                    <SelectField
                      class="mb-0 d-none"
                      fieldname={`semester_structure[${pIndex}.semester[${index}.module_prerequisites`}
                      label=""
                      control={control}
                      iProps={{ placeholder: 'Type Program name', isMulti: true }}
                      selectOption={[]}
                      initValue={item?.module_prerequisites.map(x => ({label: x.module_name, value: x.module}))}
                    />
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
                  onClick={() => onRemove(item, index)}
                />
              </Col>
            </Row>
          ))}
        </Space>
      </Col>
    </Row>
  );
};
