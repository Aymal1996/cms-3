import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import { CloseCircleFilled } from '@ant-design/icons';
import { getDepartments } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import AddEditDepartment from './Component/AddEditDepartment';
import Search from './Component/Search';
import {allowed} from '../../../../../../routing/config/utils';
import Roles from '../../../../../../routing/config/Roles';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [departmentFields, setDepartmentFields] = useState('');
  const [page, setPage] = useState(1);
  const [searchValue, setSearchVal] = useState(null);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const departmentList = useSelector((state) => state.setup.departmentList);

  useEffect(() => {
    if (!visible) {
      dispatch(getDepartments(page, limit, '', ''));
    }
  }, [visible]);

  const ListCol = [
    {
      title: 'Department',
      dataIndex: 'department_name',
      key: 'department_name',
      sorter: true,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      sorter: true,
    },
    {
      title: 'Employee Name',
      dataIndex: 'employee_name',
      key: 'employee_name',
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      render: (text, record) => (
        <Button type="link" className="list-links c-gray" onClick={() => {}}>
          <CloseCircleFilled />
        </Button>
      ),
    },
  ];

  const btnList = [
    {
      text: '+ New Department',
      classes: 'green-btn',
      action: () => {
        setDepartmentFields({ name: '', company: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    content: (
      <AddEditDepartment
        departmentField={departmentFields}
        title={`${departmentFields.name ? 'Edit' : 'Add New'} Department`}
        onClose={() => setVisible(false)}
      />
    ),
    width: 900,
    onCancel: () => setVisible(false),
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        if (allowed([Roles.SETUP], 'write')) {
        setDepartmentFields(record);
        setVisible(true);
        }
      },
    };
  };
  const onSearch = (value) => {
    if (value) {
      let searchVal = {
        name: value?.department_name ? value?.department_name : '',
      };
      setSearchVal(searchVal);
      setPage(1);
      dispatch(getDepartments(1, 10, '', '', searchVal));
    }
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getDepartments(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, searchValue));
    } else {
      dispatch(getDepartments(pagination.current, pagination.pageSize, '', '', searchValue));
    }
  };

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Departments" btnList={allowed([Roles.SETUP], 'write') ? btnList : null} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={Search && onSearch}
            ListCol={ListCol}
            ListData={departmentList?.rows}
            pagination={{
              total: departmentList?.count,
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
