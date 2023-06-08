import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from '../../../../../molecules/ListCard';
import { Popup } from '../../../../../atoms/Popup';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { CloseCircleFilled } from '@ant-design/icons';
import AddEditExamHall from './AddEditExamhall';
import Search from './Search';
import { getAllExamsHall } from '../../ducks/actions';
const ListCol = [
  {
    title: 'Exam Hall Name',
    dataIndex: 'exam_hall_name',
    key: 'exam_hall_name',
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
    dataIndex: 'exam_hall_capacity',
    key: 'exam_hall_capacity',
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
  const allExamHalls = useSelector((state) => state.custom.all_examhall);
  const [visible, setVisible] = useState(false);
  const btnList = [
    {
      text: '+ New Exam Hall',
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
      <AddEditExamHall
        page={page}
        limit={limit}
        data={rowData}
        title={`${rowData?.name ? 'Edit' : 'Add New'} Exam Hall`}
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

  const onSearch = (value) => {
    console.log({ value });
    if (value) {
      console.log({ value });
      let searchVal = {
        block: value?.block ? value.block.value : '',
        level: value?.level ? value.level.value : '',
        classroom_capacity: value?.classroom_capacity ? value?.classroom_capacity : '',
      };

      dispatch(getAllExamsHall(page, limit, '', '', JSON.stringify(searchVal)));
    }
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getAllExamsHall(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    }
  };

  useEffect(() => {
    dispatch(getAllExamsHall(1, 10));
  }, []);

  return (
    <>
      <Row gutter={[24, 30]}>
        <Col span={24}>
          <HeadingChip title="Exam Hall" btnList={btnList} />
        </Col>
        <Col span={24}>
          <ListCard
            classes="clickRow"
            onRow={onRowClickHandler}
            onSearch={Search && onSearch}
            ListCol={ListCol}
            ListData={allExamHalls?.rows}
            Search={Search}
            pagination={{
              total: allExamHalls?.count,
              current: page,
              pageSize: limit,
            }}
            onChange={onTableChange}
          />
        </Col>
      </Row>
      <Popup {...popup} />
    </>
  );
};
