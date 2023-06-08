import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";

export const getModules = (status, page, limit, order, orderby, search = null) => {
    console.log('helo', search)
    return async(dispatch) => {
        let ordering = '';
        if(order == "ascend") {
            ordering = 'ASC'
        } else if(order == "descend") {
            ordering = 'DESC'
        }
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.module_list_pagination?status=${status}${order && '&order='+ordering+'&orderby='+orderby}${page ? '&page_number='+page: ''}${limit ? '&limit='+limit: ''}${search ? '&filters='+JSON.stringify(search): ''}`);
        dispatch({
            type: action_types.MODULE_LIST,
            data: message,
        });
    };
};

export const getSingleModule = (code) => {
    return async(dispatch) => {
        const {
            data: { message },

        } = await axios.get(`${apiMethod}/aqa.api.module_single_record_list_status?name=${code}`);
        dispatch({
            type: action_types.SINGLE_MODULE,
            data: message,
        });
    };
};