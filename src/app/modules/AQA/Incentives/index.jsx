import React, { useState, useEffect } from 'react';
import { Row, Col, Switch, Button, message } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import ListCard from 'Molecules/ListCard';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Search from './components/Search';
import { getIncentiveList } from './ducks/actions';
import { addUpdateIncentive } from './ducks/services';
import AllRoles from '../../../../routing/config/AllRoles';
import { allowed } from '../../../../routing/config/utils';

const filters = [
    {
        label: 'All',
        value: 'All',
    },
    {
        label: 'Active',
        value: 'Active',
    },
    {
      label: 'Draft',
      value: 'Draft',
    },
    {
        label: 'Inactive',
        value: 'Inactive',
    },
];



export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const incentiveList = useSelector((state) => state.incentives.incentives);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState(null);
  const [filterVal, setFilterVal] = useState(filters[0].value);
  const locate = location.pathname.split('/')[1];


  const addNew = () => history.push('incentives/addnew');

  const btnList = [
    {
      text: '+ New Incentive',
      action: () => addNew(),
      classes: 'green-btn'
    },
  ];

  const onClickRow = (record) => {
    if(allowed([AllRoles.AQA.INCENTIVE], 'write') || allowed([AllRoles.MARKETING.INCENTIVE], 'write')) {
      console.log('i am here', `/${locate}/incentives/edit/${record.name}`)
      history.push(`/${locate}/incentives/edit/${record.name}`)
    }
  }

  const onStatus = (data) => {
    let body = {
      name: data.name,
      status: data.status == 'Active' ? 'Inactive' : 'Active',
    }
    addUpdateIncentive(body).then(res => {
      message.success('Status changed successfully');
      dispatch(getIncentiveList(filterVal, page, limit, '', '', search));
    }).catch(e => {
      const { response } = e;
      message.error('Something went wrong');
    })
  }

  const ListCol = [
    {
      title: 'Incentive Name',
      dataIndex: 'incentive_name',
      key: 'incentive_name',
      sorter: true,
      render: (text, record) => <Button type='link' htmlType='button' className='p-0 c-default linkbtn' onClick={() => onClickRow(record)}>{text}</Button>
    },
    {
      title: 'Fee Discount Percentage',
      dataIndex: 'fees_discount_percentage',
      key: 'fees_discount_percentage',
      sorter: true,
      align: 'center'
    },
    {
        title: 'Start Date',
        dataIndex: 'incentive_start_date',
        key: 'incentive_start_date',
        sorter: true,
    },
    {
        title: 'End Date',
        dataIndex: 'incentive_end_date',
        key: 'incentive_end_date',
        sorter: true,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => text != 'Draft' && text != 'Archive' ? <Switch checked={text == 'Active' ? true : false} onClick={() => onStatus(record)} /> : text,
    },
  ];

  useEffect(() => {
    dispatch(getIncentiveList(filterVal, 1, 10, '', '', null));
  }, [filterVal]);

  const onFilter = (e) => {
    setFilterVal(e.target.value);
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getIncentiveList(filterVal, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, search));
    } else {
      dispatch(getIncentiveList(filterVal, pagination.current, pagination.pageSize, '', '', search));
    }
  }


  

  const onSearch = (val) => {
    setSearch(JSON.stringify(val));
    dispatch(getIncentiveList(filterVal, page, limit, '', '', JSON.stringify(val)));
  };

  return (
    <Row gutter={[30, 24]}>
      <Col span={24}>
        <HeadingChip title={'Incentive List'} btnList={allowed([AllRoles.AQA.INCENTIVE], 'write') || allowed([AllRoles.MARKETING.INCENTIVE], 'write') ? btnList : null} />
      </Col>
      <Col span={24} className="clickRow">
        <ListCard
          Search={Search}
          onSearch={onSearch}
          filters={filters}
          filterValue={filterVal}
          onFilter={onFilter}
          ListCol={ListCol}
          ListData={incentiveList?.rows}
          onChange={onTableChange}
          pagination={{
              total: incentiveList?.count,
              current: page,
              pageSize: limit
          }}
        />
      </Col>
    </Row>
  );
};
