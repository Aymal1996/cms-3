import React, { useState } from 'react';
import Dashboard from '../../templates/Dashboard';
import Overview from '../../modules/Faculty/Overview';
import Lecturers from '../../modules/Faculty/Lecturers';
import Programmes from '../../modules/Faculty/Programmes';
import Modules from '../../modules/Faculty/Modules';
import Students from '../../modules/Faculty/Students';
import Timetable from '../../modules/Faculty/Timetable';
import EditTable from '../../modules/Faculty/Timetable/EditTable/';
import TimetableCards from '../../modules/Faculty/Timetable/TimetableCards/';
import Exams from '../../modules/Faculty/Exams';
import EditExamTable from '../../modules/Faculty/Exams/EditExamTable/';
import ExamCards from '../../modules/Faculty/Exams/ExamCards/';
import Classroom from '../../modules/Faculty/Classroom';
import Materials from '../../modules/Faculty/Materials';
// import AddMaterials from '../../modules/Faculty/Materials/AddMaterials/';
import MaterialDetails from '../../modules/Faculty/Materials/MaterialDetails';
import Grants from '../../modules/Faculty/Grants';
import AddGrants from '../../modules/Faculty/Grants/AddGrants/';
import EditGrants from '../../modules/Faculty/Grants/EditGrants/';
import Publications from '../../modules/Faculty/Publications';
import AddPublications from '../../modules/Faculty/Publications/AddPublications/';
import EditPublications from '../../modules/Faculty/Publications/EditPublications/';
import Requests from '../../modules/Faculty/Requests';
import RequestDetails from '../../modules/Faculty/Requests/RequestDetails';
import Reports from '../../modules/Faculty/Reports';
import Setup from '../../modules/Faculty/Setup';
import AddRequest from '../../modules/AQA/Requests/AddRequest';
import StudentDetails from '../../modules/Registry/Students/StudentDetails';
import StudentIssues from '../../modules/Faculty/Students/StudentIssues';
import StaffIssues from '../../modules/Faculty/Lecturers/StaffIssues';
import UnassignedStaff from '../../modules/Faculty/Lecturers/UnassignedStaff';
import StaffRequests from '../../modules/Faculty/Lecturers/StaffRequests';
import StaffDetails from '../../modules/Faculty/Lecturers/StaffDetails';
import StudentRequests from '../../modules/Faculty/Students/StudentRequests';
import StaffMain from '../../modules/Faculty/Lecturers/StaffMain';
import StudentSection from '../../modules/Faculty/Lecturers/StudentDetail';
import ProgrammeDetail from '../../modules/Faculty/Programmes/ProgramDetails';
import StudentComplaints from '../../modules/Faculty/Students/StudentComplaints';
import ModuleDetails from '../../modules/Faculty/Modules/ModuleDetails';
import StudentAssessment from '../../modules/Faculty/Classroom/StudentAssessment';
import UngradedStudents from '../../modules/Faculty/Classroom/UngradedStudents';
import VirtualClass from '../../modules/Faculty/VirtualClass';

const Components = {
  Overview,
  Lecturers,
  Programmes,
  Modules,
  ModuleDetails,
  Students,
  Timetable,
  EditTable,
  TimetableCards,
  Exams,
  EditExamTable,
  ExamCards,
  Classroom,
  Materials,
  // AddMaterials,
  MaterialDetails,
  Grants,
  AddGrants,
  EditGrants,
  Publications,
  AddPublications,
  EditPublications,
  Requests,
  AddRequest,
  RequestDetails,
  Reports,
  Setup,
  StudentDetails,
  StudentIssues,
  StaffIssues,
  UnassignedStaff,
  StaffRequests,
  StudentRequests,
  StudentComplaints,
  StaffMain,
  StaffDetails,
  ProgrammeDetail,
  StudentAssessment,
  StudentSection,
  UngradedStudents,
  VirtualClass
};

export default (props) => {
  console.log(props.Comp);
  const FacultyComp = Components[props.Comp];
  const [loading, setLoading] = useState(false);

  return (
    <Dashboard load={loading}>
      <FacultyComp setLoading={setLoading} />
    </Dashboard>
  );
};
