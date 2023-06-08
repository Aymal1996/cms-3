import * as action_types from './constants';

const initialState = {
  teamsListData: [],
  leaveTypesListData: {},
  leaveEntitlementsListData: {},
  userRolesListData: [],
  workingHoursListData: [],
  jobPositionsListData: [],
  educationalFieldsListData: [],
  institutionsListData: [],
  nationalitiesListData: [],
  holidaysListData: [],
  religionsListData: [],
  racesListData: [],
  projectsListData: [],
  warningLetterListData: [],
  letterTemplateListData: [],
  approversListData: [],
  assetsListData: [],
  requestFormsListData: [],
  singleLeave: {},
  employeeList: [],
  leaveList: [],
  userList: [],
  skillsList: [],
  allApprovers: [],
  reqFormFieldList: [],
  departmentList: [],
  tempList: [],
  getAllDepartments: [],
  getSpecificEmployeeList: [],
  letterTempList: [],
  filterLeaveType: [],
  filterEntitlmentName: [],
  allSkills: [],
  selectedLeave: { manager: false, supervisor: false, teamLead: false },
  viewWarninLette: { name: '', warning_letter_template: '', visible: false },
  allTerminatedEmployee: [],
  accessModule: [],
};

export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.TEAMS_LIST:
      return { ...state, teamsListData: data };
    case action_types.LEAVE_TYPE_LIST:
      return { ...state, leaveTypesListData: data };
    case action_types.LEAVE_ENTITLEMENTS_LIST:
      return { ...state, leaveEntitlementsListData: data };
    case action_types.USER_ROLES_LIST:
      return { ...state, userRolesListData: data };
    case action_types.WORKING_HOURS_LIST:
      return { ...state, workingHoursListData: data };
    case action_types.JOB_POSITIONS_LIST:
      return { ...state, jobPositionsListData: data };
    case action_types.EDUCATIONAL_FIELDS_LIST:
      return { ...state, educationalFieldsListData: data };
    case action_types.INSTITUTIONS_LIST:
      return { ...state, institutionsListData: data };
    case action_types.NATIONALITIES_LIST:
      return { ...state, nationalitiesListData: data };
    case action_types.HOLIDAYS_LIST:
      return { ...state, holidaysListData: data };
    case action_types.RELIGIONS_LIST:
      return { ...state, religionsListData: data };
    case action_types.RACES_LIST:
      return { ...state, racesListData: data };
    case action_types.PROJECTS_LIST:
      return { ...state, projectsListData: data };
    case action_types.WARNING_LETTER_LIST:
      return { ...state, warningLetterListData: data };
    case action_types.LETTER_TEMPLATE_LIST:
      return { ...state, letterTemplateListData: data };
    case action_types.APPROVERS_LIST:
      return { ...state, approversListData: data };
    case action_types.ASSETS_LIST:
      return { ...state, assetsListData: data };
    case action_types.REQUEST_FORMS_LIST:
      return { ...state, requestFormsListData: data };
    case action_types.SINGLE_LEAVE:
      return { ...state, singleLeave: data };
    case action_types.EMPLOYEE_LIST:
      return { ...state, employeeList: data };
    case action_types.LEAVE_TYPE:
      return { ...state, leaveList: data };
    case action_types.USERS:
      return { ...state, userList: data };
    case action_types.SKILLS_LIST:
      return { ...state, skillsList: data };
    case action_types.ALL_APPROVERS:
      return { ...state, allApprovers: data };
    case action_types.LEAVE_SELECT_TYPE:
      return { ...state, selectedLeave: data };
    case action_types.REQ_FORM_FIELDS:
      return { ...state, reqFormFieldList: data };
    case action_types.DEPARTMENT_LSIT:
      return { ...state, departmentList: data };
    case action_types.SHOW_WARNING_LETTER:
      return { ...state, viewWarninLette: data };
    case action_types.TEMP_LIST:
      return { ...state, tempList: data };
    case action_types.GET_DEAPRTMENTS:
      return { ...state, getAllDepartments: data };
    case action_types.LETTER_TEMP:
      return { ...state, letterTempList: data };
    case action_types.GET_USER_SPCIFIC:
      return { ...state, getSpecificEmployeeList: data };
    case action_types.FILTER_LEAVE_TYPE:
      return { ...state, filterLeaveType: data };
    case action_types.FILTER_ENTITLEMENT:
      return { ...state, filterEntitlmentName: data };
    case action_types.SKILL_LIST:
      return { ...state, allSkills: data };

    case action_types.TERMINATED_EMPLOYEE:
      return { ...state, allTerminatedEmployee: data };

      case action_types.MODULE_ACCESS:
        return { ...state, accessModule: data };

      
    default:
      return state;
  }
};
