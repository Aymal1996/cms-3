import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditInstitution from './Components/AddEditInstitution';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getInstitutionsList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import Roles from '../../../../../../routing/config/Roles';
import { allowed } from '../../../../../../routing/config/utils';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [institutionFiled, setInstitutionField] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchVal] = useState(null);
  const dispatch = useDispatch();
  const institutionsListData = useSelector((state) => state.setup.institutionsListData);

  useEffect(() => {
    if (!visible) {
      dispatch(getInstitutionsList(page, limit, '', ''));
    }
  }, [visible]);

  const ListCol = [
    {
      title: 'Institution',
      dataIndex: 'Institution',
      key: 'Institution',
      sorter: true,
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',

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
      text: '+ New Institution',
      classes: 'green-btn',
      action: () => {
        setInstitutionField({ Institution: '', name: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    class: 'black-modal',
    content: (
      <AddEditInstitution
        institutionName={institutionFiled}
        title={`${institutionFiled.name ? 'Edit' : 'Add New'} Institutions`}
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
        setInstitutionField(record);
        setVisible(true);
        }
      },
    };
  };

  const onSearch = (value) => {
    if (value) {
      let searchVal = {
        name1: value?.institution ? value?.institution : '',
      };
      setSearchVal(searchVal);
      setPage(1);
      dispatch(getInstitutionsList(1, 10, '', '', searchVal));
    }
  };

  const onTableChange = (pagination, filters, sorter) => {
    console.log('heloo', pagination);
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(
        getInstitutionsList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, searchValue),
      );
    } else {
      dispatch(getInstitutionsList(pagination.current, pagination.pageSize, '', '', searchValue));
    }
  };
  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Institutions" btnList={allowed([Roles.SETUP], 'write') ? btnList : null} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={onSearch}
            ListCol={ListCol}
            ListData={institutionsListData?.rows}
            pagination={{
              total: institutionsListData?.count,
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
