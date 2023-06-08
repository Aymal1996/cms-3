import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import StudentDescription from '../../../../../molecules/StudentsDescription';
import { getStudentList } from '../../ducks/actions';
import GraphComponent from '../../../../../molecules/GraphComponent';
import Search from './Search';
import { getPerformanceGraph } from '../../ducks/services';
export default () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const { id } = useParams();
  const [grantsPerformanceDdata, setPerformanceGraphData] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState([]);
  const studentsListing = useSelector((state) => state.lecturers.students_listing);
  const intakes = useSelector((state) => state.lecturers.studentIntake);
  console.log({ intakes });
  const graphProps = {
    title: '',
    barColor: '#C3423F',
    countClass: 'c-error',
    count: `${grantsPerformanceDdata?.student_count}`,
    text: 'Total failed students in previous semester',
  };
  const onPageChangeHandler = (page) => {
    setPage(page);
    dispatch(getStudentList(id, page, 6, filter));
  };
  const onSearch = (search) => {
    if (search) {
      let searchVal = {};
      searchVal = {
        porgram_name: search.program,
        module_name: search.module.value,
        grade: search.grade.value,
        intake: filter?.intake,
      };
      setFilter(searchVal);
      setPage(1);
      dispatch(getStudentList(id, 1, 6, searchVal));
    }
  };

  const onIntakeChangeHandler = (intake) => {
    if (intake) {
      let intakeVal = {
        intake: intake,
      };
      setFilter(intakeVal);
      setPage(1);
      dispatch(getStudentList(id, 1, 6, intakeVal));
    }
  };

  useEffect(() => {
    dispatch(getStudentList(id, 1, 6, ''));
    getPerformanceGraph(id).then((response) => {
      setPerformanceGraphData(response?.data?.message);
    });
  }, []);

  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <Row gutter={24}>
          <Col span={24}>
            <Title level={4}>Student Performance</Title>
          </Col>
          <Col span={24}>
            <GraphComponent data={grantsPerformanceDdata?.list} cardClass="b-black" {...graphProps} />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[24, 20]}>
          <Col span={24}>
            <Row gutter={24} align="middle" justify="space-between">
              <Col>
                <Title children="mb-0" level={4}>
                  Student List
                </Title>
              </Col>
              <Col>
                <Select
                  defaultValue={intakes[0]?.name}
                  value={filter.intake}
                  placeholder="Select Faculties"
                  size="large"
                  style={{ width: '200px' }}
                  onChange={onIntakeChangeHandler}
                >
                  {intakes.map((item, index) => (
                    <Select.Option key={index} value={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <StudentDescription
              studentData={studentsListing}
              page={page}
              Search={Search}
              onSearch={onSearch}
              onChangePage={onPageChangeHandler}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
