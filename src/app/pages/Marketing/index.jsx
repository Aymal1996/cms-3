import React, { useState } from 'react';
import Dashboard from '../../templates/Dashboard';
import Overview from '../../modules/Marketing/Overview';
import AddApplication from '../../modules/Marketing/Applications/AddApplication';
import EditApplication from '../../modules/Marketing/Applications/EditApplication';
import ApplicationsList from '../../modules/Marketing/Applications/ApplicationsList';
import IncompleteApplications from '../../modules/Marketing/IncompleteApplications';
import IncompleteDocuments from '../../modules/Marketing/IncompleteDocuments';
import EligibilityAssessments from '../../modules/Marketing/EligibilityAssessments';
import PendingAccommodations from '../../modules/Marketing/PendingAccommodations';
import PendingEnrolment from '../../modules/Marketing/PendingEnrolment';
import PendingRegistrationsVisa from '../../modules/Marketing/PendingRegistrationsVisa';
import Students from '../../modules/Marketing/Students';
import StudentDetails from '../../modules/Registry/Students/StudentDetails';
import Incentives from '../../modules/AQA/Incentives';
import Customize from '../../modules/Marketing/Customize';
import AddIncentive from '../../modules/AQA/Incentives/AddIncentive';
import IncentiveDetails from '../../modules/AQA/Incentives/IncentiveDetails';
import LeadApplications from '../../modules/Marketing/LeadApplications';
import Agents from '../../modules/Marketing/Agents';
import AddAgents from '../../modules/Marketing/Agents/AddAgents';
import AgentsDetail from '../../modules/Marketing/Agents/AgentsDetails';

const Components = {
  Overview,
  AddApplication,
  EditApplication,
  ApplicationsList,
  IncompleteApplications,
  IncompleteDocuments,
  EligibilityAssessments,
  PendingAccommodations,
  PendingEnrolment,
  PendingRegistrationsVisa,
  LeadApplications,
  Students,
  StudentDetails,
  Incentives,
  AddIncentive,
  IncentiveDetails,
  Customize,
  Agents,
  AddAgents,
  AgentsDetail,
};

export default (props) => {
  const MarketingComp = Components[props.Comp];
  const [loading, setLoading] = useState(false);

  return (
    <Dashboard load={loading}>
      <MarketingComp setLoading={setLoading} />
    </Dashboard>
  );
};
