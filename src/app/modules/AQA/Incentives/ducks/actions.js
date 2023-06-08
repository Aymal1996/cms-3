import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";


export const getCurrentYearIntakes = () => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/marketing.incentives_api.get_intake_4_incentive`);
        dispatch({
            type: action_types.INTAKES_LIST,
            data: message,
        });
    };
};

export const getIncentiveList = (status, page, limit, order, orderby, search) => {
    return async(dispatch) => {
        let ordering = '';
        if(order == "ascend") {
            ordering = 'ASC'
        } else if(order == "descend") {
            ordering = 'DESC'
        }
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/marketing.incentives_api.incentive_listing_pagination?${page ? 'page_number='+page: ''}${limit ? '&limit='+limit: ''}${order && '&order='+ordering+'&orderby='+orderby}&status=${status}${search ? `&filters=${search}`: ''}`);
        dispatch({
            type: action_types.INCENTIVE_LIST,
            data: message,
        });
    };
};

export const getIncentiveDetails = (id) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.post(`${apiMethod}/marketing.incentives_api.get_incentive_details`, {"name": id});
        dispatch({
            type: action_types.INCENTIVE_DATA,
            data: message,
        });
    };
};

export const getIncentiveStudentList = (id, page, limit, order, orderby) => {
    return async(dispatch) => {
        let ordering = '';
        if(order == "ascend") {
            ordering = 'ASC'
        } else if(order == "descend") {
            ordering = 'DESC'
        }
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/marketing.incentives_api.get_incentive_students?incentive=${id}${page ? '&page_number='+page: ''}${limit ? '&limit='+limit: ''}${order && '&order='+ordering+'&orderby='+orderby}`);
        dispatch({
            type: action_types.INCENTIVE_STUDENT_LIST,
            data: message,
        });
    };
};