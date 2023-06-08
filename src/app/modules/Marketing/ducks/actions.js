import axios from '../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiresource, apiMethod } from '../../../../configs/constants';

export const getApplicationLeads = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/marketing.api.get_leads_applications`);
    dispatch({
      type: action_types.APPLICATION_LEADS,
      data: message,
    });
  };
};

export const getApplicationLeadsCount = () => {
  return async (dispatch) => {
    const {
      data: { data },
    } = await axios.get(
      `${apiresource}/Application?fields=["name","applicant_name"]&filters=[["docstatus","=",0]]&limit_page_length=None`,
    );
    dispatch({
      type: action_types.APPLICATION_COUNT,
      data: data,
    });
  };
};

export const emptyApp = () => {
  return (dispatch) => {
    dispatch({
      type: action_types.EMPTY_APP,
      data: [],
    });
  };
};

export const emptyAppList = () => {
  return (dispatch) => {
    dispatch({
      type: action_types.EMPTY_APP_LIST,
      data: [],
    });
  };
};

export const getApplicationProgress = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/marketing.api.get_incomplete_application_list`);
    dispatch({
      type: action_types.APPLICATION_PROG,
      data: message,
    });
  };
};

export const getApplicationProgressDetail = (id, page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/marketing.api.incomplete_application_detail?id=${id}${page ? '&page_number=' + page : ''}${
        limit ? '&limit=' + limit : ''
      }`,
    );
    dispatch({
      type: action_types.APPLICATION_PROG_DETAIL,
      data: message,
    });
  };
};

export const getLeadApplications = (page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/marketing.api.get_leads_applications_pagination?orderby=creation&order=DESC${page ? '&page_number=' + page : ''}${
        limit ? '&limit=' + limit : ''
      }`,
    );
    dispatch({
      type: action_types.APPLICATION_LEAD,
      data: message,
    });
  };
};

export const getTotalStudentEnrolled = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/marketing.api.get_total_and_enrolled_students`);
    dispatch({
      type: action_types.TOTAL_STUDENT_ENROLLED,
      data: message,
    });
  };
};


export const getRecruitment = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/marketing.new_marketing_api.total_recruitments`);
    dispatch({
      type: action_types.TOTAL_RECRUITMENT,
      data: message,
    });
  };
};

export const getEligibilityAssessmentList = (type, page = 1, limit = 9) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.post(`${apiMethod}/marketing.api.workflow_application_list`, {
      workflow_state: type,
      page: page,
      limit: limit,
    });
    dispatch({
      type: action_types.ELIGIBILITY_ASSESSMENT,
      data: message,
    });
  };
};

export const getEligibilityArchiveList = (page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.post(`${apiMethod}/marketing.api.get_archive_listing`, {
      orderby: 'modified',
      order: 'desc',
      page: page,
      limit: limit,
    });
    dispatch({
      type: action_types.ELIGIBILITY_ARCHIVE,
      data: message,
    });
  };
};

export const getIncompleteDocumentsList = (type, page = 1, limit = 9) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.post(`${apiMethod}/marketing.api.workflow_application_list`, {
      workflow_state: type,
      page: page,
      limit: limit,
    });
    dispatch({
      type: action_types.INCOMPLETE_REGISTRATIONS,
      data: message,
    });
  };
};

export const getPendingVisaList = (type, page = 1, limit = 9) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.post(`${apiMethod}/marketing.api.workflow_application_list`, {
      workflow_state: type,
      page: page,
      limit: limit,
    });
    dispatch({
      type: action_types.PENDING_VISA,
      data: message,
    });
  };
};

export const getPendingAccomodationList = (type, page = 1, limit = 9) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.post(`${apiMethod}/marketing.api.workflow_application_list`, {
      workflow_state: type,
      page: page,
      limit: limit,
    });
    dispatch({
      type: action_types.PENDING_ACCOMODATION,
      data: message,
    });
  };
};

export const getPendingEnrollmentList = (type, page = 1, limit = 9) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.post(`${apiMethod}/marketing.api.workflow_application_list`, {
      workflow_state: type,
      page: page,
      limit: limit,
    });
    dispatch({
      type: action_types.PENDING_ENROLLMENT,
      data: message,
    });
  };
};

export const getApplicationDetial = (appURL) => {
  return async (dispatch) => {
    const {
      data: { data },
    } = await axios.get(`${apiresource}/Application/${appURL}`);
    dispatch({
      type: action_types.APPLICATION_DETAIL,
      data: data,
    });
  };
};

export const getStepsListData = (type, page = 1, limit=9) => {
  return async (dispatch) => {
    let json = {
      workflow_state: type,
      page_number: page,
      limit: limit
    };
    const {
      data: { message },
    } = await axios.post(`${apiMethod}/marketing.api.get_stage_listing`, json);
    dispatch({
      type: action_types.STEPS_LIST_DATA,
      data: message,
    });
  };
};

export const getStepsDetailData = (id) => {
  return async (dispatch) => {
    let json = {
      app_id: id,
    };
    const {
      data: { message },
    } = await axios.post(`${apiMethod}/marketing.api.get_application_details`, json);
    dispatch({
      type: action_types.STEPS_DETAIL_DATA,
      data: message,
    });
  };
};

export const getApplicationsList = (type) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.post(`${apiMethod}/marketing.api.workflow_application_list`, { workflow_state: type });
    dispatch({
      type: action_types.APPLICATIONS_LIST,
      data: message,
    });
  };
};

export const marketingBool = (bool) => {
  return (dispatch) => {
    dispatch({
      type: action_types.MARKETING_APPLICATION,
      data: bool,
    });
  };
};

export const marketingSearch = (value) => {
  return (dispatch) => {
    dispatch({
      type: action_types.MARKETING_SEARCH,
      data: value,
    });
  };
};

export const getLecturerTimetable = (id, start, end) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/faculty.Lacturer_timetable.single_faculty_timetable`, {
      params: { employee_id: id, start_date: start, end_date: end, up_coming: 'True' },
    });
    dispatch({
      type: action_types.LECTURER_TODAY_SCHEDULE,
      data: message,
    });
  };
};

export const getTeamModulesList = (page, limit, order, orderby) => {
  return async (dispatch) => {
    let ordering = '';
    if (order == 'ascend') {
      ordering = 'ASC';
    } else if (order == 'descend') {
      ordering = 'DESC';
    }
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/faculty.modules_api.faculty_dashboard_teaching_module_listing?${page ? 'page_number=' + page : ''}${
        limit ? '&limit=' + limit : ''
      }${order && '&order=' + ordering + '&orderby=' + orderby}`,
    );
    dispatch({
      type: action_types.TEAM_MODULES_LIST,
      data: message,
    });
  };
};

export const getFacultyProgress = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/faculty.faculty_dashboard.lecturer_achieved`);
    dispatch({
      type: action_types.FACULTY_PROGRESS,
      data: message,
    });
  };
};

export const getFacultyCalendarList = (id, start, end) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/faculty.faculty_dashboard.single_faculty_timetable?employee_id=${id}&start_date=${start}&end_date=${end}`,
    );
    dispatch({
      type: action_types.FACULTY_CALENDAR,
      data: message,
    });
  };
};

export const getFacultyCalendarListWeekly = (id, start, end) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/faculty.faculty_dashboard.single_faculty_timetable?employee_id=${id}&start_date=${start}&end_date=${end}`,
    );
    dispatch({
      type: action_types.FACULTY_CALENDAR_WEEKLY,
      data: message,
    });
  };
};

export const getFacultyClassList = (date, timetable, code) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/faculty.faculty_dashboard.single_faculty_student_attendance?limit=10&class_date=${date}&timetable=${timetable}&page_number=1&module_code=${code}`,
    );
    dispatch({
      type: action_types.FACULTY_CLASS_LIST,
      data: message,
    });
  };
};

export const getFacultyCalendarClassList = (id, start, end) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/faculty.faculty_dashboard.single_faculty_timetable?employee_id=${id}&start_date=${start}&end_date=${end}`,
    );
    dispatch({
      type: action_types.FACULTY_CALENDAR_CLASS_WEEKLY,
      data: message,
    });
  };
};

export const getFacultyRequestList = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/faculty.publications.dashboard_requests`);
    dispatch({
      type: action_types.FACULTY_REQUESTS,
      data: message,
    });
  };
};

export const getStudentToAssistList = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/faculty.publications.dashboard_students_to_assist`);
    dispatch({
      type: action_types.FACULTY_STUDENT_TO_ASSIST,
      data: message,
    });
  };
};

export const getFacultyModuleList = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/faculty.faculty_dashboard.module_list_with_students`);
    dispatch({
      type: action_types.FACULTY_MODULES,
      data: message,
    });
  };
};

export const getFacultySubmissionList = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/faculty.publications.student_submissions`);
    dispatch({
      type: action_types.FACULTY_SUBMISSIONS,
      data: message,
    });
  };
};

export const getFacultyPendingGradingList = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/faculty.faculty_dashboard.pending_grading_modules`);
    dispatch({
      type: action_types.FACULTY_PENDING_GRADING,
      data: message,
    });
  };
};

export const getDownloadDocumentsList = (id) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/marketing.api.application_document_list?app_id=${id}`);
    dispatch({
      type: action_types.DOCUMENT_DOWNLOAD_LIST,
      data: message,
    });
  };
};

