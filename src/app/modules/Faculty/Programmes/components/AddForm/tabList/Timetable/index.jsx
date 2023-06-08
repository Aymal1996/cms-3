import React, { useEffect, useState } from 'react';
import { Row, Col, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ListComponent from '../../../../../../../molecules/ListComponent';
import { timetableList } from '../../../../ducks/actions';
import Search from '../../../Search/Timetable';

const colName = [
  {
    title: 'Module',
    dataIndex: 'module_name',
    key: 'module_name',
    align: 'center',
    sorter: (a, b) => a?.module_name?.length - b.module_name?.length,
  },
  {
    title: 'Programme',
    dataIndex: 'program_name',
    key: 'program_name',
    sorter: (a, b) => a?.program_name?.length - b.program_name?.length,
  },

  {
    title: 'Faculty',
    dataIndex: 'faculty_code',
    key: 'faculty_code',
    sorter: (a, b) => a?.faculty_code?.length - b.faculty_code?.length,
  },
  {
    title: 'Time',
    dataIndex: 'start_time',
    key: 'start_time',
    align: 'center',
    sorter: (a, b) => a?.start_time?.length - b.start_time?.length,
  },
  {
    title: 'Day',
    dataIndex: 'day',
    key: 'day',
    align: 'center',
    sorter: (a, b) => a?.day?.length - b.day?.length,
  },
  {
    title: 'Classroom',
    dataIndex: 'classroom_name',
    key: 'classroom_name',
    align: 'center',
    sorter: (a, b) => a?.classroom_name?.length - b.classroom_name?.length,
  },
  {
    title: 'Location',
    dataIndex: 'block',
    key: 'block',
    align: 'center',
    sorter: (a, b) => a?.block?.length - b.block?.length,
  },
];

export default (props) => {
  const { Title } = Typography;
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tableList } = useSelector((state) => state.facultyProgramme);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    dispatch(timetableList(id, page, limit));
  }, []);

  function updateList(current, pageSize) {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    dispatch(timetableList(id, current, pageSize));
  }
  const onSearch = (search) => {
    const { category, category_type } = search;
    const result = `"${[category.value]}":"${category_type.value}"`;
    dispatch(timetableList(id, page, limit, result));
  };

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <Title level={3} className="mb-0">
              Programme Timetable
            </Title>
          </Col>
          <Col span={24}>
            <ListComponent
              link="/faculty/programmes/"
              linkKey="program_code"
              ListCol={colName}
              defaultLimit={10}
              Search={Search}
              onSearch={onSearch}
              updateList={updateList}
              data={tableList}
              listProps={{listClass:"nospace-card"}}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
