import * as action_types from './constants';

const initialState = {
  programListF: {},
  studentList: {},
  staffLecturesList: {},
  staffNames: {},
  programDetails: {},
  tableList: {},
  selectTimeTableList: {},
  programPerformance: {},
  dropdownFaculty: {},
  semesterDropdown:[],
  moduleList:[],
  unassignedCount:{}
};

export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.GET_PROGRAM_PERFORMANCE:
      return { ...state, programPerformance: data };

    case action_types.FACULTY_PROGRAM_LIST:
      return { ...state, programListF: data };

    case action_types.GET_STUDENT_PROGRAM_LIST:
      return { ...state, studentList: data };

    case action_types.GET_STAFF_LECTURES_LIST:
      return { ...state, staffLecturesList: data };

    case action_types.GET_STAFF_NAMES:
      return { ...state, staffNames: data };

    case action_types.GET_PROGRAM_DETAIL:
      return { ...state, programDetails: data };

    case action_types.GET_PROGRAM_TIMETABLE_LIST:
      return { ...state, tableList: data };

    case action_types.GET_TIME_TABLE_FILTER:
      return { ...state, selectTimeTableList: data };

    case action_types.DROPDOWN_FACULTY:
      return { ...state, dropdownFaculty: data };

    case action_types.GET_SEMESTER_DROPDOWN:
      return { ...state, semesterDropdown: data };

    case action_types.GET_MODULE_LIST:
      return { ...state, moduleList: data };

    case action_types.GET_UNASSIGNED_COUNT:
      return { ...state, unassignedCount: data };

    default:
      return state;
  }
};
