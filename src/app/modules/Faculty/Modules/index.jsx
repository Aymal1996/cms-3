import React, { useState, useEffect } from 'react';
import { Row, Col, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Search from './components/Search';
// import SearchModule from '../components/SearchModule';
import { getAllFaculty, getAllPrograms } from '../../../modules/Application/ducks/actions';
import ListComponent from '../../../molecules/ListComponent';
import { WarningIcon } from '../../../atoms/CustomIcons';
import GraphComponent from '../../../molecules/GraphComponent';
import SearchModule from './components/SearchModule';
import { getFacultyModules, getModuleGraph } from './ducks/actions';

const colName = [
  {
    title: 'Module Name',
    dataIndex: 'module_name',
    key: 'module_name',
    sorter: true,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    sorter: true,
  },
  {
    title: 'Faculty',
    dataIndex: 'fcaulty',
    key: 'fcaulty',
    sorter: true,
  },
  {
    title: 'Programme',
    dataIndex: 'programmes',
    key: 'programmes',
    align: 'center',
    sorter: true,
  },
  {
    title: 'Lecturers',
    dataIndex: 'lecturers',
    key: 'lecturers',
    align: 'center',
    sorter: true,
    render: (text) => <span className={text == 'Unassigned' ? 'c-error' : 'c-success'}>{text}</span>,
  },
  {
    title: 'Studnets',
    dataIndex: 'student',
    key: 'student',
    align: 'center',
    sorter: true,
  },
  {
    title: 'Materials',
    dataIndex: 'materials',
    key: 'materials',
    sorter: true,
    render: (text) => <span className={text == 'Unassigned' ? 'c-error' : 'c-success'}>{text}</span>,
  },
];

const { Title, Text } = Typography;

export default (props) => {
  const dispatch = useDispatch();
  const facultyList = useSelector((state) => state.global.faculties);
  const programList = useSelector((state) => state.global.programmes);
  // const modDrop = useSelector(state => state.global.programmes);
  const modList = useSelector((state) => state.facultyModules.facultyModuleList);
  const modGraph = useSelector((state) => state.facultyModules.moduleGraph);
  const [faculty, setFaculty] = useState([]);
  const [program, setProgram] = useState([]);
  const [program2, setProgram2] = useState([]);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    dispatch(getAllFaculty());
    // dispatch(getAllPrograms())
    // dispatch(getAllModulesProgram())
    // dispatch(getModuleGraph());
    dispatch(getFacultyModules(1, 10, '', '', ''));
  }, []);

  const onChangeF = (e) => {
    dispatch(getAllPrograms(e.value));
  };

  const listProps = {
    field1: faculty,
    field2: program,
    onChange1: onChangeF,
    listStat: [
      {
        width: '1 0 300px',
        icon: <WarningIcon className="fontSize40 c-white" />,
        title: 'Assign Lecturers',
        text: `${modList.unassigned_lecturers} Modules Unassigned`,
      },
      {
        width: '1 0 300px',
        icon: <WarningIcon className="fontSize40 c-white" />,
        title: 'Assign Materials',
        text: `${modList.unassigned_materials} Modules Unassigned`,
      },
    ],
  };

  const onSearch2 = (val) => {
    if (val && val.program) {
      let searchVal = {
        // module_name: val?.module_name,
        faculty: val?.faculty ? val.faculty.value : '',
        program: val?.program ? val.program.value : '',
      };
      dispatch(getModuleGraph(searchVal));
    }
  };

    

    const graphProps = {
        // cardClass: ,
        data: modGraph?.data,
        barColor: '#C3423F',
        title: modGraph?.records && modGraph?.records.length ? modGraph.records[0].program_name : 'Please select a program based on faculty',
        count: modGraph?.records && modGraph?.records.length ? modGraph.records[0].avg : 0,
        countClass: 'c-error',
        text: 'Average failed students per semester',
        search: <SearchModule onSearch={onSearch2} field1={faculty} field2={program2} onChange1={onChangeF} />
    }

  useEffect(() => {
    let temp = [];
    if (facultyList && facultyList.length > 0) {
      facultyList.map((x, i) => {
        if (i == 0) {
          temp.push({ label: 'All Faculties', value: '' });
          temp.push({ label: x.faculty_name, value: x.faculty_code });
        } else {
          temp.push({ label: x.faculty_name, value: x.faculty_code });
        }
      });
      setFaculty(temp);
    } else {
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
      let temp2 = temp.filter((x) => x.label != 'All Programmes');
      setProgram2(temp2);
    }
  }, [programList]);

  const onSearch = (val) => {
    if (val) {
      let searchVal = {
        module_name: val?.module_name,
        faculty: val?.faculty ? val.faculty.value : '',
        program: val?.program ? val.program.value : '',
      };
      setSearch(searchVal);
      dispatch(getFacultyModules(1, 10, '', '', searchVal));
    }
  };

  const updateList = (page, limit, sort, sortby) => {
    dispatch(getFacultyModules(page, limit, sort, sortby, search));
  };

  return (
    <Row gutter={[20, 50]}>
      <Col span={24}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <Title level={3} className="mb-0">
              Module Performance
            </Title>
          </Col>
          <Col span={24}>
            <GraphComponent {...graphProps} />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <Title level={3} className="mb-0">
              Module List
            </Title>
          </Col>
          <Col span={24}>
            <ListComponent
              link="/faculty/modules/"
              linkKey="module_code"
              sentKey="tt_id"
              data={modList}
              defaultLimit={10}
              ListCol={colName}
              updateList={updateList}
              Search={Search}
              onSearch={onSearch}
              listProps={listProps}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
