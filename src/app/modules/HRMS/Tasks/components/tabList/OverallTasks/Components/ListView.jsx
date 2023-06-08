import React, {useEffect, useState} from 'react';
import ListCard from '../../../../../../../molecules/ListCard';
import {getOverallTasksWithStatus} from '../../../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

const filters = [
    {
      label: 'Pending',
      value: 'Pending',
    },
    {
      label: 'History',
      value: 'History',
    },
  ];

const ListCol = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        sorter: (a, b) => a.date - b.date,
    },
    {
        title: 'ID',
        dataIndex: 'employee_id',
        key: 'employee_id',
        sorter: (a, b) => a.employee_id - b.employee_id,
    },
    {
        title: 'Name',
        dataIndex: 'employee_name',
        key: 'employee_name',
        sorter: (a, b) => a.employee_name - b.employee_name,
    },
    {
        title: 'Project',
        dataIndex: 'project',
        key: 'project',
        sorter: (a, b) => a.project - b.project,
        elipsis: true
    },
    {
        title: 'Hours',
        dataIndex: 'hours',
        key: 'hours',
        sorter: (a, b) => a.hours - b.hours,
    },
    {
        title: 'Company',
        dataIndex: 'company',
        key: 'company',
        sorter: (a, b) => a.company - b.company,
    },
    {
        title: 'Team',
        dataIndex: 'team_name',
        key: 'team_name',
        sorter: (a, b) => a.team_name - b.team_name,
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
        } else if (text == ('Pending')) {
          clname = 'c-pending';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
    },
  ]

export default (props) => {
    const [filterVal, setFilterVal] = useState(filters[0].value);
    const dispatch = useDispatch();
    const overallData = useSelector(state => state.tasks.overallTaskDataWithStatus);
    useEffect(() => {
        dispatch(getOverallTasksWithStatus(filterVal));
      }, []);
    
      useEffect(() => {
        dispatch(getOverallTasksWithStatus(filterVal));
      }, [filterVal]);

      const onFilter = (e) => {
        setFilterVal(e.target.value);
      };

    return (
    <ListCard
        filters={filters}
        onFilter={onFilter}
        filterValue={filterVal}
        ListCol={ListCol}
        ListData={overallData}
        pagination={true}
    />
    )
}