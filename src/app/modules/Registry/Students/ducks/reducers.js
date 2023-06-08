import * as action_types from './constants';

const initialState = {
  studentList: [],
  pendingList: {},
  studentAppData: {},
  timetableData: {},
  requestData: [],
  semesterGrades: [],
  semesterCGPA: '',
  semesterGPA: '',
  semesterAttendance: '',
  semesterTranscript: [],
  complaintData: [],
  balanceBreakdown: {},
  balanceHistory: {},
  performanceData: {},
  selected: '',
  offerlist: {},
  enrolledList: {}
};

export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.STUDENTS_LIST:
      return { ...state, studentList: data };
    case action_types.PENDING_LIST:
      return { ...state, pendingList: data };
    case action_types.STUDENT_APP_DETAIL:
      return { ...state, studentAppData: data };
    case action_types.EMPTY_STUDENT_APP:
      return { ...state, studentAppData: data };
    case action_types.TIME_TABLE:
      return { ...state, timetableData: data };
    case action_types.REQUEST_DATA:
      return { ...state, requestData: data };
    case action_types.SEMESTER_GRADES:
      return { ...state, semesterGrades: data };
    case action_types.SEMESTER_CGPA:
      return { ...state, semesterCGPA: data };
    case action_types.SEMESTER_GPA:
      return { ...state, semesterGPA: data };
    case action_types.SEMESTER_ATTENDANCE:
      return { ...state, semesterAttendance: data };
    case action_types.SEMESTER_TRANSCRIPT:
      return { ...state, semesterTranscript: data };
    case action_types.COMPLAINT_DATA:
      return { ...state, complaintData: data };
    case action_types.BREAKDOWN_BALANCE:
      return { ...state, balanceBreakdown: data };
    case action_types.BALANCE_HISTORY:
      return { ...state, balanceHistory: data };
    case action_types.EMPTY_STUDENT_REQ:
      return { ...state, requestData: [] };
    case action_types.PERFORMANCE_DATA:
      return { ...state, performanceData: data };
    case action_types.SPPRORAM:
      return { ...state, selected: data };
    case action_types.OFFERLETTER_RELEASE:
      return { ...state, offerlist: data };
    case action_types.PENDING_ENROLLED:
        return {...state, enrolledList: data};
    case action_types.EMPTY_REGISTRY_LIST:
      return {...state, enrolledList: {}, offerlist: {}, studentList: {}};
        
    default:
      return state;
  }
};
