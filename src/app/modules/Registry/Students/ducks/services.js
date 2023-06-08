import axios from '../../../../../services/axiosInterceptor';
import { apiMethod, apiresource } from '../../../../../configs/constants';

export const getSingleAppData = (appId) => {
  return axios.get(`${apiresource}/AQA Form Request/${appId}`);
};

export const updateRequest = (payload, id) => {
  return axios.put(`${apiresource}/AQA Form Request/${id}`, payload);
};

export const cancelRequest = (name) => {
  return axios.delete(`${apiresource}/AQA Form Request/${name}`);
};

export const updateComplaint = (id, status) => {
  return axios.post(`${apiMethod}/faculty.students.change_complaint_status?name=${id}&status=${status}`);
};

export const generateOfferLetter = (id) => {
  return axios.post(`${apiMethod}/marketing.api.generate_offer_letters?application_id=${id}`);
};

export const releaseOfferLetter = (id) => {
  return axios.post(`${apiMethod}/registry.api.offer_letter_released?application_id=${id}`);
};