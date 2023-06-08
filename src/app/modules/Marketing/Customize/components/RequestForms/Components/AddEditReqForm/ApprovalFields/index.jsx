import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Select, Button } from 'antd';
import { SelectField } from 'Atoms/FormElement';
import { useSelector } from 'react-redux';
import { CloseCircleFilled } from "@ant-design/icons";

const {Option} = Select;

const approveList = [
    { label: 'Individual', value: 'Individual' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Team Leader', value: 'Team Leader' },
    { label: 'Supervisor', value: 'Supervisor' },
    // { label: 'Job Position', value: 'Job Position' },
    { label: 'Department', value: 'Department' },
]

const deptList = [
  { label: 'AQA', value: 'AQA' },
  { label: 'Faculty', value: 'Faculty' },
  { label: 'Finance', value: 'Finance' },
  { label: 'Registry', value: 'Registry' },
  { label: 'Marketing', value: 'Marketing' },
]

export default (props) => {

    const [visible, setVisible] = useState(false);
    // const [visible2, setVisible2] = useState(false);
    const { control, errors, item, index, watch, remove, parent, field1, field2, fLabel } = props;
    // const position = useSelector(state =>  state.global.roles);

    // const [data, setData] = useState([]);
    // const [value1, setValue1] = useState();
  
    // let timeout;
    // let currentValue;

  
    // function getData(value, callback) {
    //   if (timeout) {
    //     clearTimeout(timeout);
    //     timeout = null;
    //   }
    //   currentValue = value;

    //   function callingFunc() {
    //     let url = `${apiMethod}/hrms.setup.search_employee?company=${company}&search=${value}`;
    //     axios.get(url).then((d) => {
    //       if (currentValue === value) {
    //         const {
    //           data: { message },
    //         } = d;
    //         const data = [];
    //         message.forEach((r) => {
    //           data.push({
    //             value: r.name,
    //             text: r.employee_name,
    //           });
    //         });
    //         callback(data);
    //       }
    //     }).catch(e => console.log('checking eror', e.response));
    //   }

    //   timeout = setTimeout(callingFunc, 300);
    // }

    // const handleSearch = (value) => {
    //   if (value) {
    //     getData(value, (data) => setData(data));
    //   } else {
    //     setData([]);
    //   }
    // };

    const watch1 = watch(`${parent}[${index}].${field1}`);

    useEffect(() => {
      if (watch1 && watch1.label == 'Department') {
        // setVisible2(false);
          setVisible(true);
      } else {
        setVisible(false);
        // setVisible2(false);
      }
    }, [watch1]);

    return (
        <Row gutter={[10,10]} align='middle'>
          <Col flex='auto'>
            <Row gutter={[10,10]}>
            <Col span={24}>
                <SelectField
                  fieldname={`${parent}[${index}].${field1}`}
                  label={''}
                  control={control}
                  class={`mb-0`}
                  iProps={{ placeholder: 'Please select' }}
                  initValue={item[`${field1}`] ? {label: item[`${field1}`], value: item[`${field1}`]} : ''}
                  selectOption={approveList}
                  />
            </Col>
            {visible &&
            <Col span={24}>
                <SelectField
                  fieldname={`${parent}[${index}].${field2}`}
                  label={''}
                  control={control}
                  class={`mb-0 ${!visible ? 'd-none' : ''}`}
                  iProps={{ placeholder: 'Please select' }}
                  initValue={item[`${field1}`] ? {label: item[`${field2}`], value: item[`${field2}`]} : ''}
                  selectOption={deptList}
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
            </Col>
            <Col flex='40px'>
            <Button type='link' size="large" className='cross-iconbtn' htmlType='button' icon={<CloseCircleFilled className='fontSize20'/>} onClick={() => remove(index)} />
            </Col>
        </Row>
    )
}