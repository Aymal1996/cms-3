import * as action_types from './constant';

const initialState = {
  teamList: {},
  memberList: {},
  teamDetails: {},
  empDetails: {},
  tempData: [],
  hoursData: [],
  warnLetter: [],
  faculty: [],
  program: [],
  campus: []
};
export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.TEAM_LIST:
      return { ...state, teamList: data };
    case action_types.MEMBER_LIST:
      return { ...state, memberList: data };
    case action_types.TEAM_DETAILS:
      return { ...state, teamDetails: data };
    case action_types.EMPLOYEE_DETAILS:
      return { ...state, empDetails: data };
      case action_types.EMPLOYEE_LIST:
    return { ...state, emplist: data };
    case action_types.EMPLOYEE_CARD:
      return { ...state, empcard: data };
    case action_types.TEMPLATE_LIST:
      return { ...state, tempData: data };
    case action_types.HOUR_TEMPLATE:
      return { ...state, hoursData: data };
    case action_types.EMPTY_TEAMS:
      return { ...state, memberList: {}, teamDetails: {} };
    case action_types.EMPTY_STAFF:
      return { ...state, empDetails: {} };
    case action_types.WARN_LETTERS:
      return { ...state, warnLetter: data };
    case action_types.CONTRACT_FACULTY:
      return { ...state, faculty: data };
    case action_types.CONTRACT_PROGRAM:
      return { ...state, program: data };
    case action_types.CONTRACT_CAMPUS:
      return { ...state, campus: data };
    default:
      return state;
  }
};
