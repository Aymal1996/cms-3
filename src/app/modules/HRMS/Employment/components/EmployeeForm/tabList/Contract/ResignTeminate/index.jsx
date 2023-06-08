import React from 'react';
import {Row, Col, message} from 'antd';
import ListCard from 'Molecules/ListCard';
import {deleteTerminateEmployeeMail} from '../../../../../ducks/services'

const colName = [
    {
      title: 'Contract Type',
      dataIndex: 'contract_type',
      key: 'contract_type',
      sorter: true,
    },
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      key: 'job_title',
      sorter: true,
    },
    {
      title: 'Last Date',
      dataIndex: 'last_working_date',
      key: 'last_working_date',
      sorter: true,
    },
    {
      title: 'Exit From',
      dataIndex: 'exit_date',
      key: 'exit_date',
      sorter: true,
      
    },
  ];

export default (props) => {

    const { data, updateApi, id, setLoad, setVisible, mode } = props;
    console.log('i0d',id)

    const onTerminateEmployee = () => {
      setLoad(true);
      deleteTerminateEmployeeMail(id)
        .then((response) => {
          setLoad(false);
          message.success('Employee Terminated Successfully');
          updateApi();
        })
        .catch((error) => {
          setLoad(false);
          message.error('Something went wrong');
        });
    };

    const reactivateEmp = () => {
      setLoad(true);
      deleteTerminateEmployeeMail(id, 1)
        .then((response) => {
          setLoad(false);
          message.success('Employee Re-Stored Successfully');
          updateApi();
        })
        .catch((error) => {
          setLoad(false);
          message.error('Something went wrong');
        });
    }

    return (
      <Row gutter={[20,20]}>
        <Col span={24}>
          <ListCard
          scrolling={data?.term_Resign && data?.term_Resign.length > 0 ? 500 : '100%'}
          title="Termination & Resignation"
          ListCol={colName}
          ListData={data?.term_Resign}
          pagination={false}
          extraBtn2={data?.is_employee_terminate == 1 ? 'Reactivate' : null}
          extraBtn={data?.is_employee_terminate == 0 ? 'Terminate Employee' : null}
          extraAction={() => onTerminateEmployee()}
          extraAction2={() => reactivateEmp()}
          btnClass='red-btn'
          btnClass2='green-btn'
          listClass="nospace-card"
          />
          </Col>
          </Row>
    )
}