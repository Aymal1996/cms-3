import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import HeadingChip from '../../../molecules/HeadingChip';
import { useHistory } from 'react-router';
import { useTranslate } from 'Translate';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from '../../../molecules/ListCard';
import Search from './components/Search';
import { getStudentsListPg, studentsStatus } from '../../Registry/Students/ducks/actions';
import { getPendingIssues, getUnassignedStaff, getStaffList, getPendingRequest } from './ducks/actions';
import PendingRequestCard from '../../../molecules/PendingRequestCard';
import { getAllFaculty, getAllPrograms } from '../../Application/ducks/actions';

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

const filters = [
  {
    label: 'All',
    value: 'Active',
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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [faculty, setFaculty] = useState([]);
  const [program, setProgram] = useState([]);
  const pendingIssues = useSelector((state) => state.lecturers.pending_issues);
  const unassignedStaff = useSelector((state) => state.lecturers.unassigned_staff);
  const staffList = useSelector((state) => state.lecturers.staff_list);
  const facultyList = useSelector((state) => state.global.faculties);
  const programList = useSelector((state) => state.global.programmes);
  const i18n = useTranslate();
  const { t } = i18n;

  const ListCol = [
    {
      title: 'ID',
      dataIndex: 'employee_id',
      key: 'employee_id',
      sorter: true,
    },
    {
      title: 'Staff Name',
      dataIndex: 'employee_name',
      key: 'employee_name',
      sorter: true,
    },
    {
      title: 'Faculty',
      dataIndex: 'faculty_code',
      key: 'faculty_code',
      sorter: true,
      ellipsis: true,
    },
    {
      title: 'Programme',
      dataIndex: 'program_name',
      key: 'program_name',
      ellipsis: true,
      sorter: true,
    },
    {
      title: 'Position',
      dataIndex: 'position_level',
      key: 'position_level',
      sorter: true,
    },
    {
      title: 'Issues',
      dataIndex: 'issues',
      key: 'issues',
      sorter: true,
      render: (text) => {
        let clname = '';
        if (text >= 1) {
          clname = 'c-error';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
    },
    {
      title: 'Requests',
      dataIndex: 'requests',
      key: 'requests',
      sorter: true,
      render: (text) => {
        let clname = '';
        if (text >= 1) {
          clname = 'c-error';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'employee_status',
      key: 'employee_status',
      align: 'center',
      width: 140,
      render: (text) => {
        let clname = '';
        if (text == 'Active') {
          clname = 'c-success';
        } else if (text == 'asd') {
          clname = 'c-error';
        } else if (text == 'Archive') {
          clname = 'c-pending';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
    },
  ];

  const onFilter = (e) => {
    setFilterVal(e.target.value);
    setPage(1);
    dispatch(getStaffList(e.target.value, 1, limit, '', ''));
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        history.push(`staff/${record.employee_id}`);
      },
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getStaffList(filterVal, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
      dispatch(getStaffList(filterVal, pagination.current, pagination.pageSize, '', ''));
    }
  };
  const onSearch = (search) => {
    if (search) {
      let searchVal = {};
      searchVal = {
        staff_name: search.staff_name,
        role: search.role.value,
        faculty_code: search.faculty.value,
        program_name: search.programme.value,
      };
      dispatch(getStaffList(filterVal, page, limit, '', '', searchVal));
    } else {
      dispatch(getStaffList(filterVal, page, limit, '', '', null));
    }
  };
  useEffect(() => {
    dispatch(getPendingIssues());
    dispatch(getUnassignedStaff());
    //  dispatch(getPendingRequest());
    dispatch(getStaffList(filterVal, page, limit, '', ''));
    dispatch(getAllFaculty());
    dispatch(getAllPrograms());
  }, []);

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
  return (
    <Row gutter={[20, 50]}>
      <Col span={24}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <HeadingChip title="Pending Issues & Requests" />
          </Col>
          <Col flex="1 0 300px">
            <PendingRequestCard
              data={pendingIssues?.rows ? pendingIssues?.rows : []}
              title="Pending Issues"
              count={pendingIssues.count > 0 ? pendingIssues.count : 0}
              link="lecturers/issues/"
              label="Staff Issues"
              innerlink="staff/"
              status={'b-error'}
              idKey={'employee_id'}
              nameKey={'employee_name'}
            />
          </Col>
          <Col flex="1 0 300px">
            <PendingRequestCard
              data={[]}
              title="Pending Requests"
              count={0}
              link="lecturers/requests/"
              label="Staff Requests"
              innerlink="staff/"
              status={'b-pending'}
              idKey={'employee_id'}
              nameKey={'employee_name'}
            />
          </Col>
          <Col flex="1 0 300px">
            <PendingRequestCard
              data={unassignedStaff?.rows ? unassignedStaff?.rows : []}
              title="Unassigned Staff"
              count={unassignedStaff.count > 0 ? unassignedStaff.count : 0}
              link="lecturers/unassigned/"
              label="Unassigned Staff"
              innerlink="staff/"
              status={'b-pending'}
              idKey={'employee_id'}
              nameKey={'employee_name'}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <HeadingChip title="Staff List" />
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
              ListData={staffList?.rows}
              onRow={onClickRow}
              field1={faculty}
              field2={program}
              pagination={{
                total: staffList?.count,
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
