import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from 'Molecules/ListCard';
import { getMissingdocscount } from '../ducks/actions';
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
    title: 'Document',
    dataIndex: 'document_name',
    key: 'document_name',
  },
  {
    title: 'Students',
    dataIndex: 'student_count',
    key: 'student_count',
  },
];

export default ({ callDocAPI }) => {
  const dispatch = useDispatch();
  const missingdocs = useSelector((state) => state.studentfile.missingcount);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [documentData, setDocumentData] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    dispatch(getMissingdocscount(page, limit, null));
  }, []);

  useEffect(() => {
    if (missingdocs && missingdocs?.rows) {
      let temp = [];
      missingdocs?.rows?.map((x) => {
        temp.push({ document_name: Object.keys(x)[0], student_count: Object.values(x)[0] });
      });
      setDocumentData(temp);
    }
  }, [missingdocs]);

  const onClickRow = (record) => {
    return {
      onClick: () => callDocAPI(record.document_name),
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    setLoad(true);
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    dispatch(getMissingdocscount(pagination.current, pagination.pageSize, setLoad));
  };

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <ListCard
        onChange={onTableChange}
        ListCol={ListCol}
        ListData={documentData}
        onRow={onClickRow}
        scrolling={300}
        title="Students Missing Documents Count"
        pagination={{
          total: missingdocs?.count,
          current: page,
          pageSize: limit,
        }}
      />
    </Spin>
  );
};
