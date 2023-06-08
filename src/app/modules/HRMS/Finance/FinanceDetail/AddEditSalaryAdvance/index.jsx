import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import ListCard from 'Molecules/ListCard';
import { useSelector, useDispatch } from 'react-redux';
import { closeAllOpenForms, getFinanceDetail } from '../../ducks/actions';
import { LeftOutlined } from '@ant-design/icons';
import AddSalaryAdvance from '../../components/AddSalaryAdvance';
import { allowed } from '../../../../../../routing/config/utils';
import Roles from '../../../../../../routing/config/Roles';
import moment from 'moment';

const salayAdvCol = [
  {
    title: 'Date Applied',
    dataIndex: 'date_applied',
    key: 'date_applied',
    sorter: true,
    render: (text) => moment(text).format('Do MMMM YYYY'),
  },
  {
    title: 'Deduction Date',
    dataIndex: 'deduction_date',
    key: 'deduction_date',
    sorter: true,
    render: (text) => moment(text).format('Do MMMM YYYY'),
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
    //sorter: (a, b) => a.term_start.length - b.term_start.length,
    // render: (text, record) => moment(text).format('LL'),
  },
];

export default (props) => {
  
  const { id, advanceSalaryData } = props;
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState();
  const [viewSalaryAdvanceForm, setviewSalaryAdvanceForm] = useState(false);
  const tabVal = useSelector((state) => state.hrmsfinance.tabClose);

  const onFormViewer = (record) => {
    setRowData(record);
    dispatch(closeAllOpenForms(true));
    setviewSalaryAdvanceForm(true);
  };

  const onCloseForm = () => {
    dispatch(getFinanceDetail(id));
    setviewSalaryAdvanceForm(false);
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
      {viewSalaryAdvanceForm && tabVal ? (
        <Col span={24}>
          <Button
            type="link"
            htmlType="button"
            className="mb-1 p-0 c-gray-linkbtn"
            icon={<LeftOutlined />}
            onClick={onCloseForm}
          >
            Salary Advance List
          </Button>
          <AddSalaryAdvance id={id} data={rowData} onUpdateComplete={onCloseForm} />
        </Col>
      ) : (
        <Col span={24}>
          <Row gutter={[20, 30]} justify="end">
            <Col span="24">
              <ListCard
                listClass="nospace-card"
                title="Salary Advance List"
                classes="clickRow"
                ListCol={salayAdvCol}
                ListData={advanceSalaryData}
                pagination={false}
                onRow={onRowClickHandler}
                scrolling={500}
              />
            </Col>
            {allowed([Roles.HRMSFINANCE], 'write') && 
            <Col>
              <Button size="large" type="primary" onClick={onFormViewer}>
                + Add New Advance
              </Button>
            </Col>}
          </Row>
        </Col>
      )}
    </Row>
  );
}