import React, { useState, useEffect } from 'react';
import { Row, Col, Button, message } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditLeave from './Components/AddEditLeave';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getLeaveTypesList, getAllApprovers, getLeaveList } from '../../ducks/actions';
import { deleteSingleLeave } from '../../ducks/services';
import { useDispatch, useSelector } from 'react-redux';
import { allowed } from '../../../../../../routing/config/utils';
import Roles from '../../../../../../routing/config/Roles';

export default (props) => {
  const company = JSON.parse(localStorage.getItem('userdetails'))?.user_employee_detail[0].company;
  const [visible, setVisible] = useState(false);
  const [leaveType, setLeaveTpe] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchVal] = useState(null);
  const dispatch = useDispatch();
  const leaveTypesListData = useSelector((state) => state.setup.leaveTypesListData);

  const ListCol = [
    {
      title: 'Leave Type',
      dataIndex: 'leave_type',
      key: 'leave_type',
      sorter: true,
    },
    {
      title: 'Approval Level',
      dataIndex: 'approval_level',
      key: 'approval_level',
      sorter: true,
      align: 'center',
    },
    {
      title: 'Contract Type',
      dataIndex: 'contract_type',
      key: 'contract_type',
      sorter: true,
      align: 'center',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      sorter: true,
      align: 'center',
    },
    {
      title: 'Marital Status',
      dataIndex: 'marital_status',
      key: 'marital_status',
      sorter: true,
      align: 'center',
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      sorted: (a, b) => a.Action - b.Action,
      align: 'center',
      render: (text, record) => (
        <Button
          type="link"
          className="list-links"
          onClick={() => {
            // deleteSingleLeave(record.leave_type).then((response) => {
            //   message.success('Leave deleted successfully');
            //   dispatch(getLeaveTypesList(page, limit, '', ''));
            // });
          }}
        >
          <CloseCircleFilled />
        </Button>
      ),
    },
  ];
  const btnList = [
    {
      text: '+ New Leave Type',
      classes: 'green-btn',
      action: () => {
        setLeaveTpe({ name: '', leave_type: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    content: (
      <AddEditLeave
        leaveType={leaveType}
        title={`${leaveType?.name ? 'Edit' : 'Add New'} Leave Type`}
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
        setLeaveTpe(record);
        setVisible(true);
        }
      },
    };
  };

  const onSearch = (value) => {
    console.log({ value });
    if (value) {
      let searchVal = {
        leave_type: value?.leaveType ? value?.leaveType : '',
      };
      setSearchVal(searchVal);
      setPage(1);
      dispatch(getLeaveTypesList(1, 10, '', '', searchVal));
    }
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getLeaveTypesList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
      dispatch(getLeaveTypesList(pagination.current, pagination.pageSize, '', ''));
    }
  };

  useEffect(() => {
    if (!visible) {
      dispatch(getLeaveTypesList(page, limit, '', ''));
    }
  }, [visible]);

  useEffect(() => {
    dispatch(getAllApprovers(company));
    dispatch(getLeaveList(company));
  }, []);

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Leave Types" btnList={allowed([Roles.SETUP], 'write') ? btnList : null} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={Search && onSearch}
            ListCol={ListCol}
            ListData={leaveTypesListData?.rows}
            pagination={{
              total: leaveTypesListData?.count,
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
