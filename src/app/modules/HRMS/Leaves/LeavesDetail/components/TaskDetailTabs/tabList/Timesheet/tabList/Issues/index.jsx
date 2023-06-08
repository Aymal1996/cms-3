import React, {useState} from 'react';
import { Button } from 'antd';
import { useTranslate } from 'Translate';
import ListCard from '../../../../../../../../../../molecules/ListCard';

const ListCol = [
  {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => a.date - b.date,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    render: (text) => {
      let clname = '';
      if (text == 'Approved') {
        clname = 'c-success';
      } else if (text == 'Rejected' || text == 'Missed') {
        clname = 'c-error';
      } else if (text == 'Pending') {
        clname = 'c-pending';
      }
      return <span className={`SentanceCase ${clname}`}>{text}</span>;
    },
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: (text, record) => (
      <Button type="primary" error className="list-links">
        Notify
      </Button>
    ),
  },
]

export default (props) => {
  const {data} = props;
  const il8n = useTranslate();
  const { t } = il8n;
  return (
    <>
    {data && (
      <ListCard title="Missed Worksheet List" ListCol={ListCol} ListData={data} pagination={true} />
    )}
    </>
  );
};