import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Button, Pagination, message } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditNationality from './Components/AddEditNationality';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getNationalitiesList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import Roles from '../../../../../../routing/config/Roles';
import {allowed} from '../../../../../../routing/config/utils';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [nationalityField, setNaionalityField] = useState('');
  const [page, setPage] = useState(1);
  const [searchValue, setSearchVal] = useState(null);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const nationalitiesListData = useSelector((state) => state.setup.nationalitiesListData);

  useEffect(() => {
    if (!visible) {
      dispatch(getNationalitiesList(page, limit, '', ''));
    }
  }, [visible]);

  const ListCol = [
    {
      title: 'Nationality',
      dataIndex: 'country_name',
      key: 'country_name',
      sorter: true,
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      sorted: (a, b) => a.Action - b.Action,
      align: 'center',
      width: '100px',
      render: (text, record) => (
        <Button type="link" className="list-links c-gray">
          <CloseCircleFilled />
        </Button>
      ),
    },
  ];

  const btnList = [
    {
      text: '+ New Nationality',
      classes: 'green-btn',
      action: () => {
        setNaionalityField({ name: '', code: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    class: 'black-modal',
    content: (
      <AddEditNationality
        countryName={nationalityField}
        title={`${nationalityField.name ? 'Edit' : 'Add New'} Nationality`}
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
          setNaionalityField(record);
          setVisible(true);
        }
      },
    };
  };

  const onSearch = (value) => {
    if (value) {
      let searchVal = {
        country_name: value?.nationality ? value?.nationality : '',
      };
      setSearchVal(searchVal);
      setPage(1);
      dispatch(getNationalitiesList(1, 10, '', '', searchVal));
    }
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(
        getNationalitiesList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, searchValue),
      );
    } else {
      dispatch(getNationalitiesList(pagination.current, pagination.pageSize, '', '', searchValue));
    }
  };

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Nationality" btnList={allowed([Roles.SETUP], 'write') ? btnList : null} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={onSearch}
            ListCol={ListCol}
            ListData={nationalitiesListData?.rows}
            pagination={{
              total: nationalitiesListData?.count,
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
