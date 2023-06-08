import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiMethod } from "../../../../../configs/constants";


export const getRequestPending = (department, page, sort, limit) => {
    return async (dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.get_request_listing?department=${department}&status=Pending${sort && '&order='+sort+'&orderby='+creation}${page ? '&page_number='+page: ''}&limit=${limit}`);
        dispatch({
            type: action_types.REQUEST_LIST_PENDING,
            data: message,
        });
    };
};

export const getRequestArchive = (department, page, sort, limit) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.get_request_listing?department=${department}&status=Archive${sort && '&order='+sort+'&orderby='+creation}${page ? '&page_number='+page: ''}&limit=${limit}`);
        dispatch({
            type: action_types.REQUEST_LIST_ARCHIVE,
            data: message,
        });
    };
};

export const getYourRequest = (department, page, sort, limit) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.get_request_listing?department=${department}&status=Your Request${sort && '&order='+sort+'&orderby='+creation}${page ? '&page_number='+page: ''}&limit=${limit}`);
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
        } = await axios.get(`${apiMethod}/aqa.api.get_form_fields`);
        dispatch({
            type: action_types.FORMS_LIST,
            data: message,
        });
    };
};