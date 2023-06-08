import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import HeadingChip from '../../../molecules/HeadingChip';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from '../../../molecules/ListCard';
import Search from './components/Search';
import { getStudentsListPg, studentsStatus } from '../../Registry/Students/ducks/actions';
import PendingRequestCard from '../../../molecules/PendingRequestCard';
import { getStudentsStatistics } from './ducks/actions';
import { getAllFaculty, getAllPrograms } from '../../Application/ducks/actions';

const filters = [
  {
    label: 'All',
    value: 'Active',
  },
  {
    label: 'Graduated',
    value: 'Graduated',
  },
];

export default (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [filterData, setFilterData] = useState(null);
  const [filterVal, setFilterVal] = useState('Active');
  const students = useSelector((state) => state.students.studentList);
  const statistics = useSelector((state) => state.facultyStudent.pendingIssue);
  const facultyList = useSelector(state => state.global.faculties);
  const programList = useSelector(state => state.global.programmes);
  const [page, setPage] = useState(1);
  const [limit,setLimit] = useState(10);
  const [faculty, setFaculty] = useState([]);
  const [program, setProgram] = useState([]);
  const [searching, setSearching] = useState(null);

  const ListCol = [
    {
      title: 'Student Name',
      dataIndex: 'student_name',
      key: 'student_name',
      sorter: true,
      ellipsis: true,
    },
    {
      title: 'Faculty',
      dataIndex: 'faculty_code',
      key: 'faculty_code',
      ellipsis: true,
      sorter: true,
      width: 100
    },
    {
      title: 'Programme',
      dataIndex: 'program_name',
      key: 'program_name',
      sorter: true,
    },
    {
      title: 'Issues',
      dataIndex: 'issues',
      key: 'issues',
      ellipsis: true,
      render: (text) => <span className={`${text > 0 ? 'c-error' : ''}`}>{text}</span>,
      sorter: true,
      width: 100
    },
    {
      title: 'Requests',
      dataIndex: 'requests',
      key: 'requests',
      ellipsis: true,
      render: (text) => (
        <span className={`${text > 0 ? 'c-error' : ''}`}>{text}</span>
      ),
      width: 100,
      sorter: true,
    },
    {
      title: 'Complaints',
      dataIndex: 'complaints',
      key: 'complaints',
      ellipsis: true,
      render: (text) => (
        <span className={`${text > 0 ? 'c-error' : ''}`}>{text}</span>
      ),
      width: 100,
      sorter: true,
    },
    
    {
      title: 'Status',
      dataIndex: 'program_status',
      key: 'program_status',
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
    dispatch(getStudentsListPg(filterVal, page, limit, '', ''));
    dispatch(getStudentsStatistics())
    dispatch(getAllFaculty())
    dispatch(getAllPrograms())
  }, []);

  const onFilter = (e) => {
    setFilterVal(e.target.value);
    dispatch(getStudentsListPg(e.target.value, page, limit, '', ''));
  };

  useEffect(() => {
    if (facultyList && facultyList.length > 0) {
      let temp = []
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
      let temp = []
      programList.map((x, i) => {
        if (i == 0) {
          temp.push({label: 'All Programmes', value: ''})
          temp.push({label: x.program_name, value: x.program_name})
        } else {
          temp.push({label: x.program_name, value: x.program_name})
        }
      });
      setProgram(temp);
    }
  }, [programList]);

  const onSearch = (search) => {
    if (search) {
      let searchVal = {};
        searchVal = {
          student_name:search.student_name,
          faculty_code:search.faculty.value,
          program:search.program.value
        }
        setSearching(searchVal);
        dispatch(getStudentsListPg(filterVal, page, limit, '', '', searchVal));
      } else {
        setSearching(null);
        dispatch(getStudentsListPg(filterVal, page, limit, '', '', null));
      }
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        history.push(`/faculty/students/details/${record.name}`);
      },
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getStudentsListPg(filterVal, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
      dispatch(getStudentsListPg(filterVal, pagination.current, pagination.pageSize, '', ''));
    }
  }


  return (
    <Row gutter={[20, 50]}>
      <Col span={24}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <HeadingChip title="Pending Issues & Requests" />
          </Col>
          <Col flex='1 0 300px'>
            <PendingRequestCard
              data={statistics ? statistics?.issues : []}
              title="Pending Issues"
              count={statistics ? statistics?.issues_count : 0}
              link="/faculty/students/issues/"
              label="Student Issues"
              innerlink="/faculty/students/details/"
              status={'b-error'}
              idKey={'student_id'}
              nameKey={'student_name'}
            />
          </Col>
          <Col flex='1 0 300px'>
            <PendingRequestCard
              data={statistics ? statistics?.requests : []}
              title="Pending Requests"
              count={statistics ? statistics?.requests_count : 0}
              link="/faculty/students/requests/"
              label="Student Requests"
              innerlink="/faculty/students/details/"
              status={'b-pending'}
              idKey={'student_id'}
              nameKey={'student_name'}
            />
          </Col>
          <Col flex='1 0 300px'>
            <PendingRequestCard
              data={statistics ? statistics?.complaints : []}
              title="Pending Complaints"
              count={statistics ? statistics?.complaints_count : 0}
              link="/faculty/students/complaints/"
              label="Complaints"
              innerlink="/faculty/students/details/"
              status={'b-error'}
              idKey={'student_id'}
              nameKey={'student_name'}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <HeadingChip title="Student List" />
          </Col>
          <Col span={24} className='clickRow'>
            <ListCard
              Search={Search}
              onSearch={onSearch}
              filters={filters}
              filterValue={filterVal}
              onFilter={onFilter}
              onChange={onTableChange}
              filterData={filterData}
              ListCol={ListCol}
              ListData={students?.rows}
              onRow={onClickRow}
              field1={faculty}
              field2={program}
              pagination={{
                total: students?.count,
                current: page,
                pageSize: limit
              }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
