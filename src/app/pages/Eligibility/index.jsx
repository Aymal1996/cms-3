import React, { useState } from 'react';
import Dashboard from '../../templates/Dashboard';
import Overview from '../../modules/Eligibility/Overview';
import EditApplication from '../../modules/Marketing/Applications/EditApplication';

const Components = {
    Overview, 
    EditApplication, 
}

export default (props) => {

    const MarketingComp = Components[props.Comp];
    const [loading, setLoading] = useState(false);

    return (
        <Dashboard load={loading}>
            <MarketingComp setLoading={setLoading} />
        </Dashboard>
    )
}