import * as action_types from './constants';

const initialState = {
  overallTaskData: [],
  overallTaskDataWithStatus: {},
  teamTaskData: {},
  teamTaskDataWithStatus: [],
  myTaskData: {},
  myAvailableLeaves: [],
  leaveStatAnnualList: [],
  leaveStatisticsBar: [],
  singleLeaveData: [],
  applicationLeaveData: [],
  leaveTypeData: [],
  leaveInfoData: [],
  leaveApproversData: [],
  entitlementData: [],
  holidaysListData: [],

  myProjectData: [],
  myAddProjectData: [],
  timesheetData: {},
  cforwardstatus: [],
  employeeList: [],
};

export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.OVERALL_TASKS:
      return { ...state, overallTaskData: data };
    case action_types.OVERALL_TASKS_WITH_STATUS:
      return { ...state, overallTaskDataWithStatus: data };
    case action_types.TEAM_LEAVES:
      return { ...state, teamTaskData: data };
    case action_types.TEAM_LEAVES_WITH_STATUS:
      return { ...state, teamTaskDataWithStatus: data };
    case action_types.MY_LEAVES:
      return { ...state, myTaskData: data };
    case action_types.MY_AVAILABLE_LEAVES:
      return { ...state, myAvailableLeaves: data };
    case action_types.STATISTIC_LIST:
      return { ...state, leaveStatAnnualList: data };
    case action_types.STATISTIC_BAR:
      return { ...state, leaveStatisticsBar: data };
    case action_types.SINGLE_LEAVE_DETAIL:
      return { ...state, singleLeaveData: data };
    case action_types.APPLICATION_LEAVE_DETAIL:
      return { ...state, applicationLeaveData: data };

    case action_types.LEAVE_TYPE:
      return { ...state, leaveTypeData: data };

    case action_types.LEAVE_DATA:
      return { ...state, leaveInfoData: data };

    case action_types.LEAVE_APPROVERS:
      return { ...state, leaveApproversData: data };
    case action_types.ENTITLEMENT:
      return { ...state, entitlementData: data };
    case action_types.HOLIDAYS_LIST:
      return { ...state, holidaysListData: data };

    case action_types.PROJECT_NAME:
      return { ...state, myProjectData: data };
    case action_types.ADD_PROJECT_NAME:
      return { ...state, myAddProjectData: data };

    case action_types.EMPTY_TASKS:
      return initialState;
    case action_types.MY_TIMESHEETS:
      return { ...state, timesheetData: data };
    case action_types.EMPTY_ALL_LEAVES:
      return initialState;
    case action_types.CARRY_FORWARD_STATUS:
      return { ...state, cforwardstatus: data };

    case action_types.EMPLOYEE_LIST:
      return { ...state, employeeList: data };

    default:
      return state;
  }
};
