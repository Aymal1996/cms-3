import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";


export const getScholarshipList = (status) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/registry.api.get_scholarship_names?status=${status}`);
        dispatch({
            type: action_types.SCHOLARSHIP_LIST,
            data: message,
        });
    };
};

export const getScholarshipListPg = (status, page, limit, order, orderby) => {
    return async(dispatch) => {
        let ordering = '';
        if(order == "ascend") {
            ordering = 'ASC'
        } else if(order == "descend") {
            ordering = 'DESC'
        }
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/registry.api.get_scholarship_names_pagination${status ? '?status='+status : ''}${order && '&order='+ordering+'&orderby='+orderby}${page ? '&page_number='+page: ''}${limit ? '&limit='+limit: ''}`);
        dispatch({
            type: action_types.SCHOLARSHIP_LIST,
            data: message,
        });
    };
};


export const getScholarshipTypeDrop = (scholarship, scheme) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/registry.api.get_scholarship_type?scholarship_name=${scholarship}&scheme_name=${scheme}`);
        dispatch({
            type: action_types.SCHOLARSHIP_TYPE_DROP,
            data: message,
        });
    };
};



export const getSingleScholorshipData = (code) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/registry.api.get_single_scholarship_details?name=${code}`);
        dispatch({
            type: action_types.SCHOLARSHIP_SINGLE_DATA,
            data: message,
        });
    };
};

export const getOutstandingPaymentList = (code, page, limit, order, orderby) => {
    let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/registry.finance_api.scholarship_outstanding_balance_breakdown?name=${code}${order && '&order='+ordering+'&orderby='+orderby}${page ? '&page_number='+page: ''}${limit ? '&limit='+limit: ''}`);
        dispatch({
            type: action_types.OUTSTANDING_PAYMENT,
            data: message,
        });
    };
};

export const getTotalOutstandingPayment = (code) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/registry.api.get_outstanding_total?name=${code}`);
        dispatch({
            type: action_types.OUTSTANDING_TOTAL_PAYMENT,
            data: message,
        });
    };
};

export const getStudentsList = (code, page, limit, order, orderby) => {
    let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/registry.api.get_scholarship_student_list?name=${code}${order && '&order='+ordering+'&orderby='+orderby}${page ? '&page_number='+page: ''}${limit ? '&limit='+limit: ''}`);
        dispatch({
            type: action_types.STUDENT_LIST,
            data: message,
        });
    };
};