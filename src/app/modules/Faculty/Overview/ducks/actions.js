import axios from '../../../../../services/axiosInterceptor';
import * as action_type from './constants';
import { apiMethod } from '../../../../../configs/constants';


export const getOtherIssues = () => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.faculty_overview.other_issues`);
    dispatch({
        type: action_type.OTHER_ISSUES,
        data: message,
    });
};

export const getModuleList = () => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.faculty_overview.get_ungraded_module_list`);
    dispatch({
        type: action_type.MODULE_LIST,
        data: message,
    });
};

export const getPendingList = () => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.faculty_overview.student_issues`);
    dispatch({
        type: action_type.PENDING_LIST,
        data: message,
    });
};

export const getStaffIssueList = () => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/faculty.faculty_overview.staff_issues`);
    dispatch({
        type: action_type.STAFF_ISSUES,
        data: message,
    });
};

export const getFacultyTimetable = () => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/faculty.staff_checkin_out.get_faculty_timetable`);
        dispatch({
            type: action_type.GET_FACULTY_TIMETABLE,
            data: message,
        });
    };
};

