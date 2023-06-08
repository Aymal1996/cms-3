import React, { useState, useEffect } from 'react';
import HeadingChip from '../../../../../molecules/HeadingChip';
import ListCard from '../../../../../molecules/ListCard';
import { Row, Col, Button, Typography } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import Search from '../Search';
import { useHistory } from 'react-router';
import GraphComponent from '../../../../../molecules/GraphComponent';
import { useSelector, useDispatch } from 'react-redux';
import { getOverallGrantsList, getGrantGraph } from '../../ducks/actions';

export default (props) => {
  const company_currency = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company_currency;

  const ListCol = [
    {
      title: 'Grant Date',
      dataIndex: 'grant_date',
      key: 'grant_date',
      sorter: true,
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      sorter: true,
    },
    {
      title: 'Grant Name',
      dataIndex: 'grant_name',
      key: 'grant_name',
      sorter: true,
    },
    {
      title: 'Research Name',
      dataIndex: 'grant_amount',
      key: 'grant_amount',
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
      render: (text, record) => {
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
      render: (text, record) => {
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

  const dispatch = useDispatch();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const overallGrants = useSelector((state) => state.grants.allgrantlist);
  const allGrantsGraph = useSelector((state) => state.grants.grantallgraph);

  useEffect(() => {
    dispatch(getGrantGraph());
  }, []);

  const onClickRow = (record) => {
    return {
      onClick: () => {
        history.push(`/faculty/grants/${record.name}`);
      },
    };
  };

  const onSearch = (val) => {
    if (val) {
      let searchVal = {
        grant_name: val.grant_name,
        source: val?.source ? val.source.value : '',
      };
      console.log('submit', searchVal);
      dispatch(getOverallGrantsList(page, limit, '', '', JSON.stringify(searchVal)));
    }
  };

  useEffect(() => {
    dispatch(getOverallGrantsList(1, 10));
  }, []);

  const onTableChange = (pagination, filters, sorter) => {
    console.log('heloo', pagination, sorter);
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getOverallGrantsList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
      dispatch(getOverallGrantsList(pagination.current, pagination.pageSize, '', ''));
    }
  };

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <Row gutter={[20, 30]}>
            <Col span={24}>
              <GraphComponent
                data={allGrantsGraph?.data}
                title={'Total Research Grant Amount'}
                barColor={'#02A574'}
                countClass="c-success"
                count={`${company_currency} ${allGrantsGraph?.records?.total_sum}`}
                text={`${allGrantsGraph?.records?.total_count} Research Grants In Total`}
              />
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Row gutter={[20, 30]}>
            <Col span={24}>
              <HeadingChip title="Research Grant List" />
            </Col>
            <Col span={24} className="clickRow">
              <ListCard
                ListCol={ListCol}
                ListData={overallGrants?.rows}
                Search={Search}
                onSearch={Search && onSearch}
                // onRow={onClickRow}
                onChange={onTableChange}
                pagination={{
                  total: overallGrants?.count,
                  current: page,
                  pageSize: limit,
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
