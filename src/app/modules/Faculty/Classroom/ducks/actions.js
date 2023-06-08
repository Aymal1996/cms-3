import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";

export const getClassroomSchedule = (start, end) => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.classroom_calenders.sorted_data`, {params: {"start_date": start, "end_date": end}});
    dispatch({
        type: action_types.SCHEDULE,
        data: message,
    });
};

export const getReplacementCount = (start, end) => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.classroom_calenders.assigned_replacement_class_list`, {params: {"start_date": start, "end_date": end}});
    dispatch({
        type: action_types.REPLACEMENT_CLASS,
        data: message,
    });
};

export const getModulesProgram = () => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.classroom_api.employee_program_module_list`);
    dispatch({
        type: action_types.MODULE_FACTS,
        data: message,
    });
};

export const getModuleStudentsBySemester = (id, semester, page, limit, order, orderby, search = null, tt) => async (dispatch) => {
    let ordering = '';
        if(order == "ascend") {
            ordering = 'ASC'
        } else if(order == "descend") {
            ordering = 'DESC'
        }
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.classroom_api.student_list_subject_pagination`, {params: { "module_id": id, "semester_code": semester, "page_number": page, "limit": limit, "order": ordering, "orderby": orderby, "tt_id": tt, "filters": search }});
    dispatch({
        type: action_types.UNGRADEDSTUDENT_MODULE_LISTS,
        data: message,
    });
};

export const getModuleAttendance = (id, semester, start, end) => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.classroom_api.single_subject_module_timetable`, {params: { "module_id": id, "semester_code": semester, "start_date": start, "end_date": end}});
    dispatch({
        type: action_types.MODULE_ATTENDANCE,
        data: message,
    });
};

export const getModuleTimetable = (id, semester) => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.classroom_api.single_module_timetable_detail`, {params: { "module_id": id, "semester_code": semester }});
    dispatch({
        type: action_types.MODULE_TIMETABLE,
        data: message,
    });
};

export const getModuleMaterial = (id, semester) => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.classroom_api.material_outline_publisher`, {params: { "module_id": id, "semester_code": semester}});
    dispatch({
        type: action_types.MODULE_MATERIAL,
        data: message,
    });
};

export const getModuleAssessment = (id, semester, page, limit, search= null, tt) => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.classroom_api.student_assesment_detail`, {params: { "module_id": id, "semester_code": semester, "page_number": page, "limit": limit, "tt_id": tt, "filters": search}});
    dispatch({
        type: action_types.MODULE_ASSESSMENT,
        data: message,
    });
};

export const getModuleAssessmentDetails = (id) => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.classroom_api.single_student_assesment_detail`, {params: { "assessment_name": id }});
    dispatch({
        type: action_types.MODULE_ASSESSMENT_DETAILS,
        data: message,
    });
};

export const getStudentAttendance = (id, semester, date, page, limit, order, orderby) => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.classroom_calenders.student_attendnace_pagination`, {params: { "attendance_date": date, "module_code": id, "semester_code": semester, "page_number": page, "limit": limit }});
    dispatch({
        type: action_types.STUDENT_ATTENDANCE,
        data: message,
    });
};

export const getLecturerAttendance = (id, semester, date) => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.classroom_calenders.faculty_attendnace_pagination`, {params: { "attendance_date": date, "module_id": id, "semester_code": semester }});
    dispatch({
        type: action_types.LECTURER_ATTENDANCE,
        data: message,
    });
};

export const getModuleAssessmentPHD = (id, page, limit, order, orderby, search = null) => async (dispatch) => {
    let ordering = '';
        if(order == "ascend") {
            ordering = 'ASC'
        } else if(order == "descend") {
            ordering = 'DESC'
        }
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.classroom_api.phd_assessment_students`, {params: { "module_id": id, "page_number": page, "limit": limit, "order": ordering, "orderby": orderby, "filters": search }});
    dispatch({
        type: action_types.MODULE_ASSESSMENT_PHD,
        data: message,
    });
};

export const getModuleAssessmentDetailsPHD = (id) => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.classroom_api.single_php_student_assesment_detail`, {params: { "assessment_name": id }});
    dispatch({
        type: action_types.MODULE_ASSESSMENT_DETAILS_PHD,
        data: message,
    });
};