import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import HeadingChip from '../../../molecules/HeadingChip';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from '../../../molecules/ListCard';
import Search from './components/Search';
import { getOfferletterList, getAllPendingEnrolled, getStudentsListPgRegistry, selectProgram, emptyListRegistry } from './ducks/actions';
import PendingRequestCard from '../../../molecules/PendingRequestCard';
import { getAllFaculty, getAllPrograms } from '../../Application/ducks/actions';

const filters = [
  {
    label: 'All',
    value: 'Active',
  },
  {
    label: 'Graduating',
    value: 'Graduating',
  },
  {
    label: 'Inactive',
    value: 'Inactive',
  },
  {
    label: 'Archive',
    value: 'Archive',
  },
];

export default (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [filterData, setFilterData] = useState(null);
  const [filterVal, setFilterVal] = useState('Active');
  const students = useSelector((state) => state.students.studentList);
  const offerList = useSelector((state) => state.students.offerlist);
  const facultyList = useSelector((state) => state.global.faculties);
  const programList = useSelector((state) => state.global.programmes);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [faculty, setFaculty] = useState([]);
  const [program, setProgram] = useState([]);
  const [searching, setSearching] = useState(null);
  const enrolledList = useSelector((state) => state.students.enrolledList);

  const ListCol = [
    {
      title: 'Code',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      width: 140,
    },
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
      width: 100,
      sorter: true,
    },
    {
      title: 'Programme',
      dataIndex: 'program_name',
      key: 'program_name',
      ellipsis: true,
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
          clname = 'c-pending';
        } else if (text == 'completed') {
          clname = 'c-success';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
    },

    {
      title: 'Issues',
      dataIndex: 'issues',
      key: 'issues',
      width: 100,
      render: (text) => <span className={`${text > 0 ? 'c-error' : ''}`}>{text}</span>,
      sorter: true,
    },
    {
      title: 'Requests',
      dataIndex: 'requests',
      key: 'requests',
      width: 100,
      render: (text) => <span className={`${text > 0 ? 'c-error' : ''}`}>{text}</span>,
      sorter: true,
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'program_status',
    //   key: 'program_status',
    //   align: 'center',
    //   width: 140,
    //   render: (text) => {
    //     let clname = '';
    //     if (text == 'Active') {
    //       clname = 'c-success';
    //     } else if (text == 'Inactive') {
    //       clname = 'c-error';
    //     } else if (text == 'Draft') {
    //       clname = 'c-pending';
    //     }
    //     return <span className={`SentanceCase ${clname}`}>{text}</span>;
    //   },
    // },
  ];

  useEffect(() => {
    dispatch(getStudentsListPgRegistry(filterVal, page, limit, '', ''));
    dispatch(getOfferletterList(1, 6));
    dispatch(getAllPendingEnrolled(1, 6));
    // dispatch(studentsStatus());
    dispatch(getAllFaculty());
    dispatch(getAllPrograms());
    return () => dispatch(emptyListRegistry());
  }, []);

  useEffect(() => {
    filterVal && dispatch(getStudentsListPgRegistry(filterVal, page, limit, '', ''));
  }, [filterVal]);

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

  const onFilter = (e) => {
    setFilterVal(e.target.value);
  };

  const onSearch = (search) => {
    if (search) {
      let searchVal = {};
      searchVal = {
        student_id: search.searchcode,
        student_name: search.searchname,
        faculty_code: search.faculty.value,
        program: search.programme.value,
      };
      setSearching(searchVal);
      dispatch(getStudentsListPgRegistry(filterVal, page, limit, '', '', searchVal));
    } else {
      setSearching(null);
      dispatch(getStudentsListPgRegistry(filterVal, page, limit, '', '', null));
    }
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        dispatch(selectProgram(record.program));
        history.push(`students/${record.name}`);
      },
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(
        getStudentsListPgRegistry(filterVal, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey),
      );
    } else {
      dispatch(getStudentsListPgRegistry(filterVal, pagination.current, pagination.pageSize, '', ''));
    }
  };

  return (
    <Row gutter={[20, 50]}>
      <Col span={24}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <HeadingChip title="Pending Issues" />
          </Col>
          <Col xl={12} lg={24}>
            <PendingRequestCard
              data={offerList?.rows || []}
              title="Pending Offer Letter Release"
              count={offerList?.count || 0}
              link="pending-offerletter/"
              label="Students"
              innerlink="applications/pending-registration-visa/"
              status={'b-error'}
              nameKey={'applicant_name'}
              idKey={'name'}
              app={true}
              s3={true}
            />
          </Col>
          <Col xl={12} lg={24}>
            <PendingRequestCard
              data={enrolledList?.rows || []}
              title="Pending Student Registration"
              count={enrolledList?.count || 0}
              link="pending-registration/"
              label="Students"
              innerlink="applications/pending-enrolment/"
              status={'b-error'}
              nameKey={'applicant_name'}
              idKey={'name'}
              app={true}
              s3={true}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <HeadingChip title="Student List" />
          </Col>
          <Col span={24} className="clickRow">
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
                pageSize: limit,
              }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
