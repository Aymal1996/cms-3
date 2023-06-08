import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";


export const getFaculty = (status) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.get_faculty_list${status ? '?status='+status : ''}`);
        dispatch({
            type: action_types.FACULTY_LIST,
            data: message,
        });
    };
};

export const getFacultyList = (status, page, limit, order, orderby) => {
    return async(dispatch) => {
        let ordering = '';
        if(order == "ascend") {
            ordering = 'ASC'
        } else if(order == "descend") {
            ordering = 'DESC'
        }
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.get_faculty_list_pagination?status=${status}${order && '&order='+ordering+'&orderby='+orderby}${page ? '&page_number='+page: ''}${limit ? '&limit='+limit: ''}`);
        dispatch({
            type: action_types.FACULTY_LIST2,
            data: message,
        });
    };
};

export const getInstitution = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Institutions`);
        dispatch({
            type: action_types.INTITUTION_LIST,
            data: data,
        });
    };
};

export const getSingleFaculty = (code) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.faculty_single_record_list_status?name=${code}`);
        dispatch({
            type: action_types.SINGLE_FACULTY,
            data: message,
        });
    };
};

export const getProgrmList = () => {
    return async(dispatch) => {
        const {
            data: { message },
            
        } = await axios.get(`${apiMethod}/aqa.api.get_programs_dropdown?orderby=name&order=asc`);
        dispatch({
            type: action_types.PROGRAM_LIST,
            data: message,
        });
    };
};