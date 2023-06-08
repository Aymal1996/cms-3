import React from 'react';
import ListCard from 'Molecules/ListCard';
import moment from 'moment';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

const colName = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (text) => (text ? moment(text).format('Do MMMM YYYY') : ''),
  },
  {
    title: 'Type',
    dataIndex: 'show_cause_label',
    key: 'show_cause_label',
  },
];

export default (props) => {
  const { data, id } = props;
  const history = useHistory();
  const staffData = useSelector((state) => state.advancement.advData);

  return (
    <ListCard
      scrolling={500}
      title="Show Cause Letter History"
      ListCol={colName}
      ListData={data?.showCause}
      pagination={false}
      extraBtn={'Request Show Cause'}
      extraAction={() =>
        history.push({
          pathname: `/hrms/requests/addnew`,
          state: {
            code: id,
            category: 'Show Cause Letter',
            company: staffData.company,
            name: staffData.employee_name,
            team: staffData.team_name[0],
          },
        })
      }
      btnClass="red-btn"
      listClass="nospace-card"
    />
  );
};
