import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiMethod, apiresource } from "../../../../../configs/constants";


export const getRequestPending = (page, sort, limit, id) => {
    return async (dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/hrms.api.get_request_listing?status=Staff Request${id ? `&approver_id=${id}` : ''}${sort ? '&order='+sort+'&orderby='+creation: ''}${page ? '&page_number='+page: ''}&limit=${limit}`);
        dispatch({
            type: action_types.REQUEST_LIST_PENDING,
            data: message,
        });
    };
};

export const getEmployeeStatus = (id) => {
    return async (dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/hrms.api.pending_issues_staff?staff_id=${id}`);
        dispatch({
            type: action_types.EMPLOYEE_STATUS,
            data: message,
        });
    };
};

export const getRequestArchive = (page, sort, limit, id) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/hrms.api.get_request_listing?status=Archive${id ? `&approver_id=${id}` : ''}${sort && '&order='+sort+'&orderby='+creation}${page ? '&page_number='+page: ''}&limit=${limit}`);
        dispatch({
            type: action_types.REQUEST_LIST_ARCHIVE,
            data: message,
        });
    };
};

export const getYourRequest = (page, sort, limit, id) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/hrms.api.get_request_listing?&status=My Request${sort && '&order='+sort+'&orderby='+creation}${page ? '&page_number='+page: ''}&limit=${limit}`);
        dispatch({
            type: action_types.REQUEST_LIST_YOUR_REQUEST,
            data: message,
        });
    };
};

export const getFormFields = () => {
    return async (dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/hrms.api.get_form_fields`);
        dispatch({
            type: action_types.FORMS_LIST,
            data: message,
        });
    };
};

export const getRequestDetails = (id, approver) => async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/hrms.api.get_staff_requests?staff_id=${id}${approver ? `&approver_id=${approver}`: ''}`);
    dispatch({
      type: action_types.REQUEST_DATA,
      data: message,
    });
};
export const emptyRequestDetails = () => {
    return (dispatch) => {
        dispatch({
            type: action_types.EMPTY_REQUEST_DATA,
            data: [],
        });
    };
};

  export const getFieldsList = () => {
    return async (dispatch) => {
    const {
        data: { data },
      } = await axios.get(`${apiresource}/HRMS Form Setting?fields=["name","field_label","type"]&limit_page_length=0`);
      dispatch({
        type: action_types.FIELDS_LIST,
        data: data,
      });
    }
  }