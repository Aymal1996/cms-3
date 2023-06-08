import React, { useState, useEffect } from 'react';
import { Row, Col, message } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import ListCard from 'Molecules/ListCard';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Search from './components/Search';
import AllRoles from '../../../../routing/config/AllRoles';
import { allowed } from '../../../../routing/config/utils';
import { getAllAgentUser } from '../Applications/ducks/actions';

const filters = [
  {
    label: 'All',
    value: 'All',
  },
  {
    label: 'Pending',
    value: 'Pending',
  },
  {
    label: 'Active',
    value: 'Active',
  },
  {
    label: 'Inactive',
    value: 'Inactive',
  },
];

const ListCol = [
  {
    title: 'Agent Name',
    dataIndex: 'first_name',
    key: 'first_name',
  },
  // {
  //   title: 'last_name',
  //   dataIndex: 'last_name',
  //   key: 'last_name',
  //   render: (text) => text ?? '-',
  // },
  {
    title: 'Agent Email',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Status',
    dataIndex: 'enabled',
    key: 'enabled',
    sorter: {
      compare: (a, b) => a.enabled - b.enabled,
      multiple: 3,
    },
    render: (text) => {
      let clname = '';
      if (text == 1) {
        clname = 'c-success';
      } else if (text == 0) {
        clname = 'c-error';
      }
      return <span className={`SentanceCase ${clname}`}>{text === 0 ? 'Inactive' : 'Active'}</span>;
    },
  },
];

export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState(null);
  const [filterVal, setFilterVal] = useState(filters[0].value);
  const agentUsersList = useSelector((state) => state.applicationForm.agentAllUsers);

  const addNew = () => history.push('/marketing/agents/addnew');

  const btnList = [
    {
      text: '+ New Agent',
      action: () => addNew(),
      classes: 'green-btn',
    },
  ];

  const onClickRow = (record) => {
    return {
      onClick: () => {
        history.push({
          pathname: `/marketing/agents/edit/${record.first_name}`,
          state: { agentEmail: record?.name },
        });
      },
    };
  };

  // const onStatus = (data) => {
  //   let body = {
  //     name: data.name,
  //     status: data.status == 'Active' ? 'Inactive' : 'Active',
  //   };
  //   addUpdateIncentive(body)
  //     .then((res) => {
  //       message.success('Status changed successfully');
  //       dispatch(getIncentiveList(filterVal, page, limit, '', '', search));
  //     })
  //     .catch((e) => {
  //       const { response } = e;
  //       message.error('Something went wrong');
  //     });
  // };

  

  useEffect(() => {
    dispatch(getAllAgentUser(filterVal, 1, 10, '', '', null));
  }, [filterVal]);

  const onFilter = (e) => {
    setFilterVal(e.target.value);
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(
        getAllAgentUser(filterVal, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, search),
      );
    } else {
      dispatch(getAllAgentUser(filterVal, pagination.current, pagination.pageSize, '', '', search));
    }
  };

  const onSearch = (val) => {
    setSearch(JSON.stringify(val));
    dispatch(getAllAgentUser(filterVal, page, limit, '', '', JSON.stringify(val)));
  };

  return (
    <Row gutter={[30, 24]}>
      <Col span={24}>
        <HeadingChip
          title={'Agents List'}
          btnList={allowed([AllRoles.MARKETING.APPLICATION], 'write') ? btnList : null}
        />
      </Col>
      <Col span={24} className="clickRow">
        <ListCard
          Search={Search}
          onSearch={onSearch}
          filters={filters}
          filterValue={filterVal}
          onFilter={onFilter}
          onRow={onClickRow}
          scrolling={500}
          ListCol={ListCol}
          ListData={agentUsersList.rows || []}
          onChange={onTableChange}
          pagination={{
            total: agentUsersList?.count || 0,
            current: page,
            pageSize: limit,
            showSizeChanger: false
          }}
        />
      </Col>
    </Row>
  );
};
