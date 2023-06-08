import { apiMethod } from "../../../../../configs/constants"
import axios from "../../../../../services/axiosInterceptor"

export const getProfile = (email) => {
    return axios.post(`${apiMethod}/marketing.api.application_agent_profile?agent_id=${email}`);
};

export const profileUpdate = (payload) => {
    return axios.post(`${apiMethod}/marketing.api.update_agent_profile`, payload);
};
