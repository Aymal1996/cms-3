import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import AddEditJob from './AddEditJob';
import ListCard from 'Molecules/ListCard';
import { getJobOpening } from '../dcuks/actions';
import { useDispatch, useSelector } from 'react-redux';
import HeadingChip from 'Molecules/HeadingChip';
import { allowed } from '../../../../../routing/config/utils';
import Roles from '../../../../../routing/config/Roles';
import moment from 'moment';

const colName = [
  {
    title: 'Job Title',
    dataIndex: 'job_position_name',
    key: 'job_position_name',
    sorter: true,
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    sorter: true,
  },
  {
    title: 'Date Open',
    dataIndex: 'date_open',
    key: 'date_open',
    sorter: true,
    render: (text) => text ? moment(text).format('Do MMMM YYYY') : '',
  },
  {
    title: 'Suitable Application',
    dataIndex: 'suitable_applicants',
    key: 'suitable_applicants',
    sorter: true,
    align: 'center',
  },
];

export default (props) => {

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [viewJobOpenings, setViewJobOpenings] = useState(false);
  const [rowData, setRowData] = useState();
  const openJobs = useSelector((state) => state.advancement.jobopen);

  useEffect(() => {
    dispatch(getJobOpening(page, limit, '', ''));
  }, []);

  const updateApi = () => {
    setRowData('');
    setViewJobOpenings(false);
    dispatch(getJobOpening(1, limit, '', ''));
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        setRowData(record);
        setViewJobOpenings(true);
      },
    };
  };

  const onGoBack = () => {
    setRowData('');
    setViewJobOpenings(false);
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getJobOpening(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
      dispatch(getJobOpening(pagination.current, pagination.pageSize, '', ''));
    }
  };

  const btnList = [
    {
      text: '+ Add Job Oppening',
      classes: 'green-btn',
      action: () => setViewJobOpenings(true),
    },
  ];

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <HeadingChip title={'Acquisitions'} btnList={allowed([Roles.ADVANCEMENT], 'write') ? btnList : null} />
      </Col>
      <Col span={24}>
        {viewJobOpenings ? (
          <Card bordered={false} className="uni-card h-auto">
            <Row gutter={[20, 20]} align="bottom">
              <Col span={24}>
                <Button
                  type="link"
                  htmlType="button"
                  className="p-0 c-gray-linkbtn"
                  icon={<LeftOutlined />}
                  onClick={onGoBack}
                >
                  Job Openings
                </Button>
              </Col>
              <Col span={24}>
                <AddEditJob data={rowData} updateApi={updateApi} />
              </Col>
            </Row>
          </Card>
        ) : (
          <ListCard
            title="Job Openings"
            classes="clickRow"
            onRow={onClickRow}
            ListCol={colName}
            ListData={openJobs?.rows}
            onChange={onTableChange}
            pagination={{
              total: openJobs?.count,
              current: page,
              pageSize: limit,
            }}
          />
        )}
      </Col>
    </Row>
  );
};
