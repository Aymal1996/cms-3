import React, { useEffect, useState } from 'react';
import { Row, Col, Switch, Button, message } from 'antd';
import ListCard from 'Molecules/ListCard';
import { Popup } from 'Atoms/Popup';
import HeadingChip from 'Molecules/HeadingChip';
import { useSelector, useDispatch } from 'react-redux';
import Search from './Search';
import AddEditSource from './AddEditSource';
import { getSourceList } from '../../ducks/actions';
import { sourceApi } from '../../ducks/services';

const filters = [
  {
    label: 'All',
    value: 'All',
  },
  {
    label: 'Active',
    value: 'Active',
  },
  {
    label: 'Inactive',
    value: 'Inactive',
  },
];

export default () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [rowData, setRowData] = useState('');
  const [visible, setVisible] = useState(false);
  const [filterVal, setFilterVal] = useState(filters[0].value);
  const data = useSelector(state => state.marketingcustomize.sources);

  const ListCol = [
    {
      title: 'Source Name',
      dataIndex: 'source_name',
      key: 'source_name',
      sorter: true,
      render: (text, record) => <Button type='link' htmlType='button' className='p-0 c-default linkbtn' onClick={() => onRowClickHandler(record)} >{text}</Button>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (text, record) => <Switch checked={text == 'Active' ? true : false} onChange={() => onStatusChange(record)} />,
    },
  ];

  const btnList = [
    {
      text: '+ New Source',
      classes: 'green-btn',
      action: () => {
        setRowData('');
        setVisible(true);
      },
    },
  ];

  const onStatusChange = (record) => {
    const payload = {
      name: record.name,
      status: record.status == 'Active' ? 'Inactive' : 'Active'
  }

    sourceApi(payload).then((res) => {
      message.success('Source Status Updated Successfully');
      updateApi();
    }).catch((error) => {
        message.error('Something went worng');
    })
  }

  const updateApi = () => {
    dispatch(getSourceList(filterVal, 1, 10, '', ''))
  }

  const popup = {
    visibility: visible,
    width: 500,
    closable: true,
    content: (
      <AddEditSource
        data={rowData}
        title={`${rowData?.name ? 'Edit' : 'Add New'} Source`}
        onClose={() => setVisible(false)}
        updateApi={updateApi}
      />
    ),
    onCancel: () => setVisible(false),
  };

  const onRowClickHandler = (record) => {
      setRowData(record);
      setVisible(true);
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getSourceList(filterVal, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
      dispatch(getSourceList(filterVal, pagination.current, pagination.pageSize, '', ''));
    }
  };

  const onSearch = (value) => {
    dispatch(getSourceList(filterVal, page, limit, '', '', value.source_name));
  };

  useEffect(() => {
    dispatch(getSourceList(filterVal, 1, 10, '', ''));
  }, [filterVal]);

  const onFilter = (e) => {
    setFilterVal(e.target.value);
  };

  useEffect(() => {
    updateApi();
  }, []);

  return (
    <>
      <Row gutter={[24, 30]}>
        <Col span={24}>
          <HeadingChip title="Source" btnList={btnList} />
        </Col>
        <Col span={24}>
          <ListCard
            classes="clickRow"
            onChange={onTableChange}
            ListCol={ListCol}
            filters={filters}
            filterValue={filterVal}
            onFilter={onFilter}
            ListData={data?.rows}
            Search={Search}
            onSearch={Search && onSearch}
            pagination={{
              total: data?.count,
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
