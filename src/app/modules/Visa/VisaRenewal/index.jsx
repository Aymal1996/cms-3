import React, { useState, useEffect } from 'react';
import { Row, Col, Space, Typography, Badge } from 'antd';
import HeadingChip from '../../../molecules/HeadingChip';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from '../../../molecules/ListCard';
import Search from './components/Search';
import { getExpiredVisaList, getVisaRenewalList, getExpiryVisaList, emptyListVisa } from '../ducks/actions';
import PendingRequestCard from '../../../molecules/PendingRequestCard';
import { getAllFaculty, getAllPrograms } from '../../Application/ducks/actions';
import { selectProgram } from '../../Registry/Students/ducks/actions';

const { Title } = Typography;

const filters = [
  {
    label: 'All',
    value: 'All',
  },
  {
    label: 'Expired',
    value: 'Expired',
  },
  {
    label: 'Expiring',
    value: 'Expiring',
  },
];

const ListCol = [
  {
    title: 'ID',
    dataIndex: 'student_id',
    key: 'student_id',
    sorter: true,
    width: 160,
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
    title: 'Issues',
    dataIndex: 'visa_status',
    key: 'visa_status',
    width: 100,
    render: (text) => <span className={`${text > 0 ? 'c-error' : ''}`}>{text}</span>,
    sorter: true,
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
        clname = 'c-pending';
      } else if (text == 'completed') {
        clname = 'c-success';
      }
      return <span className={`SentanceCase ${clname}`}>{text}</span>;
    },
  },
];

export default (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [filterVal, setFilterVal] = useState('All');

  const facultyList = useSelector((state) => state.global.faculties);
  const programList = useSelector((state) => state.global.programmes);
  const visaList = useSelector((state) => state.visa.visaRenewalList);
  const expiredList = useSelector((state) => state.visa.expiredList);
  const expiryList = useSelector((state) => state.visa.expiryList);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [faculty, setFaculty] = useState([]);
  const [program, setProgram] = useState([]);
  const [searching, setSearching] = useState(null);

  useEffect(() => {
    dispatch(getVisaRenewalList(filterVal, page, limit, '', ''));
    dispatch(getExpiredVisaList());
    dispatch(getExpiryVisaList());
    dispatch(getAllFaculty());
    dispatch(getAllPrograms());
    return () => dispatch(emptyListVisa());
  }, []);

  useEffect(() => {
    filterVal && dispatch(getVisaRenewalList(filterVal, page, limit, '', '', searching));
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
        program_name: search.programme.value,
      };
      setSearching(searchVal);
      dispatch(getVisaRenewalList(filterVal, page, limit, '', '', searchVal));
    } else {
      setSearching(null);
      dispatch(getVisaRenewalList(filterVal, page, limit, '', '', null));
    }
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        dispatch(selectProgram(record.program));
        history.push(`students/${record.student_id}`);
      },
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(
        getVisaRenewalList(
          filterVal,
          pagination.current,
          pagination.pageSize,
          sorter.order,
          sorter.columnKey,
          searching,
        ),
      );
    } else {
      dispatch(getVisaRenewalList(filterVal, pagination.current, pagination.pageSize, '', '', searching));
    }
  };

  return (
    <Row gutter={[20, 50]}>
      <Col span={24}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <HeadingChip
              title={
                <Space size={12}>
                  <Title className="tab-header mb-0" level={4}>
                    Visa Renewal
                  </Title>
                  <Badge count={expiredList?.count} className="tab-badge" />
                </Space>
              }
            />
          </Col>
          <Col xl={12} lg={24}>
            <PendingRequestCard
              data={expiredList?.rows || []}
              title="Expired Visa"
              count={expiredList?.total || 0}
              link="/visa/renewal/expired"
              label="Students"
              noIssues={true}
              innerlink="/visa/renewal/expired/"
              status={'b-error'}
              nameKey={'student_name'}
              idKey={'student_id'}
            />
          </Col>
          <Col xl={12} lg={24}>
            <PendingRequestCard
              data={expiryList?.rows || []}
              title="Expiring Visa"
              count={expiryList?.total || 0}
              link="/visa/renewal/expiring"
              label="Students"
              noIssues={true}
              innerlink="/visa/renewal/expiring/"
              status={'b-pending'}
              nameKey={'applicant_name'}
              idKey={'name'}
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
              ListCol={ListCol}
              ListData={visaList?.rows}
              onRow={onClickRow}
              field1={faculty}
              field2={program}
              pagination={{
                total: visaList?.total,
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
