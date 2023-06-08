import React, { useState } from 'react';
import Dashboard from '../../templates/Dashboard';
import Application from 'Modules/Application';
import NotFound from 'Modules/Application/NotFound';
import Search from 'Modules/Search';
import Socket from 'Modules/Socket';

const Components = {
  Application,
  NotFound,
  Search,
  Socket,
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
