import React, { useState, useEffect } from 'react';
import { Row, Col, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import GraphComponent from '../../../molecules/GraphComponent';
import ListComponent from '../../../molecules/ListComponent';
import { WarningIcon } from '../../../atoms/CustomIcons';

import SearchProgram from './components/SearchProgram';
import Search from './components/Search';

import { facultyProgramList, getProgramPerformance, getUnassignedCount } from './ducks/actions';
import { getAllFaculty, getAllPrograms } from '../../Application/ducks/actions';

const colName = [
  {
    title: 'Programme',
    dataIndex: 'program_name',
    key: 'program_name',
    sorter: (a, b) => a?.program_name?.length - b.program_name?.length,
  },
  {
    title: 'Faculty',
    dataIndex: 'faculty_code',
    key: 'faculty_code',
    sorter: (a, b) => a?.faculty_code?.length - b.faculty_code?.length,
  },

  {
    title: 'Programme Coordinator',
    dataIndex: 'coordinator_name',
    key: 'coordinator_name',
    sorter: (a, b) => a?.coordinator_name?.length - b.coordinator_name?.length,
  },
  {
    title: 'Lecturers',
    dataIndex: 'lactures',
    key: 'lactures',
    align: 'center',
    sorter: (a, b) => a?.lactures?.length - b.lactures?.length,
  },
  {
    title: 'Students',
    dataIndex: 'students',
    key: 'students',
    align: 'center',
    sorter: (a, b) => a?.students?.length - b.students?.length,
  },
];

const { Title } = Typography;

export default () => {
  const dispatch = useDispatch();
  const facultyList = useSelector((state) => state.global.faculties);
  const unassignedCount = useSelector((state) => state.facultyProgramme.unassignedCount);
  const programList = useSelector(state => state.global.programmes);
  const { programPerformance, programListF } = useSelector((state) => state.facultyProgramme);
  const [faculty, setFaculty] = useState([]);
  const [program, setProgram] = useState([]);
  const [graphHeading, setGraphHeading] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getAllFaculty());
    dispatch(getAllPrograms())
    dispatch(getProgramPerformance({faculty: '', program: ''}));
    dispatch(facultyProgramList(1, 10, '', '', null));
    dispatch(getUnassignedCount());
  }, []);

  const onChangeF = (e) => {
    dispatch(getAllPrograms(e.value))
  }

  const listProps = {
    field1: faculty,
    field2: program,
    onChange1: onChangeF,
    listStat: [
      {
        width: '1 0 300px',
        icon: <WarningIcon className="fontSize40 c-white" />,
        title: 'Assign Module',
        text: unassignedCount && `${unassignedCount?.count} Programmes Unassigned`,
      },
    ],
  };

  const onSearchGraph = (val) => {
    if (val) {
      let searchVal = {
        faculty: val?.faculty ? val.faculty.value : '',
        program: val?.program ? val.program.value : '',
      };
      dispatch(getProgramPerformance(searchVal));
    }
    setGraphHeading(val?.faculty?.label);
  };

  const graphProps = {
    barColor: '#02A574',
    title: graphHeading ? graphHeading : 'All Programmes',
    count: programPerformance?.student_count,
    text: 'Number of Students',
    search: <SearchProgram onSearchGraph={onSearchGraph} field1={faculty} field2={program} onChange1={onChangeF} />,
  };

  useEffect(() => {
    if (facultyList && facultyList.length > 0) {
      let temp = [];
      facultyList.map((x, i) => {
        if (i == 0) {
          temp.push({ label: 'All Faculties', value: '' });
          temp.push({ label: x.faculty_name, value: x.faculty_code });
        } else {
          temp.push({ label: x.faculty_name, value: x.faculty_code });
        }
      });
      setFaculty(temp);
    }
  }, [facultyList]);

  useEffect(() => {
    if (programList && programList.length > 0) {
      let temp = [];
      programList.map((x, i) => {
        if (i == 0) {
          temp.push({ label: 'All Programmes', value: '' });
          temp.push({ label: x.program_name, value: x.program_name });
        } else {
          temp.push({ label: x.program_name, value: x.program_name });
        }
      });
      setProgram(temp);
    }
  }, [programList]);

  const onSearch = (val) => {
    if (val) {
      let searchVal = {
        program_code: val.program_code ? val.program_code : '',
        program: val?.program_name ? val.program_name.value : '',
        faculty: val?.faculty_name ? val.faculty_name.value : '',
      };
      setSearch(searchVal)
      dispatch(facultyProgramList(1, 10, '', '', searchVal));
    }
  };

    const updateList = (page, limit, sort, sortby) => {
      dispatch(facultyProgramList(page, limit, sort, sortby, search));
    }

  return (
    <Row gutter={[20, 50]}>
      <Col span={24}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <Title level={3} className="mb-0">
              Programme Performance
            </Title>
          </Col>
          <Col span={24}>
            <GraphComponent data={programPerformance?.list} {...graphProps} />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <Title level={3} className="mb-0">
              Programme List
            </Title>
          </Col>
          <Col span={24}>
            <ListComponent
              link="/faculty/programmes/"
              linkKey="name"
              ListCol={colName}
              defaultLimit={10}
              Search={Search}
              onSearch={onSearch}
              listProps={listProps}
              data={programListF}
              updateList={updateList}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
