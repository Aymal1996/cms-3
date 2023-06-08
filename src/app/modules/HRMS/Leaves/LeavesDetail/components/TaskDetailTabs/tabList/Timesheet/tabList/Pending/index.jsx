import React from 'react';
import { useTranslate } from 'Translate';
import TimesheetTable from '../../../../../../../../../../molecules/HRMS/TableWithDetail';

const ListCol = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    width: 140,
  },
  {
      title: 'Project',
      dataIndex: 'project',
      key: 'project',
      elipsis: true
  },
  {
      title: 'Hours',
      dataIndex: 'hours',
      key: 'hours',
      width: 120,
      align: 'center',
  },
  {
      title: 'Task',
      dataIndex: 'tasks',
      key: 'tasks',
      ellipsis: true,
  },
  {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      align: 'right',
      render: (text) => {
        let clname = '';
        if (text == 'Approved') {
          clname = 'c-success';
        } else if (text == 'Rejected') {
          clname = 'c-error';
        } else if (~text.indexOf('Pending')) {
          clname = 'c-pending';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
  },
]

export default (props) => {
  const {data} = props;
  const il8n = useTranslate();
  const { t } = il8n;
  return (
    <TimesheetTable title="Pending Timesheet List" ListCol={ListCol} ListData={data}/>
  );
};