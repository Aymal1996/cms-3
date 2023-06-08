import axios from "../../../../../services/axiosInterceptor";
import { apiMethod } from "../../../../../configs/constants";

export const addEditJobOpen = (id, payload) => {
    if (id) {
        return axios.post(`${apiMethod}/hrms.advancement_api.update_create_hrms_job_opening/${id}`, payload);
    } else {
        return axios.post(`${apiMethod}/hrms.advancement_api.update_create_hrms_job_opening`, payload);
    }
  }  