import axios from '../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../configs/constants';

export const createRequest = (body) => {
    return axios.post(`${apiMethod}/hrms.setup.add_hrms_form_request`, body);
};

export const cancelRequest = (id) => {
    return axios.delete(`${apiresource}/HRMS Form Request/${id}`);
};

export const updateRequest = (id, body) => {
    return axios.put(`${apiresource}/HRMS Form Request/${id}`, body);
};


export const getRequest = (name) => {
    return axios.get(`${apiMethod}/hrms.api.get_for_request_warning?request=${name}`);
};

export const getApproverLead = (id) => {
    return axios.get(`${apiMethod}/hrms.api.request_4_details?employee_id=${id}`);
};
