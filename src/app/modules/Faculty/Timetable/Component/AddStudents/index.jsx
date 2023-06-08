import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Space, Typography } from 'antd';
import StudentChecboxes from '../StudentChecboxes';
import moment from 'moment';

const { Title, Text } = Typography;

export default (props) => {

  const { item, allStuds, setAllStuds, setValue, onClose, index } = props;
  
  const [checkedList, setCheckedList] = useState([]);
  const [checkedList1, setCheckedList1] = useState([]);
  const [stud, setStud] = useState([]);

  useEffect(() => {
    if(item.students.length > 0) {
      setStud(item.students)
    }
  }, [item]);

  const onCancel = () => {
    onClose();
  }

  const AddStuds = () => {
    let temp = [...stud]
    let temp2 = [...allStuds];
    let temp3 = [];
    checkedList.map(x => {
      let val = allStuds.find(y => y.value == x)
      temp.push(val);
    })
    temp2.map(x => {
      let val = checkedList.find(y => y == x.value)
      if (!val) {
        temp3.push(x);
      }
    })
    setCheckedList([]);
    setStud(temp);
    setAllStuds(temp3)
    setValue(`timetable[${index}].students`, temp)
  };

  const removeStuds = () => {
    let temp = [...allStuds];
    let temp2 = [...stud];
    let temp3 = [];
    checkedList1.map(x => {
      let val = stud.find(y => y.value == x)
      temp.push(val);
    })
    temp2.map(x => {
      let val = checkedList1.find(y => y == x.value)
      if (!val) {
        temp3.push(x);
      }
    })
    setCheckedList1([]);
    setAllStuds(temp)
    setStud(temp3);
    setValue(`timetable[${index}].students`, temp3)
  };

  return (
    <>
      <Row gutter={[20,30]}>
        <Col span={24}>
            <Title level={3} className='mb-0 c-default'>{item?.module_name}</Title>
        </Col>
        <Col span={24}>
            <Space direction='vertical' size={2}>
                <Text>{item?.day}</Text>
                <Text>{item?.start_time ? moment(item.start_time, 'hh:mm:ss').format('h:m:a') : ''} - {item?.end_time ? moment(item.end_time, 'hh:mm:ss').format('h:m:a') : ''}</Text>
            </Space>
        </Col>
        <Col span={10}>
            <StudentChecboxes title='Available Students' checkedList={checkedList} setCheckedList={setCheckedList} options={allStuds} />
        </Col>
        <Col span={4}>
          <Row gutter={[20,20]} align='middle' className='h-100'>
            <Col span={24}>
              <Space direction='vertical' size={20} className='w-100'>
                <Button className='w-100 green-btn' htmlType='button' type='primary' onClick={AddStuds}>Add</Button>
                <Button className='w-100 red-btn' htmlType='button' type='primary' onClick={removeStuds}>Remove</Button>
              </Space>
            </Col>
          </Row>
          
        </Col>
        <Col span={10}>
          <StudentChecboxes title='Assigned Students' checkedList={checkedList1} setCheckedList={setCheckedList1} options={stud} />
        </Col>
        <Col span={24}>
            <Button size='large' className='gray-btn' htmlType='button' type='primary' onClick={onCancel}>Close</Button>
        </Col>
      </Row>
      
      </>
  );
};
