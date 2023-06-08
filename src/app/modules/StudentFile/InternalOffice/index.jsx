import React, { useState, useEffect } from 'react';
import { Row, Col, message, Tag, Space } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from 'Molecules/ListCard';
import { getAuditStudentList } from '../ducks/actions';
import { auditStudents } from '../ducks/services';
import { getAllFaculty, getAllPrograms } from '../../Application/ducks/actions';
import Search from '../../Registry/Students/components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import MissingDocsList from '../MissingDocsList';
import StatusWiseStudent from '../StatusWiseStudent';

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
    dataIndex: 'student_status',
    key: 'student_status',
    align: 'center',
    width: 140,
    render: (text) => {
      let clname = '';
      if (text == 'Active') {
        clname = 'c-pending';
      } else if (text == 'Completed' || text == 'completed') {
        clname = 'c-success';
      }
      return <span className={`SentanceCase ${clname}`}>{text}</span>;
    },
  },
];

export default (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const students = useSelector((state) => state.studentfile.audit);
  const facultyList = useSelector((state) => state.global.faculties);
  const programList = useSelector((state) => state.global.programmes);
  const [listing, setListing] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [faculty, setFaculty] = useState([]);
  const [program, setProgram] = useState([]);
  const [searching, setSearching] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selecteddoc, setSelectedDoc] = useState(null);
  const [selectedstatus, setSelectedStatus] = useState(null);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const audit = () => {
    props.setLoading(true);
    let selected = [];
    selectedRowKeys.map((x) => {
      selected.push({
        student_id: x,
      });
    });
    let body = {
      students: selected,
    };
    console.log('checking', body);
    auditStudents(body)
      .then((res) => {
        message.success('Student Audit Successfully');
        props.setLoading(false);
        setSelectedRowKeys([]);
        dispatch(getAuditStudentList('Active', page, limit, '', ''));
      })
      .catch((err) => {
        props.setLoading(false);
        const { response } = err;
        message.error('Something went wrong');
        console.log('Error', response.data);
      });
  };

  const btnList = [
    {
      text: 'Audit',
      action: () => audit(),
      classes: 'green-btn',
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    dispatch(getAuditStudentList('Active', page, limit, '', ''));
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

  useEffect(() => {
    if (students && Object.entries(students).length > 0) {
      let temp = [];
      students.rows.map((x, i) => {
        temp.push({ ...x, key: x.name });
      });
      setListing(temp);
    }
  }, [students]);

  const onSearch = (search) => {
    props.setLoading(true);
    if (search) {
      let searchVal = {};
      searchVal = {
        student_id: search.searchcode,
        student_name: search.searchname,
        faculty_code: search.faculty.value,
        program: search.programme.value,
      };
      setSearching(searchVal);
      dispatch(
        getAuditStudentList('Active', page, limit, '', '', searchVal, selecteddoc, selectedstatus, props.setLoading),
      );
    } else {
      setSearching(null);
      dispatch(getAuditStudentList('Active', page, limit, '', '', null, selecteddoc, selectedstatus, props.setLoading));
    }
  };

  const callDocAPI = (doc = null) => {
    props.setLoading(true);
    if (doc) {
      setSelectedDoc(doc);
      dispatch(getAuditStudentList('Active', 1, limit, '', '', null, doc, selectedstatus, props.setLoading));
    } else {
      setSelectedDoc(null);
      dispatch(getAuditStudentList('Active', 1, limit, '', '', null, null, selectedstatus, props.setLoading));
    }
  };

  const callStatusAPI = (status = null) => {
    props.setLoading(true);
    if (status) {
      setSelectedStatus(status);
      dispatch(getAuditStudentList('Active', 1, limit, '', '', null, selecteddoc, status, props.setLoading));
    } else {
      setSelectedStatus(null);
      dispatch(getAuditStudentList('Active', 1, limit, '', '', null, selecteddoc, null, props.setLoading));
    }
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        history.push(`internaloffice/students/${record.name}`);
      },
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    props.setLoading(true);
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(
        getAuditStudentList(
          'Active',
          pagination.current,
          pagination.pageSize,
          sorter.order,
          sorter.columnKey,
          searching,
          selecteddoc,
          selectedstatus,
          props.setLoading,
        ),
      );
    } else {
      dispatch(
        getAuditStudentList(
          'Active',
          pagination.current,
          pagination.pageSize,
          '',
          '',
          searching,
          selecteddoc,
          selectedstatus,
          props.setLoading,
        ),
      );
    }
  };

  return (
    <Row gutter={[20, 30]} wrap>
      <Col flex="1 0 300px" className="clickRow loader-100">
        <MissingDocsList callDocAPI={callDocAPI} />
      </Col>
      <Col flex={'1 0 300px'} className="clickRow loader-100">
        <StatusWiseStudent callStatusAPI={callStatusAPI} />
      </Col>
      <Col span={24}>
        <HeadingChip
          title="Non Audited Student List"
          subTitle={
            <Space size={5}>
              {selecteddoc && (
                <Tag
                  closable={true}
                  closeIcon={<CloseCircleFilled />}
                  className="selected-tag"
                  key={'!'}
                  onClose={() => callDocAPI()}
                >
                  {selecteddoc}
                </Tag>
              )}
              {selectedstatus && (
                <Tag
                  closable={true}
                  closeIcon={<CloseCircleFilled />}
                  className="selected-tag"
                  key={'2'}
                  onClose={() => callStatusAPI()}
                >
                  {selectedstatus}
                </Tag>
              )}
            </Space>
          }
          btnList={selectedRowKeys.length > 0 ? btnList : null}
        />
      </Col>
      <Col span={24} className="clickRow">
        <ListCard
          onChange={onTableChange}
          Search={Search}
          onSearch={onSearch}
          ListCol={ListCol}
          ListData={listing}
          onRow={onClickRow}
          rowSelection={rowSelection}
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
  );
};
