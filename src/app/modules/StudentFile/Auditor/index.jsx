import React, { useState, useEffect } from 'react';
import { Row, Col, Button, message } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from 'Molecules/ListCard';
import { getAuditedStudentList } from '../ducks/actions';
import moment from 'moment';
import { getAllPrograms } from '../../Application/ducks/actions';
import Search from '../Search';
import { deleteAuditStudents } from '../ducks/services';
import { allowed } from '../../../../routing/config/utils';
import AllRoles from '../../../../routing/config/AllRoles';

export default (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const students = useSelector((state) => state.studentfile.audited);
  const programList = useSelector((state) => state.global.programmes);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [program, setProgram] = useState([]);
  const [searching, setSearching] = useState(null);

  useEffect(() => {
    dispatch(getAuditedStudentList('Active', page, limit, '', ''));
    dispatch(getAllPrograms());
  }, []);

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

  const deleteStud = (id) => {
    props.setLoading(true)
    deleteAuditStudents({student_id: id}).then((res) => {
      message.success('Student Revert Successfully');
      setTimeout(() => {
        dispatch(getAuditedStudentList('Active', page, limit, '', '', searching, props.setLoading));
      }, 1500)
    })
    .catch((err) => {
      const { response } = err;
      props.setLoading(false)
      // message.error(response.data.message);
      console.log('Error', response);
    });
  }

  const onSearch = (search) => {
    props.setLoading(true)
    if (search) {
      let searchVal = {};
      searchVal = {
        student_id: search.searchcode,
        student_name: search.searchname,
        program: search.programme.value,
      };
      setSearching(searchVal);
      dispatch(getAuditedStudentList('Active', page, limit, '', '', searchVal, props.setLoading));
    } else {
      setSearching(null);
      dispatch(getAuditedStudentList('Active', page, limit, '', '', null, props.setLoading));
    }
  };

  const onClickRow = (record) => {
    return {
      onClick: (e) => {
        if (e.target.tagName == 'SPAN' || e.target.tagName == 'BUTTON') {
          deleteStud(record.name)
        } else {
          history.push(`auditor/students/${record.name}`);
        }
      },
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    props.setLoading(true)
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(
        getAuditedStudentList(
          'Active',
          pagination.current,
          pagination.pageSize,
          sorter.order,
          sorter.columnKey,
          searching,
          props.setLoading
        ),
      );
    } else {
      props.setLoading(true)
      dispatch(getAuditedStudentList('Active', pagination.current, pagination.pageSize, '', '', searching, props.setLoading));
    }
  };

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
      title: 'Programme',
      dataIndex: 'program_name',
      key: 'program_name',
      sorter: true,
    },
    {
      title: 'Audit Date',
      dataIndex: 'modified',
      key: 'modified',
      sorter: true,
      render: (text) => (text ? moment(text).format('Do MMMM YYYY') : ''),
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
    {
      title: 'Action',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      render: (text) => (
          <Button
          type="primary"
          htmlType="button"
          className="red-btn"
          >Remove</Button>
      ),
    },
  ];

  const ListCol2 = [
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
      title: 'Programme',
      dataIndex: 'program_name',
      key: 'program_name',
      sorter: true,
    },
    {
      title: 'Audit Date',
      dataIndex: 'modified',
      key: 'modified',
      sorter: true,
      render: (text) => (text ? moment(text).format('Do MMMM YYYY') : ''),
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
  

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <HeadingChip title="Audited Student List" />
      </Col>
      <Col span={24} className="clickRow">
        <ListCard
          onChange={onTableChange}
          Search={Search}
          onSearch={onSearch}
          ListCol={allowed([AllRoles.STUDENT.AUDIT], 'write') ? ListCol : ListCol2}
          ListData={students?.rows}
          onRow={onClickRow}
          field1={program}
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
