import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Button, Pagination, message } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditReligion from './Components/AddEditReligion';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getReligionsList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import Roles from '../../../../../../routing/config/Roles';
import { allowed } from '../../../../../../routing/config/utils';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [religionFiled, setReligionField] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchVal] = useState(null);
  const dispatch = useDispatch();
  const religionsListData = useSelector((state) => state.setup.religionsListData);

  useEffect(() => {
    if (!visible) {
      dispatch(getReligionsList(page, limit, '', ''));
    }
  }, [visible]);

  const ListCol = [
    {
      title: 'Religion',
      dataIndex: 'religion',
      key: 'religion',
      sorter: true,
    },

    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      align: 'center',
      width: '100px',
      render: (text, record) => (
        <Button type="link" className="list-links c-gray" onClick={() => deleteRecord(record)}>
          <CloseCircleFilled />
        </Button>
      ),
    },
  ];

  const btnList = [
    {
      text: '+ New Religion',
      classes: 'green-btn',
      action: () => {
        setReligionField({ name: '', religion: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    class: 'black-modal',
    content: (
      <AddEditReligion
        religion={religionFiled}
        title={`${religionFiled.name ? 'Edit' : 'Add New'} Religion`}
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
        setReligionField(record);
        setVisible(true);
        }
      },
    };
  };

  const onSearch = (value) => {
    if (value) {
      let searchVal = {
        name1: value?.religion ? value?.religion : '',
      };
      setSearchVal(searchVal);
      setPage(1);
      dispatch(getReligionsList(1, 10, '', '', searchVal));
    }
  };

  const onTableChange = (pagination, filters, sorter) => {
    console.log('heloo', pagination);
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getReligionsList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, searchValue));
    } else {
      dispatch(getReligionsList(pagination.current, pagination.pageSize, '', '', searchValue));
    }
  };
  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Religions" btnList={allowed([Roles.SETUP], 'write') ? btnList : null} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={onSearch}
            ListCol={ListCol}
            ListData={religionsListData?.rows}
            pagination={{
              total: religionsListData?.count,
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
