import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import ListCard from 'Molecules/ListCard';
import { useDispatch, useSelector } from 'react-redux';
import MySearch from '../Search/MySearch';
import { getMyAttendance } from '../../ducks/actions';
import moment from 'moment';
import { statusList } from '../../../../../../configs/constantData'; 

const ListCol = [
  {
    title: 'Date in',
    dataIndex: 'date',
    key: 'date',
    render: (text) => (text ? moment(text).format('DD/MM/YYYY') : '-'),
    sorter: true,
  },
  {
    title: 'Date Out',
    dataIndex: 'Attendance_date_out',
    key: 'Attendance_date_out',
    render: (text) => (text ? moment(text).format('DD/MM/YYYY') : '-'),
    sorter: true,
  },
  {
    title: 'In',
    dataIndex: 'time_in',
    key: 'time_in',
    sorter: true,
    render: (text) => (text === '0:00:00' ? '-' : moment(text, 'h:mm:ss a').format('h:mm:ss a')),
  },
  {
    title: 'Out',
    dataIndex: 'time_out',
    key: 'time_out',
    sorter: true,
    render: (text) => (text === '0:00:00' ? '-' : moment(text, 'h:mm:ss a').format('h:mm:ss a')),
  },
  {
    title: 'Hours',
    dataIndex: 'total_work_hour',
    key: 'total_work_hour',
    align: 'center',
    sorter: true,
    render: (text) => (text === '0:00:00' ? '-' : `${text}`),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    sorter: true,
    render: (text) => {
      let clname = '';
      if (text == 'On Duty' || text == 'Rest Day' || text == 'On Leave' || text == 'Holiday') {
        clname = 'c-success';
      } else if (text == 'Absent') {
        clname = 'c-error';
      } else if (
        text == 'Late Clock In' ||
        text == 'Late Clock Out' ||
        text == 'Early Clock In' ||
        text == 'Early Clock Out'
      ) {
        clname = 'c-pending';
      }
      return <span className={`SentanceCase ${clname}`}>{text}</span>;
    },
  },
];

export default (props) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searching, setSearching] = useState(null);
  const myAttendance = useSelector((state) => state.attendance.myAttendance);
  const id = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;

  useEffect(() => {
    dispatch(getMyAttendance(id, page, limit, '', '', null));
  }, []);

  const onSearch = (search) => {
    setPage(1);
    if (search) {
      let searchVal = {};
      searchVal = {
        date: search?.date ? moment(search?.date).format('YYYY-MM-DD') : '',
        m_status: search?.status ? search?.status.value : '',
      };
      setSearching(searchVal);
      dispatch(getMyAttendance(id, 1, limit, '', '', searchVal));
    } else {
      setSearching(null);
      dispatch(getMyAttendance(id, 1, limit, '', '', null));
    }
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getMyAttendance(id, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, searching));
    } else {
      dispatch(getMyAttendance(id, pagination.current, pagination.pageSize, '', '', searching));
    }
  };

  return (
    <Card bordered={false} className="uni-card">
      <ListCard
        Search={MySearch}
        ListCol={ListCol}
        ListData={myAttendance?.rows}
        onSearch={onSearch}
        field1={statusList}
        listClass="nospace-card"
        onChange={onTableChange}
        pagination={{
          total: myAttendance?.count,
          current: page,
          pageSize: limit,
        }}
      />
    </Card>
  );
};
