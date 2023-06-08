import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Button, Pagination, message } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditHolidays from './Components/AddEditHolidays';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getHolidaysList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import Roles from '../../../../../../routing/config/Roles';
import { allowed } from '../../../../../../routing/config/utils';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [holidayFields, setHolidayFields] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchVal] = useState(null);
  const dispatch = useDispatch();
  const holidaysListData = useSelector((state) => state.setup.holidaysListData);

  useEffect(() => {
    if (!visible) {
      dispatch(getHolidaysList(page, limit, '', ''));
    }
  }, [visible]);

  const ListCol = [
    {
      title: 'Holiday Name',
      dataIndex: 'holiday',
      key: 'holiday',
      sorter: true,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: true,
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      sorter: true,
      render: (text) => (text ? text : '-'),
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      align: 'center',
      render: (text, record) => (
        <Button type="link" className="list-links c-gray">
          <CloseCircleFilled />
        </Button>
      ),
    },
  ];

  const btnList = [
    {
      text: '+ New Holiday',
      classes: 'green-btn',
      action: () => {
        setHolidayFields({ name: '', holiday: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    class: 'black-modal',
    content: (
      <AddEditHolidays
        holidayFields={holidayFields}
        title={`${holidayFields.name ? 'Edit' : 'Add New'} Holidays`}
        onClose={() => setVisible(false)}
      />
    ),
    width: 536,
    onCancel: () => setVisible(false),
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        if (allowed([Roles.SETUP], 'write')) {
        setHolidayFields(record);
        setVisible(true);
        }
      },
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getHolidaysList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, searchValue));
    } else {
      dispatch(getHolidaysList(pagination.current, pagination.pageSize, '', '', searchValue));
    }
  };
  const onSearch = (value) => {
    if (value) {
      let searchVal = {
        holiday_name: value?.holiday ? value?.holiday : '',
      };
      setSearchVal(searchVal);
      setPage(1);
      dispatch(getHolidaysList(1, 10, '', '', searchVal));
    }
  };

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Holidays" btnList={allowed([Roles.SETUP], 'write') ? btnList : null} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={Search && onSearch}
            ListCol={ListCol}
            ListData={holidaysListData?.rows}
            pagination={{
              total: holidaysListData?.count,
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
