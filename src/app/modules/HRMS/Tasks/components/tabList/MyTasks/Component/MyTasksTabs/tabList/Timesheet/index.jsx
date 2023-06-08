import React, {useEffect} from 'react';
import { useTranslate } from 'Translate';
import TimesheetTable from '../../../../../../../../../../molecules/HRMS/TableWithDetail';
import {getMyTasks} from '../../../../../../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

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
        } else if (text == 'Rejected' || text == 'Missed') {
          clname = 'c-error';
        } else if (text == 'Pending') {
          clname = 'c-pending';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
  },
]

export default (props) => {
  const il8n = useTranslate();
  const { t } = il8n;
  const dispatch = useDispatch();
  const myTaskData = useSelector(state => state.tasks.myTaskData);
  useEffect(() => {
    dispatch(getMyTasks('HR-EMP-00002'));
  }, []);

  return (
    <>
      {myTaskData && (
        <TimesheetTable ListCol={ListCol} ListData={myTaskData?.timesheet}/>
      )}
    </>
  );
};