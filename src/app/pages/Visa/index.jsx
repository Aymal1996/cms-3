import React, { useState } from 'react';
import Dashboard from '../../templates/Dashboard';
import Overview from '../../modules/Visa/Overview';
import visaRenewal from '../../modules/Visa/VisaRenewal';
import visaExpiring from '../../modules/Visa/Expiring';
import visaExpired from '../../modules/Visa/Expired';
import VisaCancellation from '../../modules/Visa/VisaCancellation';
import NewVisa from '../../modules/Visa/NewVisa';
import Customize from '../../modules/Visa/Customize';
import ReportsList from '../../modules/Visa/Reports';
import EditApplication from '../../modules/Marketing/Applications/EditApplication';
import Immigration from '../../modules/Registry/components/Immigration';
import StudentDetails from '../../modules/Registry/Students/StudentDetails';
import AddVisaRenewal from '../../modules/Visa/AddVisaRenewal';

const Components = {
  Overview,
  visaRenewal,
  visaExpiring,
  visaExpired,
  VisaCancellation,
  NewVisa,
  Customize,
  ReportsList,
  EditApplication,
  StudentDetails,
  Immigration,
  AddVisaRenewal
};

export default (props) => {
  const VISAComp = Components[props.Comp];
  const [loading, setLoading] = useState(false);

  return (
    <Dashboard load={loading}>
      <VISAComp setLoading={setLoading} />
    </Dashboard>
  );
};
