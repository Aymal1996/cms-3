import * as action_types from './constants';

const initialState = {
  overallAttendance: [],
  overallAttendanceList: [],
  teamAttendance: [],
  teamAttendanceList: [],
  myAttendance: [],
  singleAttendance: [],
  getEmpAttendance: [],
  totalAbsent: 0,
  teamAttDrop: []
};

export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.OVERALL_ATTENDANCE:
      return { ...state, overallAttendance: data };
    case action_types.OVERALL_ATTENDANCE_LIST:
      return { ...state, overallAttendanceList: data };
    case action_types.TEAM_ATTENDANCE:
      return { ...state, teamAttendance: data };
    case action_types.TEAM_ATTENDANCE_LIST:
      return { ...state, teamAttendanceList: data };
    case action_types.MY_ATTENDANCE:
      return { ...state, myAttendance: data };
    case action_types.SINGLE_ATTENDANCE:
      return { ...state, singleAttendance: data };
    case action_types.TOTAL_ABSENT:
      return { ...state, totalAbsent: data };
    case action_types.GET_EMPA_ATTENDANCE:
      return { ...state, getEmpAttendance: data };
    case action_types.TEAM_ATTENDANCE_DROP:
      return { ...state, teamAttDrop: data };
      
    default:
      return state;
  }
};
