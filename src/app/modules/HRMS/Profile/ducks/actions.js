import axios from '../../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const getFitFigure = (id) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.hrms_advancement_get_single_records?employee_id=${id}`);
    dispatch({
      type: action_types.FITINDEX_DETAILS,
      data: message,
    });
  };
};



export const getEmployeeProfile = (employeeID) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.dashboard_api.employment_details?empid=${employeeID}`);
    dispatch({
      type: action_types.PROFILE_DATA,
      data: message,
    });
  };
};

export const getEmployeeDocuments = (employeeID) => {
  return async (dispatch) => {
    const data = {
      employee_id: employeeID
    }
    const {
      data: { message },
    } = await axios.post(`${apiMethod}/hrms.api.employee_document_list`, data);
    dispatch({
      type: action_types.EMPLOYEE_DOCUMENTS,
      data: message,
    });
  };
};

export const getSingleSkills = (employeeID) => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.advancement_api.hrms_advancement_get_single_records?employee_id=${employeeID}`);
    dispatch({
      type: action_types.SINGLE_SKILLS,
      data: message,
    });
  };
};