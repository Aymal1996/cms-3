import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Space, Button } from 'antd';
import { InputField, SelectField, SwitchField } from '../../../../../../../atoms/FormElement';
import { useFieldArray } from 'react-hook-form';
import { apiMethod } from '../../../../../../../../configs/constants';
import axios from '../../../../../../../../services/axiosInterceptor';

const initQ = {
  name: '',
  module_name: '',
  type: '',
  credit: '',
  status: false,
};

export default (props) => {
  const { control, period, code, errors } = props;
  const [moduleList, setModuleList] = useState([]);
  const { fields, append } = useFieldArray({
    control,
    name: `subjects`,
  });

  const onAdd = () => {
    append(initQ);
  };

  const getMod = async () => {
    let url = `${apiMethod}/registry.api.get_module_names?program_code=${code}&semester=${period}`;
    let temp = [];
    const res = await axios.get(url);
    console.log('i am here', res);
    res.data.message.map((x) => {
      temp.push({
        label: x.module_name,
        value: x.module_code,
      });
    });
    setModuleList(temp);
  };

  useEffect(() => {
    getMod();
  }, []);

  const onChange = (e, index) => {
    console.log(e, index);
  };

  return (
    <>
      <Space className="w-100" direction="vertical" size={20}>
        {fields.map((item, index) => (
          <Fragment key={item}>
            <Row gutter={20} wrap={false} align="bottom">
              <Col flex="auto">
                <Row gutter={20}>
                  <InputField
                    label=""
                    fieldname={`subjects[${index}.name`}
                    class="d-none mb-0"
                    control={control}
                    iProps={{ size: 'large', readOnly: true }}
                    initValue={item.name}
                  />
                  <Col span={13}>
                    <SelectField
                      fieldname={`subjects[${index}.module_name`}
                      class="mb-0 w-100"
                      label={index == 0 ? 'Module Name' : ''}
                      control={control}
                      iProps={{ placeholder: 'Select one' }}
                      initValue={item.module_name ? { label: item.module_name, value: item.module_code } : ''}
                      selectOption={moduleList}
                      onChange={(e) => onChange(e, index)}
                      rules={{ required: 'Enter Module Name' }}
                      validate={
                        Object.entries(errors).length > 0 &&
                        errors?.subjects?.length > 0 &&
                        errors?.subjects[index]?.module_name &&
                        'error'
                      }
                    />
                  </Col>
                  <Col span={7}>
                    <InputField
                      fieldname={`subjects[${index}.type`}
                      label={index == 0 ? 'Type' : ''}
                      class="mb-0"
                      initValue={item.type}
                      control={control}
                      iProps={{ readOnly: true }}
                    />
                  </Col>
                  <Col span={4}>
                    <InputField
                      fieldname={`subjects[${index}.credit`}
                      class="mb-0"
                      label={index == 0 ? 'Credit' : ''}
                      control={control}
                      iProps={{ readOnly: true, size: 'large' }}
                      initValue={item.credit}
                    />
                  </Col>
                </Row>
              </Col>
              <Col flex="40px">
                <SwitchField
                  fieldname={`subjects[${index}.status`}
                  control={control}
                  iProps={{ readOnly: true, size: 'large' }}
                  rules={{
                    setValueAs: (value) => (value == true ? 'Active' : value != false ? value : 'Inactive'),
                  }}
                  initValue={item.status == 'Active' ? true : false}
                />
              </Col>
            </Row>
          </Fragment>
        ))}
        {/* {moduleList.length != fields.length && (
          <Button htmlType="button" type="dashed" size="large" className="w-100" onClick={onAdd}>
            + Add Module
          </Button>
        )} */}
      </Space>
    </>
  );
};
