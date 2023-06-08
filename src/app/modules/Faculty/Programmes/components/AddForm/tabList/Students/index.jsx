import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import HeadingChip from '@molecules/HeadingChip';
import { useHistory, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import ListCard from '@molecules/ListCard';
import Search from '../../../Search/Student';
import { facultyStudentList } from '../../../../ducks/actions';

const ListCol = [
  {
    title: 'Student Name',
    dataIndex: 'student_name',
    key: 'student_name',
    sorter: true,
    ellipsis: true,
  },
  {
    title: 'Nationality',
    dataIndex: 'nationality',
    key: 'nationality',
    ellipsis: true,
    sorter: true,
  },

  {
    title: 'Semester',
    dataIndex: 'semester_code',
    key: 'semester_code',
    ellipsis: true,
    sorter: true,
  },
];

export default () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const studentList = useSelector((state) => state.facultyProgramme.studentList);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  useEffect(() => {
    dispatch(facultyStudentList(params?.id, page, limit));
  }, []);

  const onFilter = (e) => {
    setFilterVal(e.target.value);
  };

  const onSearch = (search) => {
    const { student_name, nationality, semester } = search;
    console.log('search', search);
    dispatch(
      facultyStudentList(params?.id, page, limit, 'DESC', 'creation', {
        student_name,
        nationality: nationality?.value,
        semester: semester?.value,
      }),
    );
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        history.push(`/faculty/students/${record.name}`);
      },
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);

    dispatch(facultyStudentList(params?.id, pagination.current, pagination.pageSize));
  };

  return (
    <Row gutter={[20, 50]}>
      <Col span={24}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <HeadingChip title="Student List" />
          </Col>
          <Col span={24}>
            <ListCard
              Search={Search}
              scrolling={500}
              onSearch={onSearch}
              onFilter={onFilter}
              onChange={onTableChange}
              ListCol={ListCol}
              listClass="nospace-card"
              ListData={studentList?.rows}
              onRow={onClickRow}
              pagination={{
                total: studentList?.count,
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
