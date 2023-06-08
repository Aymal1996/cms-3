import React, { useState, useEffect } from 'react';
import { Row, Col, message, Button } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditApprover from './Components/AddEditApprover';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getApproversList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import Roles from '../../../../../../routing/config/Roles';
import { allowed } from '../../../../../../routing/config/utils';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [apparoaverFileds, setApproverFields] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const [searchValue, setSearchVal] = useState(null);
  const approversList = useSelector((state) => state.setup.approversListData);

  useEffect(() => {
    if (!visible) dispatch(getApproversList(page, limit, '', ''));
  }, [visible]);

  const ListCol = [
    {
      title: 'Approver Name',
      dataIndex: 'approver_name',
      key: 'approver_name',
      sorter: true,
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      align: 'center',
      render: (text, record) => (
        <Button type="link" className="list-links c-gray" onClick={() => {}}>
          <CloseCircleFilled />
        </Button>
      ),
    },
  ];
  const btnList = [
    {
      text: '+ New Approver',
      classes: 'green-btn',
      action: () => {
        setApproverFields({ name: '', approver_name: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    content: (
      <AddEditApprover
        approver={apparoaverFileds}
        title={`${apparoaverFileds.name ? 'Edit' : 'Add New'} Approver`}
        onClose={() => setVisible(false)}
      />
    ),
    width: 654,
    onCancel: () => setVisible(false),
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        if (allowed([Roles.SETUP], 'write')) {
          setApproverFields(record);
          setVisible(true);
        }
      },
    };
  };

  const onSearch = (value) => {
    if (value) {
      let searchVal = {
        approver_name: value?.approver_name ? value?.approver_name : '',
      };
      setSearchVal(searchVal);
      setPage(1);
      dispatch(getApproversList(1, 10, '', '', searchVal));
    }
  };
  const onTableChange = (pagination, filters, sorter) => {
    console.log('heloo', pagination);
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getApproversList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, searchValue));
    } else {
      dispatch(getApproversList(pagination.current, pagination.pageSize, '', '', searchValue));
    }
  };
  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Approvers" btnList={allowed([Roles.SETUP], 'write') ? btnList : null} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={Search && onSearch}
            ListCol={ListCol}
            ListData={approversList?.rows}
            pagination={{
              total: approversList?.count,
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
