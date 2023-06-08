import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Button, Pagination, message } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditTeam from './Components/AddEditTeam';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getTeamList, getAllDepartmentList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { allowed } from '../../../../../../routing/config/utils';
import Roles from '../../../../../../routing/config/Roles';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [teamFiled, setTeamField] = useState({ company: '', name: '' });
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState('');
  const [searchValue, setSearchVal] = useState(null);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const teamListData = useSelector((state) => state.setup.teamsListData);
  const company = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company;

  useEffect(() => {
    if (!visible) {
      dispatch(getTeamList(page, limit, '', ''));
    }
  }, [visible]);
  useEffect(() => {
    dispatch(getAllDepartmentList(company));
  }, []);

  const ListCol = [
    {
      title: 'Team Name',
      dataIndex: 'team_name',
      key: 'team_name',
      sorter: true,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      sorter: true,
    },
    {
      title: 'Team Leader',
      dataIndex: 'team_leader',
      key: 'team_leader',
      sorter: true,
    },
    {
      title: 'Team Member',
      dataIndex: 'team_member',
      key: 'team_member',
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
        <Button type="link" className="list-links c-gray" onClick={() => {}}>
          <CloseCircleFilled />
        </Button>
      ),
    },
  ];

  const btnList = [
    {
      text: '+ New Team',
      classes: 'green-btn',
      action: () => {
        setTeamField({ company: '', name: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    content: (
      <AddEditTeam
        team={teamFiled}
        title={`${teamFiled?.name.length ? 'Edit' : 'Add New'} Team`}
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
        setTeamField(record);
        setVisible(true);
        }
      },
    };
  };

  const onSearch = (value) => {
    if (value) {
      let searchVal = {
        team_name: value?.teamName ? value?.teamName : '',
      };
      setSearchVal(searchVal);
      setPage(1);
      dispatch(getTeamList(1, 10, '', '', searchVal));
    }
  };

  const onTableChange = (pagination, filters, sorter) => {
    console.log('heloo', pagination, sorter, searchValue);
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getTeamList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, searchValue));
    } else {
      dispatch(getTeamList(pagination.current, pagination.pageSize, '', '', searchValue));
    }
  };

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Teams" btnList={allowed([Roles.SETUP], 'write') ? btnList : null} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={Search && onSearch}
            ListCol={ListCol}
            ListData={teamListData?.rows}
            pagination={{
              total: teamListData?.count,
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
