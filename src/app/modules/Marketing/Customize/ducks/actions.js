import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";


export const getSourceList = (filter, page, limit, order, orderby, search) => {
    return async(dispatch) => {
        let ordering = '';
        if(order == "ascend") {
            ordering = 'ASC'
        } else if(order == "descend") {
            ordering = 'DESC'
        }
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/marketing.api.source_listing_pagination?status=${filter}${order && '&order='+ordering+'&orderby='+orderby}${page ? '&page_number='+page: ''}${limit ? '&limit='+limit: ''}${search ? `&filters={"source_name": ${JSON.stringify(search)}}` : ''}`);
        dispatch({
            type: action_types.SOURCE_LIST,
            data: message,
        });
    };
};

export const getFormList = (page, limit, order, orderby, search=null) => {
    return async(dispatch) => {
        let ordering = '';
        if(order == "ascend") {
            ordering = 'ASC'
        } else if(order == "descend") {
            ordering = 'DESC'
        }
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.form_listing_customize?${page ? 'page_number='+page: ''}${limit ? '&limit='+limit: ''}${order && '&order='+ordering+'&orderby='+orderby}${search ? `&form_name=${search}` : ''}`);
        dispatch({
            type: action_types.FORM_LISTING,
            data: message,
        });
    };
};