import React from 'react';
import CalendarTable from '../CalendarTable';
import AttendanceTable from '../AttendanceTable';

const Components = {
    CalendarTable, 
    AttendanceTable
 }

 export default (props) => {
    const Comp = Components[props.Comp];
  
    return (
        <Comp data={props.data} cDate={props.cDate} extra={props.extra} />
    );
  };