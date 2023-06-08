import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useHistory } from 'react-router';
import { useTranslate } from 'Translate';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from '../../../../molecules/ListCard';
import Search from '../components/Search';
import { getScholarshipList, getScholarshipListPg } from '../ducks/actions';

const filters = [
  {
    label: 'Outstanding',
    value: 'Outstanding',
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
    label: 'Archive',
    value: 'Archive',
  },
];

export default (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [filterData, setFilterData] = useState(null);
  const [filterVal, setFilterVal] = useState('Active');
  const scholarship = useSelector((state) => state.scholarship.scholarshipList);
  const [page, setPage] = useState(1);
  const [limit,setLimit] = useState(10);

  const i18n = useTranslate();
  const { t } = i18n;

  const addNew = () => history.push('scholarships/addnew');

  const btnList = [
    {
      text: '+ New Scholarship',
      action: () => addNew(),
    },
  ];

  const ListCol = [
    {
      title: 'Scholarship Name',
      dataIndex: 'scholarship_name',
      key: 'scholarship_name',
      sorter: true,
      ellipsis: true,
    },
    {
      title: 'Students',
      dataIndex: 'total_students',
      key: 'total_students',
      sorter: true,
    },
    {
      title: 'Schemes',
      dataIndex: 'total_schemes',
      key: 'total_schemes',
      ellipsis: true,
      sorter: true,
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'statu',
      align: 'center',
      width: 140,
      render: (text) => {
        let clname = '';
        if (text == 'Active') {
          clname = 'c-success';
        } else if (text == 'Inactive') {
          clname = 'c-error';
        } else if (text == 'Draft') {
          clname = 'c-pending';
        } else if (text == 'Outstanding') {
          clname = 'c-error';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
    },
  ];

  useEffect(() => {
    dispatch(getScholarshipListPg(filters[1].value, page, limit, '', ''));
  }, []);

  useEffect(() => {
    filterVal && dispatch(getScholarshipListPg(filterVal, 1, 10, '', ''));
  }, [filterVal]);

  const onFilter = (e) => {
    setFilterVal(e.target.value);
  };

  const onSearch = (val) => {
    
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        history.push(`scholarships/${record.scholarship_code}`);
      },
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getScholarshipListPg(filterVal, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
      dispatch(getScholarshipListPg(filterVal, pagination.current, pagination.pageSize, '', ''));
    }
  }

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <HeadingChip title="Scholarship List" btnList={btnList} />
      </Col>
      <Col span={24} className='clickRow'>
        <ListCard
          onRow={onClickRow}
          Search={Search}
          onSearch={onSearch}
          filters={filters}
          filterValue={filterVal}
          onFilter={onFilter}
          filterData={filterData}
          ListCol={ListCol}
          ListData={scholarship?.rows}
          pagination={true}
          onChange={onTableChange}
          pagination={{
            total: scholarship?.count,
            current: page,
            pageSize: limit
          }}
        />
      </Col>
    </Row>
  );
};
