import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import ListCard from '../../../../../molecules/ListCard';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { closeAllOpenForms, getFinanceDetail } from '../../ducks/actions';
import { LeftOutlined } from '@ant-design/icons';
import AddLoan from '../../components/AddLoan';
import moment from 'moment';
import { allowed } from '../../../../../../routing/config/utils';
import Roles from '../../../../../../routing/config/Roles';

const AddEditLoans = (props) => {
  const company_currency = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company_currency;

  const loanCol = [
    {
      title: 'Loan Date',
      dataIndex: 'loan_start_date',
      key: 'loan_start_date',
      sorter: true,
      render: (text) => moment(text).format('Do MMMM YYYY'),
    },
    {
      title: 'Type',
      dataIndex: 'loan_type',
      key: 'loan_type',
      sorter: true,
    },
    {
      title: 'Ammount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: true,
      render: (text) => `${company_currency} ${text}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      render: (text) => {
        let clname = '';
        if (text == 'Completed') {
          clname = 'c-success';
        } else if (text == 'Incomplete') {
          clname = 'c-error';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
    },
  ];

  const { loanData } = props;
  const { id } = useParams();
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState();
  const [viewLoanForm, setViewLoanForm] = useState(false);
  const tabVal = useSelector((state) => state.hrmsfinance.tabClose);

  const onFormViewer = (record) => {
    setRowData(record);
    dispatch(closeAllOpenForms(true));
    setViewLoanForm(true);
  };
  const onCloseForm = () => {
    dispatch(getFinanceDetail(id));
    setViewLoanForm(false);
  };
  const onRowClickHandler = (record) => {
    return {
      onClick: () => {
        onFormViewer(record);
      },
    };
  };
  return (
    <Row gutter={[24, 30]} align="bottom">
      {viewLoanForm && tabVal ? (
        <Col span={24}>
          <Button
            type="link"
            htmlType="button"
            className="mb-1 p-0 c-gray-linkbtn"
            icon={<LeftOutlined />}
            onClick={onCloseForm}
          >
            Loan List
          </Button>
          <AddLoan data={rowData} onUpdateComplete={onCloseForm} />
        </Col>
      ) : (
        <Col span={24}>
          <Row gutter={[20, 30]} justify="end">
            <Col span="24">
              <ListCard
                listClass="nospace-card"
                title="Loan List"
                classes="clickRow"
                ListCol={loanCol}
                ListData={loanData}
                pagination={false}
                onRow={onRowClickHandler}
                scrolling={500}
              />
            </Col>
            {allowed([Roles.HRMSFINANCE], 'write') && (
              <Col>
                <Button size="large" type="primary" onClick={onFormViewer}>
                  + Add New Loan
                </Button>
              </Col>
            )}
          </Row>
        </Col>
      )}
    </Row>
  );
};

export default AddEditLoans;
