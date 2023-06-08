import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";

export const getTermList = (page, limit, order, orderby) => {
    return async(dispatch) => {
        let ordering = '';
        if(order == "ascend") {
            ordering = 'ASC'
        } else if(order == "descend") {
            ordering = 'DESC'
        }
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.get_term_list_pagination?${order && '&order='+ordering+'&orderby='+orderby}${page ? '&page_number='+page: ''}${limit ? '&limit='+limit: ''}`);
        dispatch({
            type: action_types.TERM_LIST,
            data: message,
        });
    };
};

export const getCalendarCoursesList = () => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.get_calander_list`);
        dispatch({
            type: action_types.CALENDAR_COURSE_LIST,
            data: message,
        });
    };
};


export const getTermDetail = (params) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.get_term_detail?name=${params}`);
        dispatch({
            type: action_types.TERM_DETAIL,
            data: message,
        });
    };
};

export const getStudentList = (params) => {
    const bodyData = {
        term: params
    }
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.post(`${apiMethod}/aqa.api.term_student_list`, bodyData);
        dispatch({
            type: action_types.STUDENT_LIST,
            data: message,
        });
    };
};

export const getProgrammeList = (params) => {
    const bodyData = {
        term: params
    }
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.post(`${apiMethod}/aqa.api.term_program_list`, bodyData);
        dispatch({
            type: action_types.PROGRAMME_LIST,
            data: message,
        });
    };
};

export const getCourseGroupType = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Course Group Type`);
        dispatch({
            type: action_types.COURSE_GROUP_TYPE,
            data: data,
        });
    };
};

export const getTermDetailProgrammeList = (params) => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Institution Faculty Program?fields=["name","program_code","program_name","faculty_code","status"]&filter=["program_level":${params}]`);
        dispatch({
            type: action_types.TERM_DETAIL_PROGRAMME_LIST,
            data: data,
        });
    };
};

export const getProgrammeDropList = (params) => {
    const bodyData = {
        course: params
    }
    const url = `${apiMethod}/aqa.api.course_programs_list`;
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.post(url, bodyData);
        dispatch({
            type: action_types.PROGRAMME_DROP_LIST,
            data: message,
        });
    };
};