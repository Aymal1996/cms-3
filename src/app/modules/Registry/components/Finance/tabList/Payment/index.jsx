import React, { useEffect } from 'react';
import { Row, Col, Card, Typography, Space, Table, Button } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentBalanceBreakdown, getStudentTransHistory } from '../../../../Students/ducks/actions';
import { useHistory, useParams } from 'react-router-dom';

const { Title, Text } = Typography;

export default (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const outstandingData = useSelector((state) => state.students.balanceBreakdown);
  const transactionData = useSelector((state) => state.students.balanceHistory);
  const company_currency =
    localStorage.getItem('userdetails') &&
    JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company_currency;
  const ListCol = [
    {
      title: 'Invoice No',
      dataIndex: 'invoice_no',
      key: 'invoice_no',
    },
    {
      title: 'Invoice Date',
      dataIndex: 'invoice_date',
      key: 'invoice_date',
      render: (text) => (text ? moment(text).format('Do MMMM YYYY') : ''),
    },
    {
      title: 'Item',
      dataIndex: 'category',
      key: 'category',
      elipsis: true,
    },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      key: 'due_date',
      render: (text) => (text ? moment(text).format('Do MMMM YYYY') : ''),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => (
        <span className="c-error">
          {company_currency} {text}
        </span>
      ),
    },
  ];

  const ListCol1 = [
    {
      title: 'Invoice No',
      dataIndex: 'ref_no',
      key: 'ref_no',
    },
    {
      title: 'Invoice Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => (text ? moment(text).format('Do MMMM YYYY') : ''),
    },
    {
      title: 'Item',
      dataIndex: 'category',
      key: 'category',
      elipsis: true,
    },

    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => (
        <span className="c-error">
          {company_currency} {text}
        </span>
      ),
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      render: (text) => (
        <span>
          {company_currency} {text}
        </span>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getStudentBalanceBreakdown(id));
    dispatch(getStudentTransHistory(id));
  }, []);

  const onClickRow = (record) => {
    return {
      onClick: () => {
        history.push({
          pathname: `/finance/transactions/`,
          state: { sid: id, ref: record?.invoice_no, balance: outstandingData?.total_outstanding_balance },
        });
      },
    };
  };

  return (
    <Row gutter={[20, 30]} align="bottom">
      <Col span={24}>
        <Title level={4} className="mb-0 c-default">
          Payment Details
        </Title>
      </Col>

      <Col span={12}>
        <Card bordered={false} className="small-card8 b-error mb-1">
          <Space size={10} className="w-100" direction="vertical">
            <Title level={5} className="mb-0">
              Outstanding Balance
            </Title>
            <Space size={0} direction="vertical">
              <Title level={3} className="mb-0">
                {company_currency} {outstandingData?.total_outstanding_balance}
              </Title>
              {/* <Text className='op-6'>Due: 15th April 2021</Text> */}
            </Space>
          </Space>
        </Card>
      </Col>

      <Col span={12}>
        <Card bordered={false} className="small-card8 b-black mb-1">
          <Space size={10} className="w-100" direction="vertical">
            <Title level={5} className="mb-0">
              Over Payment Balance
            </Title>
            <Space size={0} direction="vertical">
              <Title level={3} className="mb-0">
                {company_currency} {outstandingData?.over_payment_balance}
              </Title>
              {/* <Text className='op-6'>Last deposit: 10th April 2021</Text> */}
            </Space>
          </Space>
        </Card>
      </Col>

      <Col span={24}>
        <Space direction="vertical" size={20} className="w-100">
          <Title level={4} className="mb-0 c-default">
            Outstanding Balance Breakdown
          </Title>
          <div className="clickRow">
            <Table
              className="custom-table table-header-highlight mb-1"
              bordered={false}
              columns={ListCol}
              dataSource={outstandingData?.data}
              pagination={false}
              onRow={onClickRow}
            />
          </div>
        </Space>
      </Col>

      <Col span={24}>
        <Space direction="vertical" size={20} className="w-100">
          <Title level={4} className="mb-0 c-default">
            Transaction History
          </Title>
          <Table
            className="custom-table table-header-highlight"
            bordered={false}
            columns={ListCol1}
            dataSource={transactionData?.data}
            pagination={false}
          />
        </Space>
      </Col>

      <Col span={24} align="center">
        <Button type="link" className="white-link">
          View more
        </Button>
      </Col>
    </Row>
  );
};
