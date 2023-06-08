import React from 'react';
import ListWithDetails from './ListWithDetails';
import moment from 'moment';

export default (props) => {

  const { id, data, updateApi } = props;
  
  const ListCol = [
    {
      title: 'Contract Type',
      dataIndex: 'contract_type',
      key: 'contract_type',
      sorter: true,
      width: '130px'
    },
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      key: 'job_title',
      elipsis: true,
      sorter: true,
      width: '140px'
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      elipsis: true,
      sorter: true,
    },
    {
      title: 'Start',
      dataIndex: 'start_date',
      key: 'start_date',
      sorter: true,
      width: '120px',
    },
    {
      title: 'End',
      dataIndex: 'end_date',
      key: 'end_date',
      sorter: true,
      width: '120px',
    },
  ]

  const warnCol = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: true,
      width: '120px',
      render: text => text ? moment(text).format('Do MMMM YYYY') : '',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      sorter: true,
    },
  ]

  const tabs = {
    employmentHeading: 'Employment History',
    terminationHeading: 'Termination & Resignation',
    warningHeading: 'Warning Letter History',
    data: data,
    column: ListCol,
    warningColumg: warnCol,
  }

  return (
    <ListWithDetails details={tabs} />
  )
}