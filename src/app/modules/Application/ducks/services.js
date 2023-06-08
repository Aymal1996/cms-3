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

export const activityLog = (payload) => {
  return fetch('https://raisd-61ff6-default-rtdb.firebaseio.com//RAISD.json', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });
}