import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";


export const getFormsListing = (status) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.get_field_count_form_listing?doctype=AQA Form Listing&status=${status}`);
        dispatch({
            type: action_types.FORMS_LISTING,
            data: message,
        });
    };
};

export const getFormsFields = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/AQA Form Setting?fields=["name","type"]&limit_page_length=0`);
        dispatch({
            type: action_types.FORMS_FIELDS,
            data: data,
        });
    };
};

export const getDepartments = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/AQA Department?filter=[["approval_authority","=","Yes"],["active","=","Active"]]`);
        dispatch({
            type: action_types.FORMS_DEPARTMENTS,
            data: data,
        });
    };
};

export const getApprovals = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/AQA Form Approver Department List?fields=["name","status","department","requires_remarks"]`);
        dispatch({
            type: action_types.DEPARTMENT_APPROVAL,
            data: data,
        });
    };
};

export const getSingleForm = (name) => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/AQA Form Listing/${name}`);
        dispatch({
            type: action_types.FORM_DETAILS,
            data: data,
        });
    };
};

export const emptyForms = () => {
    return (dispatch) => {
        dispatch({
            type: action_types.EMPTY_FORMS,
            data: {},
        });
    };
};
