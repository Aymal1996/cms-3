import * as action_type from './constants';

const initialState = {
  other_issues: [],
  module_list: [],
  pending_list: [],
  staff_issue: [],
  facultytimetable: {},
  clockinclockout: {},
};

export default (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case action_type.OTHER_ISSUES:
      return { ...state, other_issues: data };

    case action_type.MODULE_LIST:
      return { ...state, module_list: data };

    case action_type.PENDING_LIST:
      return { ...state, pending_list: data };
      
    case action_type.STAFF_ISSUES:
      return { ...state, staff_issue: data };

      case action_type.GET_FACULTY_TIMETABLE:
        return {...state, facultytimetable: data}

      case action_type.GET_CLOCKIN_CLOCKOUT:
        return {...state, clockinclockout: data}

    default:
      return state;
  }
};
