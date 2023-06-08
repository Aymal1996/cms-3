import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Select, Button } from 'antd';
import { SelectField } from '../../../../../../../../atoms/FormElement';
import { useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';
import { apiMethod } from '../../../../../../../../../configs/constants';
import axios from '../../../../../../../../../services/axiosInterceptor';

const {Option} = Select;

const approveList = [
    { label: 'Individual', value: 'Individual' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Team Leader', value: 'Team Leader' },
    { label: 'Supervisor', value: 'Supervisor' },
    { label: 'Job Position', value: 'Job Position' },
]

export default (props) => {

    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const { control, errors, item, index, watch, remove } = props;
    const position = useSelector(state =>  state.global.roles);
    const company = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company;

    const [data, setData] = useState([]);
    const [value1, setValue1] = useState();
  
    let timeout;
    let currentValue;

  
    function getData(value, callback) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      currentValue = value;

      function callingFunc() {
        let url = `${apiMethod}/hrms.setup.search_employee?company=${company}&search=${value}`;
        axios.get(url).then((d) => {
          if (currentValue === value) {
            const {
              data: { message },
            } = d;
            const data = [];
            message.forEach((r) => {
              data.push({
                value: r.name,
                text: r.employee_name,
              });
            });
            callback(data);
          }
        }).catch(e => console.log('checking eror', e.response));
      }

      timeout = setTimeout(callingFunc, 300);
    }

    const handleSearch = (value) => {
      if (value) {
        getData(value, (data) => setData(data));
      } else {
        setData([]);
      }
    };

    const watch1 = watch(`approvers_fields[${index}].approvers`);

    useEffect(() => {
      if (watch1.label == 'Job Position') {
        // setVisible2(false);
          setVisible(true);
      } else {
        setVisible(false);
        // setVisible2(false);
      }
    }, [watch1]);

    return (
        <Row gutter={[10,10]}>
            <Col span={24}>
                <SelectField
                  fieldname={`approvers_fields[${index}].approvers`}
                  label={'Approvers'}
                  control={control}
                  class={`mb-0`}
                  iProps={{ placeholder: 'Please select' }}
                  initValue={item?.approvers ? {label: item?.approvers, value: item?.approvers} : ''}
                  selectOption={approveList}
                  />
                  <Button
                    type="link"
                    htmlType="button"
                    className="p-0 h-auto c-gray-linkbtn right-fixed smallFont12"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
            </Col>
            {visible &&
            <Col span={24}>
                <SelectField
                  fieldname={`approvers_fields[${index}].approver_detail`}
                  label={''}
                  control={control}
                  class={`mb-0 ${!visible ? 'd-none' : ''}`}
                  iProps={{ placeholder: 'Please select' }}
                  initValue={item?.approver_detail ? { 
                    label: position.find(x => x.name == item?.approver_detail)?.role_name, 
                    value: position.find(x => x.name == item?.approver_detail)?.name
                  } : ''}
                  selectOption={position?.map(x => ({label: x.role_name, value: x.name}))}
                />
            </Col>}
            {/* {visible2 &&
            <Col span={24}>
              <Form.Item label={''} className={'mb-0'}>
                <Controller
                  name={`approvers_fields[${index}].approver_detail`}
                  control={control}
                  defaultValue={item.approver_detail ? item.approver_detail : ''}
                  render={({ value, onChange, onSearch }) => (
                    <Select
                      value={value}
                      onChange={onChange}
                      onSearch={(e) => handleSearch(e)}
                      placeholder={'Enter Staff'}
                      defaultActiveFirstOption={false}
                      showArrow={false}
                      filterOption={false}
                      notFoundContent={null}
                      showSearch
                    >
                      {data.map((d) => (
                        <Option key={d.value}>{d.text}</Option>
                      ))}
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>} */}
        </Row>
    )
}