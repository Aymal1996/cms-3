import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Select, Table, Button, Space } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPerformance, getSemesterCGPA, getSemesterGPA, getSemesterTranscript } from '../../Students/ducks/actions';
import { LeftOutlined } from '@ant-design/icons';
import StudentTemp from '../../Students/StudentTemp';
import { getProgramSemesters } from '../../../Application/ducks/actions';

const { Title, Text } = Typography;
const { Option } = Select;

export default (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [selected, setSelected] = useState();
  const programeSemesters = useSelector((state) => state.global.semesters);
  const semesterTranscript = useSelector((state) => state.students.semesterTranscript);
  const performance = useSelector((state) => state.students.performanceData);
  const selectProg = useSelector((state) => state.students.selected);
  const data = useSelector((state) => state.students.studentAppData);

  const onChange = (e) => {
    setSelected(e);
    dispatch(getPerformance(id, e));
    // dispatch(getSemesterTranscript(id, e));
  };

  useEffect(() => {
    if (programeSemesters.length && data?.students_programs && data?.students_programs.length > 0) {
      setSelected(programeSemesters[0].structure_name);
      dispatch(getPerformance(id, programeSemesters[0].structure_name, selectProg));
      // dispatch(getSemesterTranscript(id, programeSemesters[0].name));
    }
  }, [programeSemesters]);

  const ListCol = [
    {
      title: 'Code',
      dataIndex: 'module_code',
      key: 'module_code',
    },
    {
      title: 'Module Name',
      dataIndex: 'module_name',
      key: 'module_name',
      ellipsis: true,
    },
    {
      title: 'Type',
      dataIndex: 'module_type',
      key: 'module_type',
      ellipsis: true,
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
      render: (text) => {
        let clname = '';
        if (text == 'A' || text == 'A+' || text == 'A-') {
          clname = 'c-success';
        } else if (text == 'B' || text == 'B+' || text == 'B-') {
          clname = 'c-primary';
        } else if (text == 'C') {
          clname = 'c-pending';
        } else {
          clname = 'c-error';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
    },
    {
      title: 'Credits',
      dataIndex: 'credit',
      key: 'credit',
      render: (text) => parseInt(text).toFixed(1),
    },
    // {
    //   title: 'Attempt',
    //   dataIndex: 'attempt',
    //   key: 'attempt',
    //   render: (text) => parseInt(text).toFixed(1),
    // },
    {
      title: 'Earned',
      dataIndex: 'earned',
      key: 'earned',
      render: (text) => parseInt(text).toFixed(1),
    },
    {
      title: 'Points',
      dataIndex: 'points',
      key: 'points',
      render: (text) => parseFloat(text).toFixed(1),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      // render: (text, record) => <span className="c-default">{record.total * record.attempt}</span>,
    },
  ];

  return (
    <StudentTemp id={id} request={false} setLoading={props.setLoading}>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <Row gutter={[20, 30]}>
            <Col flex="auto">
              <Title level={4} className="mb-0">
                Transcript
              </Title>
            </Col>
            <Col>
              <Button
                icon={<LeftOutlined />}
                size="middle"
                className="c-graybtn small-btn"
                onClick={() => history.goBack()}
              >
                Categories
              </Button>
            </Col>
          </Row>
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
                <Select.Option key={index} value={item.structure_name}>
                  {item.period}
                </Select.Option>
              ))}
            </Select>
          </Space>
        </Col>

        <Col span={24}>
          <Row gutter={[20, 20]}>
            <Col flex="auto">
              <Space size={30}>
                <Space size={0} direction="vertical">
                  <Text className="c-gray">GPA</Text>
                  <Title level={3} className="mb-0">
                    {performance && performance?.cgpa_gpa && performance?.cgpa_gpa[`${selected}`]?.gpa}
                  </Title>
                </Space>
                <Space size={0} direction="vertical">
                  <Text className="c-gray">CGPA</Text>
                  <Title level={3} className="mb-0">
                    {performance && performance?.cgpa_gpa && performance?.cgpa_gpa[`${selected}`]?.cgpa}
                  </Title>
                </Space>
              </Space>
            </Col>
            <Col>
              <Button type="primary" htmlType="button" className="green-btn">
                Download PDF
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Table
            className="custom-table table-header-highlight"
            bordered={false}
            columns={ListCol}
            dataSource={performance && performance?.grades ? performance?.grades : []}
            pagination={false}
            summary={(pageData) => {
              let totalRow = 0;
              let totalcredit = 0;
              let totalattempt = 0;
              let totalearned = 0;
              let totalpoints = 0;

              pageData.forEach(({ total, credit, attempt, earned, points }) => {
                totalcredit += credit ? parseInt(credit) : 0;
                totalattempt += attempt ? parseInt(attempt) : 0;
                totalearned += earned ? parseInt(earned) : 0;
                totalpoints += points ? parseInt(points) : 0;
                totalRow += total ? parseInt(total) : 0;
              });

              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={2} className="thick-border-bottom highlight-border">
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={2} className="thick-border-bottom"></Table.Summary.Cell>
                    <Table.Summary.Cell className="thick-border-bottom">
                      <Text className="c-white">{parseInt(totalcredit).toFixed(2)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="thick-border-bottom">
                      <Text className="c-white">{parseFloat(totalearned).toFixed(2)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="thick-border-bottom"></Table.Summary.Cell>
                    <Table.Summary.Cell className="thick-border-bottom">
                      <Text className="c-white">{parseInt(totalRow).toFixed(2)}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        </Col>
      </Row>
    </StudentTemp>
  );
};
