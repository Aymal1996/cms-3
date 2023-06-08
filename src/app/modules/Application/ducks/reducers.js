import * as action_types from './constants';

const initialState = {
  countryData: [],
  nationalityData: [],
  religionData: [],
  raceData: [],
  appTypeData: [],
  genderData: [],
  engQualificationData: [],
  progData: [],
  maritalData: [],
  comments: [],
  menu: false,
  faculties: [],
  programmes: [],
  classroom: [],
  semesters: [],
  staff: [],
  roles: [],
  teams: [],
  teams2: [],
  calenderData: [],
  teamsDetailData: [],
  projects: [],
  institutions: [],
  educationType: [],
  jobslist: [],
  pendingData: [],
  policyData: [],
  timesheetData: [],
  checkInData: [],
  staffData: [],
  companies: [],
  meetingLink: {},
};

export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.COUNTRY:
      return { ...state, countryData: data };
    case action_types.NATIONALITY:
      return { ...state, nationalityData: data };
    case action_types.RELIGION:
      return { ...state, religionData: data };
    case action_types.RACE:
      return { ...state, raceData: data };
    case action_types.APPLICATION_TYPE:
      return { ...state, appTypeData: data };
    case action_types.GENDER:
      return { ...state, genderData: data };
    case action_types.ENG_QUALIFICATION:
      return { ...state, engQualificationData: data };
    case action_types.PROGRAMME_NAME:
      return { ...state, progData: data };
    case action_types.MARITAL_STATUS:
      return { ...state, maritalData: data };
    case action_types.ALL_COMMENTS:
      return { ...state, comments: data };
    case action_types.EMPTY_COMMENTS:
      return { ...state, comments: data };
    case action_types.MENU_STAT:
      return { ...state, menu: data };
    case action_types.DROPDOWN_FACULTY:
      return { ...state, faculties: data };
    case action_types.DROPDOWN_PROGRAM:
      return { ...state, programmes: data };
    case action_types.DROPDOWN_CLASSROOM:
      return { ...state, classroom: data };
    case action_types.DROPDOWN_SEMESTER:
      return { ...state, semesters: data };

    case action_types.SUPERVISOR_LIST:
      return { ...state, staff: data };

    case action_types.ROLE_LIST:
      return { ...state, roles: data };
    case action_types.TEAM_LISTING:
      return { ...state, teams: data };
    case action_types.TEAM_LISTING2:
      return { ...state, teams2: data };

    case action_types.CALENDER_DATA:
      return { ...state, calenderData: data };
    case action_types.EMPLOYEE_ID:
      return { ...state, teamsDetailData: data };
    case action_types.ALL_PROJECTS:
      return { ...state, projects: data };
    case action_types.INTITUTION_LIST:
      return { ...state, institutions: data };
    case action_types.EDUCATION_TYPE:
      return { ...state, educationType: data };
    case action_types.JOBS_LIST:
      return { ...state, jobslist: data };
    case action_types.PENDING_ISSUES:
      return { ...state, pendingData: data };
    case action_types.POLICY_LIST:
      return { ...state, policyData: data };
    case action_types.TIMESHEET_DATA:
      return { ...state, timesheetData: data };
    case action_types.CHECK_IN_DATA:
      return { ...state, checkInData: data };
    case action_types.STAFF_DATA:
      return { ...state, staffData: data };
    case action_types.COMPANY_LIST:
      return { ...state, companies: data };

    case action_types.MEETING_LINK:
      return { ...state, meetingLink: data };
    case action_types.EMPTY_SEMESTER_APPFORM:
      return { ...state, semesters: [] };

    default:
      return state;
  }
};
