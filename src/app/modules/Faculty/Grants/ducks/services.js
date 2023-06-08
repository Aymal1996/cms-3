import axios from '../../../../../services/axiosInterceptor';
import { apiresource, apiMethod } from '../../../../../configs/constants';

export const addUpdateGrant = (payload) => {
  return axios.post(`${apiMethod}/faculty.grants.add_single_grant`, payload);
};

export const updateFinanceStatus = (id, status) => {
  return axios.post(`${apiMethod}/faculty.grants.change_finance_status?name=${id}&status=${status}`);
};

export const updateFacultyStatus = (id, status) => {
  return axios.post(`${apiMethod}/faculty.grants.change_faculty_status?name=${id}&status=${status}`);
};