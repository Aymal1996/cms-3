import React, { useState } from 'react';
import Dashboard from '../../templates/Dashboard';
import Overview from '../../modules/AQA/Overview';
import StudentDetails from '../../modules/Registry/Students/StudentDetails';
import PendingOfferLetter from '../../modules/Registry/Students/PendingOfferLetter';
import PendingRegistration from '../../modules/Registry/Students/PendingRegistration';
import Students from '../../modules/Registry/Students';
import ScholarshipList from '../../modules/Registry/Scholarships/ScholarshipList';
import ScholarshipDetail from '../../modules/Registry/Scholarships/ScholarshipDetail';
import AddScholarship from '../../modules/Registry/Scholarships/AddScholarship';
import Requests from '../../modules/Registry/Requests';

import EditApplication from '../../modules/Marketing/Applications/EditApplication';
import AddRequest from '../../modules/AQA/Requests/AddRequest';

import Personal from '../../modules/Registry/components/Personal';
import Academic from '../../modules/Registry/components/Academic';
import Transcript from '../../modules/Registry/components/Transcript';
import Finance from '../../modules/Registry/components/Finance';
import Accommodation from '../../modules/Registry/components/Accommodation';
import Immigration from '../../modules/Registry/components/Immigration';
import Customize from '../../modules/Registry/Customize';

const Components = {
  Students,
  StudentDetails,
  PendingOfferLetter,
  PendingRegistration,
  ScholarshipList,
  AddScholarship,
  ScholarshipDetail,
  Requests,
  AddRequest,
  EditApplication,
  Personal,
  Academic,
  Transcript,
  Finance,
  Accommodation,
  Immigration,
  Customize,
};

export default (props) => {
  const StudentComp = Components[props.Comp];
  const [loading, setLoading] = useState(false);

  return (
    <Dashboard load={loading}>
      <StudentComp setLoading={setLoading} />
    </Dashboard>
  );
};
