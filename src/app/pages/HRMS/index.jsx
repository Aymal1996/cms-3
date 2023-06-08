import React, { useState } from 'react';
import Dashboard from '../../templates/Dashboard';
import Policy from 'Modules/HRMS/Policy';
import Tasks from 'Modules/HRMS/Tasks';
import TaskDetail from 'Modules/HRMS/Tasks/TaskDetail';
import Attendance from 'Modules/HRMS/Attendance';
import EmpAttendanceDetail from 'Modules/HRMS/Attendance/EmpAttendanceDetail';
import Advancement from 'Modules/HRMS/Advancement';
import AdvancementDetails from 'Modules/HRMS/Advancement/AdvancementDetails';
import Employment from 'Modules/HRMS/Employment';
import AddEmployment from 'Modules/HRMS/Employment/AddEmployment';
import EmploymentDetails from 'Modules/HRMS/Employment/EmploymentDetails';
import TeamDetails from 'Modules/HRMS/Employment/TeamDetails';
import Finance from 'Modules/HRMS/Finance';
import FinanceDetails from 'Modules/HRMS/Finance/FinanceDetail';
import SetUp from 'Modules/HRMS/SetUp';
import Requests from 'Modules/HRMS/Requests';
import Reports from 'Modules/HRMS/Reports';
import Leaves from 'Modules/HRMS/Leaves';
import LeavesDetail from 'Modules/HRMS/Leaves/LeavesDetail';
import RequestDetails from 'Modules/HRMS/Requests/RequestDetails';
import AddRequest from 'Modules/HRMS/Requests/AddRequest';
import Profile from 'Modules/HRMS/Profile';

const Components = {
  Advancement,
  AdvancementDetails,
  Tasks,
  TaskDetail,
  Policy,
  Employment,
  AddEmployment,
  EmploymentDetails,
  TeamDetails,
  Finance,
  FinanceDetails,
  Attendance,
  EmpAttendanceDetail,
  SetUp,
  Requests,
  RequestDetails,
  Reports,
  Leaves,
  LeavesDetail,
  AddRequest,
  Profile,
};

export default (props) => {
  const [loading, setLoading] = useState(false);
  const HRMSComp = Components[props.Comp];

  return (
    <Dashboard load={loading}>
      <HRMSComp setLoading={setLoading} />
    </Dashboard>
  );
};
