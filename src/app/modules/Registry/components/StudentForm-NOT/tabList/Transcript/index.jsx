import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Select, Table, Button, Space } from 'antd';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSemesterCGPA, getSemesterGPA, getSemesterTranscript } from '../../../../Students/ducks/actions';

const { Title, Text } = Typography;
const { Option } = Select;

export default (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState();
  const programeSemesters = useSelector((state) => state.global.semesters);
  const semesterTranscript = useSelector((state) => state.students.semesterTranscript);
  const semesterCGPA = useSelector((state) => state.students.semesterCGPA);
  const semesterGPA = useSelector((state) => state.students.semesterGPA);
  console.log(props.data, 'asdfasdfasdfd');
  const onChange = (e) => {
    console.log({ e });
    setSelected(e);
    dispatch(getSemesterCGPA(id, e, props?.data?.program_details[0].program_code));
    dispatch(getSemesterGPA(id, e));
    dispatch(getSemesterTranscript(id, e));
  };

  useEffect(() => {
    if (programeSemesters.length && props?.data?.program_details && props?.data?.program_details.length > 0) {
      setSelected(programeSemesters[0].period);
      dispatch(getSemesterTranscript(id, programeSemesters[0].name));
      dispatch(getSemesterCGPA(id, programeSemesters[0].name, props?.data?.program_details[0].program_code));
      dispatch(getSemesterGPA(id, programeSemesters[0].name));
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
        if (text.includes('A')) {
          clname = 'c-success';
        } else if (text.includes('B')) {
          clname = 'c-primary';
        } else if (text.includes('C')) {
          clname = 'c-pending';
        } else {
          clname = 'c-error';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
    },
    {
      title: 'Credits',
      dataIndex: 'module_credit',
      key: 'module_credit',
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
    <Row gutter={[20, 30]}>
      <Col flex={'auto'}>
        <Title level={4} className="mb-0 c-default">
          Transcript
        </Title>
      </Col>
      <Col>
        <Button type="primary" htmlType="button" className="green-btn">
          Download PDF
        </Button>
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
        <Space size={30}>
          <Space size={0} direction="vertical">
            <Text className="c-gray">GPA</Text>
            <Title level={3} className="mb-0">
              {semesterGPA}
            </Title>
          </Space>
          <Space size={0} direction="vertical">
            <Text className="c-gray">CGPA</Text>
            <Title level={3} className="mb-0">
              {semesterCGPA}
            </Title>
          </Space>
        </Space>
      </Col>
      <Col span={24}>
        <Table
          className="custom-table table-header-highlight"
          bordered={false}
          columns={ListCol}
          dataSource={semesterTranscript}
          pagination={false}
          summary={(pageData) => {
            let totalRow = 0;
            let totalcredit = 0;
            let totalattempt = 0;
            let totalearned = 0;
            let totalpoints = 0;

            pageData.forEach(({ total, module_credit, attempt, earned, points }) => {
              totalcredit += module_credit;
              totalattempt += attempt;
              totalearned += earned;
              totalpoints += points;
              totalRow += total;
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
  );
};
