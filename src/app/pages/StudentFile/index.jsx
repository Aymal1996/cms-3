import React, { useState } from 'react';
import Dashboard from '../../templates/Dashboard';
import Auditor from '../../modules/StudentFile/Auditor';
import InternalOffice from '../../modules/StudentFile/InternalOffice';

import StudentDetails from '../../modules/StudentFile/StudentDetails';
import Personal from '../../modules/Registry/components/Personal';
import Academic from '../../modules/Registry/components/Academic';
import Transcript from '../../modules/Registry/components/Transcript';
import Finance from '../../modules/Registry/components/Finance';

const Components = {
  Auditor,
  InternalOffice,
  StudentDetails,
  Personal,
  Academic,
  Transcript,
  Finance,
};

export default (props) => {
  const DashboardComp = Components[props.Comp];
  const [loading, setLoading] = useState(false);

  return (
    <Dashboard load={loading}>
      <DashboardComp setLoading={setLoading} />
    </Dashboard>
  );
};
