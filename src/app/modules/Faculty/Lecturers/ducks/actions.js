import axios from '../../../../../services/axiosInterceptor';
import * as action_type from './constants';
import { apiMethod } from '../../../../../configs/constants';

export const getPendingIssues = () => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(`${apiMethod}/faculty.lactures_api.pending_unassigned_staff_list`);
  dispatch({
    type: action_type.LECTURER_PENDING_ISSUES,
    data: message,
  });
};

export const getUnassignedStaff = () => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(`${apiMethod}/faculty.lactures_api.unassigned_staff_list`);
  dispatch({
    type: action_type.LECTURER_UNASSIGNED_ISSUES,
    data: message,
  });
};

export const getPendingRequest = () => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(`${apiMethod}/faculty.lactures_api.pending_unassigned_staff_list`);
  dispatch({
    type: action_type.LECTURER_PENDING_REQUEST,
    data: message,
  });
};

export const getStaffList =
  (status, page_number, limit, order, orderby, search = null) =>
  async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/faculty.lactures_api.staff_list?status=${
        status ? status : ''
      }&page_number=${page_number}&limit=${limit}${
        order ? `&order=${order == 'ascend' ? 'ASC' : 'DESC'}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_type.STAFF_LIST,
      data: message,
    });
  };

export const getPendingIssuesCard = (page_number, limit, order) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(
    `${apiMethod}/faculty.lactures_api.pending_unassigned_staff_card?page_number=${page_number}&limit=${limit}${
      order ? `&order=${order}` : ''
    }`,
  );
  dispatch({
    type: action_type.PENDING_ISSUES_CARD,
    data: message,
  });
};

export const getPendingIssuesList =
  (page_number, limit, order, orderby, search = null) =>
  async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/faculty.lactures_api.pending_issues_pagination_list?page_number=${page_number}&limit=${limit}${
        order ? `&order=${order == 'descend' ? 'DESC' : 'ASC'}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_type.PENDING_ISSUES_LIST,
      data: message,
    });
  };
export const getUnassignStaffCard = (page_number, limit, order) => async (dispatch) => {
  console.log({ order });
  const {
    data: { message },
  } = await axios.get(
    `${apiMethod}/faculty.lactures_api.unassigned_staff_card?page_number=${page_number}&limit=${limit}${
      order ? `&order=${order}` : ''
    }`,
  );
  dispatch({
    type: action_type.UNASSIGN_STAFF_CARD,
    data: message,
  });
};

export const getUnassignStaffList =
  (page_number, limit, order, orderby, search = null) =>
  async (dispatch) => {
    console.log({ order });
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/faculty.lactures_api.unassigned_staff_list_pagination?page_number=${page_number}&limit=${limit}${
        order ? `&order=${order == 'descend' ? 'DESC' : 'ASC'}&orderby=${orderby}` : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_type.UNASSIGN_STAFF_LIST,
      data: message,
    });
  };

export const getModuleList = (id, program, intake) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(`${apiMethod}/faculty.lactures_api.lecturer_modules_with_program?program_id=${program}&intake=${intake}&employee_id=${id}`);
  dispatch({
    type: action_type.MODULE_LIST,
    data: message,
  });
};

export const getGrantsList = (id, order, orderby) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(
    `${apiMethod}/faculty.lactures_api.employee_grants_list?employee_id=${id}${
      order ? `&order=${order == 'descend' ? 'DESC' : 'ASC'}&orderby=${orderby}` : ''
    }`,
  );

  dispatch({
    type: action_type.GRANTS_LIST,
    data: message,
  });
};

export const getPublicationList = (id, order, orderby) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(
    `${apiMethod}/faculty.lactures_api.staff_publications_list?employee_id=${id}${
      order ? `&order=${order == 'descend' ? 'DESC' : 'ASC'}&orderby=${orderby}` : ''
    }`,
  );

  dispatch({
    type: action_type.PUBLICATION_LIST,
    data: message,
  });
};

export const getFeedbackList =
  (id, page_number, limit, search = null) =>
  async (dispatch) => {
    console.log({ search });
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/faculty.program_section_student.feedback?employee_id=${id}&page_number=${page_number}&limit=${limit}${
        search ? '&filters=' + JSON.stringify(search) : ''
      }`,
    );
    dispatch({
      type: action_type.FEED_BACKS,
      data: message,
    });
  };
export const getStudentList =
  (id, page_number, limit, search = null) =>
  async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/faculty.program_section_student.student_subject_module_assessment?employee_id=${id}&page_number=${page_number}&limit=${limit}${
        search ? '&filters=' + JSON.stringify(search) : ''
      }`,
    );
    dispatch({
      type: action_type.STUDENTS_LIST,
      data: message,
    });
  };

export const calenderData = (id, start, end) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(`${apiMethod}/faculty.Lacturer_timetable.single_faculty_timetable`, {
    params: { employee_id: id, start_date: start, end_date: end },
  });
  dispatch({
    type: action_type.TIMETABEL_DATA,
    data: message,
  });
};
export const getStudentIntakes = () => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(`${apiMethod}/faculty.program_section_student.intake_list`);
  dispatch({
    type: action_type.STUDENT_INTAKES,
    data: message,
  });
};

export const getIntakeAssigned = (id) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(`${apiMethod}/faculty.lactures_api.lecturer_intake?employee_id=${id}`);
  dispatch({
    type: action_type.MODULE_INTAKES,
    data: message,
  });
};

export const getProgramAssigned = (id, intake) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(`${apiMethod}/faculty.lactures_api.lecturer_program_with_intake?intake=${intake}&employee_id=${id}`);
  dispatch({
    type: action_type.PROGRAM_INTAKES,
    data: message,
  });
};

