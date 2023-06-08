import React, { useState, useEffect } from 'react';
import ListCard from '../../../../../../molecules/ListCard';
import DetailsComponent from '../../../../../../molecules/HRMS/DetailsComponent';
import moment from 'moment';

export default ({details, updateApi}) => {

  const { title, key, heading, data, column, nodetail, detailTitle, onAction1,onAction2 } = details;
  const [rowDetails, setRowDetail] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const btnList = [
    {
      text: '+ Add New Timesheet',
      classes: 'green-btn',
      action: () => { setAddVisible(true); setActiveKey('1')},
    },
  ];

  const onClickRow = (record) => {

    return {
      onClick: () => {
        setRowDetail(true)
        let temp = [
          {
            label: 'Name',
            value: record?.name
          },
          {
            label: 'Timesheet Date',
            value: record?.date ? moment(record.date).format('Do MMMM YYYY') : ''
          },
          {
            label: 'Project Name',
            value: record?.project
          },
          {
            label: 'Total Hours',
            value: record?.hours
          },
          {
            label: 'Task',
            value: record?.tasks
          },
          {
            label: 'Status',
            value: record?.status,
            classi: record?.status =='Pending' ? 'c-pending' : record?.status == 'Approved' ? 'c-success' : 'c-error' 
          },
        ];
        setRowData(temp)
      },
    };
  }

  const onTableChange = (pagination, filters, sorter) => {
    console.log('heloo',pagination)
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      updateApi(key, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey);
    } else {
      updateApi(key, pagination.current, pagination.pageSize, '', '');
    }
  }

    return (
        <>
        {!rowDetails ?
            <ListCard 
            title={heading}
            onRow={!nodetail ? onClickRow : null}
            ListCol={column} 
            ListData={data?.rows} 
            pagination={{
              total: data?.count,
              current: page,
              pageSize: limit
            }}
            onChange={onTableChange}
            classes={`${!nodetail ? 'clickRow' : ''}`}
            scrolling={500}
            listClass="nospace-card"
            headclass='mt-1'
            />
            :
            <DetailsComponent 
            setRowDetail={setRowDetail} 
            mainTitle={detailTitle}
            backbtnTitle={heading}
            data={rowData}
            btn1title={'Approve'}
            btn2title={'Reject'}
            onAction1={onAction1}
            onAction2={onAction2}
            btnClass1='green-btn'
            btnClass2='red-btn'
            />
            }
        </>
    )
}