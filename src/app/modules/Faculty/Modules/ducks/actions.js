import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";

export const getFacultyModules = (page, limit, order, orderby, search= null) => async (dispatch) => {
    let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.modules_api.get_module_listing`, {params: { "page_number": page, "limit": limit, "order": ordering, "orderby": orderby, "filters": search}});
    dispatch({
        type: action_types.FACULTY_MODULES,
        data: message,
    });
};

export const getModuleSummary = (module_id) => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.modules_api.get_module_summary?module_id=${module_id}`);
    dispatch({
        type: action_types.MODULE_SUMMARY,
        data: message,
    });
};


export const getModuleLecturer = (module_id, page, limit, order, orderby, search = null, tt) => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.modules_api.get_module_lecturers?module_id=${module_id}${page ? '&page_number='+page: ''}${limit ? '&limit='+limit: ''}${order && '&order='+ordering+'&orderby='+orderby}${search ? '&filter='+search: ''}${tt ? `&tt_id=${tt}` : ''}`);
    dispatch({
        type: action_types.MODULE_LECTURER,
        data: message,
    });
};

export const getModuleStudent = (module_id, page, limit, order, orderby, search = null, tt) => async (dispatch) => {
    let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.classroom_api.student_list_subject_pagination?module_id=${module_id}${page ? '&page_number='+page: ''}${limit ? '&limit='+limit: ''}${order && '&order='+ordering+'&orderby='+orderby}${search ? '&filters='+search: ''}${tt ? `&tt_id=${tt}` : ''}`);
    dispatch({
        type: action_types.MODULE_STUDENTS,
        data: message,
    });
};

export const getModuleMaterial = (module_id) => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.modules_api.get_module_materials?module_id=${module_id}`);
    dispatch({
        type: action_types.MODULE_MATERIALS,
        data: message,
    });
};

export const getModuleTimetable = (id, page, limit, order=null, orderby=null, search = null, tt ) => async (dispatch) => {
    let ordering = '';
    if(order == "ascend") {
        ordering = 'ASC'
    } else if(order == "descend") {
        ordering = 'DESC'
    }
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.modules_api.module_timetable?module_id=${id}${page ? '&page_number='+page: ''}${limit ? '&limit='+limit: ''}${order && '&order='+ordering+'&orderby='+orderby}${search ? '&filters='+search : ''}${tt ? `&tt_id=${tt}` : ''}`);
    dispatch({
        type: action_types.MODULE_TIMETABLE,
        data: message,
    });
};

export const getModuleGraph = (filters = null) => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.timetable_api.failed_students_new`, {params : {'filters': filters}});
    dispatch({
        type: action_types.MODULE_GRAPH,
        data: message,
    });
};