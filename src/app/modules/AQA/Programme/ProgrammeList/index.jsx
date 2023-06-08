import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Typography, Select } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useTranslate } from 'Translate';
import ListCard from '../../../../molecules/ListCard';
import { useHistory, useLocation } from 'react-router-dom';
import { getProgrammes, getProgrammesByFaculty, emptyProgramsList, getFilterProgrammes, getProgramList } from '../ducks/actions';
import { getFaculty } from '../../Faculty/ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../components/Search';
import FacultyCard from '../../../../molecules/FacultyCard';

const { Option } = Select;
const { Title } = Typography;

const filters = [
  {
    label: 'Active',
    value: 'Active',
  },
  {
    label: 'Draft',
    value: 'Draft',
  },
  {
    label: 'Archive',
    value: 'Archive',
  },
  {
    label: 'Inactive',
    value: 'Inactive',
  },
];

export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const programApi = useSelector((state) => state.programme.programmeList);
  const programFACApi = useSelector((state) => state.programme.programmeListFAC);
  const location = useLocation();
  const facultyApi = useSelector((state) => state.faculty.facultyList);
  const [programs, setPrograms] = useState([]);
  const [programList, setProgramList] = useState([]);
  const [selected, setSelected] = useState('All Faculties');
  const [faculties, setFaculties] = useState([]);
  const [filterVal, setFilterVal] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [page, setPage] = useState(1);
  const [limit,setLimit] = useState(10);
  const i18n = useTranslate();
  const { t } = i18n;
  let tempFaculty = [
    {
      label: 'All Faculties',
      value: 'All',
    },
  ];
  let tempProg = [
    {
      label: 'All Programmes',
      value: '',
    },
  ];

  const addNew = () => history.push('programme/addnew');

  const btnList = [
    {
      text: '+ New Programme',
      action: () => addNew(),
    },
  ];

  const ListCol = [
    {
      title: 'Code',
      dataIndex: 'program_code',
      key: 'program_code',
      sorter: true,
      width: 140,
    },
    {
      title: 'Programme',
      dataIndex: 'program_name',
      key: 'program_name',
      ellipsis: true,
      sorter: true
    },
    {
      title: 'Faculty',
      dataIndex: 'faculty_name',
      key: 'faculty_name',
      ellipsis: true,
      sorter: true
    },
    {
      title: 'Program Type',
      dataIndex: 'program_level',
      key: 'program_level',
      ellipsis: true,
      sorter: true
    },
    
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 140,
      render: (text) => {
        let clname = '';
        if (text == 'Active') {
          clname = 'c-success';
        } else if (text == 'Inactive') {
          clname = 'c-error';
        } else if (text == 'Draft') {
          clname = 'c-pending';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
    },
  ];

  useEffect(() => {
    if (location?.state?.filter) {
      dispatch(getFilterProgrammes(location?.state?.filter));
    } else {
      setFilterVal(filters[0].value);
      dispatch(getProgramList(filters[0].value, page, limit, '', ''));
    }
    dispatch(getProgrammesByFaculty('All'));
    dispatch(getFaculty('Active'));
    return () => dispatch(emptyProgramsList());
  }, []);

  useEffect(() => {
    if (facultyApi) {
      facultyApi.map((item) => {
        tempFaculty.push({
          label: item.faculty_name,
          value: item.faculty_code,
        });
      });
      setFaculties(tempFaculty);
    }
  }, [facultyApi]);

  useEffect(() => {
    if (programApi && programApi?.rows) {
      let data = [];
      programApi?.rows.map((item) => {
        data.push({
          name: item?.name,
          program_name: item?.program_name,
          faculty_name: item?.faculty_name,
          status: item?.status,
        });
        tempProg.push({
          label: item?.program_name,
          value: item?.name,
        });
      });
      setPrograms(data);
      setProgramList(tempProg);
    } else {
      setPrograms(Object.assign([]));
      setProgramList(tempProg);
    }
  }, [programApi]);

  useEffect(() => {
    if (filterVal) {
      setPage(1);
      setLimit(10);
      dispatch(getProgramList(filterVal, 1, 10, '', ''));
    }
  }, [filterVal]);

  const onFilter = (e) => {
    setFilterVal(e.target.value);
  };

  const onSearch = (val) => {
    
  };

  const onSelectFaculty = (e) => {
    if (e == 'All Faculties') {
      setSelected('All');
      dispatch(getProgrammesByFaculty('All'));
    } else {
      setSelected(e);
      dispatch(getProgrammesByFaculty(e));
    }
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        history.push(`/aqa/programme/edit/${record?.name}`);
      },
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getProgramList(filterVal, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
      dispatch(getProgramList(filterVal, pagination.current, pagination.pageSize, '', ''));
    }
  }

  return (
    <Row gutter={[30, 24]}>
      <Col span={24}>
        <HeadingChip title={'Programme Status'} />
      </Col>
      <Col span={24}>
        <Select
          value={selected}
          placeholder="Select Faculties"
          size="large"
          style={{ width: '100%' }}
          onChange={onSelectFaculty}
        >
          {faculties.map((item, index) => (
            <Option key={index} value={item.label}>
              {item.label}
            </Option>
          ))}
        </Select>
      </Col>
      <Col span={24}>
        <Row gutter={[20, 20]}>
          {programFACApi && programFACApi?.expires?.length > 0 && programFACApi?.expires[0]?.length > 0 && (
            <Col flex='1 0 280px'>
              <FacultyCard data={programFACApi.expires[0][0]} />
            </Col>
          )}
          {programFACApi && programFACApi?.expires?.length > 0 && programFACApi?.expires[0]?.length > 1 && (
            <Col flex='1 0 280px'>
              <FacultyCard data={programFACApi.expires[0][1]} />
            </Col>
          )}
          {programFACApi &&
            programFACApi?.inactive_programs?.length > 0 &&
            programFACApi?.inactive_programs[0]?.length > 0 && (
              <Col flex='1 0 280px'>
                <FacultyCard status="Inactive" data={programFACApi.inactive_programs[0][0]} />
              </Col>
            )}
        </Row>
      </Col>
      <Col span={24}>
        <HeadingChip title={t('AQA.Programme.title1')} btnList={btnList} />
      </Col>
      <Col span={24} className="clickRow">
        <ListCard
          onRow={onClickRow}
          Search={Search}
          field1={faculties}
          field2={programList}
          onSearch={onSearch}
          filters={filters}
          filterValue={filterVal}
          onFilter={onFilter}
          filterData={filterData}
          ListCol={ListCol}
          ListData={programApi.rows}
          onChange={onTableChange}
          pagination={{
            total: programApi?.count,
            current: page,
            pageSize: limit
          }}
        />
      </Col>
    </Row>
  );
};
