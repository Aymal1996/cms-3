import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";

export const getScholarshipDrop = () => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/marketing.finance_api.get_scholarship_list`);
    dispatch({
        type: action_types.SCHOLARSHIPDROP,
        data: message,
    });
};

export const getGrantDrop = () => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/marketing.finance_api.get_grant_list`);
    dispatch({
        type: action_types.GRANTDROP,
        data: message,
    });
};

export const getCountryRank = () => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/marketing.finance_api.country_chart`);
    dispatch({
        type: action_types.COUNTRY_RANK,
        data: message,
    });
};

export const getAllBalances = () => async (dispatch) => {
    const {
        data: { message },
    } = await axios.get(`${apiMethod}/marketing.finance_api.transactions_chart`);
    dispatch({
        type: action_types.ALL_BALANCES,
        data: message,
    });
};