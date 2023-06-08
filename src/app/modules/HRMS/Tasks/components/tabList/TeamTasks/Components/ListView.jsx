import React, {useEffect, useState} from 'react';
import ListCard from '../../../../../../../molecules/ListCard';
import {getTeamTasksWithStatus} from '../../../../ducks/actions';
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
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name - b.name,
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
      title: 'Task',
      dataIndex: 'tasks',
      key: 'tasks',
      sorter: (a, b) => a.tasks - b.tasks,
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
    const [filterVal, setFilterVal] = useState(filters[0].value);
    const dispatch = useDispatch();
    const TeamTaskData = useSelector(state => state.tasks.teamTaskDataWithStatus);
    useEffect(() => {
        dispatch(getTeamTasksWithStatus('Development',filterVal));
      }, []);
    
      useEffect(() => {
        dispatch(getTeamTasksWithStatus('Development',filterVal));
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
        ListData={TeamTaskData}
        pagination={true}
    />
    )
}