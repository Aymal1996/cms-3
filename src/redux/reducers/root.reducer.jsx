import { combineReducers } from 'redux';
import userReducer from '../../features/userSlice';
import feeds from 'Molecules/Feeds/ducks/reducers';
import faculty from 'Modules/AQA/Faculty/ducks/reducers';
import modules from 'Modules/AQA/Modules/ducks/reducers';
import programme from 'Modules/AQA/Programme/ducks/reducers';
import marketing from 'Modules/Marketing/ducks/reducers';
import forms from 'Modules/AQA/Forms/ducks/reducers';
import overview from 'Modules/AQA/Overview/ducks/reducers';
import clockin from 'Modules/Faculty/Overview/ducks/reducers';
import applicationForm from 'Modules/Marketing/Applications/ducks/reducers';
import request from 'Modules/AQA/Requests/ducks/reducers';
import aqa from 'Modules/AQA/ducks/reducers';
import calendar from 'Modules/AQA/AcademicCalendar/ducks/reducers';
import global from 'Modules/Application/ducks/reducers';
import students from 'Modules/Registry/Students/ducks/reducers';
import scholarship from 'Modules/Registry/Scholarships/ducks/reducers';
import custom from 'Modules/Faculty/Setup/ducks/reducers';
import facultyStudent from 'Modules/Faculty/Students/ducks/reducers';
import lecturers from 'Modules/Faculty/Lecturers/ducks/reducers';
import facultyModules from 'Modules/Faculty/Modules/ducks/reducers';
import grants from 'Modules/Faculty/Grants/ducks/reducers';
import exams from 'Modules/Faculty/Exams/ducks/reducers';
import timetable from 'Modules/Faculty/Timetable/ducks/reducers';
import publications from 'Modules/Faculty/Publications/ducks/reducers';
import facultyProgramme from 'Modules/Faculty/Programmes/ducks/reducers';
import facultyOverview from 'Modules/Faculty/Overview/ducks/reducers';
import classroom from 'Modules/Faculty/Classroom/ducks/reducers';
import material from 'Modules/Faculty/Materials/ducks/reducers';
import incentives from 'Modules/AQA/Incentives/ducks/reducers';
import marketingcustomize from 'Modules/Marketing/Customize/ducks/reducers';
import finance from 'Modules/Finance/ducks/reducers';
import transaction from 'Modules/Finance/Transactions/ducks/reducers';

import policy from 'Modules/HRMS/Policy/ducks/reducers';
import hrmsfinance from 'Modules/HRMS/Finance/ducks/reducers';
import advancement from 'Modules/HRMS/Advancement/dcuks/reducers';
import attendance from 'Modules/HRMS/Attendance/ducks/reducers';
import leaves from 'Modules/HRMS/Leaves/ducks/reducers';
import tasks from 'Modules/HRMS/Tasks/ducks/reducers';
import setup from 'Modules/HRMS/SetUp/ducks/reducers';
import employment from 'Modules/HRMS/Employment/ducks/reducer';
import hrmsrequests from 'Modules/HRMS/Requests/ducks/reducers';
import employeeProfile from 'Modules/HRMS/Profile/ducks/reducers';
import downloadReports from 'Modules/HRMS/Reports/ducks/reducers';
import { DESTROY_SESSION } from 'Modules/Application/ducks/constants';
import search from 'Modules/Search/ducks/reducers';
import studentfile from '../../app/modules/StudentFile/ducks/reducers';
import visa from '../../app/modules/Visa/ducks/reducers';

const appReducer = combineReducers({
  user: userReducer,
  global,
  aqa,
  overview,
  feeds,
  modules,
  faculty,
  programme,
  marketing,
  forms,
  applicationForm,
  request,
  calendar,
  students,
  scholarship,
  facultyStudent,
  facultyModules,
  custom,
  lecturers,
  grants,
  clockin,
  exams,
  timetable,
  publications,
  facultyProgramme,
  facultyOverview,
  classroom,
  material,
  incentives,
  marketingcustomize,
  finance,
  transaction,
  policy,
  hrmsfinance,
  advancement,
  attendance,
  leaves,
  tasks,
  setup,
  employment,
  hrmsrequests,
  employeeProfile,
  downloadReports,
  search,
  studentfile,
  visa,
});

const rootReducer = (state, action) => {
  if (action.type === DESTROY_SESSION) state = undefined;

  return appReducer(state, action);
};

export default rootReducer;
