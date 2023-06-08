import axios from '../../../../services/axiosInterceptor';
import { apiresource, apiMethod } from '../../../../configs/constants';

export const clockINOUT = (id, log) => {
  return axios.post(`${apiMethod}/hrms.last_clock.test_previous_checkin_out?employee_id=${id}&logtype=${log}`);
};

export const lateClockOutReason = (data) => {
  return axios.post(`${apiresource}/HRMS Late Clock Out`, data);
};

export const getMeetingID = (name) => {
  return axios.post(`${apiMethod}/faculty.faculty_dashboard.getmeeting_CMS?id=lecturer&TT_id=${name}`);
};

export const getSearchData = (number, limit, search, department) => {
  return axios.get(`${apiMethod}/hrms.api.get_employee_role_list?searchTXT=${search}&page_number=${number}&limit=${limit}&searchFilter=${department}`);
};