import axios from '../../../../../services/axiosInterceptor';
import { apiMethod } from '../../../../../configs/constants';
import * as action_types from './constants';

export const getProgramPerformance = (filters) => {
  return async (dispatch) => {
    try {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/faculty.faculty_program.program_performances_chart`, {params : {'filters': filters}});
      console.log(message, 'This is the data');
      dispatch({
        type: action_types.GET_PROGRAM_PERFORMANCE,
        data: message[0],
      });
    } catch (e) {
      console.log(e, 'This is the error');
    }
  };
};

export const facultyProgramList = (page, limit, order, orderby, search = null) => {
  return async (dispatch) => {
    let ordering = '';
    if (order == 'ascend') {
      ordering = 'ASC';
    } else if (order == 'descend') {
      ordering = 'DESC';
    }

    try {
      const {
        data: { message },
      } = await axios.get(
        `${apiMethod}/faculty.faculty_program.programme_list?page_number=${page}&limit=${limit}${orderby ? `&orderby=${orderby}&order=${ordering}` : ''}${
          search ? '&filters=' + JSON.stringify(search) : ''
        }`,
      );
      dispatch({
        type: action_types.FACULTY_PROGRAM_LIST,
        data: message,
      });
    } catch (e) {
      console.log(e, 'This is error');
    }
  };
};

export const facultyStudentList = (id, page = 1, limit = 100, order = 'DESC', orderby = 'creation', search = null) => {
  return async (dispatch) => {
    let ordering = '';
    if (order == 'ascend') {
      ordering = 'ASC';
    } else if (order == 'descend') {
      ordering = 'DESC';
    }

    try {
      const {
        data: { message },
      } = await axios.get(
        `${apiMethod}/faculty.faculty_program.students_programs_list?program_code=${id}&page_number=${page}&limit=${limit}&orderby=${orderby}&order=${ordering}${
          search ? '&filters=' + JSON.stringify(search) : ''
        }`,
      );
      dispatch({
        type: action_types.GET_STUDENT_PROGRAM_LIST,
        data: message,
      });
    } catch (e) {
      console.log(e, 'This is error');
    }
  };
};

export const facultyStaffLecturesList = (page, limit,code) => {
  return async (dispatch) => {
    try {
      const {
        data: { message },
      } = await axios.get(
        `${apiMethod}/faculty.faculty_program.program_lactures_staff?page_number=${page}&limit=${limit}&program_code=${code}`,
      );
      dispatch({
        type: action_types.GET_STAFF_LECTURES_LIST,
        data: message,
      });
    } catch (e) {
      console.log(e, 'This is error');
    }
  };
};

export const getStaffNames = (code) => {
  return async (dispatch) => {
    try {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/faculty.faculty_program.programme_coorinator?program_code=${code}`);
      dispatch({
        type: action_types.GET_STAFF_NAMES,
        data: message,
      });
    } catch (e) {
      console.log(e, 'This is error');
    }
  };
};

export const getUnassignedCount = () => {
  return async (dispatch) => {
    try {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/faculty.faculty_program.program_unassigned_module_count`);
      dispatch({
        type: action_types.GET_UNASSIGNED_COUNT,
        data: message,
      });
    } catch (e) {
      console.log(e, 'This is error');
    }
  };
};

export const getProgramDetails = (code) => {
  return async (dispatch) => {
    try {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/faculty.faculty_program.programme_detail_summary?program_code=${code}`);

      dispatch({
        type: action_types.GET_PROGRAM_DETAIL,
        data: message,
      });
    } catch (e) {
      console.log(e, 'This is error');
    }
  };
};

export const getSemesterDropdown = (code) => {
  return async (dispatch) => {
    try {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/faculty.faculty_program.program_semester_list?program_code=${code}`);

      dispatch({
        type: action_types.GET_SEMESTER_DROPDOWN,
        data: message,
      });
    } catch (e) {
      console.log(e, 'This is error');
    }
  };
};

export const getModuleList = (code,semester) => {
  return async (dispatch) => {
    try {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/faculty.faculty_program.program_semester_module_list?program_code=${code}&semester_code=${semester}`);

      dispatch({
        type: action_types.GET_MODULE_LIST,
        data: message,
      });
    } catch (e) {
      console.log(e, 'This is error');
    }
  };
};

export const timetableList = (id, page = 1, limit = 10, filter = '') => {
  return async (dispatch) => {
    try {
      const {
        data: { message },
      } = await axios.get(
        `${apiMethod}/faculty.program_timetable.program_timetable_detail?page_number=${page}&limit=${limit}&orderby=creation&order=DESC&filters={"program_code":"${id}",${filter ? `,${filter}` : ''}}`,
      );
      dispatch({
        type: action_types.GET_PROGRAM_TIMETABLE_LIST,
        data: message,
      });
    } catch (e) {
      console.log(e, 'This is error');
    }
  };
};

export const getTimeTableFilter = (type, code) => {
  return async (dispatch) => {
    try {
      const {
        data: { message },
      } = await axios.get(`${apiMethod}/faculty.program_timetable.${type}?program_code=${code}`);
      dispatch({
        type: action_types.GET_TIME_TABLE_FILTER,
        data: message,
      });
    } catch (e) {
      console.log(e, 'This is error');
    }
  };
};