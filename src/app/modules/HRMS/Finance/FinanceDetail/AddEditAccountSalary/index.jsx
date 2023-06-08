import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import ListCard from 'Molecules/ListCard';
import { closeAllOpenForms, getFinanceDetail } from '../../ducks/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import SalaryInformation from '../../components/AccountSalaryForms/SalaryInformation';
import AddAccount from '../../components/AccountSalaryForms/AddAccount';
import AddAllowence from '../../components/AccountSalaryForms/AddAllowances';
import Roles from '../../../../../../routing/config/Roles';
import { allowed } from '../../../../../../routing/config/utils';

export default (props) => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { accountData, allowanceData, salaryInfo } = props;
  const [selectRowData, setSelectRowData] = useState();
  const tabVal = useSelector((state) => state.hrmsfinance.tabClose);
  const [viewSpecificForm, setViewSpecificForm] = useState({
    accountForm: false,
    allowanceForm: false,
  });
  const empEditRecords = [
    {
      heading: 'Account List',
      btnAcation: allowed([Roles.HRMSFINANCE], 'write') ? (
        <Button size="large" type="primary" onClick={() => onFormViewHandler('accountForm', '')}>
          + Add New Account
        </Button>
      ) : null,

      empHistoryCol: [
        {
          title: 'Account No.',
          dataIndex: 'account_no',
          key: 'account_no',
          sorter: true,
        },
        {
          title: 'Account Type',
          dataIndex: 'account_type',
          key: 'account_type',
          sorter: true,
        },
        {
          title: 'Branch',
          dataIndex: 'branch',
          key: 'branch',
          sorter: true,
          ellipsis: true,
        },
      ],
    },
    {
      heading: 'Allowances List',
      btnAcation: allowed([Roles.HRMSFINANCE], 'write') ? (
        <Button size="large" type="primary" onClick={() => onFormViewHandler('allowanceForm', '')}>
          + Add New Allowence
        </Button>
      ) : null,

      empHistoryCol: [
        {
          title: 'Date',
          dataIndex: 'date_given',
          key: 'date_given',
          sorter: true,
          // render: (text, record) => moment(text).format('LL'),
        },
        {
          title: 'Allowance Type',
          dataIndex: 'allowance_type',
          key: 'allowance_type',
          sorter: true,
        },
        {
          title: 'Ammount',
          dataIndex: 'amount',
          key: 'amount',
          sorter: true,
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
      ],
    },
  ];

  function onFormViewHandler(form, record) {
    dispatch(closeAllOpenForms(true));
    let viewFormObj = {
      ...viewSpecificForm,
      accountForm: false,
      allowanceForm: false,
    };
    if (form.length > 0) {
      viewFormObj[form] = true;
    }
    dispatch(getFinanceDetail(id));
    setSelectRowData(record);
    setViewSpecificForm(viewFormObj);
  }

  const onRowClickHandler = (record) => {
    return {
      onClick: () => {
        if (record?.account_no) {
          onFormViewHandler('accountForm', record);
        } else if (record?.allowance_type) {
          onFormViewHandler('allowanceForm', record);
        }
      },
    };
  };
  return (
    <Row gutter={[24, 30]} align="bottom">
      {viewSpecificForm.accountForm && tabVal ? (
        <Col span={24}>
          <Button
            type="link"
            htmlType="button"
            className="mb-1 p-0 c-gray-linkbtn"
            icon={<LeftOutlined />}
            onClick={() => onFormViewHandler('', '')}
          >
            Account List
          </Button>
          <AddAccount selectedAccout={selectRowData} onCloseForm={onFormViewHandler} />
        </Col>
      ) : viewSpecificForm.allowanceForm && tabVal ? (
        <Col span={24}>
          <Button
            type="link"
            htmlType="button"
            className="mb-1 p-0 c-gray-linkbtn"
            icon={<LeftOutlined />}
            onClick={() => onFormViewHandler('', '')}
          >
            Allowances List
          </Button>
          <AddAllowence selectedAllowance={selectRowData} onCloseForm={onFormViewHandler} />
        </Col>
      ) : (
        <>
          <Col span={24}>
            <Row gutter={[20, 30]} justify="end">
              <Col span={24}>
                <ListCard
                  listClass="nospace-card"
                  classes="clickRow"
                  title={empEditRecords[0].heading}
                  ListCol={empEditRecords[0].empHistoryCol}
                  ListData={accountData}
                  pagination={false}
                  scrolling={500}
                  onRow={onRowClickHandler}
                />
              </Col>
              <Col>{empEditRecords[0].btnAcation}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <SalaryInformation id={id} />
          </Col>
          <Col span={24}>
            <Row gutter={[20, 30]} justify="end">
              <Col span={24}>
                <ListCard
                  listClass="nospace-card"
                  classes="clickRow"
                  title={empEditRecords[1].heading}
                  ListCol={empEditRecords[1].empHistoryCol}
                  ListData={allowanceData}
                  pagination={false}
                  scrolling={500}
                  onRow={onRowClickHandler}
                />
              </Col>
              <Col>{empEditRecords[1].btnAcation}</Col>
            </Row>
          </Col>
        </>
      )}
    </Row>
  );
};