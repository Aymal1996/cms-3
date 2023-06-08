import axios from '../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../configs/constants';

export const sourceApi = (payload) => {
    return axios.post(`${apiMethod}/marketing.api.add_source`, payload)
};

export const deleteSource = (name) => {
    return axios.get(`${apiMethod}/marketing.api.delete_source?name=${name}`)
};

export const updateForm = (name, payload) => {
    return axios.put(`${apiresource}/AQA Form Listing/${name}`, payload)
};

export const createForm = (payload) => {
    return axios.post(`${apiMethod}/aqa.api.add_aqa_form_listing_new`, payload)
};