import axios from "../../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../../configs/constants";

export const getProgrammesStatus = () => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/aqa.api.get_expiry_count`);
        dispatch({
            type: action_types.PROGRAMME_STATUSES,
            data: message,
        });
    };
};