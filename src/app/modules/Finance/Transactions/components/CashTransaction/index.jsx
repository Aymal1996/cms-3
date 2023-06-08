import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from 'Molecules/ListCard';
import Search from '../Search';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../../configs/constantData';
import { getTransactionListPgCash } from '../../../ducks/actions';
import { formatCurrency } from '../../../../../../features/utility';
const TRANSACTION_TYPE = 'Cash';

export default ({iProps}) => {

  const company_currency = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company_currency;

  const ListCol = [
    {
      title: 'Date',
      dataIndex: 'transaction_date',
      key: 'transaction_date',
      sorter: true,
      ellipsis: true,
    },
    {
      title: 'Ref No',
      dataIndex: 'ref_no',
      key: 'ref_no',
      sorter: true,
    },
    {
      title: 'Type',
      dataIndex: 'transaction_type',
      key: 'transaction_type',
      ellipsis: true,
      sorter: true,
    },
    {
      title: 'Category',
      dataIndex: 'transaction_category',
      key: 'transaction_category',
      ellipsis: true,
      sorter: true,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      ellipsis: true,
      sorter: true,
      render: (text) => {
        return <span className={`SentanceCase`}>{company_currency} {formatCurrency(text)}</span>;
      },
    },
    {
      title: 'ID',
      dataIndex: 'student_id',
      key: 'student_id',
      ellipsis: true,
      sorter: true,
    },
    {
      title: 'Name',
      dataIndex: 'student_name',
      key: 'student_name',
      ellipsis: true,
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 140,
      render: (text) => {
        let clname = '';
        if (text == 'Verified') {
          clname = 'c-success';
        } else if (text == 'Incomplete') {
          clname = 'c-error';
        } else if (text == 'Pending') {
          clname = 'c-pending';
        } else if (text == 'Unverified') {
          clname = 'c-error';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
    },
  ];
    
  const dispatch = useDispatch();
  // const history = useHistory();
  // const data = [];
  const { setData } = iProps;
  const [page, setPage] = useState(1);
  const [limit,setLimit] = useState(10);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  const data = useSelector((state) => state.finance.transactionListCash);

  const btnList = [
    {
      text: '+ New Transaction',
      classes: 'green-btn',
      action: () => addTrans(),
    },
  ];

  useEffect(() => {
    dispatch(getTransactionListPgCash('All', page, limit, TRANSACTION_TYPE,{}));
  }, []);

  const addTrans = () => {
      setData({
        data: null,
        visible: true,
        type: 'Cash'
      });
  }

  const onSearch = (search) => {
    dispatch(getTransactionListPgCash('All', page, limit, TRANSACTION_TYPE, search));
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        setData({
          data: record,
          visible: true,
          type: 'Cash'
        })
      },
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getTransactionListPgCash('All', pagination.current, pagination.pageSize, '', {},sorter.order, sorter.columnKey));
    } else {
      dispatch(getTransactionListPgCash('All', pagination.current, pagination.pageSize,'', {}, '', ''));
    }
  }

  return (
    <>
      <HeadingChip btnList={btnList} classes={`${isHDScreen ? 'optionsTabs' : 'mb-1-5'}`} />
      <Row gutter={[20, 30]}>
        <Col span={24} className='clickRow'>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={onSearch}
            ListCol={ListCol}
            ListData={data?.rows}
            onChange={onTableChange}
            pagination={{
              total: data?.count,
              current: page,
              pageSize: limit
            }}
          />
        </Col>
      </Row>
    </>
  );
};
