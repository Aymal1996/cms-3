import React, { useState } from 'react';
import Dashboard from '../../templates/Dashboard';
import Students from 'Modules/Finance/Students';
import Scholarships from 'Modules/Finance/Scholarships';
import Grants from 'Modules/Finance/Grants';
import Applicants from 'Modules/Finance/Applicants';
import Transactions from 'Modules/Finance/Transactions';
import Customize from '../../modules/Finance/Customize';
import StudentDetails from 'Modules/Registry/Students/StudentDetails';
import ScholarshipDetail from 'Modules/Registry/Scholarships/ScholarshipDetail';
import GrantDetails from 'Modules/Finance/Grants/GrantDetails';
import Accounts from '../../modules/Finance/Applicants/Accounts';

const Components = {
    Students,
    StudentDetails,
    Grants,
    Applicants,
    Transactions,
    Customize,
    Scholarships,
    ScholarshipDetail,
    GrantDetails,
    Accounts
 }
 
export default (props) => {

    const StudentComp = Components[props.Comp];
    const [loading, setLoading] = useState(false);

    return (
        <Dashboard load={loading}>
            <StudentComp setLoading={setLoading} />
        </Dashboard>
    )
}