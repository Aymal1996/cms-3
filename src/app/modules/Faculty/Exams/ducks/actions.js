import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";


export const getallExamsList = (page, limit, order, orderby, search =  null) =>
async (dispatch) => {
  const {
    data: { message },
  } = await axios.get(
    `${apiMethod}/faculty.exam.get_exam_list?page_number=${page}&limit=${limit}${
      order ? `&order=${order == 'ascend' ? 'asc' : 'desc'}&orderby=${orderby}` : ''
    } ${search ? `&filters=${search}` : ''}`,
  );
  dispatch({
    type: action_types.GET_EXAM_LIST,
    data: message,
  });
};



export const getUnassignExams = (payload) => {
  return async(dispatch) => {
      const {
          data: { message },
      } = await axios.post(`${apiMethod}/faculty.exam.get_exam_unassigned_exam_date_list`, payload);
      
      dispatch({
          type: action_types.UNASSIGN_EXAMS,
          data: message,
      });
  };
};


export const getUnassignInvigilators = (InvPayload) => {
  return async(dispatch) => {
      const {
          data: { message },
      } = await axios.post(`${apiMethod}/faculty.exam.get_exam_unassigned_invigilators_list`, InvPayload);
      
      dispatch({
          type: action_types.UNASSIGN_INVIGILATORS,
          data: message,
      });
  };
};


export const getExamDetails = (name) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/faculty.exam.get_exam_details?name=${name}`);
        
        dispatch({
            type: action_types.EXAM_SINGLE,
            data: message,
        });
    };
};

export const getInviligators = () => {
  return async(dispatch) => {
      const {
          data: { message },
      } = await axios.get(`${apiMethod}/faculty.exam.get_invigilators?orderby=employee_name&order=asc`);
      
      dispatch({
        type: action_types.EXAM_INVIGILATORS,
        data: message,
    });
      
  };
};



export const getModules = () => {
  return async(dispatch) => {
      const {
          data: { message },
      } = await axios.post(`${apiMethod}/faculty.timetable_api.module`);
      
      dispatch({
        type: action_types.GET_MODULES,
        data: message,
    });
      
  };
};

export const getFaculties = () => {
  return async(dispatch) => {
      const {
          data: { message },
      } = await axios.post(`${apiMethod}/faculty.timetable_api.faculty`);
      
      dispatch({
        type: action_types.GET_FACULTIES,
        data: message,
    });
      
  };
};

export const getProgramme = () => {
  return async(dispatch) => {
      const {
          data: { message },
      } = await axios.post(`${apiMethod}/faculty.timetable_api.program`);
      
      dispatch({
        type: action_types.GET_PROGRAMME,
        data: message,
    });
      
  };
};

export const getLecturehall = () => {
  return async(dispatch) => {
      const {
          data: { message },
      } = await axios.post(`${apiMethod}/faculty.exam.exam_hall_dropdown`);
      
      dispatch({
        type: action_types.GET_LECTUREHALL,
        data: message,
    });
      
  };
};


