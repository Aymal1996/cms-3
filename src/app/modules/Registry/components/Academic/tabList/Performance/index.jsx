import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Select, Space, Divider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getPerformance,
} from '../../../../Students/ducks/actions';
import PerformanceChart from 'Molecules/PerformanceChart';
const { Title, Text } = Typography;

export default (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const programeSemesters = useSelector((state) => state.global.semesters);
  const performance = useSelector((state) => state.students.performanceData);
  const selectProg = useSelector((state) => state.students.selected);
  const [selected, setSelected] = useState();

  const onChange = (e) => {
    setSelected(e);
    dispatch(getPerformance(id, e, selectProg))
  };

  useEffect(() => {
    if (programeSemesters.length) {
      setSelected(programeSemesters[0].structure_name);
      dispatch(getPerformance(id, programeSemesters[0].structure_name, selectProg))
    }
  }, [programeSemesters]);

  return (
    <Row gutter={[20, 30]} align="bottom">
      <Col span={24}>
        <Title level={4} className="mb-0 c-default">
          Academic Performance
        </Title>
      </Col>

      <Col span={24}>
        <Row gutter={[20, 20]}>
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
                  <Select.Option key={index} value={item.structure_name}>
                    {item.period}
                  </Select.Option>
                ))}
              </Select>
            </Space>
          </Col>
          <Col span={12}>
            {performance && performance?.cgpa_gpa && <PerformanceChart title='GPA' figure={performance?.cgpa_gpa} />}
          </Col>
          <Col span={12}>
                {performance && performance?.cgpa_gpa && <PerformanceChart title='CGPA' figure={performance?.cgpa_gpa} />}
          </Col>
          <Col span={24}>
            <Card className="small-card8 b-black" bordered={false}>
              <Space size={10} direction="vertical" className="w-100">
                <Space size={5} direction="vertical" className="w-100">
                  <Title level={5} className="mb-0 c-white">
                    Attendance
                  </Title>
                  {/* <Title
                    level={3}
                    className={`mb-0 ${(semesterAttendance / 100) * 100 >= 80 ? 'c-success' : 'c-error'}`}
                  >
                    {semesterAttendance}
                  </Title> */}
                </Space>
                <Text className="c-gray">
                  According to Malaysia Government's Law, a minimum of 80% attendance rate must be maintained.
                </Text>
              </Space>
            </Card>
          </Col>
          <Col span={24}>
            <Card className="small-card8 b-black" bordered={false}>
              <Title level={5} className="mb-1 c-white">
                Grades
              </Title>
              <Row gutter={[20, 15]}>
                {performance && performance?.grades && performance?.grades.map((item, index) => (
                  <Fragment key={index}>
                    <Col flex="auto">
                      <Space size={20}>
                        <Title
                          level={3}
                          className={`mb-0 ${
                            item.grade == 'A' || item.grade == 'A+' || item.grade == 'A-'
                              ? 'c-success'
                              : item.grade == 'B' || item.grade == 'B+' || item.grade == 'B-'
                              ? 'c-primary'
                              : item.grade == 'C'
                              ? 'c-pending'
                              : 'c-error'
                          }`}
                        >
                          {item.grade}
                        </Title>
                        <Title level={5} className="mb-0 c-default">
                          {item?.module_name}
                        </Title>
                      </Space>
                    </Col>
                    <Col>
                      <Text className="c-gray">
                        Total Grades : <span className="c-default">{item?.total}</span>
                      </Text>
                    </Col>
                    <Col span={24}>
                      <Divider className="m-0" />
                    </Col>
                  </Fragment>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
