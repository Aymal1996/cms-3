import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from '../../../../../molecules/ListCard';
import { getStudentList } from '../../ducks/actions';
const ListCol = [
  {
    title: 'Student Name',
    dataIndex: 'student_name',
    key: 'student_name',
    sorter: true,
  },
  {
    title: 'Faculty',
    dataIndex: 'faculty_code',
    key: 'faculty_code',
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
    title: 'Semester',
    dataIndex: 'semester',
    key: 'semester',
    sorter: true,
  },
];
export default () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const studentList = useSelector((state) => state.material.student_list);

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    if (sorter.order) {
      dispatch(getStudentList(id, pagination.current, 5, sorter.order, sorter.columnKey));
    } else {
      dispatch(getStudentList(id, pagination.current, 5, '', ''));
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
      dispatch(getStudentList(id, page, 5, '', '', searchVal));
    } else {
      dispatch(getStudentList(id, page, 5, '', '', null));
    }
  };

  useEffect(() => {
    dispatch(getStudentList(id, page, 5, '', '', ''));
  }, [id]);

  return (
    <Row gutter={24}>
      <Col span={24}>
        <ListCard
          title="Assigned Students"
          className="clickRow"
          listClass="nospace-card"
          onChange={onTableChange}
          ListCol={ListCol}
          ListData={studentList?.rows}
          scrolling={500}
          pagination={{
            total: studentList?.count,
            current: page,
            pageSize: 5,
          }}
        />
      </Col>
    </Row>
  );
};
