import * as action_type from './constants';

const initialState = {
  pending_issues: [],
  unassigned_staff: [],
  pending_request: [],
  staff_list: [],
  pending_issues_card: [],
  pending_issues_list: [],
  unassign_staff_card: [],
  unassign_staff_list: [],
  moduel_list: [],
  grants_list: [],
  publication_list: [],
  feedback_listing: [],
  students_listing: [],
  timetableData: [],
  studentIntake: [],
  intake: [],
  programM: [],
};

export default (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case action_type.LECTURER_PENDING_ISSUES:
      return { ...state, pending_issues: data };
    case action_type.LECTURER_UNASSIGNED_ISSUES:
      return { ...state, unassigned_staff: data };
    case action_type.STAFF_LIST:
      return { ...state, staff_list: data };
    case action_type.PENDING_ISSUES_CARD:
      return { ...state, pending_issues_card: data };
    case action_type.PENDING_ISSUES_LIST:
      return { ...state, pending_issues_list: data };
    case action_type.UNASSIGN_STAFF_CARD:
      return { ...state, unassign_staff_card: data };
    case action_type.UNASSIGN_STAFF_LIST:
      return { ...state, unassign_staff_list: data };
    case action_type.LECTURER_PENDING_REQUEST:
      return { ...state, pending_request: data };
    case action_type.MODULE_LIST:
      return { ...state, moduel_list: data };
    case action_type.GRANTS_LIST:
      return { ...state, grants_list: data };
    case action_type.PUBLICATION_LIST:
      return { ...state, publication_list: data };
    case action_type.FEED_BACKS:
      return { ...state, feedback_listing: data };
    case action_type.STUDENTS_LIST:
      return { ...state, students_listing: data };
    case action_type.TIMETABEL_DATA:
      return { ...state, timetableData: data };
    case action_type.STUDENT_INTAKES:
      return { ...state, studentIntake: data };

    case action_type.MODULE_INTAKES:
      return { ...state, intake: data };
    case action_type.PROGRAM_INTAKES:
      return { ...state, programM: data };

    default:
      return state;
  }
};
