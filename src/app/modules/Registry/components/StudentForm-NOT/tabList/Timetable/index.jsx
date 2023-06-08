import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Card, Typography, Select, Space } from 'antd';
import { getTimetable } from '../../../../Students/ducks/actions';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

const { Title, Text } = Typography;

export default (props) => {
  const { title } = props;
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState();
  const timetableApi = useSelector((state) => state.students.timetableData);
  const programeSemesters = useSelector((state) => state.global.semesters);

  const onChange = (e) => {
    setSelected(e);
    dispatch(getTimetable(id, e));
  };

  useEffect(() => {
    if (programeSemesters.length) {
      setSelected(programeSemesters[0].period);
      dispatch(getTimetable(id, programeSemesters[0].name));
    }
  }, [programeSemesters]);

  return (
    <Row gutter={[20, 30]} align="bottom">
      <Col span={24}>
        <Title level={4} className="mb-0 c-default">
          {title}
        </Title>
      </Col>

      <Col span={24}>
        <Space direction="vertical" size={10} className="w-100">
          <Text className="smallFont12 c-gray">Select Semester</Text>
          <Select
            value={selected}
            placeholder="Select Semester"
            size="large"
            style={{ width: '100%' }}
            onChange={onChange}
          >
            {programeSemesters.map((item, index) => (
              <Select.Option key={index} value={item.name}>
                {item.period}
              </Select.Option>
            ))}
          </Select>
        </Space>
      </Col>
      <Col span={24}>
        <Row gutter={[20, 20]}>
          {timetableApi.length
            ? Object.entries(timetableApi[0]).map(([key, value]) => (
                <>
                  {value.length > 0 && (
                    <Col span={24}>
                      <Card className="small-card12 b-black" bordered={false}>
                        <Row gutter={[20, 15]}>
                          <Col span={24}>
                            <Text>{key}</Text>
                          </Col>
                          {value.map((item, i) => (
                            <Col span={24}>
                              <Card bordered={false} className="mini-card mini-card10 b-primary">
                                <Row gutter={20} justify="space-between">
                                  <Col>
                                    <Title level={5} className="mb-0">
                                      {item.module_name}
                                    </Title>
                                  </Col>
                                  <Col>
                                    <Title level={5} className="mb-0">{`${
                                      item.start_time && moment(item.start_time, 'hh:mm:ss').format('LT')
                                    } - ${item.end_time && moment(item.end_time, 'hh:mm:ss').format('LT')}`}</Title>
                                  </Col>
                                  <Col span={24}>
                                    <Text className="c-white op-6">{item.classroom_type}</Text>
                                  </Col>
                                </Row>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      </Card>
                    </Col>
                  )}
                </>
              ))
            : null}
        </Row>
      </Col>
    </Row>
  );
};
