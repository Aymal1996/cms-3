import axios from '../../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const getStudentsList = (status) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/registry.api.get_students_list_from_students?status=${status}`);
    dispatch({
      type: action_types.STUDENTS_LIST,
      data: message,
    });
  };
};

export const getStudentsListPg = (status, page, limit, order, orderby, search = null) => {
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
      `${apiMethod}/registry.api.get_students_list_from_students_pagination${status ? '?status=' + status : ''}${
        order && '&order=' + ordering + '&orderby=' + orderby
      }${page ? '&page_number=' + page : ''}${limit ? '&limit=' + limit : ''}${
        search ? '&filters=' + JSON.stringify(search) : ''
      }`,
    );
    dispatch({
      type: action_types.STUDENTS_LIST,
      data: message,
    });
  };
};

export const getStudentsListPgRegistry = (status, page, limit, order, orderby, search = null) => {
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
      `${apiMethod}/registry.api.get_students_list_from_students_pagination_for_registry${
        status ? '?status=' + status : ''
      }${order && '&order=' + ordering + '&orderby=' + orderby}${page ? '&page_number=' + page : ''}${
        limit ? '&limit=' + limit : ''
      }${search ? '&filters=' + JSON.stringify(search) : ''}`,
    );
    dispatch({
      type: action_types.STUDENTS_LIST,
      data: message,
    });
  };
};

export const studentsStatus = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/registry.api.get_pending_application`);
    dispatch({
      type: action_types.PENDING_LIST,
      data: message,
    });
  };
};

export const getStudentAppdetails = (AppId) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/registry.api.get_application_specific_user?application_id=${AppId}`);
    dispatch({
      type: action_types.STUDENT_APP_DETAIL,
      data: message,
    });
  };
};

export const getStudentdetails = (studentid, load) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/registry.api.get_student_specific_user?student_id=${studentid}`);
    load && load(false);
    dispatch({
      type: action_types.STUDENT_APP_DETAIL,
      data: message,
    });
  };
};

export const getAuditStudentdetails = (studentid, load) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/registry.api.get_student_specific_user_audited?student_id=${studentid}`);
    load && load(false);
    dispatch({
      type: action_types.STUDENT_APP_DETAIL,
      data: message,
    });
  };
};

export const testApi = (studentid) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiresource}/Students Audit/${studentid}`);
    dispatch({
      type: action_types.STUDENT_APP_DETAIL,
      data: message,
    });
  };
};

export const getTimetable = (student_id) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/registry.student_performance.get_student_academic_timetable?student_id=${student_id}`,
    );
    dispatch({
      type: action_types.TIME_TABLE,
      data: message,
    });
  };
};

// export const getTimetable = (student_id, semester_code) => {
//   return async (dispatch) => {
//     const {
//       data: { message },
//     } = await axios.get(
//       `${apiMethod}/registry.student_semester_timetable.semester_student_attendance?student_id=${student_id}&semester_code=${semester_code}`,
//     );
//     dispatch({
//       type: action_types.TIME_TABLE,
//       data: message,
//     });
//   };
// };

export const emptyStudentApp = () => {
  return (dispatch) => {
    dispatch({
      type: action_types.EMPTY_STUDENT_APP,
      data: {},
    });
  };
};

export const emptyStudentRequest = () => {
  return (dispatch) => {
    dispatch({
      type: action_types.EMPTY_STUDENT_REQ,
      data: {},
    });
  };
};

export const registryData = (studentID) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(`${apiMethod}/registry.api.get_students_requests?student_id=${studentID}`);
  dispatch({
    type: action_types.REQUEST_DATA,
    data: message,
  });
};

export const complaintData = (studentID) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(`${apiMethod}/faculty.students.my_complaints?student_id=${studentID}`);
  dispatch({
    type: action_types.COMPLAINT_DATA,
    data: message,
  });
};

export const getPerformance = (id, sem, prog) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(
    `${apiMethod}/registry.student_performance.student_transcript_academic_performance?student_id=${id}&semester=${sem}&program=${prog}`,
  );
  dispatch({
    type: action_types.PERFORMANCE_DATA,
    data: message,
  });
};

export const getSemesterGrades = (studentID, semesterID) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(
    `${apiMethod}/registry.student_performance.academic_performance?student_id=${studentID}&semester_code=${semesterID}`,
  );
  dispatch({
    type: action_types.SEMESTER_GRADES,
    data: message,
  });
};

export const getSemesterCGPA = (studentID, semesterID, programCode) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(
    `${apiMethod}/registry.student_performance.total_semester_gpa_count?student_id=${studentID}&semester_code=${semesterID}&program_code=${programCode}`,
  );
  dispatch({
    type: action_types.SEMESTER_CGPA,
    data: message,
  });
};

export const getSemesterGPA = (studentID, semesterID) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(
    `${apiMethod}/registry.student_performance.total_semester_cpa_count?student_id=${studentID}&semester_code=${semesterID}`,
  );
  dispatch({
    type: action_types.SEMESTER_GPA,
    data: message,
  });
};

export const getSemesterAttendance = (studentID, semesterID) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(
    `${apiMethod}/registry.student_performance.total_semester_attendance_count?student_id=${studentID}&semester_code=${semesterID}`,
  );
  dispatch({
    type: action_types.SEMESTER_ATTENDANCE,
    data: message,
  });
};

export const getSemesterTranscript = (studentID, semesterID) => async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(
    `${apiMethod}/registry.student_performance.transcript_student_semester?student_id=${studentID}&semester_code=${semesterID}`,
  );
  dispatch({
    type: action_types.SEMESTER_TRANSCRIPT,
    data: message,
  });
};

export const getStudentBalanceBreakdown = (id) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.post(`${apiMethod}/marketing.student_api.outstanding_balance_breakdown_list`, { student_id: id });
    dispatch({
      type: action_types.BREAKDOWN_BALANCE,
      data: message,
    });
  };
};

export const getStudentTransHistory = (id) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.post(`${apiMethod}/marketing.student_api.transaction_history_list`, { student_id: id });
    dispatch({
      type: action_types.BALANCE_HISTORY,
      data: message,
    });
  };
};

export const selectProgram = (id) => {
  return (dispatch) => {
    dispatch({
      type: action_types.SPPRORAM,
      data: id,
    });
  };
};

export const getOfferletterList = (page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/marketing.finance_api.get_applicants?workflow_state=Incomplete registration visa&page=${page}&limit=${limit}&orderby=modified&order=DESC&filter=registration_fee=1 AND offer_letter_release=0`,
    );
    dispatch({
      type: action_types.OFFERLETTER_RELEASE,
      data: message,
    });
  };
};

export const getAllPendingEnrolled = (page, limit) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(
      `${apiMethod}/marketing.finance_api.get_applicants?workflow_state=Pending enrollment&page=${page}&limit=${limit}&orderby=modified&order=DESC&filter=module_registration=0 AND visa_delivery_to_university=1 AND tution_fee=1`,
    );
    dispatch({
      type: action_types.PENDING_ENROLLED,
      data: message,
    });
  };
};

export const emptyListRegistry = () => {
  return (dispatch) => {
    dispatch({
      type: action_types.EMPTY_REGISTRY_LIST,
      data: {},
    });
  };
};