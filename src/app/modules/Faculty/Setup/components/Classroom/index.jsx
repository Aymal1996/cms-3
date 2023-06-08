import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import ListCard from 'Molecules/ListCard';
import { Popup } from 'Atoms/Popup';
import HeadingChip from 'Molecules/HeadingChip';
import { CloseCircleFilled } from '@ant-design/icons';
import AddEditCalssRoom from './AddEditClassroom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllClassrooms } from '../../ducks/actions';
import Search from './Search';
const ListCol = [
  {
    title: 'Classroom Name',
    dataIndex: 'classroom_name',
    key: 'classroom_name',
    sorter: true,
  },
  {
    title: 'Type',
    dataIndex: 'classroom_type',
    key: 'classroom_type',
    sorter: true,
  },
  {
    title: 'Level',
    dataIndex: 'level',
    key: 'level',
    sorter: true,
  },
  {
    title: 'Block',
    dataIndex: 'block',
    key: 'block',
    sorter: true,
  },
  {
    title: 'Capacity',
    dataIndex: 'classroom_capacity',
    key: 'classroom_capacity',
    sorter: true,
  },
  {
    title: 'Action',
    dataIndex: 'Action',
    key: 'Action',
    align: 'center',
    render: (text, record) => (
      <Button type="link" className="list-links" onClick={() => {}}>
        <CloseCircleFilled />
      </Button>
    ),
  },
];

export default () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [rowData, setRowData] = useState('');
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const allClassrooms = useSelector((state) => state.custom.all_calssroom);

  const btnList = [
    {
      text: '+ New Classroom',
      classes: 'green-btn',
      action: () => {
        setRowData('');
        setVisible(true);
      },
    },
  ];

  const popup = {
    visibility: visible,
    width: 500,
    closable: true,
    content: (
      <AddEditCalssRoom
        page={page}
        limit={limit}
        data={rowData}
        title={`${rowData?.name ? 'Edit' : 'Add New'} Classroom`}
        onClose={() => setVisible(false)}
      />
    ),
    onCancel: () => setVisible(false),
  };

  const onRowClickHandler = (record) => {
    return {
      onClick: () => {
        setRowData(record);
        setVisible(true);
      },
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getAllClassrooms(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    }
  };

  const onSearch = (value) => {
    if (value) {
      console.log({ value });
      let searchVal = {
        block: value?.block ? value.block.value : '',
        level: value?.level ? value.level.value : '',
        classroom_type: value?.classroom_type ? value.classroom_type.value : '',
        classroom_capacity: value?.classroom_capacity ? value?.classroom_capacity : '',
      };

      dispatch(getAllClassrooms(page, limit, '', '', JSON.stringify(searchVal)));
    }
  };

  useEffect(() => {
    dispatch(getAllClassrooms(1, 10));
  }, []);

  return (
    <>
      <Row gutter={[24, 30]}>
        <Col span={24}>
          <HeadingChip title="Classroom" btnList={btnList} />
        </Col>
        <Col span={24}>
          <ListCard
            classes="clickRow"
            onRow={onRowClickHandler}
            onChange={onTableChange}
            ListCol={ListCol}
            ListData={allClassrooms?.rows}
            Search={Search}
            onSearch={Search && onSearch}
            pagination={{
              total: allClassrooms?.count,
              current: page,
              pageSize: limit,
            }}
          />
        </Col>
      </Row>
      <Popup {...popup} />
    </>
  );
};
