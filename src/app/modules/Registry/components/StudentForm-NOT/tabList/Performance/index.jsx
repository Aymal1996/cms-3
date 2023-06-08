import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Select, Space, Divider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getSemesterAttendance,
  getSemesterCGPA,
  getSemesterGPA,
  getSemesterGrades,
} from '../../../../Students/ducks/actions';
const { Title, Text } = Typography;

export default (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const programeSemesters = useSelector((state) => state.global.semesters);
  const semesterGrades = useSelector((state) => state.students.semesterGrades);
  const semesterCGPA = useSelector((state) => state.students.semesterCGPA);
  const semesterGPA = useSelector((state) => state.students.semesterGPA);
  const semesterAttendance = useSelector((state) => state.students.semesterAttendance);
  const [selected, setSelected] = useState();

  const onChange = (e) => {
    setSelected(e);
    dispatch(getSemesterGrades(id, e));
    dispatch(getSemesterCGPA(id, e));
    dispatch(getSemesterGPA(id, e));
    dispatch(getSemesterAttendance(id, e));
  };

  useEffect(() => {
    if (programeSemesters.length) {
      setSelected(programeSemesters[0].period);
      dispatch(getSemesterGrades(id, programeSemesters[0].name));
      dispatch(getSemesterCGPA(id, programeSemesters[0].name));
      dispatch(getSemesterGPA(id, programeSemesters[0].name));
      dispatch(getSemesterAttendance(id, programeSemesters[0].name));
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
                  <Select.Option key={index} value={item.name}>
                    {item.period}
                  </Select.Option>
                ))}
              </Select>
            </Space>
          </Col>
          <Col span={12}>
            <Card className="small-card8 b-black" bordered={false}>
              <Space size={5} direction="vertical" className="w-100">
                <Title level={5} className="mb-0 c-white">
                  GPA
                </Title>
                <Title level={3} className="mb-0 c-success">
                  {semesterGPA}
                </Title>
              </Space>
            </Card>
          </Col>
          <Col span={12}>
            <Card className="small-card8 b-black" bordered={false}>
              <Space size={5} direction="vertical" className="w-100">
                <Title level={5} className="mb-0 c-white">
                  CGPA
                </Title>
                <Title level={3} className="mb-0 c-success">
                  {semesterCGPA}
                </Title>
              </Space>
            </Card>
          </Col>
          <Col span={24}>
            <Card className="small-card8 b-black" bordered={false}>
              <Space size={10} direction="vertical" className="w-100">
                <Space size={5} direction="vertical" className="w-100">
                  <Title level={5} className="mb-0 c-white">
                    Attendance
                  </Title>
                  <Title
                    level={3}
                    className={`mb-0 ${(semesterAttendance / 100) * 100 >= 80 ? 'c-success' : 'c-error'}`}
                  >
                    {semesterAttendance}
                  </Title>
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
                {semesterGrades.map((item, index) => (
                  <Fragment key={index}>
                    <Col flex="auto">
                      <Space size={20}>
                        <Title
                          level={3}
                          className={`mb-0 ${
                            item.grade == 'A'
                              ? 'c-success'
                              : item.grade == 'B'
                              ? 'c-primary'
                              : item.grade == 'C'
                              ? 'c-pending'
                              : 'c-error'
                          }`}
                        >
                          {item.grade}
                        </Title>
                        <Title level={5} className="mb-0 c-default">
                          {item.module_name}
                        </Title>
                      </Space>
                    </Col>
                    <Col>
                      <Text className="c-gray">
                        Total Grades : <span className="c-default">{item.overall_grade}</span>
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
