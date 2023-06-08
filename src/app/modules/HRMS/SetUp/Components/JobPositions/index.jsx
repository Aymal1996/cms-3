import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditPosition from './Components/AddEditPosition';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getJobPositionsList, getSkillList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import Roles from '../../../../../../routing/config/Roles';
import { allowed } from '../../../../../../routing/config/utils';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [positionFields, setPositionFields] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchVal] = useState(null);
  const dispatch = useDispatch();
  const jobPositionsListData = useSelector((state) => state.setup.jobPositionsListData);

  useEffect(() => {
    if (!visible) {
      dispatch(getJobPositionsList(page, limit, '', ''));
    }
  }, [visible]);

  useEffect(() => {
    dispatch(getSkillList());
  }, []);

  const ListCol = [
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      key: 'job_title',
      sorter: true,
    },
    {
      title: 'Work Quality',
      dataIndex: 'work_quality',
      key: 'work_quality',
      sorter: true,
      align: 'center',
    },
    {
      title: 'Work Speed',
      dataIndex: 'work_speed',
      key: 'work_speed',
      sorter: true,
      align: 'center',
    },
    {
      title: 'Leadership',
      dataIndex: 'leadership',
      key: 'leadership',
      sorter: true,
      align: 'center',
    },
    {
      title: 'Critical Thinking',
      dataIndex: 'critical_thinking',
      key: 'critical_thinking',
      sorter: true,
      align: 'center',
    },
    {
      title: 'Team Work',
      dataIndex: 'team_work',
      key: 'team_work',
      sorter: true,
      align: 'center',
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      sorter: true,
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
      text: '+ New Job Position',
      classes: 'green-btn',
      action: () => {
        setPositionFields({ name: '', job_title: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    content: (
      <AddEditPosition
        jobPosition={positionFields}
        title={`${positionFields.name ? 'Edit' : 'Add New'} Job Position`}
        onClose={() => {
          setVisible(false);
        }}
      />
    ),
    width: 1199,
    onCancel: () => setVisible(false),
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        if (allowed([Roles.SETUP], 'write')) {
        setPositionFields(record);
        setVisible(true);
        }
      },
    };
  };
  const onSearch = (value) => {
    if (value) {
      let searchVal = {
        job_position_name: value?.job_title ? value?.job_title : '',
      };
      setSearchVal(searchVal);
      setPage(1);
      dispatch(getJobPositionsList(1, 10, '', '', searchVal));
    }
  };

  const onTableChange = (pagination, filters, sorter) => {
    console.log('heloo', pagination);
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(
        getJobPositionsList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, searchValue),
      );
    } else {
      dispatch(getJobPositionsList(pagination.current, pagination.pageSize, '', '', searchValue));
    }
  };
  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Job Positions" btnList={allowed([Roles.SETUP], 'write') ? btnList : null} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={onSearch}
            ListCol={ListCol}
            ListData={jobPositionsListData?.rows}
            pagination={{
              total: jobPositionsListData?.count,
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
