import React from 'react';
import moment from 'moment';

export const showDuration = (date) => {
    let difdays = moment(date).diff(moment(), 'day');
    let difmonth = moment(date).diff(moment(), 'month');
    let difyear = moment(date).diff(moment(), 'year');
    if (difdays > 365) {
            return <span className='c-success'>Expires in {difyear} year {moment(date).diff(moment().add(difyear, 'year'), 'day')} days</span>
    } else if (difdays > 30) {
        return <span className='c-success'>Expires in {difmonth} month {moment().add(difmonth, 'month').diff(date, 'day')} days</span>
    } else if (difdays > 0) {
        return <span className='c-pending'>Expires in {difdays} days</span>
    } else {
        return <span className='c-error'>Expired</span>
    }
}

export const checkExpiry = (dated) => {
    let daysCalc = moment(dated).diff(moment(), 'day');
    if (daysCalc < 1) {
        return 0;
    } else if(daysCalc < 16) {
        return daysCalc;
    }
}

export const calculateDays = (date) => {
    const todayDate = moment(new Date());
    const days = todayDate.diff(date, 'days');
    return days;
  }