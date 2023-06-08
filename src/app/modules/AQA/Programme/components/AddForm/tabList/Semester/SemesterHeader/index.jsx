import React, {useEffect, useState} from 'react';
import {Row, Col, Button, Space, Typography } from 'antd';
import {useWatch} from 'react-hook-form';
import { useSelector } from 'react-redux';

const { Text, Title} = Typography;

export default ({index, control, remove, delSem, setDelSem}) => {
    const [iconPos, setIconPos] = useState(false);
    const programApi = useSelector(state => state.programme.program);

    const resource = useWatch({
        control,
        name: `semester_structure`
      });

      let totalMod = 0;
      let totalCrd = 0
      

    if (resource) {
        totalMod = resource[index]?.semester ? resource[index]?.semester.reduce(
            (acc, curr) => acc + parseInt(curr.module_fees || 0),
            0
            ): 0
            totalCrd = resource[index]?.semester ? resource[index]?.semester.reduce(
                (acc, curr) => acc + parseInt(curr.credit || 0),
                0
                ): 0
    }

    const onRemove = () => {
        let del = [...delSem];
        let api = programApi?.semesters_data;
        let find = api.find(x => x.name ==  resource[index]?.name);
        if (find) {
            del.push(find.name)
            setDelSem(del)
        }
        remove(index);
    }

    return (
      <Row>
          <Col span={24}>
          <Row gutter={20} onClick={() => setIconPos(!iconPos)}>
              <Col flex="auto">{resource && resource[index]?.structure_name}</Col>
              <Col flex="100px"><Button type="link" onClick={onRemove}>Remove</Button></Col>
              <Col flex="100px"><Button type="link">{iconPos ? 'Show' : 'Hide'}</Button></Col>
          </Row>
          </Col>
          <Col span={24}>
              <Space size={40}>
                  <Space direction='vertical'>
                      <Text className='c-gray'> Credits</Text>
                      <Title level={3} className='fontSize24'>{totalCrd} Credits</Title>
                  </Space>
                  <Space direction='vertical'>
                      <Text className='c-gray'>Module Fee</Text>
                      <Title level={3} className='fontSize24'>{totalMod}</Title>
                  </Space>
                  <Space direction='vertical'>
                      <Text className='c-gray'>Resource Fee</Text>
                      <Title level={3} className='fontSize24'>{resource && resource[index]?.resource_fees}</Title>
                  </Space>
              </Space>
          </Col>
      </Row>

    )
}