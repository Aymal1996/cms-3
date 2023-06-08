import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import { Popup } from 'Atoms/Popup';
import ListCard from 'Molecules/ListCard';
import AddEditRoles from './Components/AddEditRoles';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getUserList, getSpecificEmployee, getAccessModules } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import Roles from '../../../../../../routing/config/Roles';
import {allowed} from '../../../.././../../routing/config/utils';

export default (props) => {

  const [visible, setVisible] = useState(false);
  const [userFields, setUserFileds] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const [searchValue, setSearchVal] = useState(null);
  const userList = useSelector((state) => state.setup.userList);

  useEffect(() => {
    dispatch(getAccessModules())
  }, []);

  useEffect(() => {
    if (!visible) {
      dispatch(getUserList(page, limit, '', ''));
    }
  }, [visible]);

  const ListCol = [
    {
      title: 'User Role',
      dataIndex: 'role_name',
      key: 'role_name',
      sorter: true,
    },
    {
      title: 'Role Access',
      dataIndex: 'role_access',
      key: 'role_access',
      sorter: true,
    },
    {
      title: 'Users',
      dataIndex: 'users',
      key: 'users',
      sorter: true,
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      sorter: true,
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
      text: '+ New User Role',
      classes: 'green-btn',
      action: () => {
        setUserFileds({ name: '', role_name: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    content: (
      <AddEditRoles
        roleData={userFields}
        title={`${userFields.name ? 'Edit' : 'Add New'} Roles`}
        onClose={() => setVisible(false)}
      />
    ),
    width: 1199,
    onCancel: () => setVisible(false),
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        if (allowed([Roles.SETUP], 'write')) {
        if (record.role_name != 'Staff') {
          setUserFileds(record);
          setVisible(true);
        }
        }
      },
    };
  };
  const onSearch = (value) => {
    if (value) {
      let searchVal = {
        role_name: value?.user_role ? value?.user_role : '',
      };
      setSearchVal(searchVal);
      setPage(1);
      dispatch(getUserList(1, 10, '', '', searchVal));
    }
  };
  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getUserList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, searchValue));
    } else {
      dispatch(getUserList(pagination.current, pagination.pageSize, '', '', searchValue));
    }
  };
  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="User Roles" btnList={allowed([Roles.SETUP], 'write') ? btnList : null} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={onSearch}
            ListCol={ListCol}
            ListData={userList?.rows}
            pagination={{
              total: userList?.count,
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
