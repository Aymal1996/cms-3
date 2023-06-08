import React, { useState, useEffect } from 'react';
import HeadingChip from '../../../../../molecules/HeadingChip';
import ListCard from '../../../../../molecules/ListCard';
import { Row, Col, Button } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import Search from '../Search';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getGrantsListByStatus, getMyGrantGraph } from '../../ducks/actions';
import GraphComponent from '../../../../../molecules/GraphComponent';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../../configs/constantData';

const filters = [
  {
    label: 'My Grants',
    value: 'My Grants',
  },
  {
    label: 'All Grants',
    value: 'All Grants',
  },
  {
    label: 'Draft',
    value: 'Draft',
  },
];

export default (props) => {
  const company_currency = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company_currency;
  const history = useHistory();
  const dispatch = useDispatch();
  const GrantsList = useSelector((state) => state.grants.grantlist_by_status);
  const myGrantsGraph = useSelector((state) => state.grants.grantmygraph);
  const [filterVal, setFilterVal] = useState('My Grants');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

  const btnList = [
    {
      text: '+ New Grant',
      classes: 'green-btn',
      action: () => history.push('/faculty/grants/addgrants'),
    },
  ];

  const onClickRow = (record) => {
    return {
      onClick: () => {
        history.push(`/faculty/grants/${record.name}`);
      },
    };
  };

  const ListCol = [
    {
      title: 'Grant Date',
      dataIndex: 'grant_date',
      key: 'grant_date',
      ellipsis: true,
      sorter: true,
    },
    {
      title: 'Source',
      dataIndex: 'source',
      ellipsis: true,
      key: 'source',
      sorter: true,
    },
    {
      title: 'Grant Name',
      dataIndex: 'grant_name',
      key: 'grant_name',
      ellipsis: true,
      sorter: true,
    },
    {
      title: 'Research Name',
      dataIndex: 'grant_amount',
      key: 'grant_amount',
      ellipsis: true,
      sorter: true,
      align: 'center',
      render: (text) => {
        return (
          <span className="c-success">
            {company_currency} {text}
          </span>
        );
      },
    },
    {
      title: 'Faculty',
      dataIndex: 'faculty_verification',
      key: 'faculty_verification',
      sorted: (a, b) => a.Action - b.Action,
      align: 'center',
      render: (text) => {
        if (text == 'Verified') {
          return (
            <Button type="link" className="c-success" onClick={() => {}}>
              <CheckCircleFilled />
            </Button>
          );
        } else if (text == 'Pending') {
          return (
            <Button type="link" className="list-links" onClick={() => {}}>
              <CheckCircleFilled />
            </Button>
          );
        } else {
          return (
            <Button type="link" className="c-error" onClick={() => {}}>
              <CloseCircleFilled />
            </Button>
          );
        }
      },
    },

    {
      title: 'Finance',
      dataIndex: 'finance_verification',
      key: 'finance_verification',
      sorted: (a, b) => a.Action - b.Action,
      align: 'center',
      render: (text) => {
        if (text == 'Verified') {
          return (
            <Button type="link" className="c-success" onClick={() => {}}>
              <CheckCircleFilled />
            </Button>
          );
        } else if (text == 'Pending') {
          return (
            <Button type="link" className="list-links" onClick={() => {}}>
              <CheckCircleFilled />
            </Button>
          );
        } else {
          return (
            <Button type="link" className="c-error" onClick={() => {}}>
              <CloseCircleFilled />
            </Button>
          );
        }
      },
    },
  ];

  useEffect(() => {
    dispatch(getGrantsListByStatus(page, limit, '', '', '', filterVal));
    dispatch(getMyGrantGraph());
  }, []);

  const data = myGrantsGraph.data;

  const onSearch = (val) => {
    if (val) {
      let searchVal = {
        grant_name: val.grant_name,
        source: val?.source ? val.source.value : '',
      };
      console.log('submit', searchVal);
      dispatch(getGrantsListByStatus(page, limit, '', '', JSON.stringify(searchVal), filterVal));
    }
  };

  const onFilter = (e) => {
    setFilterVal(e.target.value);
    dispatch(getGrantsListByStatus(1, 10, '', '', '', e.target.value));
  };

  const defaultval = 'My Grants';
  const onTableChange = (pagination, filters, sorter, defaultval) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(
        getGrantsListByStatus(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, '', filterVal),
      );
    } else {
      dispatch(getGrantsListByStatus(pagination.current, pagination.pageSize, '', '', '', filterVal));
    }
  };

  return (
    <>
      <HeadingChip btnList={btnList} classes={`${isHDScreen ? 'optionsTabs' : 'mb-1-5'}`} />
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <GraphComponent
            data={myGrantsGraph?.data}
            title={'Total Research Grant Amount'}
            barColor={'#02A574'}
            countClass="c-success"
            count={`${company_currency} ${myGrantsGraph?.records?.total_sum}`}
            text={`${myGrantsGraph?.records?.total_count} Research Grants In Total`}
          />
        </Col>

        <Col span={24}>
          <HeadingChip title="Research Grant List" />
        </Col>

        <Col span={24} className="clickRow">
          <ListCard
            onRow={onClickRow}
            Search={Search}
            filters={filters}
            filterValue={filterVal}
            onSearch={onSearch}
            onFilter={onFilter}
            ListCol={ListCol}
            ListData={GrantsList?.rows}
            class="mb-0"
            pagination={{
              total: GrantsList?.count,
              current: page,
              pageSize: limit,
            }}
            onChange={onTableChange}
          />
        </Col>
      </Row>
    </>
  );
};
