import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditWorkingHour from './Components/AddEditWorkingHour';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getWorkingHoursList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import Roles from '../../../../../../routing/config/Roles';
import {allowed} from '../../../../../../routing/config/utils';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [workingHourFields, setWorkingHourFields] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const [searchValue, setSearchVal] = useState(null);
  const workingHoursListData = useSelector((state) => state.setup.workingHoursListData);

  useEffect(() => {
    if (!visible) {
      dispatch(getWorkingHoursList(page, limit, '', ''));
    }
  }, [visible]);

  const ListCol = [
    {
      title: 'Template Name',
      dataIndex: 'template_name',
      key: 'template_name',
      sorter: true,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
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
      align: 'center',
      render: (text, record) => (
        <Button type="link" className="list-links c-gray" onClick={() => deleteRecord(record)}>
          <CloseCircleFilled />
        </Button>
      ),
    },
  ];

  const btnList = [
    {
      text: '+ New Working Hours',
      classes: 'green-btn',
      action: () => {
        setWorkingHourFields({ name: '', template_name: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: false,
    visibility: visible,
    content: (
      <AddEditWorkingHour
        workingHourTemp={workingHourFields}
        title={`${workingHourFields.name ? 'Edit' : 'Add New'} Working Hours`}
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
        setWorkingHourFields(record);
        setVisible(true);
        }
      },
    };
  };
  const onSearch = (value) => {
    if (value) {
      let searchVal = {
        company: value?.company_name ? value?.company_name.value : '',
        template_name: value?.template_name ? value?.template_name : '',
      };
      setSearchVal(searchVal);
      setPage(1);
      dispatch(getWorkingHoursList(1, 10, '', '', searchVal));
    }
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(
        getWorkingHoursList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, searchValue),
      );
    } else {
      dispatch(getWorkingHoursList(pagination.current, pagination.pageSize, '', '', searchValue));
    }
  };

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Working Hours" btnList={allowed([Roles.SETUP], 'write') ? btnList : null} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={onSearch}
            ListCol={ListCol}
            ListData={workingHoursListData?.rows}
            pagination={{
              total: workingHoursListData?.count,
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
