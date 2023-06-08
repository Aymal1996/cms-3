import * as action_types from './constants';

const initialState = {
  applicationList: [],
  applicationCount: [],
  applicationProg: [],
  applicationProgDetail: [],
  totalStudentEnrolled: [],
  eligibilityAssessmentData: {},
  eligibilityArchive: {},
  incompleteRegistrationsData: [],
  pendingVisaData: [],
  pendingAccomodationData: [],
  pendingEnrollmentData: [],
  appDetailData: [],
  stepListData: [],
  stepDetailData: [],
  applicationsListData: [],
  totalRecruitment: [],
  marketingApp: '',
  searchBar: '',
  lecturerTodaySchedule: [],
  facultyCalendarListClass: [],
  teamModulesList: [],

  facultyProgress: [],
  facultyCalendarList: [],
  facultyCalendarListWeekly: [],
  facultyClassWeekly: [],
  facultyRequestList: [],
  studentToAssistList: [],
  facultyModuleList: [],
  facultySubmissionList: [],
  facultyPendingGradingList: [],
  documentDownloadList: [],
  leadApp: {},
};

export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.APPLICATION_LEADS:
      return { ...state, applicationList: data };
    case action_types.APPLICATION_COUNT:
      return { ...state, applicationCount: data };
    case action_types.APPLICATION_PROG:
      return { ...state, applicationProg: data };
    case action_types.APPLICATION_PROG_DETAIL:
      return { ...state, applicationProgDetail: data };
    case action_types.TOTAL_STUDENT_ENROLLED:
      return { ...state, totalStudentEnrolled: data };

    case action_types.ELIGIBILITY_ASSESSMENT:
      return { ...state, eligibilityAssessmentData: data };
    case action_types.ELIGIBILITY_ARCHIVE:
      return { ...state, eligibilityArchive: data };
      
    case action_types.INCOMPLETE_REGISTRATIONS:
      return { ...state, incompleteRegistrationsData: data };
    case action_types.PENDING_VISA:
      return { ...state, pendingVisaData: data };
    case action_types.PENDING_ACCOMODATION:
      return { ...state, pendingAccomodationData: data };
    case action_types.PENDING_ENROLLMENT:
      return { ...state, pendingEnrollmentData: data };

    case action_types.APPLICATION_DETAIL:
      return { ...state, appDetailData: data };

    case action_types.STEPS_LIST_DATA:
      return { ...state, stepListData: data };

    case action_types.STEPS_DETAIL_DATA:
      return { ...state, stepDetailData: data };
      
    case action_types.FACULTY_CLASS_LIST:
      return { ...state, facultyClassWeekly: data };

    case action_types.APPLICATIONS_LIST:
      return { ...state, applicationsListData: data };

    case action_types.TOTAL_RECRUITMENT:
      return { ...state, totalRecruitment: data };

    case action_types.MARKETING_APPLICATION:
      return { ...state, marketingApp: data };

    case action_types.MARKETING_SEARCH:
      return { ...state, searchBar: data };
    case action_types.EMPTY_APP:
      return { ...state, appDetailData: [], stepDetailData: [] };
    case action_types.EMPTY_APP_LIST:
      return { ...state, 
        incompleteRegistrationsData: {},
        pendingVisaData: {},
        pendingAccomodationData: {},
        pendingEnrollmentData: {},
        eligibilityAssessmentData: {}
      };

    case action_types.LECTURER_TODAY_SCHEDULE:
      return { ...state, lecturerTodaySchedule: data };

    case action_types.TEAM_MODULES_LIST:
      return { ...state, teamModulesList: data };

    case action_types.FACULTY_PROGRESS:
      return { ...state, facultyProgress: data };

    case action_types.FACULTY_CALENDAR:
      return { ...state, facultyCalendarList: data };

    case action_types.FACULTY_CALENDAR_WEEKLY:
      return { ...state, facultyCalendarListWeekly: data };

    case action_types.FACULTY_CALENDAR_CLASS_WEEKLY:
      return { ...state, facultyCalendarListClass: data };

    case action_types.FACULTY_REQUESTS:
      return { ...state, facultyRequestList: data };

    case action_types.FACULTY_STUDENT_TO_ASSIST:
      return { ...state, studentToAssistList: data };

    case action_types.FACULTY_MODULES:
      return { ...state, facultyModuleList: data };

    case action_types.FACULTY_SUBMISSIONS:
      return { ...state, facultySubmissionList: data };

    case action_types.FACULTY_PENDING_GRADING:
      return { ...state, facultyPendingGradingList: data };

    case action_types.DOCUMENT_DOWNLOAD_LIST:
      return { ...state, documentDownloadList: data };
    case action_types.APPLICATION_LEAD:
      return { ...state, leadApp: data };
      
    default:
      return state;
  }
};
