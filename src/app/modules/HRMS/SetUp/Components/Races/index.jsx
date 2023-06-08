import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Button, Pagination, message } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditRace from './Components/AddEditRace';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getRacesList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import Roles from '../../../../../../routing/config/Roles';
import {allowed} from '../../../../../../routing/config/utils';

export default (props) => {
  const [raceField, setRaceField] = useState('');
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchVal] = useState(null);
  const dispatch = useDispatch();
  const racesListData = useSelector((state) => state.setup.racesListData);

  useEffect(() => {
    if (!visible) {
      dispatch(getRacesList(page, limit, '', ''));
    }
  }, [visible]);

  const ListCol = [
    {
      title: 'Race',
      dataIndex: 'race',
      key: 'race',
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
      text: '+ New Race',
      classes: 'green-btn',
      action: () => {
        setRaceField({ name: '', race: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    class: 'black-modal',
    content: (
      <AddEditRace
        race={raceField}
        title={`${raceField.name ? 'Edit' : 'Add New'} Race`}
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
        setRaceField(record);
        setVisible(true);
        }
      },
    };
  };
  const onSearch = (value) => {
    if (value) {
      let searchVal = {
        name1: value?.race ? value?.race : '',
      };
      setSearchVal(searchVal);
      setPage(1);
      dispatch(getRacesList(1, 10, '', '', searchVal));
    }
  };

  const onTableChange = (pagination, filters, sorter) => {
    console.log('heloo', pagination);
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getRacesList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, searchValue));
    } else {
      dispatch(getRacesList(pagination.current, pagination.pageSize, '', '', searchValue));
    }
  };

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Race" btnList={allowed([Roles.SETUP], 'write') ? btnList : null} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={onSearch}
            ListCol={ListCol}
            ListData={racesListData?.rows}
            pagination={{
              total: racesListData?.count,
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
