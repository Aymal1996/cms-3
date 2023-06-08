import * as action_types from './constants';

const initialState = {
  overallTaskData: [],
  overallEmployeeData: [],
  getAttendanceData: [],
  leaveEntitlementData: [],
};

export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.SEARCH_TASK:
      return { ...state, overallTaskData: data };

    case action_types.SEARCH_EMPLOYEE:
      return { ...state, overallEmployeeData: data };

    case action_types.SEARCH_ATTENDANCE:
      return { ...state, getAttendanceData: data };

    case action_types.LEAVE_ENTITLEMENT:
      return { ...state, leaveEntitlementData: data };

    default:
      return state;
  }
};
