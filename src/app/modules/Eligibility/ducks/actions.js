import axios from "../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../configs/constants";


export const getApplicationLeads = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Application?fields=["name","applicant_name"]&filters=[["docstatus","=",2]]`);
        dispatch({
            type: action_types.APPLICATION_LEADS,
            data: data,
        });
    };
};

export const getApplicationLeadsCount = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Application?fields=["name","applicant_name"]&filters=[["docstatus","=",0]]&limit_page_length=None`);
        dispatch({
            type: action_types.APPLICATION_COUNT,
            data: data,
        });
    };
};

export const getApplicationProgress = () => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/marketing.api.get_incomplete_application_list`);
        dispatch({
            type: action_types.APPLICATION_PROG,
            data: message,
        });
    };
};

export const getApplicationProgressDetail = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Application?fields=["name","applicant_name","workflow_state","modified"]&filters=[["docstatus","=",0]]&order_by=name DESC&limit_page_length=0`);
        dispatch({
            type: action_types.APPLICATION_PROG_DETAIL,
            data: data,
        });
    };
};

export const getTotalStudentEnrolled = () => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/marketing.api.get_total_and_enrolled_students`);
        dispatch({
            type: action_types.TOTAL_STUDENT_ENROLLED,
            data: message,
        });
    };
};

export const getEligibilityAssessmentList = (type) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.post(`${apiMethod}/marketing.api.get_stage_listing`,{"workflow_state":type});
        dispatch({
            type: action_types.ELIGIBILITY_ASSESSMENT,
            data: message,
        });
    };
};

export const getIncompleteDocumentsList = (type) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.post(`${apiMethod}/marketing.api.workflow_application_list`,{"workflow_state":type});
        dispatch({
            type: action_types.INCOMPLETE_REGISTRATIONS,
            data: message,
        });
    };
};

export const getPendingVisaList = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Application?fields=["name","applicant_name","workflow_state","modified"]&filters=[["docstatus","=",0],["workflow_state","=","Incomplete registration visa"]]&order_by=name DESC&limit_page_length=None`);
        dispatch({
            type: action_types.PENDING_VISA,
            data: data,
        });
    };
};

export const getPendingAccomodationList = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Application?fields=["name","applicant_name","workflow_state","modified"]&filters=[["docstatus","=",0],["workflow_state","=","Pending accomodation"]]&order_by=name DESC&limit_page_length=None`);
        dispatch({
            type: action_types.PENDING_ACCOMODATION,
            data: data,
        });
    };
};

export const getPendingEnrollmentList = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Application?fields=["name","applicant_name","workflow_state","modified"]&filters=[["docstatus","=",0],["workflow_state","=","Pending enrollment"]]&order_by=name DESC&limit_page_length=None`);
        dispatch({
            type: action_types.PENDING_ENROLLMENT,
            data: data,
        });
    };
};

export const getApplicationDetial = (appURL) => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Application/${appURL}`);
        dispatch({
            type: action_types.APPLICATION_DETAIL,
            data: data,
        });
    };
};


export const getStepsDetailData = (id) => {
    return async(dispatch) => {
        let json = {
            "app_id": id
        }
        const {
            data: { message },
        } = await axios.post(`${apiMethod}/marketing.api.get_application_details`, json);
        dispatch({
            type: action_types.STEPS_DETAIL_DATA2,
            data: message,
        });
    };
};