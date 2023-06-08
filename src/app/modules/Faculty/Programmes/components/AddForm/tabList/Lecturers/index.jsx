import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Row, Col } from 'antd';

import HeadingChip from '@molecules/HeadingChip';
import ListCard from '@molecules/ListCard';

import { facultyStaffLecturesList, getStaffNames } from '../../../../ducks/actions';
import Search from '../../../Search/Lecture';

const ListCol = [
  {
    title: 'Staff Name',
    dataIndex: 'employee_name',
    key: 'employee_name',
    sorter: (a, b) => a?.employee_name?.length - b.employee_name?.length,
    ellipsis: true,
  },
  {
    title: 'Faculty',
    dataIndex: 'faculty_name',
    key: 'faculty_name',
    ellipsis: true,
    sorter: (a, b) => a?.faculty_name?.length - b.faculty_name?.length,
  },

  {
    title: 'Modules',
    dataIndex: 'module',
    key: 'module',
    ellipsis: true,
    sorter: (a, b) => a?.module?.length - b.module?.length,
  },
];

export default () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const staffLecturesList = useSelector((state) => state.facultyProgramme.staffLecturesList);
  const staffApi = useSelector((state) => state.facultyProgramme.staffNames);
  const params = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    dispatch(facultyStaffLecturesList(page, limit,params?.id));
    dispatch(getStaffNames(params?.id));
  }, []);

  const onFilter = (e) => {
    setFilterVal(e.target.value);
  };

  const onSearch = (val) => {
    
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        history.push(`/faculty/staff/${record.employee_id}`);
      },
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);

    dispatch(facultyStaffLecturesList(pagination.current, pagination.pageSize,params?.id));
  };

  return (
    <Row gutter={[20, 50]}>
      <Col span={24}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <HeadingChip title="Programme Coordinator" />
          </Col>
          <Col span={24} className="clickRow">
            <ListCard
              title="Programme Lecturers"
              Search={Search}
              onSearch={onSearch}
              field1={staffApi}
              onFilter={onFilter}
              onChange={onTableChange}
              ListCol={ListCol}
              ListData={staffLecturesList?.rows}
              listClass="nospace-card"
              onRow={onClickRow}
              scrolling={500}
              pagination={{
                total: staffLecturesList?.count,
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
