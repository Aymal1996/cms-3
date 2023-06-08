import React, { useState } from 'react';
import Dashboard from '../../templates/Dashboard';
import Overview from '../../modules/AQA/Overview';
import FacultyList from '../../modules/AQA/Faculty/FacultyList';
import AddFaculty from '../../modules/AQA/Faculty/AddFaculty';
import EditFaculty from '../../modules/AQA/Faculty/EditFaculty';
import ProgrammeList from '../../modules/AQA/Programme/ProgrammeList';
import ModuleList from '../../modules/AQA/Modules/ModuleList';
import AddModule from '../../modules/AQA/Modules/AddModule';
import EditModule from '../../modules/AQA/Modules/EditModule';
import AddProgramme from '../../modules/AQA/Programme/AddProgramme';
import ProgramDetails from '../../modules/AQA/Programme/ProgramDetails';
import Requests from '../../modules/AQA/Requests';
import StudentDetails from '../../modules/Registry/Students/StudentDetails';

import FormsList from '../../modules/AQA/Forms/FormsList';
import AddForms from '../../modules/AQA/Forms/AddForms';
import EditForms from '../../modules/AQA/Forms/EditForms';

import Calendar from '../../modules/AQA/AcademicCalendar';
import TermDetails from '../../modules/AQA/AcademicCalendar/TermDetails';
import AddNewTerm from '../../modules/AQA/AcademicCalendar/AddNewTerm';
import CalendarRequestDetail from '../../modules/AQA/AcademicCalendar/CalendarRequestDetail';
import AddRequest from '../../modules/AQA/Requests/AddRequest';
import Customize from '../../modules/Registry/Customize';
import Incentives from '../../modules/AQA/Incentives';
import AddIncentive from '../../modules/AQA/Incentives/AddIncentive';
import IncentiveDetails from '../../modules/AQA/Incentives/IncentiveDetails';

const Components = {
    Overview, FacultyList, AddFaculty, EditFaculty, ProgrammeList, AddProgramme, ProgramDetails, ModuleList, AddModule, EditModule,
    FormsList, AddForms, EditForms, Requests, Calendar, TermDetails, AddNewTerm, CalendarRequestDetail, StudentDetails, AddRequest, Customize, Incentives, AddIncentive, IncentiveDetails
 }

export default (props) => {
  const AQAComp = Components[props.Comp];
  const [loading, setLoading] = useState(false);

  return (
    <Dashboard load={loading}>
      <AQAComp setLoading={setLoading} />
    </Dashboard>
  );
};
