import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";


export const getTimetableList = (payload) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.post(`${apiMethod}/faculty.timetable_api.get_timetable_listing`, payload);
        
        dispatch({
            type: action_types.TIMETABLE_LIST,
            data: message,
        });
    };
  };

  
export const getTimetableDetails = (id) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.post(`${apiMethod}/faculty.timetable_api.get_timetable_details`, id);
        
        dispatch({
            type: action_types.TIMETABLE_DETAILS,
            data: message,
        });
    };
  };

  export const getUnassignModules = (param) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.post(`${apiMethod}/faculty.timetable_api.unassigned_modules`, param);
        
        dispatch({
            type: action_types.UNASSIGN_MODULES,
            data: message,
        });
    };
  };

  export const getClassroomTypes = () => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.post(`${apiMethod}/faculty.timetable_api.classroom_type`);
        
        dispatch({
            type: action_types.CLASSROOM_TYPE,
            data: message,
        });
    };
  };

  export const getClassroom = (classroom) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.post(`${apiMethod}/faculty.timetable_api.classroom?classroom_type=${classroom}`);
        
        dispatch({
            type: action_types.CLASSROOMS,
            data: message,
        });
    };
  };

  export const getTimetableStudents = (intake, module) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.post(`${apiMethod}/faculty.timetable_api.module_unassigned_students?intake=${intake}&module_code=${module}`);
        
        dispatch({
            type: action_types.UNASSIGNED_STUDENTS,
            data: message,
        });
    };
  };


  export const getLecturerTimetable = (intake, module) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.post(`${apiMethod}/faculty.timetable_api.module_assigned_lecturer?intake=${intake}&module_code=${module}`);
        
        dispatch({
            type: action_types.TIMETABLE_LECTURERS,
            data: message,
        });
    };
  };

  export const resetTimetable = () => {
    return (dispatch) => {
        dispatch({
            type: action_types.RESET_TIMETABLE,
            data: [],
        });
    };
  };

  