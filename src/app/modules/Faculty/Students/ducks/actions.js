import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";


export const getStudentsStatistics = () => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.students.student_issues`);
    dispatch({
        type: action_types.STUDENT_PENDING_ISSUES,
        data: message,
    });
};

export const getStudentsComplaintsList = (status, page, limit, order, orderby, search =  null) => {
    let ordering = '';
      if(order == "ascend") {
          ordering = 'ASC'
      } else if(order == "descend") {
          ordering = 'DESC'
      }
      return async (dispatch) => {
        const {
          data: { message },
        } = await axios.get(`${apiMethod}/faculty.students.students_complaints_list?${status ? `status=${status}&` : ''}page_number=${page}&limit=${limit}${order ? `&order=${ordering}&orderby=${orderby}` : ''}${search ? '&filters=' + JSON.stringify(search) : ''}`);
        dispatch({
          type: action_types.STUDENT_COMPLAINTS_LIST,
          data: message,
        });
      };
  };

export const getStudentsComplaintsCard = (page, limit, order) => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.students.students_complaints_cards?page_number=${page}&limit=${limit}${order ? `&order=${order}&orderby=date` : ''}`);
    dispatch({
        type: action_types.STUDENT_COMPLAINTS_CARD,
        data: message,
    });
};

export const getStudentsIssuesList = (page, limit, order, orderby, search =  null) => {
    let ordering = '';
      if(order == "ascend") {
          ordering = 'ASC'
      } else if(order == "descend") {
          ordering = 'DESC'
      }
      return async (dispatch) => {
        const {
          data: { message },
        } = await axios.get(`${apiMethod}/faculty.students.students_pending_issues_list?page_number=${page}&limit=${limit}${order ? `&order=${ordering}&orderby=${orderby}` : ''}${search ? '&filters=' + JSON.stringify(search) : ''}`);
        dispatch({
          type: action_types.STUDENT_ISSUES_LIST,
          data: message,
        });
      };
  };

export const getStudentsIssuesCard = (page, limit, order) => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.students.students_pending_issues_cards?page_number=${page}&limit=${limit}${order ? `&order=${order}&orderby=creation` : ''}`);
    dispatch({
        type: action_types.STUDENT_ISSUES_CARD,
        data: message,
    });
};

// faculty_code":"",
// program_name":"",
// student_name":""