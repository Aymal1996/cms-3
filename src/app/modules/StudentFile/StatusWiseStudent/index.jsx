import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from 'Molecules/ListCard';
import { getStatusCount } from '../ducks/actions';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined spin />;

const ListCol = [
  {
    title: '#',
    width: '20px',
    dataIndex: 'index',
    key: 'index',
    render: (text, record, index) => index + 1,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Students',
    dataIndex: 'student_count',
    key: 'student_count',
  },
];

export default ({ callStatusAPI }) => {
  const dispatch = useDispatch();
  const statusdocs = useSelector((state) => state.studentfile.studstatus);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [statusData, setStatusData] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    dispatch(getStatusCount(page, limit, null));
  }, []);

  useEffect(() => {
    if (statusdocs && statusdocs?.rows) {
      let temp = [];
      statusdocs?.rows?.map((x) => {
        temp.push({ status: Object.keys(x)[0], student_count: Object.values(x)[0] });
      });
      setStatusData(temp);
    }
  }, [statusdocs]);

  const onClickRow = (record) => {
    return {
      onClick: () => callStatusAPI(record.status),
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    setLoad(true);
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    dispatch(getStatusCount(pagination.current, pagination.pageSize, setLoad));
  };

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <ListCard
        scrolling={300}
        title="Students Status"
        onChange={onTableChange}
        ListCol={ListCol}
        ListData={statusData}
        onRow={onClickRow}
        pagination={{
          total: statusdocs?.count,
          current: page,
          pageSize: limit,
        }}
      />
    </Spin>
  );
};
